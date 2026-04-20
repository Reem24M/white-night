import React from 'react';
import { MapPin, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
const VenueCard = ({
  id,
  name,
  image,
  location,
  price,
  rating,
  capacity
}) => {
  
  const getPriceSymbol = (price) => {
    if (price === 'low') return '$';
    if (price === 'medium') return '$$';
    if (price === 'high') return '$$$';
    return '$$';
  };
 if (!name) return null;
  return (
    <div className="max-w-[350px] bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
      
      {/* Image */}
      <div className="relative h-64 w-full">
        <img 
          src={image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[#D4AF37] font-semibold text-sm">
            {getPriceSymbol(price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">

        {/* Title + Rating */}
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {name}
          </h3>

          <div className="flex items-center space-x-1">
            <Star size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-gray-600 font-medium text-sm">
              {rating || 0}
            </span>
          </div>
        </div>

        {/* Location + Capacity */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 space-x-2">
            <MapPin size={18} className="text-gray-400" />
            <span className="text-sm">
              {location}
            </span>
          </div>

          <div className="flex items-center text-gray-500 space-x-2">
            <Users size={18} className="text-gray-400" />
            <span className="text-sm">
              Up to {capacity} guests
            </span>
          </div>
        </div>

        {/* Button */}
      <Link
  to={`/hall/${id}`}
  className="group relative flex items-center justify-center gap-2 w-full mt-3 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] font-medium overflow-hidden transition-all duration-300"
>
  {/* Background hover effect */}
  <span className="absolute inset-0 bg-[#D4AF37] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

  {/* Text */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    View Details
  </span>

  {/* Icon */}
  <ArrowRight 
    size={18} 
    className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
  />
</Link>
      </div>
    </div>
  );
};

export default VenueCard;