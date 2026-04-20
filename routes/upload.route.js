import { Router } from "express";
import { uploadCoverPhoto, uploadGalleryImages, deleteGalleryImage } from "../controller/upload.controller.js";
import { Protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

// Cover photo
router.post("/hall/:id/cover",Protect, upload.single("coverPhoto"),uploadCoverPhoto);

// Gallery (up to 10 images)
router.post("/hall/:id/gallery", Protect, upload.array("images", 10),uploadGalleryImages);

// Delete gallery image
router.delete("/hall/:id/gallery",Protect, deleteGalleryImage);

export default router;
