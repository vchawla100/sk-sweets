import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the product type
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  weights?: { value: string; price: number }[];
  shelfLife?: string;
}

// Define the cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the cart context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add product to cart
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      // Check if product is already in cart
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if product exists
        return prevCart.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item if product doesn't exist
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Calculate cart item count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Provide cart context
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/*
// CART FUNCTIONALITY - TEMPORARILY DISABLED FOR WISHLIST SYSTEM
// The cart functionality has been replaced with wishlist functionality.
// This code is preserved for future use when cart and payment features are re-enabled.

// Original cart context implementation:
// - addToCart: Adds products to cart with quantity
// - removeFromCart: Removes products from cart
// - updateQuantity: Updates product quantities
// - clearCart: Clears entire cart
// - getCartTotal: Calculates total cart value
// - getCartCount: Gets total number of items in cart

// To re-enable cart functionality:
// 1. Replace WishlistProvider with CartProvider in App.tsx
// 2. Update ProductCard to use addToCart instead of addToWishlist
// 3. Update Navbar to show cart icon instead of heart
// 4. Update ProductDetailPage to include quantity controls
// 5. Re-enable checkout functionality
*/