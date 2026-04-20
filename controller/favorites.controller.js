import asyncHandler from "express-async-handler";
import { favHallModel } from "../models/FavHall.js";
import { hallModel } from "../models/Hall.js";

// @desc  Get all favorite halls for logged-in user
// @route GET /favorites
// @access Private (User)
const getMyFavorites = asyncHandler(async (req, res) => {
  const favorites = await favHallModel
    .find({ user: req.user.id })
    .populate("hall", "name address coverPhoto priceRange hallType numberOfReviews")
    .sort({ createdAt: -1 });

  res.status(200).json({ favorites, total: favorites.length });
});


// @desc    Check if a hall is in user's favorites
// @route   GET /favorites/check/:hallId
// @access  Private (User)
const checkIfFavorite = asyncHandler(async (req, res) => {
  const { hallId } = req.params;

  const isFavorite = await favHallModel.findOne({ 
    user: req.user.id, 
    hall: hallId 
  });

  res.status(200).json({ 
    isFavorite: !!isFavorite // هيرجع true لو موجود، و false لو مش موجود
  });
});
// @desc  Add a hall to favorites
// @route POST /favorites/:hallId
// @access Private (User)
const addToFavorites = asyncHandler(async (req, res) => {
  const { hallId } = req.params;

  const hall = await hallModel.findById(hallId);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  const existing = await favHallModel.findOne({ user: req.user.id, hall: hallId });
  if (existing) return res.status(400).json({ message: "Hall already in favorites" });

  const fav = await favHallModel.create({ user: req.user.id, hall: hallId });
  await fav.populate("hall", "name address coverPhoto");

  res.status(201).json({ message: "Added to favorites", favorite: fav });
});




// @desc  Remove a hall from favorites
// @route DELETE /favorites/:hallId
// @access Private (User)
const removeFromFavorites = asyncHandler(async (req, res) => {
  const { hallId } = req.params;

  const fav = await favHallModel.findOneAndDelete({ user: req.user.id, hall: hallId });
  if (!fav) return res.status(404).json({ message: "Hall not found in favorites" });

  res.status(200).json({ message: "Removed from favorites" });
});

export { getMyFavorites, addToFavorites, removeFromFavorites, checkIfFavorite };