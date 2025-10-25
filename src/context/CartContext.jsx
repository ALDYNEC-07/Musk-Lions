import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const addItem = (item) => {
    setCartItems(prev => [...prev, {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    }]);
    setTotalCount(prev => prev + 1);
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setTotalCount(prev => prev - 1);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalCount(0);
  };

  return (
    <CartContext.Provider value={{
      items: cartItems,
      totalCount,
      addItem,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};