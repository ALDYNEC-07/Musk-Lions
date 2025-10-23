import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // Здесь будет логика добавления в корзину
    console.log(`Добавлен товар: ${product.name}`);
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
          className="mountain-add-to-cart"
          onClick={handleAddToCart}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;