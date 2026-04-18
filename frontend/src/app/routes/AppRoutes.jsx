import { Routes, Route } from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";
import AuthLayout from "@/app/layouts/AuthLayout";

import Home from "@/features/home/pages/Home";
import SearchPage from "@/features/search/pages/SearchPage";
import HallDetails from "@/features/hall/pages/HallDetails";
import BookingPage from "@/features/booking/pages/BookingPage";

import Login from "@/features/Auth/pages/login";
import Register from "@/features/Auth/pages/register";
import ForgotPassword from "@/features/Auth/pages/ForgotPassword";
import ResetPassword from "@/features/Auth/pages/ResetPassword";

import Favorites from "@/features/favorites/pages/Favorites";
import Profile from "@/features/profile/pages/Profile";

import NotFound from "@/features/error";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/hall/:id" element={<HallDetails />} />
      <Route path="/booking/:id" element={<BookingPage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* User */}
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />

      {/* not found */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}