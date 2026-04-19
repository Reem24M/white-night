import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-white px-6">

      <div className="max-w-4xl w-full text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-normal text-gray-900 leading-tight">
          Celebrate Life's Most <br />
          <span className="text-[#D4AF37] font-bold">Beautiful Moments</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-600 text-base md:text-xl max-w-2xl mx-auto">
          Discover extraordinary venues and premier services for your unforgettable celebration
        </p>

        {/* Search Bar */}
        <div className="mt-10 w-full max-w-2xl mx-auto">
          <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm focus-within:shadow-md transition overflow-hidden">

            {/* Icon */}
            <div className="pl-5 text-gray-400">
              <Search size={20} />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search venues, services, or locations..."
              className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
            />

            {/* Button */}
            <Link to='/search' className="bg-[#D4AF37] hover:bg-[#c09e2d] text-white font-medium px-5 md:px-8 py-4 transition">
              Search
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-14 flex justify-center gap-3 opacity-40">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;