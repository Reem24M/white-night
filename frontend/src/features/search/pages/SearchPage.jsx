// import React, { useMemo } from 'react';
// import { useSearchParams } from "react-router-dom";

// import SearchCategories from '../components/SearchCategories';
// import VenueCard from '../../../shared/components/VenueCard';
// import VenueSearch from '../../hall/components/VenueSearch';

// const SearchPage = () => {
//   const [searchParams] = useSearchParams();

//   // 📌 نجيب الكلمة من الـ URL
//   const keyword = searchParams.get("keyword") || "";

//   const [activeCategory, setActiveCategory] = React.useState('Halls');

 


//   // 📌 فلترة ذكية (name + location + description)
//   const filteredVenues = useMemo(() => {
//     return venues.filter((venue) =>
//       [venue.name, venue.location, venue.description]
//         .join(" ")
//         .toLowerCase()
//         .includes(keyword.toLowerCase())
//     );
//   }, [keyword, venues]);

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

//         {/* 🔍 Search Bar */}
//         <VenueSearch />

//         {/* 🏷 Categories */}
//         <SearchCategories 
//           activeCategory={activeCategory} 
//           onCategoryChange={setActiveCategory} 
//         />

//         {/* 📊 Results Info */}
//         <div className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Search Results
//           </h2>

//           {keyword && (
//             <p className="text-gray-500 mt-1 text-sm">
//               Showing results for: <span className="font-medium">"{keyword}"</span>
//             </p>
//           )}

//           <p className="text-gray-400 mt-2 font-light">
//             {filteredVenues.length} venues available
//           </p>
//         </div>

//         {/* 🧾 Results */}
//         {filteredVenues.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredVenues.map((venue) => (
//               <VenueCard key={venue.id} venue={venue} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-400 mt-20">
//             No results found 😢
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default SearchPage;