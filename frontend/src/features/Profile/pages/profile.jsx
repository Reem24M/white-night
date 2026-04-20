import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Star, 
  Edit2, 
  LogOut, 
  ChevronRight, 
  Trash2, 
  PlusCircle 
} from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    fullname: 'Ahmed Mansour',
    email: 'ahmed.mansour@email.com',
    phone: '+20 123 456 7890',
    preferredCity: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Profile Card */}
        <div className="bg-[#FAF9F6] rounded-[2.5rem] p-8 relative overflow-hidden border border-[#F3EFE0] shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 bg-[#E5E7EB] rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
              <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <button className="absolute bottom-1 right-1 bg-[#D4AF37] p-2 rounded-full text-white shadow-lg hover:bg-[#B8962D] transition-all">
              <Edit2 size={16} />
            </button>
          </div>

          {/* User Info & Stats */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">{user.fullname}</h1>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              <p className="text-gray-400 text-xs mt-1 font-medium italic">Joined Jan 2024</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-white px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 shadow-sm">
                <div className="bg-[#FDF5E6] p-1.5 rounded-full text-[#D4AF37]">
                  <Heart size={14} fill="currentColor" />
                </div>
                <span className="text-xs font-bold text-gray-700">12 Wedding Venues</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 shadow-sm">
                <div className="bg-[#FDF5E6] p-1.5 rounded-full text-[#D4AF37]">
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-xs font-bold text-gray-700">8 Wedding Reviews</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="bg-[#8B322C] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#6D2722] transition-all">
                Edit Wedding Profile
              </button>
              <button className="bg-[#D4AF37] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#B8962D] transition-all flex items-center gap-2">
                <PlusCircle size={18} /> Add a new wedding service
              </button>
            </div>
          </div>

          {/* Decorative Ring Icon (as seen in image) */}
          <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="14" r="8" />
                <path d="M12 6L14 3L12 1L10 3L12 6Z" />
            </svg>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Details Form */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-50 pb-4">Personal Details</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user.fullname}
                  className="w-full bg-[#F9F7F5] border border-gray-50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  className="w-full bg-[#F9F7F5] border border-gray-50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue={user.phone || '+20 123 456 7890'}
                  className="w-full bg-[#F9F7F5] border border-gray-50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Preferred City</label>
                <select className="w-full bg-[#F9F7F5] border border-gray-50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]/20 text-gray-800 appearance-none">
                  <option value="">Select City</option>
                  <option value="cairo">Cairo</option>
                  <option value="alex">Alexandria</option>
                  <option value="qena">Qena</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-6">
              <button className="text-[#8B322C] text-sm font-bold hover:underline w-fit">
                Change Password
              </button>
              
              <div className="border-t border-gray-50 pt-6">
                <button className="bg-[#E3362E] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-[#C22D26] transition-all flex items-center gap-2">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Navigation */}
          <div className="space-y-4">
            
            {/* My Favorites Card */}
            <button className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#D4AF37]/30 transition-all group">
              <div className="bg-[#FFF9E6] p-3 rounded-xl text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Heart size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-gray-800 text-sm">My Favorites</h3>
                <p className="text-[11px] text-gray-400 font-medium">12 Venues</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>

            {/* My Reviews Card */}
            <button className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#D4AF37]/30 transition-all group">
              <div className="bg-[#FFF9E6] p-3 rounded-xl text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Star size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-gray-800 text-sm">My Reviews</h3>
                <p className="text-[11px] text-gray-400 font-medium">8 Reviews</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>

            {/* Logout Card */}
            <button 
              onClick={handleLogout}
              className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:bg-red-50 transition-all group"
            >
              <div className="bg-red-50 p-3 rounded-xl text-red-500 group-hover:rotate-12 transition-transform">
                <LogOut size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-gray-800 text-sm">Logout</h3>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;