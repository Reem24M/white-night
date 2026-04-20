import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../../features/Admen/Pages/Dashboard";
import Services from "../../features/Admen/Pages/Services";
import UserManagement from "../../features/Admen/Pages/Users";
import EditProfile from "../../features/Admen/Pages/EditProfileUser";

import Home from "@/features/home/pages/home";
import SearchPage from "../../features/search/pages/SearchPage";
import HallDetails from "../../features/hall/pages/hallDetails";
import BookingPage from '../../features/booking/pages/bookingPage' 
import Login from "@/features/Auth/pages/login"; 
import Register from "@/features/Auth/pages/register";
import ForgotPassword from "@/features/Auth/pages/ForgotPassword";
import ResetPassword from "@/features/Auth/pages/ResetPassword";

import Favorites from "@/features/favorites/pages/Favorites";
import Profile from "@/features/profile/pages/profile"; 
import About from "@/features/about/pages/about"; 
import NotFound from "@/features/error"; 

import HallsDetails from "@/features/Hall/pages/hallDetails";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hall/:id" element={<HallDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Route>


        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="pending" element={<Services />} /> 
        </Route>

      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      {/* hall routes */}
      <Route path="/hall/:id" element={<HallsDetails />} />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}