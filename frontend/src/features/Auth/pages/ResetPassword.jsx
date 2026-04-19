import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-73px)] w-full font-sans">
      
      {/* Background Section with Overlay */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
           alt="Venue Background" 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Reset Password Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl p-10 max-w-[450px] w-[92%] flex flex-col items-center relative z-10">
        
        {/* Header Icon */}
        <div className="mb-4 text-[#A88C5D] bg-[#F9F7F5] p-3 rounded-full shadow-inner">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        
        <h3 className="text-2xl font-serif mb-2 text-gray-900 tracking-wider text-center uppercase">
          RESET PASSWORD
        </h3>
        
        <p className="text-[11px] text-gray-500 text-center mb-8 max-w-[260px] leading-relaxed font-medium">
          Enter the OTP sent to your email and your new password to regain access
        </p>

        <form className="w-full space-y-5">
          {/* OTP Code Input */}
          <div className="text-left">
             <div className="flex justify-between items-center mb-1.5 px-1 text-[11px] font-semibold">
               <label className="text-gray-600">OTP Code</label>
               <span className="text-[#A88C5D]">Sent to Email</span>
             </div>
             <input 
               type="text" 
               placeholder="Enter 6-digit code" 
               className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all text-center tracking-[0.2em] font-bold" 
               maxLength="6"
             />
          </div>

          {/* New Password Input */}
          <div className="text-left">
             <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">New Password</label>
             <input 
               type="password" 
               placeholder="Enter new password" 
               className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all" 
             />
          </div>

          {/* Confirm Password Input */}
          <div className="text-left">
             <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Confirm Password</label>
             <input 
               type="password" 
               placeholder="Confirm your password" 
               className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all" 
             />
          </div>

          <div className="pt-3">
             <button type="submit" className="w-full bg-gradient-to-r from-[#BA9C6B] to-[#A0814C] text-white py-3.5 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(186,156,107,0.39)] hover:shadow-[0_6px_20px_rgba(186,156,107,0.23)] hover:opacity-90 transition-all text-sm tracking-wide uppercase">
               UPDATE PASSWORD
             </button>
          </div>
        </form>

        <div className="mt-6 text-[11px] font-medium text-gray-400">
          <Link to="/login" className="hover:text-[#A88C5D] transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default ResetPassword;
