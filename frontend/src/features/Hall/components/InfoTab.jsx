import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { FaGem, FaRibbon } from 'react-icons/fa';

const InfoTab = ({ hall }) => (
  <div className="animate-fadeIn">
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-[#D4AF37]" />
        <h2 className="text-2xl font-bold text-gray-800">About {hall.name} Hall</h2>
      </div>
      <p className="text-gray-500 leading-relaxed text-sm mb-8">{hall.description}</p>
      
      <div className="flex flex-wrap gap-10">
        <Feature icon={<FaGem size={24}/>} label="Crystal chand" color="bg-[#FDF2F2]" iconColor="text-[#E5B6B6]" />
        <Feature icon={<Clock size={24}/>} label="Chandelier" color="bg-[#FFF9F0]" iconColor="text-[#F3D5B5]" />
        <Feature icon={<FaRibbon size={24}/>} label="Aisle runner" color="bg-[#F2F7FF]" iconColor="text-[#B6CCF5]" />
      </div>
    </section>
  </div>
);

const Feature = ({ icon, label, color, iconColor }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center ${iconColor}`}>
      {icon}
    </div>
    <span className="text-[10px] text-gray-500 font-medium">{label}</span>
  </div>
);

export default InfoTab;