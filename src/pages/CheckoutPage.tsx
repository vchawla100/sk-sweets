import { gsap } from 'gsap';
import { Check, ChevronLeft, CreditCard, Truck } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from '../utils/Link';

/*
// CHECKOUT PAGE - TEMPORARILY DISABLED FOR WISHLIST SYSTEM
// This page is part of the cart functionality and has been disabled.
// The checkout functionality is preserved for future use when cart and payment features are re-enabled.
*/

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show order complete animation
      const checkoutForm = document.querySelector('.checkout-form');
      if (checkoutForm) {
        gsap.to(checkoutForm, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          onComplete: () => {
            setOrderComplete(true);
            clearCart();
          }
        });
      } else {
        setOrderComplete(true);
        clearCart();
      }
    }
  };
  
  // Initial animations
  useEffect(() => {
    if (!checkoutRef.current) return;
    
    gsap.fromTo(
      checkoutRef.current.querySelectorAll('.checkout-step'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, []);
  
  // Step change animation
  useEffect(() => {
    if (step === 2) {
      const paymentSection = document.querySelector('.payment-section');
      if (paymentSection) {
        gsap.fromTo(
          paymentSection,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    }
  }, [step]);
  
  // Order complete animation
  useEffect(() => {
    if (orderComplete) {
      const successMessage = document.querySelector('.success-message');
      if (successMessage) {
        gsap.fromTo(
          successMessage,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out' }
        );
      }
    }
  }, [orderComplete]);
  
  // Redirect if cart is empty and not order complete
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      window.history.pushState({}, '', '/cart');
    }
  }, [cart.length, orderComplete]);
  
  if (cart.length === 0 && !orderComplete) {
    return null;
  }
  
  return (
    <div ref={checkoutRef} className="pt-16 pb-16">
      <div className="container mx-auto px-4">
        {!orderComplete ? (
          <>
            <div className="mb-8">
              <Link to="/cart\" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                <ChevronLeft size={18} className="mr-1" />
                Back to Cart
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
            
            {/* Progress Steps */}
            <div className="checkout-step mb-10">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Truck size={16} />
                    </div>
                    <span className="text-sm mt-2 font-medium">Shipping</span>
                  </div>
                  
                  <div className={`flex-1 h-1 mx-4 ${
                    step >= 2 ? 'bg-primary-500' : 'bg-gray-200'
                  }`}></div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <CreditCard size={16} />
                    </div>
                    <span className="text-sm mt-2 font-medium">Payment</span>
                  </div>
                  
                  <div className={`flex-1 h-1 mx-4 ${
                    step >= 3 ? 'bg-primary-500' : 'bg-gray-200'
                  }`}></div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Check size={16} />
                    </div>
                    <span className="text-sm mt-2 font-medium">Confirmation</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 checkout-form">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="p-6 checkout-step">
                        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                              First Name*
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name*
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address*
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number*
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address*
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City*
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                              State*
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP Code*
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {step === 2 && (
                      <div className="p-6 payment-section">
                        <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                        <div className="mb-6">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card*
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="input"
                            placeholder="XXXX XXXX XXXX XXXX"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration Date*
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleChange}
                              className="input"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV*
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              className="input"
                              placeholder="XXX"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6 border-t border-gray-100">
                      <button type="submit" className="btn btn-primary w-full">
                        {step === 1 ? 'Continue to Payment' : 'Complete Order'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1 checkout-step">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="text-sm font-medium">{item.product.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="price text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
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
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${(getCartTotal() * 1.05).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="success-message max-w-2xl mx-auto text-center bg-white rounded-xl shadow-md p-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order! We've received your payment and will begin preparing your delicious sweets.
              You will receive a confirmation email shortly.
            </p>
            <p className="font-medium mb-6">
              Order Number: <span className="text-primary-600">SW{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
            </p>
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;