import { Facebook, Instagram } from 'lucide-react';
import React from 'react';
import { Link } from '../utils/Link';

// Custom WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="inline-block"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary-600 mb-4 inline-block">
              SK Sweets
            </Link>
            <p className="text-gray-600 mb-4">
              Bringing authentic Indian sweets to your doorstep with premium quality and traditional taste.
            </p>
            <div className="flex space-x-6">
              <a href="https://m.facebook.com/100089932125541/" target='_blank' className="text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                <Facebook size={28} />
              </a>
              <a href="https://www.instagram.com/sksweets1013/" target='_blank' className="text-gray-600 hover:text-pink-500 transition-colors p-2 hover:bg-pink-50 rounded-lg">
                <Instagram size={28} />
              </a>
              <a href="https://wa.me/18736881013" target='_blank' className="text-gray-600 hover:text-green-500 transition-colors p-2 hover:bg-green-50 rounded-lg">
                <WhatsAppIcon size={28} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=Traditional" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Traditional Sweets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Popular" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Popular Sweets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Premium" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Premium Selection
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Regional" className="text-gray-600 hover:text-primary-500 transition-colors">
                  Regional Specials
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p>22 EVERGREEN COURT,</p>
              <p>BELLEVILLE, ON K8N A1, CANADA🍁</p>
              <p className="mt-4">
                <a href="tel:+18736881013" className="hover:text-primary-500 transition-colors">
                  +1 (873) 688-1013
                </a>
              </p>
              <p>
                <a href="mailto:sksweets1013@gmail.com" className="hover:text-primary-500 transition-colors">
                  sksweets1013@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-8 mt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SK Sweets & Snacks Ltd &nbsp;|&nbsp; All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="/privacy" className="text-sm hover:text-primary-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm hover:text-primary-500 transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-sm hover:text-primary-500 transition-colors">
              Shipping Policy
            </Link>
            <a
                href="https://www.linkedin.com/in/varunchawla1511/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary-500 transition-colors"
            >
              Made with ❤️ by V
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;