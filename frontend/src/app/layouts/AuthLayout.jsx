import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden pt-10 pb-10">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 font-serif text-[#A88C5D]">
        <Link to="/" className="text-2xl font-semibold text-gray-900 tracking-wider">
          WHITE <span className="text-[#A88C5D]">NIGHT</span>
        </Link>
        
        {/* Role Selection Toggles */}
        <div className="flex items-center gap-1">
          <div className="flex flex-col items-center text-[#A88C5D]">
            <span className="text-[10px] uppercase font-bold tracking-widest -mb-1">Owner</span>
            <button className="p-2.5 rounded-full hover:bg-[#F5F0EB]">🏢</button>
          </div>
          <div className="flex flex-col items-center text-[#A88C5D]">
            <span className="text-[10px] uppercase font-bold tracking-widest -mb-1">User</span>
            <button className="p-2.5 rounded-full hover:bg-[#F5F0EB]">👤</button>
          </div>
        </div>
      </nav>
      
      {/* Decorative Background Element (Top Right) */}
      <div className="absolute top-0 right-0 p-4 opacity-30 z-0 pointer-events-none">
        <svg className="w-64 h-64 text-[#A88C5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </div>

      {/* Main Content Container for Auth Cards */}
      <div className="w-full max-w-5xl z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;