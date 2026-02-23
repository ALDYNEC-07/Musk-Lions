import React, { createContext, useContext, useState, useEffect } from 'react';
import { parsePrice } from '../utils/price';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const saveToLocalStorage = (items, count) => {
    localStorage.setItem('muskLionsCart', JSON.stringify({
      items: items,
      totalCount: count
    }));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('muskLionsCart');
    
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        
        if (cartData && Array.isArray(cartData.items)) {
          setCartItems(cartData.items);
          setTotalCount(cartData.totalCount || 0);
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки корзины:', error);
      }
    }
  }, []);

  const addItem = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newItems = [...prevItems, {
          id: item.id,
          name: item.name,
          price: item.price,
          numericPrice: parsePrice(item.numericPrice ?? item.price),
          quantity: 1
        }];
      }

      const newTotalCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      setTotalCount(newTotalCount);
      
      saveToLocalStorage(newItems, newTotalCount);
      
      return newItems;
    });
  };


  const removeItem = (itemId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      const newTotalCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      setTotalCount(newTotalCount);
      
      saveToLocalStorage(newItems, newTotalCount);
      
      return newItems;
    });
  };


  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      
      const newTotalCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      setTotalCount(newTotalCount);
      
      saveToLocalStorage(newItems, newTotalCount);
      
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalCount(0);
    saveToLocalStorage([], 0);
  };

  return (
    <CartContext.Provider value={{
      items: cartItems,
      totalCount,
      addItem,
      removeItem,
      updateQuantity,
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
