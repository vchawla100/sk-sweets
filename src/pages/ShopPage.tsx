import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

// Get unique categories from products
const categories = ['All', ...new Set(products.map(product => product.category))];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
    
    // Animate products when they change
    if (productsRef.current) {
      const productCards = productsRef.current.querySelectorAll('.product-card');
      
      gsap.fromTo(productCards,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.05,
          ease: 'power1.out'
        }
      );
    }
  }, [selectedCategory]);
  
  // Initial animations
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, []);
  
  return (
    <div className="pt-16 pb-16">
      {/* Header with Background Image */}
      <div className="relative bg-gradient-to-r from-primary-900/80 to-secondary-900/80 mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/assets/Hero_Sweets_2.png')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-20">
          <div ref={headerRef} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Sweet Collection</h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Explore our wide variety of authentic Indian sweets, crafted with love and tradition.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-white text-primary-600 shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Products Grid */}
        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">
              No products match your selected category. Please try another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;