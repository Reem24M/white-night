import asyncHandler from 'express-async-handler';
import { ownerRequestModel } from '../models/OwnerRequest.js';
import { Users } from '../models/user.js';
import { hallModel } from '../models/Hall.js';
import { createNotification } from '../Utils/notify.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../Utils/cloudinary.js';
import { createHallValidation } from '../validators/hall_shema.js';

// @desc  Submit owner request with hall data + images
// @route POST /owner/request
// @access Private (user with ownerStatus: pending)
const submitOwnerRequest = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);

  if (user.ownerStatus !== 'pending') {
    return res.status(403).json({ message: 'You are not eligible to submit an owner request' });
  }

  const existingRequest = await ownerRequestModel.findOne({ user: req.user.id });
  if (existingRequest) {
    return res.status(400).json({ message: 'You already submitted an owner request' });
  }

  const { error } = createHallValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Upload cover photo
  let coverPhoto = {};
  if (req.files?.coverPhoto?.[0]) {
    coverPhoto = await uploadToCloudinary(req.files.coverPhoto[0].buffer, 'white-night/owner-requests');
  }

  // Upload gallery images
  let Gallery = [];
  if (req.files?.Gallery?.length) {
    Gallery = await Promise.all(
      req.files.Gallery.map((f) => uploadToCloudinary(f.buffer, 'white-night/owner-requests'))
    );
  }

  const request = await ownerRequestModel.create({
    user: req.user.id,
    ...req.body,
    coverPhoto,
    Gallery,
  });

  // Notify all admins
  const admins = await Users.find({ role: 'admin' }).select('_id');
  await Promise.all(
    admins.map((admin) =>
      createNotification({
        userId: admin._id,
        type: 'owner_request_received',
        message: `New owner request submitted by ${user.fullname}`,
      })
    )
  );

  res.status(201).json({ message: 'Owner request submitted successfully', request });
});

// @desc  Get all pending owner requests
// @route GET /owner/requests
// @access Private (Admin)
const getOwnerRequests = asyncHandler(async (req, res) => {
  const requests = await ownerRequestModel
    .find({ status: 'pending' })
    .populate('user', 'fullname email phone');

  res.status(200).json({ requests });
});

// @desc  Approve owner request
// @route PATCH /owner/requests/:id/approve
// @access Private (Admin)
const approveOwnerRequest = asyncHandler(async (req, res) => {
  const request = await ownerRequestModel.findById(req.params.id).populate('user');
  if (!request) return res.status(404).json({ message: 'Request not found' });
  if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

  // Update user role to Owner
  await Users.findByIdAndUpdate(request.user._id, {
    role: 'Owner',
    ownerStatus: 'approved',
  });

  // Create the Hall from request data
  const { user, status, createdAt, updatedAt, __v, _id, ...hallData } = request.toObject();
  await hallModel.create({ ...hallData, Owner: request.user._id });

  // Mark request as approved
  request.status = 'approved';
  await request.save();

  // Notify the user
  await createNotification({
    userId: request.user._id,
    type: 'owner_approved',
    message: 'Congratulations! Your owner request has been approved. Your hall is now live.',
  });

  res.status(200).json({ message: 'Owner request approved successfully' });
});

// @desc  Reject owner request
// @route PATCH /owner/requests/:id/reject
// @access Private (Admin)
const rejectOwnerRequest = asyncHandler(async (req, res) => {
  const request = await ownerRequestModel.findById(req.params.id).populate('user');
  if (!request) return res.status(404).json({ message: 'Request not found' });
  if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

  // Delete uploaded images from Cloudinary
  if (request.coverPhoto?.publicId) {
    await deleteFromCloudinary(request.coverPhoto.publicId);
  }
  await Promise.all(request.Gallery.map((img) => deleteFromCloudinary(img.publicId)));

  // Revert user ownerStatus back to none
  await Users.findByIdAndUpdate(request.user._id, {
    ownerStatus: 'rejected',
  });

  request.status = 'rejected';
  await request.save();

  // Notify the user
  await createNotification({
    userId: request.user._id,
    type: 'owner_rejected',
    message: 'Your owner request has been reviewed and was not approved at this time.',
  });

  res.status(200).json({ message: 'Owner request rejected' });
});

export { submitOwnerRequest, getOwnerRequests, approveOwnerRequest, rejectOwnerRequest };
