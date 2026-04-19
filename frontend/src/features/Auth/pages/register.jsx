import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('User');

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-[900px] mx-auto min-h-[600px] font-sans relative">
      
      {/* Left Section: Branding & Imagery */}
      <div className="md:w-1/2 relative hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Wedding Venue" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-10 text-white">
          <h2 className="text-3xl font-serif mb-2 tracking-wide uppercase leading-tight">THE HEART OF YOUR<br />CELEBRATION.</h2>
          <p className="text-[11px] font-light text-gray-300 opacity-90 leading-relaxed max-w-[85%]">
            Join thousands of happy couples and discover your Gleem venue.
          </p>
        </div>
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center relative">
        
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 p-6 pointer-events-none text-[#A88C5D] opacity-40 hidden sm:block">
           <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 2c-3.31 0-6 2.69-6 6 0 1.55.59 2.96 1.56 4.03C6.08 13.88 5 16.32 5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1 0-2.68-1.08-5.12-2.56-6.97C17.41 10.96 18 9.55 18 8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4 0 1.25-.58 2.36-1.47 3.09l-.49.4-.2.6c-.46 1.41-1.32 2.65-2.45 3.58l-.39.33H9l-.39-.33c-1.13-.93-1.99-2.17-2.45-3.58l-.2-.6-.49-.4C4.58 10.36 4 9.25 4 8c0-2.21 1.79-4 4-4z"/>
           </svg>
        </div>

        {/* Branding Logo */}
        <div className="mb-3 text-[#A88C5D] mt-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-serif mb-6 text-gray-900 tracking-wider uppercase">CREATE AN ACCOUNT</h3>

        {/* Account Type Selection */}
        <div className="flex w-full max-w-sm bg-[#F9F7F5] border border-gray-200 rounded-xl p-1 mb-6 shadow-inner">
          <button 
            type="button"
            onClick={() => setRole('Owner')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'Owner' ? 'bg-white shadow-sm text-gray-800 border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Owner
          </button>
          <button 
            type="button"
            onClick={() => setRole('User')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'User' ? 'bg-gradient-to-r from-[#BA9C6B] to-[#A0814C] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            User
          </button>
        </div>

        <form className="w-full max-w-sm space-y-4">
          {/* Service Type Selection - Only visible for Owners */}
          {role === 'Owner' && (
            <div className="animate-fadeIn">
              <label className="block text-[11px] font-semibold text-[#A88C5D] mb-1.5 ml-1 uppercase tracking-wider">Service Type</label>
              <select className="w-full bg-[#FDFBF9] border border-[#EADACC] px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 appearance-none cursor-pointer shadow-sm">
                <option value="" disabled selected>Select your business type</option>
                <option value="hall">Wedding Hall</option>
                <option value="organizer">Planning Company</option>
                <option value="photography">Photo Session</option>
                <option value="roof">Roof Venue</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Full Name</label>
            <input type="text" className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Email Address</label>
            <input type="email" className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A88C5D]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <input type="tel" className="w-full bg-[#F9F7F5] border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all" />
            </div>
            <div className="w-1/2">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all" />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-gradient-to-r from-[#BA9C6B] to-[#A0814C] text-white py-3.5 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(186,156,107,0.39)] hover:shadow-[0_6px_20px_rgba(186,156,107,0.23)] hover:opacity-90 transition-all text-sm tracking-wide uppercase mt-2">
              CREATE ACCOUNT
            </button>
          </div>
        </form>

        <p className="mt-5 text-[11px] text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-[#A88C5D] hover:underline transition-colors">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;