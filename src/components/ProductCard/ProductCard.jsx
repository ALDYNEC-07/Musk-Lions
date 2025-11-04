import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import SmokeAnimation from '../SmokeAnimation/SmokeAnimation';
import WishlistButton from '../WishlistButton/WishlistButton';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokePosition, setSmokePosition] = useState({ x: 0, y: 0 });
  const { addItem } = useCart();

const handleAddToCart = (event) => {
  // Находим позицию ИЗОБРАЖЕНИЯ флакона, а не кнопки
  const imageElement = event.target.closest('.mountain-product-card').querySelector('.mountain-product-image .img');
  const imageRect = imageElement.getBoundingClientRect();
  
  setSmokePosition({
    x: imageRect.left + imageRect.width / 2.5,  // Центр изображения
    y: imageRect.top + imageRect.height * -0.8
  });

      // ДОБАВЛЯЕМ ТОВАР В КОРЗИНУ
    addItem(product);
  
  setIsAdded(true);
  setShowSmoke(true);
  
  setTimeout(() => setIsAdded(false), 2000);
};

  const handleSmokeComplete = () => {
    setShowSmoke(false);
  };

  return (
    <div className="mountain-product-card" id={`product-${product.id}`}>
      <div className="mountain-product-image">
        <img src={product.image } className='img' alt={product.name} />
      </div>
      <div className="mountain-product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="mountain-product-price">{product.price}</div>

      <button 
        className={`mountain-add-to-cart ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? 'Добавлено ✓' : 'В корзину'}
      </button>
      
      {showSmoke && (
        <SmokeAnimation
          startPosition={smokePosition}
          onComplete={handleSmokeComplete}
        />
      )}
      </div>
    </div>
  );
};

export default ProductCard;

