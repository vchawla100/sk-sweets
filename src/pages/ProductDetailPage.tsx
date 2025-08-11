import { gsap } from 'gsap';
import { Heart, Share2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Alert from '../components/Alert';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';
import { Link } from '../utils/Link';

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId = "1" }) => {
  const id = parseInt(productId);
  const product = products.find(p => p.id === id) || products[0];
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedWeight, setSelectedWeight] = useState(product.weights ? product.weights[0] : null);
  const [price, setPrice] = useState(selectedWeight ? selectedWeight.price : product.price);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (selectedWeight) {
      setPrice(selectedWeight.price);
    }
  }, [selectedWeight]);
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Add to wishlist handler
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    // Show wishlist animation feedback
    const button = document.querySelector('.wishlist-btn');
    if (button) {
      gsap.fromTo(
        button,
        { scale: 0.95 },
        { scale: 1, duration: 0.2, ease: 'back.out' }
      );
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setAlert({ message: 'Link copied to clipboard!', type: 'success' });
    }, () => {
      setAlert({ message: 'Failed to copy link.', type: 'error' });
    });
  };
  
  // Animations
  useEffect(() => {
    if (!pageRef.current) return;
    
    const image = pageRef.current.querySelector('.product-image');
    const details = pageRef.current.querySelector('.product-details');
    
    gsap.fromTo(image,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
    );
    
    gsap.fromTo(details,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );
    
    // Related products animation
    const relatedSection = pageRef.current.querySelector('.related-section');
    if (relatedSection) {
      gsap.fromTo(relatedSection,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: relatedSection,
            start: 'top 80%',
          }
        }
      );
    }
  }, [product.id]);
  
  return (
    <div ref={pageRef} className="pt-16 pb-16">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary-500 transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">{product.name}</span>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="product-image">
            <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="product-details">
            <div className="mb-2">
              <span className={`badge ${
                product.category === 'Premium' ? 'badge-accent' : 
                product.category === 'Popular' ? 'badge-primary' : 'badge-secondary'
              }`}>
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{product.name}</h1>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.shelfLife && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Shelf Life</h3>
                <p className="text-lg text-red-500 font-serif">{product.shelfLife}</p>
              </div>
            )}
            
            {product.weights && (
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-2'>Weight</h3>
                <div className='flex gap-2'>
                  {product.weights.map((weight) => (
                    <button
                      key={weight.value}
                      onClick={() => setSelectedWeight(weight)}
                      className={`btn ${selectedWeight?.value === weight.value ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {weight.value}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}

            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleWishlistToggle}
                className={`wishlist-btn btn flex-1 flex items-center justify-center gap-2 ${
                  isInWishlist(product.id) 
                    ? 'btn-accent text-white' 
                    : 'btn-primary'
                }`}
              >
                <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <button onClick={handleShare} className="btn btn-outline flex items-center justify-center gap-2">
                <Share2 size={20} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;