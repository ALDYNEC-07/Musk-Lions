// Header.jsx - обновляем
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext'; // ✅ ДОБАВИЛИ
import { openSearchGlobal } from '../../hooks/useSearch';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import CartModal from '../CartModal/CartModal';
import PriceFilterModal from '../PriceFilterModal/PriceFilterModal';
import SearchBar from '../SearchBar/SearchBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { useFilter } from '../../context/FilterContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist(); // ✅ ДОБАВИЛИ
  const { openFilter, isFilterActive } = useFilter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  const handleWishlistClick = () => {
      if (location.pathname === '/wishlist') {
        navigate(-1); // Назад
      } else {
        navigate('/wishlist'); // В избранное
      }
      closeMenu();
    };
 
  return (
    <>
    <header className="mountain-header">
      <div className="header-top">
        <a href="#" className="mountain-logo">Musk<span>Lions</span></a>
        <div className="mountain-actions">
          <ThemeToggle />
          {/* ✅ ДОБАВИЛИ ИКОНКУ ИЗБРАННОГО */}
          <div 
            className="wishlist-icon-wrapper" 
            onClick={handleWishlistClick}
          >
            <div className="mountain-wishlist-icon">
              {location.pathname === '/wishlist' ? '←' : '🤎'}
            </div>
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </div>
          
          <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(true)}>
            <div className="mountain-cart-icon">
              👜
            </div>
            {totalCount > 0 && (
              <span className={`cart-count ${totalCount > 0 ? 'pulse' : ''}`}>
                {totalCount}
              </span>
            )}
          </div>
          
          <button 
            className="mountain-btn" 
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* 🎯 ДОБАВИЛИ ИЗБРАННОЕ В МЕНЮ */}
      <nav className={`mountain-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#" onClick={closeMenu}>Главная</a></li>
          <li><a href="#" onClick={closeMenu}>Горная коллекция</a></li>
          <li>
        <Link to="/wishlist" onClick={closeMenu} className="wishlist-in-menu">
          Избранное
          {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
        </Link>
          </li>
          
          {/* 🎯 ПОИСК В МЕНЮ */}
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openSearchGlobal();
                closeMenu();
              }}
              className="search-in-menu"
            >
              Поиск по аромату
            </a>
          </li>
          
          {/* 🎯 ФИЛЬТР В МЕНЮ */}
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openFilter();
                closeMenu();
              }}
              className="filter-in-menu"
            >
              Фильтр по цене
              {isFilterActive && <span className="filter-badge">●</span>}
            </a>
          </li>
          
          <li><a href="#" onClick={closeMenu}>О нас</a></li>
          <li><a href="#" onClick={closeMenu}>Связь с нами</a></li>
        </ul>
      </nav>
    </header>
    <SearchBar />

    {/* 🎯 МОДАЛКИ */}
    <CartModal 
      isOpen={isCartOpen} 
      onClose={() => setIsCartOpen(false)} 
    />
    </>
  );
};

export default Header;