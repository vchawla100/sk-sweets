import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) return;
    
    // Animation for form submission
    if (formRef.current && successRef.current) {
      gsap.to(formRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setSubmitted(true);
          gsap.fromTo(
            successRef.current!,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          );
        }
      });
    }
  };
  
  return (
    <div className="section bg-primary-600 text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          {!submitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Sweet Community</h2>
              <p className="text-primary-100 mb-8">
                Subscribe to our newsletter and be the first to know about new products, seasonal specials, and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
                  required
                />
                <button 
                  type="submit"
                  className="btn bg-white text-primary-600 hover:bg-primary-100 focus:ring-white"
                >
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-primary-200 mt-4">
                We respect your privacy and will never share your information.
              </p>
            </form>
          ) : (
            <div ref={successRef} className="py-8">
              <svg 
                className="w-16 h-16 text-white mx-auto mb-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-3xl font-bold mb-4">Thank You for Subscribing!</h2>
              <p className="text-primary-100">
                You've successfully joined our sweet community. Watch your inbox for delicious updates and special offers!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;