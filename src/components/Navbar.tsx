import { Heart, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from '../utils/Link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getWishlistCount } = useWishlist();
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-1' : 'bg-transparent py-2'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/assets/oldOnes/SK_SWEET_LOGO.png" alt="SK Sweets Logo" className="h-12 w-auto mr-2" />
          <div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-primary-500'}`}>
              SK SWEETS
            </span>
            <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-gray-500'}`}>
              True Indian Flavors
            </p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-primary-500 transition-colors`}>
            Home
          </Link>
          <Link to="/shop" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-primary-500 transition-colors`}>
            Shop
          </Link>
          <Link to="/about" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-primary-500 transition-colors`}>
            About
          </Link>
          <Link to="/contact" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-primary-500 transition-colors`}>
            Contact Us
          </Link>
          <Link to="/faq" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-primary-500 transition-colors`}>
            FAQ
          </Link>
        </nav>
        
        {/* Wishlist and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/wishlist" className="relative p-2">
            <Heart className={`${isScrolled ? 'text-gray-800' : 'text-gray-700'} hover:text-primary-500 transition-colors`} />
            {getWishlistCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getWishlistCount()}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`${isScrolled ? 'text-gray-800' : 'text-gray-700'}`} />
            ) : (
              <Menu className={`${isScrolled ? 'text-gray-800' : 'text-gray-700'}`} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute top-full left-0 w-full`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="font-medium text-gray-800 hover:text-primary-500 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="font-medium text-gray-800 hover:text-primary-500 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className="font-medium text-gray-800 hover:text-primary-500 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="font-medium text-gray-800 hover:text-primary-500 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/faq" 
            className="font-medium text-gray-800 hover:text-primary-500 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;