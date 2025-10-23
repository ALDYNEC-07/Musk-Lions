import React from 'react';
import './BottomNav.css';

const BottomNav = () => {
  const navItems = [
    { icon: '🏠', label: 'Главная' },
    { icon: '🏔️', label: 'Коллекция' },
    { icon: '🤝', label: 'О нас' },
    { icon: '📞', label: 'Контакты' }
  ];

  return (
    <nav className="mountain-bottom-nav">
      {navItems.map((item, index) => (
        <a key={index} href="#" className="mountain-nav-item">
          <span className="mountain-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;