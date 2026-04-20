import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ArrowLeft, Calendar, X } from 'lucide-react';

import InfoTab from '../components/InfoTab';
import ServicesTab from '../components/ServicesTab';
import PhotosTab from '../components/PhotosTab';
import ReviewsTab from '../components/ReviewsTab';
import { toast } from 'sonner';

const HallDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: added setActiveTab
  const [activeTab, setActiveTab] = useState('Info');

  const [isFav, setIsFav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('Wedding');

  useEffect(() => {
    fetch(`http://localhost:7000/halls/${id}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const setfav = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add to favorites.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:7000/favorites/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) setIsFav(true);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmBooking = async () => {
    const token = localStorage.getItem("token");

    const bookingData = {
      hallId: id,
      eventDate: new Date().toISOString(),
      eventType: selectedType,
      guestsCount: 150,
      contactPhone: "01012345678",
      notes: "Booked via website"
    };

    setBookingLoading(true);

    try {
      const response = await fetch('http://localhost:7000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success("Booking successful!");
        setIsModalOpen(false);
      } else {
        toast.error(resData.message || "Booking failed");
      }
    } catch (error) {
      toast.error("Error connecting to server", { description: error.message });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[#D4AF37]">
        Loading...
      </div>
    );

  if (!data)
    return <div className="text-center py-20">Not Found</div>;

  const { hall } = data;

  return (
    <div className="min-h-screen bg-white pb-12 font-sans">

      {/* HERO */}
      <div className="relative h-[450px] w-full px-4 pt-4">
        <div className="relative h-full w-full rounded-[40px] overflow-hidden shadow-2xl">

          <img
            src={hall?.Gallery?.[0]?.url ||
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"}
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-8 bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={setfav}
            className={`absolute top-6 right-8 backdrop-blur-md p-3 rounded-full transition-all
              ${isFav ? "bg-red-500 text-white" : "bg-white/20 text-white"}`}
          >
            <Heart size={20} fill={isFav ? "red" : "none"} />
          </button>

          <div className="absolute bottom-12 left-12 right-12 text-white flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-serif font-bold mb-2">
                {hall?.name} Hall
              </h1>

              <div className="flex items-center gap-4">
                <span className="bg-[#10B981] px-4 py-1 rounded-full text-xs font-bold">
                  Open Now
                </span>

                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-white">
                    {hall?.averageRating || "0"} stars
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!localStorage.getItem("token"))
                  return alert("Please login first");
                setIsModalOpen(true);
              }}
              className="bg-[#D4AF37] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transform transition hover:scale-105"
            >
              <Calendar size={20} /> Book Now
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="container  mx-10 mt-8">

       
        <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto">
          {['Info', 'Services', 'Photos', 'Reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium relative transition ${
                activeTab === tab
                  ? 'text-[#D4AF37]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
              )}
            </button>
          ))}
        </div>

        <div className="">
          {activeTab === 'Info' && <InfoTab hall={hall} />}
          {activeTab === 'Services' && <ServicesTab services={hall?.hallType} />}
          {activeTab === 'Photos' && <PhotosTab gallery={hall?.Gallery} />}
          {activeTab === 'Reviews' && (
            <ReviewsTab hallId={hall?._id} hallName={hall?.name} />
          )}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-serif font-bold mb-6">
              Select Event Type
            </h2>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-gray-50 p-4 rounded-2xl mb-6"
            >
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Graduation Party">Graduation Party</option>
              <option value="Foto Session">Foto Session</option>
            </select>

            <button
              onClick={confirmBooking}
              disabled={bookingLoading}
              className="w-full bg-[#D4AF37] text-white py-4 rounded-2xl font-bold"
            >
              {bookingLoading ? "Processing..." : "Confirm Booking"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default HallDetails;