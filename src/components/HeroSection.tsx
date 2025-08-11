import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Link } from '../utils/Link';
import { animateHero } from '../utils/animations';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) {
      animateHero();
    }
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-50"></div>
        <div className="parallax absolute top-1/2 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-40"></div>
        <div className="parallax absolute bottom-20 right-1/3 w-64 h-64 bg-accent-100 rounded-full opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="hero-title font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
              Authentic <span className="text-primary-600">Indian Sweets</span> Delivered to Your Door
            </h1>
            <p className="hero-subtitle text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
              Experience the rich flavors and traditions of India with our premium handcrafted sweets made from authentic recipes and finest ingredients.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/shop" className="btn btn-primary flex items-center justify-center gap-2">
                Explore Now
                <ChevronRight size={20} />
              </Link>
              <Link to="#featured" className="btn btn-outline">
                View Specials
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 pl-0 md:pl-10">
            <div className="hero-image relative">
              <img 
                src="/assets/Hero_Sweets_2.png" 
                alt="Collection of Indian Sweets" 
                className="rounded-lg shadow-xl animate-float w-full max-w-lg mx-auto"
              />
              {/* <img 
                src="https://images.pexels.com/photos/6416557/pexels-photo-6416557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Collection of Indian Sweets" 
                className="rounded-lg shadow-xl animate-float w-full max-w-lg mx-auto"
              /> */}
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-primary-500 font-bold text-2xl">15% OFF</div>
                <div className="text-sm text-gray-600">First Order</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <Link to="#featured" className="text-gray-600 hover:text-primary-500 transition-colors animate-pulse-slow">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium mb-2">Scroll Down</span>
              <ChevronRight size={24} className="transform rotate-90" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;