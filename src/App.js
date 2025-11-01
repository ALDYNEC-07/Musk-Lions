// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductCard from './components/ProductCard/ProductCard';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import OrderModal from './components/OrderModal/OrderModal';
import WishlistPage from './components/WishlistPage/WishlistPage';
import { useFilter } from './context/FilterContext';
import './App.css';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';
import PriceFilterModal from './components/PriceFilterModal/PriceFilterModal';
import CollectionPage from './components/CollectionPage/CollectionPage';

function HomePage() {
  const { filteredProductsHome, totalProductsHome, isFilterActive } = useFilter();
  
  // 🎯 ИСПОЛЬЗУЕМ ФИЛЬТРОВАННЫЕ ТОВАРЫ ДЛЯ ГЛАВНОЙ
  const productsToShow = filteredProductsHome;
  const totalProducts = totalProductsHome;

  return (
    <>
      <Hero />
      <section className="mountain-collection" id="products-section">
        <div className="mountain-section-header">
          <h2>5 ручных авторских композиций</h2>
          <p>Ограниченный тираж, только для истинных ценителей</p>
        </div>

        {isFilterActive && (
          <div className="filter-info">
            <span className="products-count">
              {/* 🎯 ПОКАЗЫВАЕМ СКОЛЬКО НАЙДЕНО ИЗ СКОЛЬКИ */}
              Показано {productsToShow.length} из {totalProducts} ароматов
            </span>
          </div>
        )}
        
        <div className="mountain-products">
          {productsToShow.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
      <Features />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollIndicator />
      <OrderModal />
      <PriceFilterModal />
    </div>
  );
}

export default App;