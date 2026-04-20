import { Router } from "express";
import {
  addReview,
  getHallReviews,
  updateReview,
  deleteReview,
  getMyReviews
} from "../controller/review.controller.js";
import { Protect } from "../middleware/auth.js";

const router = Router();

// @route GET  /reviews/:hallId         - get all reviews for a hall (public)
// @route POST /reviews/:hallId         - add a review (user with confirmed booking)
// @route PUT  /reviews/:reviewId       - update own review
// @route DELETE /reviews/:reviewId     - delete review (owner or admin)

router.get("/myreviews", Protect, getMyReviews);
router.get("/:hallId", getHallReviews);
router.post("/:hallId", Protect, addReview);
router.put("/:reviewId", Protect, updateReview);
router.delete("/:reviewId", Protect, deleteReview);

export default router;
