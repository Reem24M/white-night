import asyncHandler from "express-async-handler";
import { reviewModel } from "../models/reviews.js";
import { hallModel } from "../models/Hall.js";
import { bookingModel } from "../models/Booking.js";
import { createNotification } from "../Utils/notify.js";

// helper - recalculate and save averageRating on hall
const recalcRating = async (hallId) => {
  const result = await reviewModel.aggregate([
    { $match: { Hall: hallId } },
    { $group: { _id: "$Hall", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  const avg   = result[0]?.avg   ?? 0;
  const count = result[0]?.count ?? 0;
  await hallModel.findByIdAndUpdate(hallId, {
    averageRating:   Math.round(avg * 10) / 10,
    numberOfReviews: count,
  });
};

// @desc  Add a review to a hall
// @route POST /reviews/:hallId
// @access Private (User - must have a confirmed booking)
const addReview = asyncHandler(async (req, res) => {
  const { hallId } = req.params;
  const { title, Content, rating } = req.body;

  if (!Content) return res.status(400).json({ message: "Review content is required" });
  if (!rating || rating < 1 || rating > 5)
    return res.status(400).json({ message: "Rating must be between 1 and 5" });

  const hall = await hallModel.findById(hallId);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  // Must have a confirmed booking
  const hasBooking = await bookingModel.findOne({
    hall: hallId,
    user: req.user.id,
    status: "confirmed",
  });
  if (!hasBooking)
    return res.status(403).json({
      message: "You can only review halls you have a confirmed booking at",
    });

  // Prevent duplicate review
  const existing = await reviewModel.findOne({ Hall: hallId, user: req.user.id });
  if (existing) return res.status(400).json({ message: "You have already reviewed this hall" });

  const review = await reviewModel.create({
    title,
    Content,
    rating,
    Hall: hallId,
    user: req.user.id,
  });

  await recalcRating(hall._id);
  await review.populate("user", "fullname");

  // Notify hall owner
  await createNotification({
    userId:      hall.Owner,
    type:        "review_added",
    message:     `تقييم جديد على قاعتك "${hall.name}" - التقييم: ${rating}/5 ⭐`,
    relatedHall: hall._id,
  });

  res.status(201).json({ message: "Review added successfully", review });
});

// @desc  Get all reviews for a hall
// @route GET /reviews/:hallId
// @access Public
const getHallReviews = asyncHandler(async (req, res) => {
  const { hallId } = req.params;

  const hall = await hallModel.findById(hallId);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  const reviews = await reviewModel
    .find({ Hall: hallId })
    .populate("user", "fullname")
    .sort({ createdAt: -1 });

  res.status(200).json({
    reviews,
    total: reviews.length,
    averageRating: hall.averageRating,
  });
});

// @desc  Update own review
// @route PUT /reviews/:reviewId
// @access Private (Review owner only)
const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.reviewId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (review.user.toString() !== req.user.id.toString())
    return res.status(403).json({ message: "Not authorized to update this review" });

  const { title, Content, rating } = req.body;
  if (title)  review.title   = title;
  if (Content) review.Content = Content;
  if (rating) {
    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    review.rating = rating;
  }
  await review.save();
  await recalcRating(review.Hall);

  res.status(200).json({ message: "Review updated successfully", review });
});

// @desc  Delete a review
// @route DELETE /reviews/:reviewId
// @access Private (Review owner only, or Admin)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await reviewModel.findById(req.params.reviewId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  const isReviewOwner = review.user.toString() === req.user.id.toString();
  const isAdmin = req.user.role === "admin";

  // Hall owner cannot delete reviews on their own hall
  if (!isReviewOwner && !isAdmin)
    return res.status(403).json({
      message: "Only the review author or an admin can delete this review",
    });

  const hallId = review.Hall;
  await reviewModel.findByIdAndDelete(review._id);
  await recalcRating(hallId);

  res.status(200).json({ message: "Review deleted successfully" });
});

export { addReview, getHallReviews, updateReview, deleteReview };
