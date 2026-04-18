import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "@/features/home/pages/Home";
import SearchPage from "@/features/search/pages/SearchPage";
import HallDetails from "@/features/hall/pages/HallDetails";
import BookingPage from "@/features/booking/pages/BookingPage";

import Login from "@/features/Auth/pages/login";
import Register from "@/features/Auth/pages/register";

import Favorites from "@/features/favorites/pages/Favorites";
import Profile from "@/features/profile/pages/Profile";
import About from "@/features/about/pages/About";
import NotFound from "@/features/error";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ✅ كل الصفحات اللي فيها Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hall/:id" element={<HallDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ❌ صفحات Auth بدون Navbar/Footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}