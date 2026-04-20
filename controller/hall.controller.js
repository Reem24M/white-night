import asyncHandler from "express-async-handler";
import { hallModel } from "../models/Hall.js";
import { reviewModel } from "../models/reviews.js";
import { favHallModel } from "../models/FavHall.js";
import { bookingModel } from "../models/Booking.js";
import { createHallValidation } from "../validators/hall_shema.js";

// @desc  Get all halls with full filtering + sorting + pagination
// @route GET /halls?hallType=&priceRange=&governorate=&search=&minRating=&sortBy=&page=&limit=
// @access Public
const getAllHalls = asyncHandler(async (req, res) => {
  const {
    hallType,
    priceRange,
    governorate,
    search,
    minRating,
    sortBy = "createdAt",
    order  = "desc",
    page   = 1,
    limit  = 10,
  } = req.query;

  const filter = {};
  if (hallType)   filter.hallType       = { $in: [hallType] };
  if (priceRange) filter.priceRange     = priceRange;
  if (governorate) filter["address.governorate"] = new RegExp(governorate, "i");
  if (search)     filter.name           = { $regex: search, $options: "i" };
  if (minRating)  filter.averageRating  = { $gte: Number(minRating) };

  const validSortFields = ["createdAt", "averageRating", "numberOfReviews", "name"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;

  const skip = (Number(page) - 1) * Number(limit);

  const [halls, total] = await Promise.all([
    hallModel
      .find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .populate("Owner", "fullname email phone")
      .select("-Gallery"),        // exclude heavy gallery from list view
    hallModel.countDocuments(filter),
  ]);

  res.status(200).json({
    halls,
    total,
    page:  Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

// @desc  Get single hall by ID (full details + reviews)
// @route GET /halls/:id
// @access Public
const getHallById = asyncHandler(async (req, res) => {
  const hall = await hallModel.findById(req.params.id).populate("Owner", "fullname email phone");
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  const reviews = await reviewModel
    .find({ Hall: hall._id })
    .populate("user", "fullname")
    .sort({ createdAt: -1 });

  res.status(200).json({ hall, reviews });
});

// @desc  Create a new hall
// @route POST /halls
// @access Private (Owner, Admin)
const createHall = asyncHandler(async (req, res) => {
  const { error } = createHallValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const existingHall = await hallModel.findOne({ Owner: req.user.id });
  if (existingHall)
    return res.status(400).json({ message: "You already have a registered hall" });

  const newHall = await hallModel.create({ ...req.body, Owner: req.user.id });
  res.status(201).json({ message: "Hall created successfully", hall: newHall });
});

// @desc  Update a hall
// @route PUT /halls/:id
// @access Private (Hall Owner, Admin)
const updateHall = asyncHandler(async (req, res) => {
  const hall = await hallModel.findById(req.params.id);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (req.user.role !== "admin" && !hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized to update this hall" });

  // Prevent owner from touching rating fields
  delete req.body.averageRating;
  delete req.body.numberOfReviews;

  const updated = await hallModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: "Hall updated successfully", hall: updated });
});

// @desc  Delete a hall
// @route DELETE /halls/:id
// @access Private (Hall Owner, Admin)
const deleteHall = asyncHandler(async (req, res) => {
  const hall = await hallModel.findById(req.params.id);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (req.user.role !== "admin" && !hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized to delete this hall" });

  await Promise.all([
    reviewModel.deleteMany({ Hall: hall._id }),
    favHallModel.deleteMany({ hall: hall._id }),
    bookingModel.deleteMany({ hall: hall._id }),
    hallModel.findByIdAndDelete(hall._id),
  ]);

  res.status(200).json({ message: "Hall deleted successfully" });
});

// ─── OWNER DASHBOARD ──────────────────────────────────────────────────────────

// @desc  Get owner's hall info + stats
// @route GET /halls/dashboard/me
// @access Private (Owner)
const getOwnerDashboard = asyncHandler(async (req, res) => {
  const hall = await hallModel.findOne({ Owner: req.user.id });
  if (!hall) return res.status(404).json({ message: "You don't have a registered hall yet" });

  const [bookings, reviews] = await Promise.all([
    bookingModel.find({ hall: hall._id }).populate("user", "fullname email phone").sort({ createdAt: -1 }),
    reviewModel.find({ Hall: hall._id }).populate("user", "fullname").sort({ createdAt: -1 }),
  ]);

  // Booking stats
  const totalBookings     = bookings.length;
  const pendingBookings   = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length;

  // Booking breakdown by event type
  const bookingsByType = bookings.reduce((acc, b) => {
    acc[b.eventType] = (acc[b.eventType] || 0) + 1;
    return acc;
  }, {});

  res.status(200).json({
    hall,
    stats: {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      bookingsByType,
      averageRating:   hall.averageRating,
      numberOfReviews: hall.numberOfReviews,
    },
    bookings,
    reviews,
  });
});

export { getAllHalls, getHallById, createHall, updateHall, deleteHall, getOwnerDashboard };
