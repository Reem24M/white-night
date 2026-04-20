import React from 'react';

const FavoritesFilters = ({ activeTab, setActiveTab }) => {
  const tabs = ['All Saved', 'Halls', 'Photoshoot', 'Organization', 'Roof'];
  
  return (
    <div className="flex flex-wrap gap-3 border-b border-gray-100 pb-8 mb-10 overflow-x-auto whitespace-nowrap">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-7 py-3 rounded-full text-sm font-bold shadow-sm transition-all
            ${activeTab === tab 
              ? 'bg-[#D4AF37] text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-500 border border-gray-100 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FavoritesFilters;