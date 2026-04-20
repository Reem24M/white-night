import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart, ArrowLeft, Calendar, X } from "lucide-react";
import { toast } from "sonner";

import InfoTab from "../components/InfoTab";
import ServicesTab from "../components/ServicesTab";
import PhotosTab from "../components/PhotosTab";
import ReviewsTab from "../components/ReviewsTab";

const HallDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Info");
  const [isFav, setIsFav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("Wedding");

  // =========================
  // FETCH HALL + CHECK FAVORITE (RE-OPTIMIZED)
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const [hallRes, favRes] = await Promise.all([
          fetch(`http://localhost:7000/halls/${id}`),
          token 
            ? fetch(`http://localhost:7000/favorites/check/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            : Promise.resolve(null)
        ]);

        const hallJson = await hallRes.json();
        setData(hallJson);

        if (favRes && favRes.ok) {
          const favData = await favRes.json();
          setIsFav(favData.isFavorite === true);
        }
      } catch (err) {
        console.error("Error fetching Hall data:", err);
        toast.error("Failed to load hall details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // =========================
  // TOGGLE FAVORITE
  // =========================
  const toggleFav = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in first to save favorites");
      return;
    }

    // المتغير الجديد بناءً على الحالة الحالية قبل الطلب (Optimistic UI)
    const nextFavStatus = !isFav;

    try {
      const res = await fetch(`http://localhost:7000/favorites/${id}`, {
        method: isFav ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setIsFav(nextFavStatus);
        toast.success(nextFavStatus ? "Added to favorites" : "Removed from favorites");
      } else {
        toast.error("Failed to update favorites");
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      toast.error("Connection error");
    }
  };

  // =========================
  // CONFIRM BOOKING
  // =========================
  const confirmBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Session expired, please login again");

    setBookingLoading(true);
    try {
      const response = await fetch("http://localhost:7000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hallId: id,
          eventDate: new Date().toISOString(),
          eventType: selectedType,
          guestsCount: 150,
          contactPhone: "01012345678",
          notes: "Booked via Zafafy Platform",
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success("Booking request sent successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(resData.message || "Booking failed");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[#D4AF37] font-bold text-xl">
        <div className="animate-pulse">Loading Hall Details...</div>
      </div>
    );

  if (!data || !data.hall) return <div className="text-center py-20 font-serif text-2xl text-gray-400">Hall Not Found</div>;

  const { hall } = data;

  return (
    <div className="min-h-screen bg-white pb-12 font-sans relative">
      
      {/* HERO SECTION */}
      <div className="relative h-[480px] w-full px-4 pt-4">
        <div className="relative h-full w-full rounded-[40px] overflow-hidden shadow-2xl">
          <img
            src={hall?.Gallery?.[0]?.url || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            alt={hall?.name}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-all border border-white/10"
          >
            <ArrowLeft size={22} />
          </button>

          {/* FAVORITE BUTTON (HEART) */}
          <button
            onClick={toggleFav}
            className={`absolute top-8 right-8 backdrop-blur-md p-3 rounded-full transition-all duration-300 shadow-xl border border-white/10
              ${isFav ? "bg-white text-red-500 scale-110 shadow-red-500/20" : "bg-white/20 text-white hover:bg-white/40"}`}
          >
            <Heart
              size={22}
              fill={isFav ? "#ef4444" : "none"}
              stroke={isFav ? "#ef4444" : "currentColor"}
              className="transition-colors"
            />
          </button>

          {/* HEADER INFO */}
          <div className="absolute bottom-12 left-12 right-12 text-white flex flex-wrap justify-between items-end gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-serif font-bold leading-tight">{hall?.name}</h1>
              <div className="flex items-center gap-4">
                <span className="bg-[#10B981] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Available</span>
                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold text-white text-lg">{hall?.averageRating || "0.0"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!localStorage.getItem("token")) return toast.error("Please login first");
                setIsModalOpen(true);
              }}
              className="bg-[#D4AF37] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-2xl hover:bg-[#B8962D] transition-all hover:-translate-y-1 active:translate-y-0"
            >
              <Calendar size={22} /> Book Now
            </button>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="max-w-[1400px] mx-auto px-10 mt-10">
        <div className="flex gap-10 border-b border-gray-100 mb-10 overflow-x-auto no-scrollbar">
          {["Info", "Services", "Photos", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-5 text-sm font-bold relative transition-all tracking-wide uppercase ${
                activeTab === tab ? "text-[#D4AF37]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D4AF37] rounded-full animate-in fade-in zoom-in duration-300" />
              )}
            </button>
          ))}
        </div>

        <div className="animate-in slide-in-from-bottom-4 duration-500">
          {activeTab === "Info" && <InfoTab hall={hall} />}
          {activeTab === "Services" && <ServicesTab services={hall?.hallType} />}
          {activeTab === "Photos" && <PhotosTab gallery={hall?.Gallery} />}
          {activeTab === "Reviews" && <ReviewsTab hallId={hall?._id} hallName={hall?.name} />}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-serif font-bold mb-2 text-gray-900">Reserve Venue</h2>
            <p className="text-gray-400 text-sm mb-8">Choose the type of event you're planning.</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Event Category</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none cursor-pointer"
                >
                  <option value="Wedding">Wedding Ceremony</option>
                  <option value="Engagement">Engagement Party</option>
                  <option value="Graduation Party">Graduation Party</option>
                  <option value="Foto Session">Professional Photo Session</option>
                </select>
              </div>

              <button
                onClick={confirmBooking}
                disabled={bookingLoading}
                className="w-full bg-[#D4AF37] text-white py-5 rounded-2xl font-bold hover:bg-[#B8962D] transition-all shadow-xl shadow-[#D4AF37]/20 disabled:bg-gray-200"
              >
                {bookingLoading ? "Processing Your Request..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallDetails;