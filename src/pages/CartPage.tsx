import { gsap } from 'gsap';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from '../utils/Link';

/*
// CART PAGE - TEMPORARILY DISABLED FOR WISHLIST SYSTEM
// This page has been replaced with WishlistPage.
// The cart functionality is preserved for future use when cart and payment features are re-enabled.
*/

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const emptyCartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate cart items or empty cart state
    if (cart.length > 0 && cartRef.current) {
      gsap.fromTo(
        cartRef.current.querySelectorAll('.cart-item'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    } else if (emptyCartRef.current) {
      gsap.fromTo(
        emptyCartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [cart.length]);
  
  // Animation when removing an item
  const handleRemoveItem = (productId: number) => {
    const itemElement = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (itemElement) {
      gsap.to(itemElement, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => removeFromCart(productId)
      });
    } else {
      removeFromCart(productId);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
        
        {cart.length > 0 ? (
          <div ref={cartRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4 text-gray-600 font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>
                
                {/* Cart Items List */}
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      data-product-id={item.product.id}
                      className="cart-item p-4 sm:grid sm:grid-cols-12 sm:gap-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center mb-4 sm:mb-0">
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
                        </div>
                      </div>
                      
                      {/* Price - Temporarily hidden */}
                      {/* <div className="col-span-2 text-center mb-4 sm:mb-0">
                        <span className="sm:hidden font-medium text-gray-600 mr-2">Price:</span>
                        <span className="price">${item.product.price.toFixed(2)}</span>
                      </div> */}
                      
                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center items-center mb-4 sm:mb-0">
                        <span className="sm:hidden font-medium text-gray-600 mr-2">Quantity:</span>
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <input 
                            type="number" 
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-10 h-8 border-y border-gray-300 text-center text-sm focus:outline-none"
                          />
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="col-span-2 text-center flex sm:block justify-between items-center">
                        <span className="sm:hidden font-medium text-gray-600">Subtotal:</span>
                        <div className="flex items-center justify-end sm:justify-center">
                          <span className="price mr-4 sm:mr-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
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
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.05).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.05).toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/checkout" className="btn btn-primary w-full">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div ref={emptyCartRef} className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any sweets to your cart yet. Explore our collection to find your favorites!
            </p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;