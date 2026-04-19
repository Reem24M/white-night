'use client';

import React from 'react';
import { ArrowLeft, MapPinOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Event404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f0] via-[#f5efe6] to-[#efe7da] flex items-center justify-center p-6">
      
      <div className="max-w-[420px] w-full text-center">

        {/* 🔝 Top Visual (NEW CLEAN DESIGN) */}
        <div className="mb-14 flex justify-center">
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            
            {/* Glow */}
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full"></div>

            {/* Icon Container */}
            <div className="relative z-10 w-full h-full rounded-3xl bg-white border border-[#e7d8c7] shadow-xl flex items-center justify-center">
              
              <MapPinOff 
                size={48} 
                className="text-[#D4AF37] opacity-90 animate-pulse"
              />

            </div>
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-[90px] font-bold text-[#D4AF37] tracking-[-3px] leading-none mb-3 drop-shadow-sm">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          This Venue Doesn’t Exist
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-[16px] leading-relaxed mb-12">
          The place you're looking for might have been removed,<br />
          renamed, or never existed in the first place.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="group relative mx-auto flex items-center justify-center gap-2 w-fit px-10 py-4 rounded-full border border-[#D4AF37] text-[#D4AF37] font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          {/* Background animation */}
          <span className="absolute inset-0 bg-[#D4AF37] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

          <ArrowLeft className="relative z-10 group-hover:text-white transition" size={18} />

          <span className="relative z-10 group-hover:text-white transition">
            Back to Home
          </span>
        </Link>

        {/* Support */}
        <p className="mt-12 text-sm text-gray-500">
          Need help?{' '}
          <span className="text-[#8d6e4f] hover:underline cursor-pointer font-medium">
            Contact support
          </span>
        </p>

      </div>
    </div>
  );
}