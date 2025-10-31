// Header.jsx - ОЧИЩЕННАЯ И УЛУЧШЕННАЯ ВЕРСИЯ
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useFilter } from '../../context/FilterContext';
import { openSearchGlobal } from '../../hooks/useSearch';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import CartModal from '../CartModal/CartModal';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';
import AboutModal from '../AboutContactModal/AboutModal';
import ContactModal from '../AboutContactModal/ContactModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // About us and contact
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openFilter, isFilterActive } = useFilter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleWishlistClick = () => {
    if (location.pathname === '/wishlist') {
      navigate(-1);
    } else {
      navigate('/wishlist');
    }
    closeMenu();
  };

  const handleSearchClick = () => {
    openSearchGlobal();
    closeMenu();
  };

  const handleFilterClick = () => {
    openFilter();
    closeMenu();
  };

  const menuItems = [
    { label: 'Главная',
      component: (
          <Link to="/" className="mountain-logo" onClick={closeMenu} >
            Musk<span>Lions</span>
          </Link>
      )
     },
    { label: 'Открыть коллекцию', 
      component: (
                <Link to="/collection" onClick={closeMenu} >
                  Открыть коллекцию
                </Link>
      )
    },
    { 
      label: 'Избранное', 
      component: (
        <Link to="/wishlist" onClick={closeMenu}>
          Избранное
          {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
        </Link>
      )
    },
    { 
      label: 'Поиск по аромату', 
      onClick: handleSearchClick,
      className: 'search-in-menu'
    },
    { 
      label: 'Фильтр по цене', 
      onClick: handleFilterClick,
      className: 'filter-in-menu',
      badge: isFilterActive && <span className="filter-badge">●</span>
    },
    { 
      label: 'О нас', 
      onClick: () => {
        setIsAboutOpen(true);
        closeMenu();
      }
    },
    { 
      label: 'Связь с нами', 
      onClick: () => {
        setIsContactOpen(true);
        closeMenu();
      }
    }
  ];

  return (
    <>
      <header className="mountain-header">
        <div className="header-top">
          <Link to="/" className="mountain-logo">
            Musk<span>Lions</span>
          </Link>
          
          <div className="mountain-actions">
            <ThemeToggle />
            
            {/* Иконка избранного */}
            <div className="wishlist-icon-wrapper" onClick={handleWishlistClick}>
              <div className="mountain-wishlist-icon">
                {location.pathname === '/wishlist' ? '←' : '🤎'}
              </div>
              {wishlistCount > 0 && location.pathname !== '/wishlist' && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </div>
            
            {/* Иконка корзины */}
            <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(true)}>
              <div className="mountain-cart-icon">👜</div>
              {totalCount > 0 && (
                <span className="cart-count pulse">{totalCount}</span>
              )}
            </div>
            
            <button className="mountain-btn" onClick={toggleMenu}>☰</button>
          </div>
        </div>
        
        {/* Навигационное меню */}
        <nav className={`mountain-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.component || (
                  <a 
                    href="#" 
                    onClick={item.onClick}
                    className={item.className}
                  >
                    {item.label}
                    {item.badge}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Глобальные компоненты */}
      <SearchBar />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;
