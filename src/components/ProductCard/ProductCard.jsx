import React, { useState } from 'react';
import SmokeAnimation from '../SmokeAnimation/SmokeAnimation';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokePosition, setSmokePosition] = useState({ x: 0, y: 0 });

const handleAddToCart = (event) => {
  // Находим позицию ИЗОБРАЖЕНИЯ флакона, а не кнопки
  const imageElement = event.target.closest('.mountain-product-card').querySelector('.img');
  const imageRect = imageElement.getBoundingClientRect();
  
  setSmokePosition({
    x: imageRect.left + imageRect.width / 4,  // Центр изображения
    y: imageRect.top + imageRect.height * 0.3  // Центр изображения
  });
  
  setIsAdded(true);
  setShowSmoke(true);
  
  setTimeout(() => setIsAdded(false), 2000);
};

  const handleSmokeComplete = () => {
    setShowSmoke(false);
  };

  return (
    <div className="mountain-product-card">
      <div className="mountain-product-image">
        <img src={product.placeholder } className='img'/>
      </div>
      <div className="mountain-product-info">
        <h3>{product.name}</h3>
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

