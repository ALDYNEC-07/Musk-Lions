// components/WishlistPage/WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import SmokeAnimation from '../SmokeAnimation/SmokeAnimation';
import './WishlistPage.css';
import WishlistButton from '../WishlistButton/WishlistButton';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokePosition, setSmokePosition] = useState({ x: 0, y: 0 });
    const handleAddToCart = (product, event) => {
    // Находим позицию для анимации дыма
    const card = event.target.closest('.wishlist-product-card');
    const image = card.querySelector('.wishlist-product-image');
    const rect = image.getBoundingClientRect();
    
    setSmokePosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 6
    });

    addItem(product);
    setShowSmoke(true);
    setTimeout(() => setShowSmoke(false), 1000);
  };

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}, []);

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page empty">
        <div className="wishlist-empty-content">
          <div className="empty-heart">🤍</div>
          <h2>Ваше избранное пусто</h2>
          <p>Добавляйте понравившиеся парфюмы, нажимая на сердечки</p>
          <Link to="/" className="back-to-products">
            ← Вернуться к коллекции
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Избранное</h1>
        <div className="wishlist-stats">
          <button 
            onClick={clearWishlist} 
            className="clear-wishlist-btn"
          >
            Очистить все
          </button>
        </div>
      </div>
      
      <div className="wishlist-grid">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-product-card">
            <div className="wishlist-product-image">
              <img src={product.image} alt={product.name} />
            <div className="wishlist-button-container">
                <WishlistButton product={product} />
            </div>
            </div>
            <div className="wishlist-product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="wishlist-product-price">{product.price}</div>
              <button 
                className="wishlist-add-to-cart"
                onClick={(e) => handleAddToCart(product, e)}
              >
                В корзину
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

export default WishlistPage;
