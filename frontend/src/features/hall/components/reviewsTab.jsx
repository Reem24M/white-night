import React, { useState, useEffect } from 'react';
import { Star, User, Plus, X, MessageSquare, Calendar, Quote } from 'lucide-react';

const ReviewsTab = ({ hallId, hallName = "Hall" }) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    Content: '',
    rating: 5
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:7000/reviews/${hallId}`);
      const data = await res.json();
      return Array.isArray(data.reviews) ? data.reviews : [];
    } catch (err) {
        console.error(err);
      return [];
    }
  };

  useEffect(() => {
    if (!hallId) return;

    const loadReviews = async () => {
      const initialReviews = await fetchReviews();
      setReviews(initialReviews);
    };

    loadReviews();
  }, [hallId]);

  const handlePostReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:7000/reviews/${hallId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', Content: '', rating: 5 });
        const updatedReviews = await fetchReviews();
        setReviews(updatedReviews);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 flex items-center gap-3">
            Guest Experiences <MessageSquare className="text-[#D4AF37]" size={28} />
          </h2>
          <p className="text-gray-500 mt-1">Real stories from couples at {hallName}</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-[#D4AF37] hover:bg-[#bfa032] text-white px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-100 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          Write a Review
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-[32px] w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Share Your Moment</h3>
            <p className="text-gray-500 mb-8">How was your experience at {hallName}?</p>

            <form onSubmit={handlePostReview} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Review Title</label>
                <input
                  type="text"
                  placeholder="Summarize your experience"
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Details</label>
                <textarea
                  placeholder="Tell us about the service, food, and atmosphere..."
                  required
                  rows="4"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white outline-none transition-all"
                  value={formData.Content}
                  onChange={(e) => setFormData({ ...formData, Content: e.target.value })}
                />
              </div>

              <div className="flex flex-col items-center py-4 bg-amber-50/50 rounded-2xl">
                <span className="text-sm font-bold text-amber-800 mb-2 uppercase tracking-widest">Your Rating</span>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: n })}
                      className="transform hover:scale-125 transition-transform"
                    >
                      <Star
                        size={32}
                        className={formData.rating >= n ? "text-[#D4AF37]" : "text-gray-200"}
                        fill={formData.rating >= n ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#D4AF37] hover:bg-[#bfa032] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-amber-100 transition-all active:scale-95">
                Post Review
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <Quote className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-400 font-serif text-xl italic">No reviews yet. Be the first to share your story!</p>
          </div>
        ) : (
          reviews.map((review, i) => (
            <div key={i} className="group p-8 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37]">
                      <User size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">{review.userName || "Guest"}</h4>
                      <div className="flex text-[#D4AF37] mt-1 gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            fill={idx < review.rating ? "currentColor" : "none"}
                            className={idx < review.rating ? "text-[#D4AF37]" : "text-gray-200"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                    <Calendar size={14} />
                    <span>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>

                <h5 className="font-bold text-gray-800 mb-3 text-lg leading-snug">
                  {review.title || "Wonderful Experience"}
                </h5>
                <p className="text-gray-500 text-sm leading-relaxed italic">
                  "{review.Content || review.content}"
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-tighter font-bold text-gray-300">Verified Booking</span>
                <Quote className="text-gray-50 group-hover:text-amber-50 transition-colors" size={32} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;