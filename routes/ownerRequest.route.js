import { Router } from 'express';
import {
  submitOwnerRequest,
  getOwnerRequests,
  approveOwnerRequest,
  rejectOwnerRequest,
} from '../controller/ownerRequest.controller.js';
import { Protect, restrictToAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

// User submits their hall data + images
router.post(
  '/request',
  Protect,
  upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'Gallery', maxCount: 10 },
  ]),
  submitOwnerRequest
);

// Admin routes
router.get('/requests', Protect, restrictToAdmin, getOwnerRequests);
router.patch('/requests/:id/approve', Protect, restrictToAdmin, approveOwnerRequest);
router.patch('/requests/:id/reject', Protect, restrictToAdmin, rejectOwnerRequest);

export default router;
