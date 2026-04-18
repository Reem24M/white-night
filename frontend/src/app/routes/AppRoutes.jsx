import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// لاحظ أسماء الملفات والمجلدات هنا
import Home from "@/features/home/pages/home";
import SearchPage from "@/features/search/pages/SearchPage";
import HallDetails from "@/features/hall/pages/hallDetails";
import BookingPage from "@/features/booking/pages/bookingPage"; 

import Login from "@/features/Auth/pages/login"; // التأكد من أن مجلد Auth يبدأ بحرف كبير
import Register from "@/features/Auth/pages/register";

import Favorites from "@/features/favorites/pages/Favorites";
import Profile from "@/features/profile/pages/profile"; // التأكد من أنها صغيرة كما في الصورة
import About from "@/features/about/pages/about"; 
import NotFound from "@/features/error"; // التأكد من اسم الملف هو error.jsx فعلاً

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