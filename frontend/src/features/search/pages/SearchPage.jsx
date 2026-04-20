import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import VenueCard from "../../../shared/components/VenueCard";
import VenueSearch from "../../hall/components/VenueSearch";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const keyword = searchParams.get("keyword") || "";
  const price = searchParams.get("price") || "";
  const capacity = searchParams.get("capacity") || "";
  const type = searchParams.get("type") || "";

  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:7000/halls");
        const data = await res.json();

        setHalls(data.halls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

 
  const filteredHalls = useMemo(() => {
    return halls.filter((hall) => {
      const cleanKeyword = keyword.trim().toLowerCase();

      
      const matchSearch =
        !cleanKeyword ||
        `${hall.name} ${hall.description} ${hall.address?.city}`
          .toLowerCase()
          .includes(cleanKeyword);

  
      const matchPrice =
        !price || hall.priceRange === price;

     
      const matchCapacity =
        !capacity || hall.capacity >= Number(capacity);

      
      const matchType =
        !type || hall.hallType?.includes(type);

      return matchSearch && matchPrice && matchCapacity && matchType;
    });
  }, [halls, keyword, price, capacity, type]);

  
  const updateFilter = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
  <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20">

      
      <VenueSearch/>

      
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 my-8 sm:my-10 justify-center items-center">

        {/* Price */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <label className="text-sm text-gray-500">Price</label>
          <select
            value={price}
            onChange={(e) => updateFilter({ price: e.target.value })}
            className="w-full sm:w-auto cursor-pointer px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">All Prices</option>
            <option value="low">Low ($)</option>
            <option value="medium">Medium ($$)</option>
            <option value="high">High ($$$)</option>
          </select>
        </div>

        {/* Capacity */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <label className="text-sm text-gray-500">Capacity</label>
          <select
            value={capacity}
            onChange={(e) => updateFilter({ capacity: e.target.value })}
            className="w-full sm:w-auto cursor-pointer px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">Any Capacity</option>
            <option value="100">100+ Guests</option>
            <option value="200">200+ Guests</option>
            <option value="300">300+ Guests</option>
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <label className="text-sm text-gray-500">Type</label>
          <select
            value={type}
            onChange={(e) => updateFilter({ type: e.target.value })}
            className="w-full sm:w-auto cursor-pointer px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">All Types</option>
            <option value="Hall">Hall</option>
            <option value="Roof">Roof</option>
            <option value="Photosation">Photosation</option>
          </select>
        </div>

      </div>

     
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Search Results
        </h2>

        {keyword && (
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Results for: "{keyword}"
          </p>
        )}

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {filteredHalls.length} halls found
        </p>
      </div>

    
      {loading ? (
        <div className="text-center mt-16 sm:mt-20">Loading...</div>
      ) : filteredHalls.length > 0 ? (

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHalls.map((hall) => (
            <VenueCard
              key={hall._id}
              id={hall._id}
              name={hall.name}
              image={hall.coverPhoto?.url}
              location={`${hall.address?.city}, ${hall.address?.governorate}`}
              price={hall.priceRange}
              rating={hall.averageRating}
              capacity={hall.capacity}
            />
          ))}
        </div>

      ) : (
        <div className="text-center mt-16 sm:mt-20 text-gray-400">
          No results found
        </div>
      )}

    </div>
  </div>
);
};

export default SearchPage;