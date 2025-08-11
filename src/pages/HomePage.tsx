import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import BenefitsSection from '../components/BenefitsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import { initAllAnimations } from '../utils/animations';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize all animations when the home page loads
    initAllAnimations();
  }, []);
  
  return (
    <div>
      <HeroSection />
      <BenefitsSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;