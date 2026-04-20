import React from 'react';

const PhotosTab = ({ hallName = "Akel Hall", gallery = [] }) => {
  
  const defaultPhotos = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
    "https://images.unsplash.com/photo-1505232458567-cc9660600ce5?q=80&w=1000",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000"
  ];

  const photosToDisplay = gallery.length > 0 ? gallery : defaultPhotos;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">
        {hallName} Photos
      </h2>

      {/* Grid Container */}
      <div className="space-y-4">
        {/* الصورة الرئيسية الكبيرة */}
        <div className="w-full h-[400px] rounded-[30px] overflow-hidden shadow-sm">
          <img 
            src={photosToDisplay[0]} 
            alt="Main Venue" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* شبكة الصور الصغيرة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photosToDisplay.slice(1, 5).map((img, index) => (
            <div key={index} className="h-48 rounded-[25px] overflow-hidden shadow-sm">
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosTab;