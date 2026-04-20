import asyncHandler from "express-async-handler";
import { bookingModel } from "../models/Booking.js";
import { hallModel } from "../models/Hall.js";
import { createNotification } from "../Utils/notify.js";

const VALID_EVENT_TYPES = ["Foto Session", "Graduation Party", "Wedding", "Engagement"];

// @desc  Create a booking
// @route POST /bookings
// @access Private (User)
const createBooking = asyncHandler(async (req, res) => {
  const { hallId, eventDate, eventType, guestsCount, notes, contactPhone } = req.body;

  if (!hallId || !eventDate || !eventType || !guestsCount || !contactPhone)
    return res.status(400).json({ message: "Please provide all required fields" });

  if (!VALID_EVENT_TYPES.includes(eventType))
    return res.status(400).json({
      message: `نوع الحجز غير صحيح. الأنواع المتاحة: ${VALID_EVENT_TYPES.join(", ")}`,
    });

  const hall = await hallModel.findById(hallId);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (hall.capacity && guestsCount > hall.capacity)
    return res.status(400).json({
      message: `Hall capacity is ${hall.capacity}. Requested guests: ${guestsCount}`,
    });

  // Check date conflict
  const bookingDate = new Date(eventDate);
  const dayStart = new Date(new Date(bookingDate).setHours(0, 0, 0, 0));
  const dayEnd   = new Date(new Date(bookingDate).setHours(23, 59, 59, 999));

  const conflict = await bookingModel.findOne({
    hall: hallId,
    eventDate: { $gte: dayStart, $lte: dayEnd },
    status: { $ne: "cancelled" },
  });
  if (conflict)
    return res.status(400).json({ message: "Hall is already booked on this date" });

  const booking = await bookingModel.create({
    hall: hallId,
    user: req.user.id,
    eventDate,
    eventType,
    guestsCount,
    notes,
    contactPhone,
  });

  await booking.populate("hall", "name address phoneNumber");

  // Notify the hall owner
  await createNotification({
    userId:          hall.Owner,
    type:            "booking_received",
    message:         `حجز جديد لقاعتك "${hall.name}" بتاريخ ${new Date(eventDate).toLocaleDateString("ar-EG")}`,
    relatedBooking:  booking._id,
    relatedHall:     hall._id,
  });

  res.status(201).json({ message: "Booking created successfully", booking });
});

// @desc  Get my bookings
// @route GET /bookings/my
// @access Private (User)
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingModel
    .find({ user: req.user.id })
    .populate("hall", "name address coverPhoto phoneNumber")
    .sort({ createdAt: -1 });

  res.status(200).json({ bookings });
});

// @desc  Get all bookings for a hall
// @route GET /bookings/hall/:hallId
// @access Private (Hall Owner, Admin)
const getHallBookings = asyncHandler(async (req, res) => {
  const { hallId } = req.params;
  const { status } = req.query;

  const hall = await hallModel.findById(hallId);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (req.user.role !== "admin" && !hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized" });

  const filter = { hall: hallId };
  if (status) filter.status = status;

  const bookings = await bookingModel
    .find(filter)
    .populate("user", "fullname email phone")
    .sort({ eventDate: 1 });

  res.status(200).json({ bookings });
});

// @desc  Update booking status (confirm or cancel) - by owner/admin
// @route PATCH /bookings/:id/status
// @access Private (Hall Owner, Admin)
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["confirmed", "cancelled"].includes(status))
    return res.status(400).json({ message: "Status must be 'confirmed' or 'cancelled'" });

  const booking = await bookingModel.findById(req.params.id).populate("hall");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (req.user.role !== "admin" && !booking.hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized" });

  booking.status = status;
  await booking.save();

  // Notify the user who made the booking
  const notifType = status === "confirmed" ? "booking_confirmed" : "booking_cancelled";
  const notifMsg  = status === "confirmed"
    ? `تم تأكيد حجزك في قاعة "${booking.hall.name}" 🎉`
    : `تم إلغاء حجزك في قاعة "${booking.hall.name}"`;

  await createNotification({
    userId:         booking.user,
    type:           notifType,
    message:        notifMsg,
    relatedBooking: booking._id,
    relatedHall:    booking.hall._id,
  });

  res.status(200).json({ message: `Booking ${status}`, booking });
});

// @desc  Cancel own booking
// @route PATCH /bookings/:id/cancel
// @access Private (User)
const cancelMyBooking = asyncHandler(async (req, res) => {
  const booking = await bookingModel.findById(req.params.id).populate("hall", "name Owner");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (booking.user.toString() !== req.user.id.toString())
    return res.status(403).json({ message: "Not authorized" });

  if (booking.status === "cancelled")
    return res.status(400).json({ message: "Booking is already cancelled" });

  booking.status = "cancelled";
  await booking.save();

  // Notify the hall owner
  await createNotification({
    userId:         booking.hall.Owner,
    type:           "booking_cancelled",
    message:        `تم إلغاء حجز في قاعتك "${booking.hall.name}"`,
    relatedBooking: booking._id,
    relatedHall:    booking.hall._id,
  });

  res.status(200).json({ message: "Booking cancelled successfully", booking });
});

// @desc  Get all bookings - admin only
// @route GET /bookings
// @access Private (Admin)
const getAllBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [bookings, total] = await Promise.all([
    bookingModel
      .find(filter)
      .populate("hall", "name address")
      .populate("user", "fullname email phone")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),
    bookingModel.countDocuments(filter),
  ]);

  res.status(200).json({
    bookings,
    total,
    page:  Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

export { createBooking, getMyBookings, getHallBookings, updateBookingStatus, cancelMyBooking, getAllBookings };
