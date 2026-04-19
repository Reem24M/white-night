import React from 'react';
import { Home, Star, Camera, Calendar } from 'lucide-react';

const SearchCategories = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'Halls', label: 'Halls', icon: <Home size={22} /> },
    { id: 'Roofs', label: 'Roofs', icon: <Star size={22} /> },
    { id: 'Photos', label: 'Photo Sessions', icon: <Camera size={22} /> },
    { id: 'Event', label: 'Event Org', icon: <Calendar size={22} /> },
  ];

  return (
    <div className="flex justify-center gap-10 md:gap-20 py-10 border-b border-gray-100 mb-10">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className="flex flex-col items-center gap-3 group"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
            ${activeCategory === cat.id ? 'bg-[#D4AF37] text-white' : 'bg-[#FDF9F6] text-[#D4AF37] group-hover:bg-[#F3ECE5]'}`}>
            {cat.icon}
          </div>
          <span className={`text-[13px] font-medium tracking-wide ${activeCategory === cat.id ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SearchCategories;