import React from 'react';
import { CheckCircle } from 'lucide-react';

const ServicesTab = ({ hallName = "Akel Hall" }) => {
  const packages = [
    {
      title: "Akel Essential Wedding Package",
      features: [
        "Akel Hall Access (100 guests)",
        "Basic Photography Session",
        "Video Recording",
        "Elegant Gateau (Akel Gateau) for 100 Guests",
        "Soft Drinks & Water"
      ]
    },
    {
      title: "Akel Premium Celebration Package",
      features: [
        "Full Hall and Reception Area Access (150 guests)",
        "Extended Photo Session (Indoor/Garden)",
        "Professional Video Production with Drone",
        "Open Buffet Dinner (150 guests)",
        "Dessert Variety Platter",
        "DJ Services"
      ]
    },
    {
      title: "Akel Royal Heritage Package",
      features: [
        "Exclusive Main Hall & Bridal Suite Access",
        "Multi-Camera Photography & Video Team",
        "Global Gourmet Buffet Dinner (200 guests)",
        "Multi-Tier Wedding Cake",
        "Royal Zaffa Procession",
        "Luxury Wedding Car"
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">
        {hallName} Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div 
            key={index} 
            className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm flex flex-col"
          >
            {/* Header of the Card */}
            <div className="bg-[#F9F6F0] p-5 border-b border-amber-50">
              <h3 className="text-lg font-bold text-gray-800 text-center">
                {pkg.title}
              </h3>
            </div>

            {/* Features List */}
            <div className="p-6 flex-grow">
              <ul className="space-y-4">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <CheckCircle className="text-[#D4AF37] mt-1 shrink-0" size={18} />
                    <span className="text-sm text-gray-500 leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div className="p-6 pt-0">
              <button className="w-full bg-[#D4AF37] hover:bg-[#bfa032] text-white py-3 rounded-xl font-bold transition-colors text-sm shadow-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;