import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import products from '../data/products';
import { Link } from '../utils/Link';
import ProductCard from './ProductCard';
import { Product } from '../context/CartContext';

const FeaturedProducts: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categories = [
    'Burfi items',
    'Chena items',
    'Fancy items',
    'Khoya items',
    'Laddoo items',
  ];

  // Pick up to 2 products from each category, in order, until we have 8
  let featuredProducts: Product[] = [];
  for (const category of categories) {
    const items = products.filter(product => product.category === category).slice(0, 2);
    featuredProducts = featuredProducts.concat(items);
    if (featuredProducts.length >= 8) break;
  }
  featuredProducts = featuredProducts.slice(0, 8);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const title = sectionRef.current.querySelector('h2');
    const subtitle = sectionRef.current.querySelector('p');
    const cards = sectionRef.current.querySelectorAll('.product-card');
    
    gsap.fromTo(title, 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        } 
      }
    );
    
    gsap.fromTo(subtitle, 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        delay: 0.2
      }
    );
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        delay: 0.4
      }
    );
  }, []);
  
  return (
    <div id="featured" ref={sectionRef} className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Delicacies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium Indian sweets, crafted with traditional recipes and the finest ingredients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/shop" className="btn btn-outline inline-flex items-center gap-2">
            View All Products
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;