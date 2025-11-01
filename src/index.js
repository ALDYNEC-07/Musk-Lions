// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext'; // ПЕРЕМЕЩАЕМ ВВЕРХ
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilterProvider> {/* ✅ ПЕРВЫЙ ПРОВАЙДЕР */}
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </FilterProvider>
    </BrowserRouter>
  </React.StrictMode>
);