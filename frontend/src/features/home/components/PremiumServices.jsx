import React from 'react';
import { Camera, Music, Utensils, Flower2, Palette, Cake } from 'lucide-react';
import ServiceCard from './ServiceCard';

const PremiumServices = () => {
  const services = [
    {
      id: 1,
      icon: Camera,
      title: "Photography",
      description: "Award-winning photographers capturing every precious moment with artistic excellence"
    },
    {
      id: 2,
      icon: Music,
      title: "Entertainment",
      description: "World-class musicians, DJs, and performers to elevate your celebration"
    },
    {
      id: 3,
      icon: Utensils,
      title: "Catering",
      description: "Michelin-starred chefs creating bespoke culinary experiences"
    },
    {
      id: 4,
      icon: Flower2,
      title: "Floral Design",
      description: "Exquisite botanical arrangements that transform spaces into wonderlands"
    },
    {
      id: 5,
      icon: Palette,
      title: "Event Planning",
      description: "Expert coordinators orchestrating flawless celebrations from start to finish"
    },
    {
      id: 6,
      icon: Cake,
      title: "Pastry Arts",
      description: "Custom confections crafted as edible masterpieces for your special day"
    }
  ];

  return (
    <section className="py-24 bg-[#FBFBFB]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Premium <span className="text-[#D4AF37] font-medium">Services</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Curated services from the finest professionals in the industry
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PremiumServices;