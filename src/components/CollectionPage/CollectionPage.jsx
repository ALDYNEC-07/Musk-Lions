// components/CollectionPage/CollectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useFilter } from '../../context/FilterContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import SmokeAnimation from '../SmokeAnimation/SmokeAnimation';
import './CollectionPage.css';
import WishlistButton from '../WishlistButton/WishlistButton';

const CollectionPage = () => {
  const { filteredProductsCollection, totalProductsCollection, isFilterActive } = useFilter();
  const { addItem } = useCart();
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokePosition, setSmokePosition] = useState({ x: 0, y: 0 });
  const [activeProductId, setActiveProductId] = useState(null);

  // 🎯 ИСПОЛЬЗУЕМ ФИЛЬТРОВАННЫЕ ТОВАРЫ ДЛЯ КОЛЛЕКЦИИ
  const productsToShow = filteredProductsCollection;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = (product, event) => {
    const card = event.target.closest('.collection-product-card');
    const image = card.querySelector('.collection-product-image');
    const rect = image.getBoundingClientRect();
    
    setSmokePosition({
      x: rect.left + rect.width / 3,
      y: rect.top + rect.height / 9
    });

    card.classList.add('adding');
    addItem(product);
    
    setActiveProductId(product.id);
    setShowSmoke(true);
    
    setTimeout(() => {
      setShowSmoke(false);
      setActiveProductId(null);
      card.classList.remove('adding');
    }, 3000);
  };

  return (
    <div className="collection-page">
      <div className="collection-navigation">
        <Link to="/" className="back-button">
          ← Назад на главную
        </Link>
      </div>

      <div className="collection-header">
        <h1>Полная коллекция Musk Lions</h1>
        <p>Все {totalProductsCollection} эксклюзивных ароматов для истинных ценителей</p>
        
        {isFilterActive && (
          <div className="filter-info">
            <span className="products-count">
              Показано {productsToShow.length} из {totalProductsCollection} ароматов
            </span>
          </div>
        )}
      </div>

      <div className="collection-grid">
        {productsToShow.map(product => (
          <div key={product.id} className="collection-product-card" id={`product-${product.id}`}>
            <div className="collection-card-header">
              <div className="collection-product-image">
                <img src={product.image} alt={product.name} />
              </div>
            <div className="wishlist-button">
                <WishlistButton product={product} />
            </div>
            </div>
            
            <div className="collection-product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="collection-product-price">{product.price}</div>
              <button 
                className={`collection-add-to-cart ${activeProductId === product.id ? 'adding' : ''}`}
                onClick={(e) => handleAddToCart(product, e)}
                disabled={activeProductId === product.id}
              >
                {activeProductId === product.id ? 'Добавлено! ✓' : 'В корзину'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSmoke && (
        <SmokeAnimation
          startPosition={smokePosition}
          onComplete={() => setShowSmoke(false)}
        />
      )}
    </div>
  );
};

export default CollectionPage;