import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#FDF9F6] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Send us a Message Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your full name"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8C5E35] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8C5E35] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="5"
                  placeholder="Tell us about your event or inquiry..."
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8C5E35] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#8C5E35] text-white font-semibold rounded-xl hover:bg-[#7D532E] transition-colors shadow-lg active:scale-[0.99]"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col space-y-10">
            <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
            
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F3ECE5] rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-[#8C5E35]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Email Address</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    info@zafafy.com<br />support@zafafy.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F3ECE5] rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-[#8C5E35]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Phone Number</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    +20 123 456 7890<br />+20 109 876 5432
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F3ECE5] rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-[#8C5E35]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Office Location</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    123 Celebration Street<br />
                    Al-Madina District<br />
                    Qena, Egypt 83511
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-auto bg-[#F9F9F9] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-gray-400" />
                <h4 className="font-bold text-gray-800">Business Hours</h4>
              </div>
              <p className="text-sm text-gray-500 leading-loose">
                Saturday - Thursday: 9:00 AM - 8:00 PM<br />
                Friday: 2:00 PM - 8:00 PM
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;