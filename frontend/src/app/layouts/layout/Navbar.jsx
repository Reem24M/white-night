import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDF8F5]/90 backdrop-blur-sm border-b border-[#EADACC] px-6 py-4 flex items-center justify-between font-serif">
      {/* اللوجو */}
      <Link to="/" className="text-2xl font-semibold text-gray-900 tracking-wider">
        WHITE <span className="text-[#A88C5D]">NIGHT</span>
      </Link>

      {/* الروابط */}
      <div className="flex items-center gap-8 text-sm text-gray-700 font-sans font-normal tracking-wide">
        <Link to="/" className="hover:text-[#A88C5D] transition-colors">Home</Link>
        <Link to="/search" className="hover:text-[#A88C5D] transition-colors">Venues</Link>
        <Link to="/about" className="hover:text-[#A88C5D] transition-colors">About Us</Link>
        <Link to="/favorites" className="hover:text-[#A88C5D] transition-colors">My Bookings</Link>
      </div>

      {/* الأيقونات */}
      <div className="flex items-center gap-5 text-[#A88C5D]">
        <button className="hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        </button>
        <button className="hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;