import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-[850px] mx-auto min-h-[480px] font-sans">
      
      {/* Visual Section: Side-by-side images with overlay text */}
      <div className="md:w-1/2 relative hidden md:block p-2.5 bg-white">
        <div className="flex flex-row gap-1.5 h-full rounded-[1.5rem] overflow-hidden relative">
          
          <div className="w-1/2 h-full relative">
             <img 
               src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
               alt="Joyful wedding celebration" 
               className="w-full h-full object-cover" 
             />
          </div>
          
          <div className="w-1/2 h-full relative">
             <img 
               src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
               alt="Wedding details" 
               className="w-full h-full object-cover" 
             />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-8 text-white z-10 pointer-events-none">
            <h2 className="text-2xl font-serif tracking-widest mb-1 uppercase">White Night</h2>
            <p className="text-[10px] font-sans font-light text-gray-300 opacity-90 max-w-[90%] leading-relaxed">
              We will send a secure link to restore your access to life's unforgettable moments.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center text-center relative">
        
        {/* Logo Icon */}
        <div className="mb-4 text-[#A88C5D]">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-serif mb-3 text-gray-900 tracking-wider uppercase">FORGOT PASSWORD?</h3>
        
        <p className="text-[11px] text-gray-500 mb-8 max-w-[230px] leading-relaxed font-medium">
          Enter your email address to receive a password reset link.
        </p>

        <form className="w-full max-w-[260px] space-y-5">
          <div className="text-left">
             <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Email Address</label>
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700 placeholder-gray-400 transition-all" 
             />
          </div>

          <div className="pt-2">
             <button type="submit" className="w-full bg-gradient-to-r from-[#BA9C6B] to-[#A0814C] text-white py-3.5 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(186,156,107,0.39)] hover:shadow-[0_6px_20px_rgba(186,156,107,0.23)] hover:opacity-90 transition-all text-sm tracking-wide uppercase">
                SEND RESET LINK
             </button>
          </div>
        </form>

        <Link to="/login" className="mt-8 text-[11px] font-medium text-gray-500 hover:text-[#A88C5D] transition-colors flex items-center gap-1">
          <span>←</span> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;