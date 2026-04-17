import { Routes, Route } from "react-router-dom";


import Home from "@/features/home/pages/Home";
import SearchPage from "@/features/search/pages/SearchPage";
import HallDetails from "@/features/hall/pages/HallDetails";
import BookingPage from "@/features/booking/pages/BookingPage";

import Login from "@/features/Auth/pages/login";
import Register from "@/features/Auth/pages/register";

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

      {/* User */}
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />

      {/* not found */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}