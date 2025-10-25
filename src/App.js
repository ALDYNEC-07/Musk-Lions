import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductCard from './components/ProductCard/ProductCard';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import { products } from './data/products';
import './App.css';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Hero />
        
        <section className="mountain-collection">
          <div className="mountain-section-header">
            <h2>5 ручных авторских композиций</h2>
            <p>Ограниченный тираж, только для истинных ценителей</p>
          </div>
          
          <div className="mountain-products">
            {products.map(product => (
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
    </div>
  );
}

export default App;