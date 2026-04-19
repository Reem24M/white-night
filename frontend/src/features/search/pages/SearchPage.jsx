import React, { useState } from 'react';
import SearchCategories from '../components/SearchCategories';
import SearchResultCard from '../components/SearchResultCard';

const SearchPage = () => {
  const [activeCategory, setActiveCategory] = useState('Halls');

  // بيانات تحاكـي الصورة تماماً
  const venues = [
    {
      id: 1,
      name: "The Grand Ballroom",
      location: "Manhattan, New York",
      description: "Luxurious ballroom featuring crystal chandeliers, marble floors, and floor-to-ceiling windows.",
      rating: 4.9,
      reviews: 234,
      price: "$$$",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Opulent Palace",
      location: "Beverly Hills, California",
      description: "Historic venue with ornate architecture, grand staircases, and elegant period details.",
      rating: 4.8,
      reviews: 189,
      price: "$$$$",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Crystal Pavilion",
      location: "Chicago, Illinois",
      description: "Contemporary glass-enclosed space with stunning natural light and panoramic views.",
      rating: 4.9,
      reviews: 312,
      price: "$$$",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        
        {/* المكون العلوي */}
        <SearchCategories 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* عنوان النتائج */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Search Results</h2>
          <p className="text-gray-400 mt-2 font-light">9 venues available</p>
        </div>

        {/* شبكة النتائج */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {venues.map((venue) => (
            <SearchResultCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;