import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="mountain-header">
      <div className="header-top">
        <a href="#" className="mountain-logo">Musk<span>Lions</span></a>
        <div className="mountain-actions">
          <button className="mountain-btn">🔍</button>
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
  );
};

export default Header;