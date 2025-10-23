import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductCard from './components/ProductCard/ProductCard';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import BottomNav from './components/BottomNav/BottomNav';
import { products } from './data/products';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Hero />
        
        <section className="mountain-collection">
          <div className="mountain-section-header">
            <h2>Горная коллекция</h2>
            <p>Ароматы, созданные с уважением к традициям и любовью к качеству</p>
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
      <BottomNav />
    </div>
  );
}

export default App;