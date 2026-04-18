import React from 'react';

const AboutTeam = () => {
  return (
    <section className="py-20 bg-[#FDF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 order-2 lg:order-1">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8 tracking-tight">
            About the Team
          </h2>
          
          <div className="space-y-6 text-[#666666] leading-relaxed text-lg">
            <p>
              Welcome to <span className="text-[#8C5E35] font-semibold">Zafafy</span>, your trusted partner in creating unforgettable celebrations across Egypt. Our journey began with a simple vision: to connect people with the most exquisite venues and services for their special moments.
            </p>
            
            <p>
              Based in the heart of Qena, our dedicated team brings together years of expertise in event planning, hospitality, and customer service. We understand that every celebration is unique, and we're committed to helping you find the perfect space that reflects your vision and exceeds your expectations.
            </p>
            
            <p>
              From grand wedding halls adorned with crystal chandeliers to intimate rooftop gardens with breathtaking city views, from professional photography studios to comprehensive event organization services—we've carefully curated a diverse selection of premium venues across Egypt.
            </p>
            
            <p>
              Our mission is simple: to make your journey to your special day as seamless and joyful as the celebration itself. We believe that every moment matters, and we're here to ensure yours is absolutely perfect.
            </p>
          </div>

          <p className="mt-10 italic text-[#8C5E35] text-xl font-medium tracking-wide">
            "Your timeless journey begins here with Zafafy."
          </p>
        </div>

        {/* Right Side: Circular Image with Glow Effect */}
        <div className="flex-1 order-1 lg:order-2 flex justify-center">
          <div className="relative group">
            {/* The Gold Glow/Border Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E6AD] blur-sm p-[6px] shadow-2xl">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
            
            {/* The Image Container */}
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[6px] border-white z-10 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="Zafafy Team" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Subtle decorative element (optional) */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutTeam;