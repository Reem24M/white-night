import React from 'react';
import { MapPin, Star } from 'lucide-react';

const SearchResultCard = ({ venue }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#D4AF37] font-bold text-xs shadow-sm">
          {venue.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <MapPin size={16} className="text-[#D4AF37]" />
          <span className="font-light">{venue.location}</span>
        </div>

        <p className="text-gray-500 text-[13.5px] leading-relaxed mb-6 font-light line-clamp-2">
          {venue.description}
        </p>

        <div className="flex items-center gap-2 mb-8">
          <Star size={18} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="font-bold text-gray-800 text-sm">{venue.rating}</span>
          <span className="text-gray-400 text-xs font-light">({venue.reviews} reviews)</span>
        </div>

        <button className="w-full py-3.5 border border-[#D4AF37] text-[#D4AF37] rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-white transition-all duration-300 text-sm uppercase tracking-widest">
          View Details
        </button>
      </div>
    </div>
  );
};

export default SearchResultCard;