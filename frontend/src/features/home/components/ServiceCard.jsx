import React from 'react';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Icon Container */}
      <div className="w-16 h-16 bg-[#FDF7F2] rounded-full flex items-center justify-center mb-6">
        <Icon size={28} className="text-[#D4AF37]" />
      </div>
      
      {/* Text Content */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed leading-6">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;