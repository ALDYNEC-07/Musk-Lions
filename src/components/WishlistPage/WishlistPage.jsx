// components/WishlistPage/WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import SmokeAnimation from '../SmokeAnimation/SmokeAnimation';
import WishlistButton from '../WishlistButton/WishlistButton';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokePosition, setSmokePosition] = useState({ x: 0, y: 0 });
  const [addedProducts, setAddedProducts] = useState([]); // ✅ ДОБАВИЛИ СОСТОЯНИЕ

  // Прокрутка в начало при загрузке
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = (product, event) => {
    const card = event.target.closest('.wishlist-product-card');
    const image = card.querySelector('.wishlist-product-image');
    const rect = image.getBoundingClientRect();
    
    setSmokePosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 6
    });

    // Добавляем товар в корзину
    addItem(product);
    
    // ✅ ДОБАВЛЯЕМ ID ТОВАРА В МАССИВ ДОБАВЛЕННЫХ
    setAddedProducts(prev => [...prev, product.id]);
    
    setShowSmoke(true);
    
    // ✅ ЧЕРЕЗ 2 СЕКУНДЫ УБИРАЕМ НАДПИСЬ "ДОБАВЛЕНО"
    setTimeout(() => {
      setShowSmoke(false);
      setAddedProducts(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  // Пустое состояние
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page empty">
        <div className="wishlist-empty-content">
          <div className="empty-heart">🤍</div>
          <h2>Ваше избранное пусто</h2>
          <p>Добавляйте понравившиеся парфюмы, нажимая на сердечки</p>
          <Link to="/collection" className="back-to-products">
            В коллекцию
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Избранное</h1>
      </div>
      
      <div className="wishlist-grid">
        {wishlist.map(product => {
          const isAdded = addedProducts.includes(product.id); // ✅ ПРОВЕРЯЕМ ДОБАВЛЕН ЛИ ТОВАР
          
          return (
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
                <div className="wishlist-card-footer">
                  <div className="wishlist-product-price">{product.price}</div>
                  <button 
                    className={`wishlist-add-to-cart ${isAdded ? 'added' : ''}`}
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={isAdded} // ✅ БЛОКИРУЕМ КНОПКУ НА ВРЕМЯ АНИМАЦИИ
                  >
                    {isAdded ? 'Добавлено ✓' : 'В корзину'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="wishlist-bottom-actions">
        <button 
          onClick={clearWishlist} 
          className="clear-wishlist-btn"
        >
          Очистить все
        </button>
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
