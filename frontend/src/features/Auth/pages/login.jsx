import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-[900px] mx-auto min-h-[550px] font-sans">
      
      {/* Left Section: Visual & Branding */}
      <div className="md:w-1/2 relative hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Luxury Wedding Hall" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-10 text-white">
          <h2 className="text-3xl font-serif mb-2 tracking-wide">LIVE THE MAGIC</h2>
          <p className="text-xs font-light text-gray-300 opacity-90 leading-relaxed max-w-[90%]">
            The perfect destination for your special events, where present meets future in harmony.
          </p>
        </div>
      </div>

      {/* Right Section: Authentication Form */}
      <div className="w-full md:w-1/2 p-8 lg:p-14 flex flex-col justify-center items-center">
        
        {/* Branding Logo */}
        <div className="mb-4 text-[#A88C5D]">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-serif mb-8 text-gray-900 tracking-wider uppercase">WELCOME BACK</h3>

        <form className="w-full max-w-sm space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <input 
                type="email" 
                placeholder="example@gmail.com" 
                className="w-full bg-[#F9F7F5] border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all" 
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5 px-1 text-[11px]">
              <label className="font-semibold text-gray-600">Password</label>
              <Link to="/forgot-password" size="sm" className="text-gray-400 hover:text-[#A88C5D] transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#F9F7F5] border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 transition-all" 
              />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-gradient-to-r from-[#BA9C6B] to-[#A0814C] text-white py-3.5 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(186,156,107,0.39)] hover:shadow-[0_6px_20px_rgba(186,156,107,0.23)] hover:opacity-90 transition-all text-sm tracking-wide uppercase">
              LOGIN
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-5 text-center">
          <p className="text-[10px] text-gray-500 font-medium mb-3">
            Remember me for 30 days
          </p>
          <p className="text-[11px] text-gray-500">
            Don't have an account? <Link to="/register" className="text-gray-800 font-semibold hover:text-[#A88C5D] transition-colors">Create one</Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;