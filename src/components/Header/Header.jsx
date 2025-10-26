import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import CartModal from '../CartModal/CartModal';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
      
      <nav className={`mountain-nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#" onClick={closeMenu}>Главная</a></li>
          <li><a href="#" onClick={closeMenu}>Горная коллекция</a></li>
          <li><a href="#" onClick={closeMenu}>Традиции качества</a></li>
          <li><a href="#" onClick={closeMenu}>О нас</a></li>
          <li><a href="#" onClick={closeMenu}>Связь с нами</a></li>
        </ul>
      </nav>
    </header>

     <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Header;

