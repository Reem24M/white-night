import jwt from "jsonwebtoken";
import { Users } from "../models/user.js";
import { hallModel } from "../models/Hall.js";

const optionalProtect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { req.user = null; return next(); }
  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Invalid token format" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id).select("_id role");
    if (!user) return res.status(401).json({ message: "User no longer exists" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const Protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token not provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id).select("_id role");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const restrictToAccountOwner = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please Login first" });
  if (req.user.role === "user") return next();
  return res.status(403).json({ message: "Only users have this access" });
};

const restrictToAdminOrAccountOwner = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please Login first" });
  const isAccOwner = req.params.id && req.params.id === req.user.id.toString();
  if (isAccOwner || req.user.role === "admin") return next();
  return res.status(403).json({ message: "You can only modify your own data" });
};

const restrictToAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please Login first" });
  if (req.user.role === "admin") return next();
  return res.status(403).json({ message: "Only Admins have this access" });
};

const restrictToHallOwner = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please Login first" });
  const hallId = req.params.id;
  try {
    const hall = await hallModel.findById(hallId).select("Owner Gallery coverPhoto");
    if (!hall) return res.status(404).json({ message: "Hall not found" });
    if (hall.Owner.equals(req.user.id)) { req.hall = hall; return next(); }
    return res.status(403).json({ message: "Only Hall Owner has this access" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { optionalProtect, Protect, restrictToAdminOrAccountOwner, restrictToAdmin, restrictToAccountOwner, restrictToHallOwner };
