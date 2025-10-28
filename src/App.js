
import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductCard from './components/ProductCard/ProductCard';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import OrderModal from './components/OrderModal/OrderModal';
import { useFilter } from './context/FilterContext';
import './App.css';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const { filteredProducts, totalProducts, isFilterActive } = useFilter();

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Hero />
        
        {/* 🎯 СЕКЦИЯ ТОВАРОВ С ID ДЛЯ ПРОКРУТКИ */}
        <section className="mountain-collection" id="products-section">
          <div className="mountain-section-header">
            <h2>5 ручных авторских композиций</h2>
            <p>Ограниченный тираж, только для истинных ценителей</p>
          </div>

          {/* 🔧 ИНФОРМАЦИЯ О ФИЛЬТРЕ */}
          {isFilterActive && (
            <div className="filter-info">
              <span className="products-count">
                Показано {filteredProducts.length} из {totalProducts} товаров
              </span>
            </div>
          )}
          
          {/* 🎯 СПИСОК ТОВАРОВ */}
          <div className="mountain-products">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        <Features />
      </main>
      <Footer />
      <ScrollIndicator />
      <OrderModal />
    </div>
  );
};

export default App;
