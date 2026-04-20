import { configDotenv } from "dotenv";
configDotenv();

import express, { json } from "express";
import cors from "cors";

import connectDB from "./config/connectdb.js";
import { errorHandler, notFoundHandler } from "./middleware/notfounderrorhandler.js";

import authRoutes         from "./routes/auth.route.js";
import userRoutes         from "./routes/user.route.js";
import hallRoutes         from "./routes/hall.route.js";
import bookingRoutes      from "./routes/booking.route.js";
import reviewRoutes       from "./routes/review.route.js";
import favRoutes          from "./routes/favorites.route.js";
import notificationRoutes from "./routes/notification.route.js";
import uploadRoutes       from "./routes/upload.route.js";
import aiRoutes           from "./routes/ai.route.js";
import ownerRequestRoutes from "./routes/ownerRequest.route.js";

const app = express();
app.use(cors());
app.use(json());

await connectDB();

// Routes
app.use("/auth",          authRoutes);
app.use("/user",          userRoutes);
app.use("/halls",         hallRoutes);
app.use("/bookings",      bookingRoutes);
app.use("/reviews",       reviewRoutes);
app.use("/favorites",     favRoutes);
app.use("/notifications", notificationRoutes);
app.use("/upload",        uploadRoutes);
app.use("/ai",            aiRoutes);
app.use("/owner",         ownerRequestRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
