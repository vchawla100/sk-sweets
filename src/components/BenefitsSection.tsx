import React, { useEffect, useRef } from 'react';
import { TruckIcon, ThumbsUp, Award, Clock } from 'lucide-react';
import { gsap } from 'gsap';

const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const items = sectionRef.current.querySelectorAll('.benefit-item');
    
    gsap.fromTo(items, 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);
  
  return (
    <div ref={sectionRef} className="section bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Fast Delivery */}
          <div className="benefit-item flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary-100 p-4 rounded-full mb-4">
              <TruckIcon className="text-primary-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick delivery to your doorstep, ensuring freshness and quality.
            </p>
          </div>
          
          {/* Premium Quality */}
          <div className="benefit-item flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-secondary-100 p-4 rounded-full mb-4">
              <ThumbsUp className="text-secondary-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Made with finest ingredients and authentic traditional recipes.
            </p>
          </div>
          
          {/* Award Winning */}
          <div className="benefit-item flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-accent-100 p-4 rounded-full mb-4">
              <Award className="text-accent-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
            <p className="text-gray-600">
              Our sweets have won multiple culinary awards for authenticity.
            </p>
          </div>
          
          {/* 24/7 Support */}
          <div className="benefit-item flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gold-100 p-4 rounded-full mb-4">
              <Clock className="text-gold-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our customer service team is always ready to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;