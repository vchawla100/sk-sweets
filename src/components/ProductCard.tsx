import { gsap } from 'gsap';
import { Heart } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Product, useWishlist } from '../context/WishlistContext';
import { Link } from '../utils/Link';

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  'Burfi items': 'bg-yellow-200 text-yellow-800',
  'Chena items': 'bg-pink-200 text-pink-800',
  'Fancy items': 'bg-purple-200 text-purple-800',
  'Khoya items': 'bg-green-200 text-green-800',
  'Laddoo items': 'bg-orange-200 text-orange-800',
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Animation on hover
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const image = card.querySelector('img');
    const content = card.querySelector('.card-content');
    const button = card.querySelector('.add-to-cart');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(image, { scale: 1.05, duration: 0.4, ease: 'power1.out' });
      gsap.to(content, { y: -5, duration: 0.3, ease: 'power1.out' });
      gsap.to(button, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(image, { scale: 1, duration: 0.4, ease: 'power1.out' });
      gsap.to(content, { y: 0, duration: 0.3, ease: 'power1.out' });
      gsap.to(button, { opacity: 0.9, y: 5, duration: 0.3, ease: 'power1.out' });
    });
    
    return () => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    };
  }, []);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    // Animation feedback
    const button = e.currentTarget as HTMLButtonElement;
    gsap.fromTo(
      button,
      { scale: 0.95 },
      { scale: 1, duration: 0.2, ease: 'back.out' }
    );
  };
  
  return (
    <div 
      ref={cardRef} 
      className="product-card group h-full flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-t-xl relative">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`badge ${categoryColors[product.category] || 'bg-gray-200 text-gray-800'}`}
          >
            {product.category}
          </span>
        </div>
      </Link>
      
      <div className="card-content flex-grow flex flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="w-0"></div> {/* Invisible spacer to maintain layout */}
          <button 
            onClick={handleWishlistToggle}
            className={`add-to-wishlist py-2 px-3 rounded-lg flex items-center gap-1 opacity-90 transform translate-y-1 hover:translate-y-0 transition-all ${
              isInWishlist(product.id) 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'btn-primary'
            }`}
          >
            <Heart size={16} className={isInWishlist(product.id) ? 'fill-current' : ''} />
            <span>{isInWishlist(product.id) ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;