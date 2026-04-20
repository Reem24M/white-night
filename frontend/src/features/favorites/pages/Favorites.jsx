import React, { useState, useEffect, useMemo } from "react";
import FavoritesFilters from "../components/FavoritesFilters";
import FavoriteCard from "../components/FavoriteCard";
import { Heart, PlusCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Saved");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:7000/favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFavorites(data.favorites || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const filteredFavorites = useMemo(() => {
    if (activeTab === "All Saved") return favorites;
    
    return favorites.filter((item) => {
      const type = item.hall?.hallType?.[0];
      
      if (activeTab === "Halls") return type === "Hall";
      if (activeTab === "Organization") return type === "Organization_halls";
      if (activeTab === "Roof") return type === "Roof";
      if (activeTab === "Photoshoot") return type === "Photoshoot"; // لو موجودة في الداتا مستقبلاً
      
      return true;
    });
  }, [favorites, activeTab]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[#D4AF37] font-bold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-12 px-6 lg:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-10 flex flex-col gap-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors group w-fit"
          >
            <div className="bg-white shadow-sm border border-gray-100 p-2.5 rounded-full group-hover:shadow-md transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Back</span>
          </button>

          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900">My Favorites</h1>
            {filteredFavorites.length > 0 && (
              <span className="inline-block mt-2 bg-[#D4AF37] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-md">
                {filteredFavorites.length} Items Found
              </span>
            )}
          </div>
        </div>

        <FavoritesFilters activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
          <div className="xl:col-span-3">
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
                {filteredFavorites.map((item) => (
                  <FavoriteCard key={item._id} venue={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm text-center px-6">
                <div className="bg-[#FFF9E6] p-8 rounded-full mb-6">
                  <Heart size={64} className="text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                  No {activeTab !== "All Saved" ? activeTab : ""} favorites found
                </h2>
                <p className="text-gray-400 max-w-md mb-8">
                  Try switching filters or explore more venues to add them here.
                </p>
                <Link to="/search" className="bg-[#D4AF37] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#B8962D] transition-all shadow-xl">
                  <PlusCircle size={20} /> Explore Venues
                </Link>
              </div>
            )}
          </div>

          <div className="hidden xl:block xl:col-span-1">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-10 text-center">
              <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">Quick Tip</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                You can organize your saved venues by category to compare them more easily.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FavoritesPage;