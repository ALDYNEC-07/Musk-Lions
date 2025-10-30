// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ ДОБАВИЛИ
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { FilterProvider } from './context/FilterContext';
import { WishlistProvider } from './context/WishlistContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ ОБОРАЧИВАЕМ В ROUTER */}
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);