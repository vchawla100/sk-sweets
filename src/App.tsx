import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ShareFloater from './components/ShareFloater';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import FAQ from './pages/FAQ';
import HomePage from './pages/HomePage';
import LegalContent from './pages/LegalContent';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopPage from './pages/ShopPage';
import TermsOfService from './pages/TnC';
import WishlistPage from './pages/WishlistPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [productId, setProductId] = useState<string | null>(null);

  // Handle navigation
  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;

      if (path === '/' || path === '') {
        setCurrentPage('home');
        setProductId(null);
      } else if (path === '/shop') {
        setCurrentPage('shop');
        setProductId(null);
      } else if (path === '/cart') {
        setCurrentPage('cart');
        setProductId(null);
      } else if (path === '/wishlist') {
        setCurrentPage('wishlist');
        setProductId(null);
      } else if (path === '/checkout') {
        setCurrentPage('checkout');
        setProductId(null);
      } else if (path === '/about') {
        setCurrentPage('about');
        setProductId(null);
      } else if (path === '/contact') {
        setCurrentPage('contact');
        setProductId(null);
      } else if (path === '/faq') {
        setCurrentPage('faq');
        setProductId(null);
      } else if (path.startsWith('/product/')) {
        setCurrentPage('product');
        setProductId(path.split('/')[2]);
      } else if (path === '/privacy') {
        setCurrentPage('privacy');
        setProductId(null);
      } else if (path === '/terms') {
        setCurrentPage('terms');
        setProductId(null);
      } else if (path === '/shipping') {
        setCurrentPage('shipping');
        setProductId(null);
      } else {
        setCurrentPage('home');
        setProductId(null);
      }
    };

    // Initial navigation
    handleNavigation();

    // Listen for navigation events
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('pushState', handleNavigation);

    // Custom event handling for our Link component
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.getAttribute('href') && !anchor.getAttribute('href')?.startsWith('#')) {
        setTimeout(handleNavigation, 0);
      }
    });

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('pushState', handleNavigation);
    };
  }, []);

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage productId={productId || "1"} />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQ />;
      case 'privacy':
        return <LegalContent />; // or <PrivacyPolicy /> if you split it
      case 'terms':
        return <TermsOfService />;
      case 'shipping':
        return <TermsOfService />;
      default:
        return <HomePage />;
    }
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <ShareFloater />
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;