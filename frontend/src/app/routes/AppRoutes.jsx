import { Routes, Route } from "react-router-dom";


import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";


import Home from "@/features/home/pages/home";
import SearchPage from "@/features/search/pages/SearchPage";
import HallDetails from "../../features/Hall/pages/hallDetails";
import BookingPage from "../../features/booking/pages/bookingPage"; 

import Login from "@/features/Auth/pages/login"; 
import Register from "@/features/Auth/pages/register";
import ForgotPassword from "@/features/Auth/pages/ForgotPassword";
import ResetPassword from "@/features/Auth/pages/ResetPassword";

import Favorites from "@/features/favorites/pages/Favorites";
import Profile from "@/features/profile/pages/profile"; 
import About from "@/features/about/pages/about"; 
import NotFound from "@/features/error"; 


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


      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}