import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the product type
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

// Define the wishlist item type
export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

// Define the wishlist context type
interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistCount: () => number;
}

// Create the wishlist context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Create a provider component
export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      // Check if product is already in wishlist
      const existingItem = prevWishlist.find((item) => item.product.id === product.id);
      
      if (!existingItem) {
        // Add new item if product doesn't exist
        return [...prevWishlist, { product, addedAt: new Date() }];
      }
      return prevWishlist; // Don't add if already exists
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.product.id !== productId));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Calculate wishlist item count
  const getWishlistCount = () => {
    return wishlist.length;
  };

  // Provide wishlist context
  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 