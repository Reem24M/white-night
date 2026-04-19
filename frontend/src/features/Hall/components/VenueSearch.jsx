import React, { useState } from 'react'
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VenueSearch() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (!keyword.trim()) return;

    
    if (location.pathname === "/search") {
      navigate(`?keyword=${keyword}`);
    } else {
      
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm focus-within:shadow-md transition overflow-hidden">

        <div className="pl-5 text-gray-400">
          <Search size={20} />
        </div>

        <input
          type="text"
          placeholder="Search venues, services, or locations..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
        />

        <button
          onClick={handleSearch}
          className="bg-[#D4AF37] hover:bg-[#c09e2d] text-white font-medium px-5 md:px-8 py-4 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}