import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anuj Rawat",
    position: "Food Blogger",
    image: "https://images.pexels.com/photos/4622363/pexels-photo-4622363.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote: "SK Sweets offers the most authentic Indian sweets I've tasted outside of India. Their Kaju Katli reminds me of the streets of Delhi!",
    rating: 5
  },
  {
    id: 2,
    name: "Sahil Goyal",
    position: "Chef",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote: "As a chef, I appreciate the attention to detail in their sweets. The flavors are perfectly balanced and the quality is consistent.",
    rating: 5
  },
  {
    id: 3,
    name: "Bharat Negi",
    position: "Regular Customer",
    image: "https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote: "I order from SK Sweets for all family celebrations. Their sweets always impress my guests and bring a taste of home.",
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const title = sectionRef.current.querySelector('h2');
    const subtitle = sectionRef.current.querySelector('p');
    
    gsap.fromTo([title, subtitle], 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Initialize slide refs
    slideRefs.current = slideRefs.current.slice(0, testimonials.length);
  }, []);
  
  useEffect(() => {
    // Animate slide transitions
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      
      if (index === activeIndex) {
        gsap.to(slide, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        gsap.to(slide, {
          opacity: 0,
          x: index < activeIndex ? -50 : 50,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  }, [activeIndex]);
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div ref={sectionRef} className="section bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See why our customers love our authentic Indian sweets and keep coming back for more.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-8">
          {/* Testimonial Slides */}
          <div className="overflow-hidden relative h-80 sm:h-64">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={el => slideRefs.current[index] = el}
                className="absolute inset-0 flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-6"
                style={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  transform: `translateX(${index === activeIndex ? 0 : (index < activeIndex ? -50 : 50)}px)`
                }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={18}
                        className={`${i < testimonial.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'} mr-1`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-8 bg-primary-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;