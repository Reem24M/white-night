import React from 'react';
import { Star, Heart, MapPin, Users } from 'lucide-react';

const FavoriteCard = ({ venue }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm relative group animate-in fade-in duration-500">
      <div className="relative h-60 w-full rounded-3xl overflow-hidden mb-4">
        <img 
          src={venue.hallId?.Gallery?.[0]?.url || 'https://via.placeholder.com/400'} 
          alt={venue.hallId?.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <button className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-3 rounded-full text-red-500">
          <Heart size={18} fill="currentColor" />
        </button>
      </div>

      <div className="space-y-3 px-1">
        <h3 className="font-bold text-gray-800 text-lg">{venue.hallId?.name}</h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <Star size={16} fill="#D4AF37" className="text-[#D4AF37]" />
          <span className="font-bold text-gray-700">{venue.hallId?.averageRating || 0}</span>
        </div>
        <div className="flex items-center gap-2.5 text-gray-400 text-xs">
          <MapPin size={16} /> <span className="font-medium text-gray-600">{venue.hallId?.location || 'Cairo, Egypt'}</span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;