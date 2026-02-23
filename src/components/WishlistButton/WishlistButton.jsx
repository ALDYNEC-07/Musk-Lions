// components/WishlistButton/WishlistButton.jsx
import React from 'react';
import { useWishlist } from '../../context/WishlistContext'; // Импортируем хук
import './WishlistButton.css';

const WishlistButton = ({ product }) => {
  // Получаем функции и данные из контекста избранного
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Проверяем, есть ли этот товар в избранном
  const inWishlist = isInWishlist(product.id);

  // Обработчик клика по кнопке
  const handleClick = () => {
    if (inWishlist) {
      // Если уже в избранном - удаляем
      removeFromWishlist(product.id);
    } else {
      // Если нет в избранном - добавляем
      addToWishlist(product);
    }
  };

  return (
    <button 
      className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={inWishlist ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {/* Показываем сердечко: заполненное или пустое */}
      {inWishlist ? '💛' : '🩶'}
    </button>
  );
};

export default WishlistButton;