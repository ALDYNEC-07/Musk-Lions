import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { parsePrice } from '../utils/price';

const CartContext = createContext();
const CART_STORAGE_KEY = 'muskLionsCart';

const getItemQuantity = (value) => {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity < 1) {
    return 1;
  }
  return Math.floor(quantity);
};

const calculateTotalCount = (items) =>
  items.reduce((sum, item) => sum + getItemQuantity(item.quantity), 0);

const normalizeCartItem = (item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  numericPrice: parsePrice(item.numericPrice ?? item.price),
  quantity: getItemQuantity(item.quantity),
});

const loadCartItems = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
      return [];
    }

    const cartData = JSON.parse(savedCart);
    if (!cartData || !Array.isArray(cartData.items)) {
      return [];
    }

    return cartData.items
      .filter((item) => item && item.id)
      .map((item) => normalizeCartItem(item));
  } catch (error) {
    console.error('Ошибка загрузки корзины:', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartItems);
  const totalCount = useMemo(() => calculateTotalCount(cartItems), [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        items: cartItems,
        totalCount,
      })
    );
  }, [cartItems, totalCount]);

  const addItem = (item) => {
    if (!item || !item.id) {
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: getItemQuantity(cartItem.quantity) + 1 }
            : cartItem
        );
      }

      return [...prevItems, normalizeCartItem({ ...item, quantity: 1 })];
    });
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    const normalizedQuantity = Math.floor(Number(newQuantity));

    if (!Number.isFinite(normalizedQuantity)) {
      return;
    }

    setCartItems((prevItems) => {
      if (normalizedQuantity < 1) {
        return prevItems.filter((item) => item.id !== itemId);
      }

      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: normalizedQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
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
