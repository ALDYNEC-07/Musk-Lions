import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useFilter } from '../../context/FilterContext';
import { openSearchGlobal } from '../../hooks/useSearch';
import CartModal from '../CartModal/CartModal';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';
import AboutModal from '../AboutContactModal/AboutModal';
import ContactModal from '../AboutContactModal/ContactModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openFilter, isFilterActive } = useFilter();


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearchClick = () => {
    openSearchGlobal();
    closeMenu();
  };

  const handleFilterClick = () => {
    openFilter();
    closeMenu();
  };

  const handleAboutClick = () => {
    setIsAboutOpen(true);
    closeMenu();
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
    closeMenu();
  };

  const handleLogoClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { 
      label: 'Главная',
      component: (
        <Link to="/" className="mountain-logo" onClick={handleLogoClick}>
          Musk<span>Lions</span>
        </Link>
      )
    },
    { 
      label: 'Открыть коллекцию', 
      component: (
        <Link to="/collection" onClick={closeMenu}>
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
      onClick: handleAboutClick
    },
    { 
      label: 'Связь с нами', 
      onClick: handleContactClick
    }
  ];

  return (
    <>
      <header className="mountain-header">
        <div className="header-top">
          <Link to="/" className="mountain-logo" onClick={handleLogoClick}>
            Musk<span>Lions</span>
          </Link>
          
          <div className="mountain-actions">
            <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(true)}>
              <div className="mountain-cart-icon">
                <span
                  className="mountain-cart-icon-img"
                  style={{ '--cart-icon-url': `url(${process.env.PUBLIC_URL}/cart.svg)` }}
                  aria-hidden="true"
                />
              </div>
              {totalCount > 0 && (
                <span className="cart-count pulse">{totalCount}</span>
              )}
            </div>
            
            <button
              className="mountain-btn menu-btn"
              onClick={toggleMenu}
              type="button"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {/* Кастомный бургер из двух полос */}
              <span className="burger-icon" aria-hidden="true">
                <span className="burger-line" />
                <span className="burger-line" />
              </span>
            </button>
          </div>
        </div>
        
        <nav className={`mountain-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.component || (
                  <button
                    type="button"
                    onClick={() => {
                      if (item.onClick) item.onClick();
                    }}
                    className={item.className}
                  >
                    {item.label}
                    {item.badge}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <SearchBar onResultClick={closeMenu} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
};

export default Header;
