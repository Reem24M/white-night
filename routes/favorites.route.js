import { Router } from "express";
import {
  getMyFavorites,
  addToFavorites,
  removeFromFavorites,
  checkIfFavorite
} from "../controller/favorites.controller.js";
import { Protect } from "../middleware/auth.js";

const router = Router();

// @route GET    /favorites            - get my favorites
// @route POST   /favorites/:hallId    - add to favorites
// @route DELETE /favorites/:hallId    - remove from favorites

router.get("/", Protect, getMyFavorites);
router.post("/:hallId", Protect, addToFavorites);
router.get("/check/:hallId", Protect, checkIfFavorite);
router.delete("/:hallId", Protect, removeFromFavorites);

export default router;