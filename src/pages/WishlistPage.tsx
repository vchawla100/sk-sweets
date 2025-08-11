import { gsap } from 'gsap';
import { ArrowRight, HeartOff, Trash2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from '../utils/Link';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const wishlistRef = useRef<HTMLDivElement>(null);
  const emptyWishlistRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate wishlist items or empty wishlist state
    if (wishlist.length > 0 && wishlistRef.current) {
      gsap.fromTo(
        wishlistRef.current.querySelectorAll('.wishlist-item'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    } else if (emptyWishlistRef.current) {
      gsap.fromTo(
        emptyWishlistRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [wishlist.length]);
  
  // Animation when removing an item
  const handleRemoveItem = (productId: number) => {
    const itemElement = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (itemElement) {
      gsap.to(itemElement, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => removeFromWishlist(productId)
      });
    } else {
      removeFromWishlist(productId);
    }
  };
  
  return (
    <div className="pt-16 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Wishlist</h1>
        
        {wishlist.length > 0 ? (
          <div ref={wishlistRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4 text-gray-600 font-medium">
                  <div className="col-span-10">Product</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>
                
                {/* Wishlist Items List */}
                <div className="divide-y divide-gray-100">
                  {wishlist.map((item) => (
                    <div 
                      key={item.product.id}
                      data-product-id={item.product.id}
                      className="wishlist-item p-4 sm:grid sm:grid-cols-12 sm:gap-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-10 flex items-center mb-4 sm:mb-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.product.category}
                          </p>
                          <p className="text-xs text-gray-400">
                            Added on {item.addedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="col-span-2 flex justify-center items-center mb-4 sm:mb-0">
                        <span className="sm:hidden font-medium text-gray-600 mr-2">Actions:</span>
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                            aria-label="View product"
                          >
                            <ArrowRight size={18} />
                          </Link>
                          <button 
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link to="/shop" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  <ArrowRight size={18} className="mr-2 transform rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Wishlist Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Wishlist Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Items</span>
                    <span>{wishlist.length}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Save your favorite sweets for later! You can view product details or remove items from your wishlist.
                  </p>
                  <Link to="/shop" className="btn btn-primary w-full">
                    Browse More Sweets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div ref={emptyWishlistRef} className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <HeartOff size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your wishlist by adding your favorite sweets! Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Start Browsing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 