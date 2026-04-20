import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../../features/Admen/Pages/dashboard";
import Services from "../../features/Admen/Pages/services";
import UserManagement from "../../features/Admen/Pages/users";
import EditProfile from "../../features/Admen/Pages/editProfileUser";

import Home from "@/features/home/pages/home";
import SearchPage from "../../features/search/pages/searchPage";
// import HallDetails from "../../features/hall/pages/halldetails";
import Login from "@/features/Auth/pages/login"; 
import Register from "@/features/Auth/pages/register";
import ForgotPassword from "@/features/Auth/pages/ForgotPassword";
import ResetPassword from "@/features/Auth/pages/ResetPassword";

import Favorites from "@/features/favorites/pages/favorites";
import Profile from "@/features/profile/pages/profile"; 
import About from "@/features/about/pages/about"; 
import NotFound from "@/features/error"; 
import HallDetails from "@/features/hall/pages/halldetails";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hall/:id" element={<HallDetails />} />
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