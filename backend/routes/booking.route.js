import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  getHallBookings,
  updateBookingStatus,
  cancelMyBooking,
  getAllBookings,
} from "../controller/booking.controller.js";
import { Protect, restrictToAdmin } from "../middleware/auth.js";

const router = Router();

// @route GET /bookings         (admin: all bookings)
// @route GET /bookings/my      (user: my bookings)
// @route GET /bookings/hall/:hallId  (owner: hall bookings)
// @route POST /bookings        (user: create booking)
// @route PATCH /bookings/:id/status  (owner/admin: confirm or cancel)
// @route PATCH /bookings/:id/cancel  (user: cancel own booking)

router.get("/", Protect, restrictToAdmin, getAllBookings);
router.get("/my", Protect, getMyBookings);
router.get("/hall/:hallId", Protect, getHallBookings);

router.post("/", Protect, createBooking);

router.patch("/:id/status", Protect, updateBookingStatus);
router.patch("/:id/cancel", Protect, cancelMyBooking);

export default router;
