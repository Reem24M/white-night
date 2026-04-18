import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../layouts/layout/Navbar";
// TODO: Uncomment the next line when the Footer component is ready
// import Footer from '@/components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDF8F5] font-sans pt-[73px]">
      <Navbar />
      
      {/* Nested routes (e.g., Home, Search, ResetPassword) will render here */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;