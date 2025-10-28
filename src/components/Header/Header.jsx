import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useFilter } from '../../context/FilterContext';
import { openSearchGlobal } from '../../hooks/useSearch';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import CartModal from '../CartModal/CartModal';
import PriceFilterModal from '../PriceFilterModal/PriceFilterModal';
import SearchBar from '../SearchBar/SearchBar'; // 🎯 ПЕРЕНОСИМ СЮДА
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { totalCount } = useCart();
  const { openFilter, isFilterActive } = useFilter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 🎯 ОТКРЫТИЕ ПОИСКА ИЗ МЕНЮ
  const handleSearchClick = () => {
    openSearchGlobal();
    closeMenu();
  };

  // 🎯 ОТКРЫТИЕ ФИЛЬТРА ИЗ МЕНЮ
  const handleFilterClick = () => {
    openFilter();
    closeMenu();
  };

  return (
    <>
    <header className="mountain-header">
      <div className="header-top">
        <a href="#" className="mountain-logo">Musk<span>Lions</span></a>
        <div className="mountain-actions">
          <ThemeToggle />
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
      
      {/* 🎯 ПОИСК И ФИЛЬТР ТОЛЬКО В МЕНЮ */}
      <nav className={`mountain-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#" onClick={closeMenu}>Главная</a></li>
          <li><a href="#" onClick={closeMenu}>Горная коллекция</a></li>
          
          {/* 🎯 ПОИСК В МЕНЮ */}
          <li>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleSearchClick();
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
                handleFilterClick();
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

    {/* 🎯 МОДАЛКИ */}
    <CartModal 
      isOpen={isCartOpen} 
      onClose={() => setIsCartOpen(false)} 
    />
    
    <PriceFilterModal />
    <SearchBar />
    </>
  );
};

export default Header;


