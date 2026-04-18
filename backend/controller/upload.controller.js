import asyncHandler from "express-async-handler";
import { hallModel } from "../models/Hall.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../Utils/cloudinary.js";

// @desc  Upload / replace hall cover photo
// @route POST /upload/hall/:id/cover
// @access Private (Hall Owner, Admin)
const uploadCoverPhoto = asyncHandler(async (req, res) => {
  const hall = await hallModel.findById(req.params.id);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (req.user.role !== "admin" && !hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized" });

  if (!req.file)
    return res.status(400).json({ message: "Please upload an image file" });

  // Delete old cover from Cloudinary
  if (hall.coverPhoto?.publicId) {
    await deleteFromCloudinary(hall.coverPhoto.publicId);
  }

  const { url, publicId } = await uploadToCloudinary(req.file.buffer, "white-night/covers");

  hall.coverPhoto = { url, publicId };
  await hall.save();

  res.status(200).json({ message: "Cover photo updated", coverPhoto: hall.coverPhoto });
});

// @desc  Add images to hall gallery
// @route POST /upload/hall/:id/gallery
// @access Private (Hall Owner, Admin)
const uploadGalleryImages = asyncHandler(async (req, res) => {
  const hall = await hallModel.findById(req.params.id);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (req.user.role !== "admin" && !hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized" });

  if (!req.files || req.files.length === 0)
    return res.status(400).json({ message: "Please upload at least one image" });

  const remaining = 10 - hall.Gallery.length;
  if (remaining <= 0)
    return res.status(400).json({ message: "Gallery is full (max 10 photos)" });

  const filesToUpload = req.files.slice(0, remaining);

  const uploaded = await Promise.all(
    filesToUpload.map((file) =>
      uploadToCloudinary(file.buffer, "white-night/gallery")
    )
  );

  hall.Gallery.push(...uploaded);
  await hall.save();

  res.status(200).json({
    message: `${uploaded.length} image(s) added to gallery`,
    gallery: hall.Gallery,
  });
});

// @desc  Delete a gallery image
// @route DELETE /upload/hall/:id/gallery/:publicId
// @access Private (Hall Owner, Admin)
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const hall = await hallModel.findById(req.params.id);
  if (!hall) return res.status(404).json({ message: "Hall not found" });

  if (req.user.role !== "admin" && !hall.Owner.equals(req.user.id))
    return res.status(403).json({ message: "Not authorized" });

  const publicId = decodeURIComponent(req.body.publicId);
  const imgIndex = hall.Gallery.findIndex((img) => img.publicId === publicId);

  if (imgIndex === -1)
    return res.status(404).json({ message: "Image not found in gallery" });

  await deleteFromCloudinary(publicId);
  hall.Gallery.splice(imgIndex, 1);
  await hall.save();

  res.status(200).json({ message: "Image deleted", gallery: hall.Gallery });
});

export { uploadCoverPhoto, uploadGalleryImages, deleteGalleryImage };
