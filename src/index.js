import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { FilterProvider } from './context/FilterContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </OrderProvider>
    </CartProvider>
  </React.StrictMode>
);
