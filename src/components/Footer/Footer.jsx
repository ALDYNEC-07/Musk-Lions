import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mountain-footer">
      <div className="mountain-footer-content">
        <div className="mountain-footer-column">
          <Link to="/" className="footer-home-link" onClick={handleLogoClick}>
            <h4>Musk Lions</h4>
          </Link>
          <p>Каждый аромат - это история, которая только начинается.</p>
        </div>
        
        <div className="mountain-footer-column">
          <h4>Контакты</h4>
          <ul className="contact-list">
            <li className="contact-phone">
              <a href="tel:+79292523737">📞 +7 (929) 252-37-37</a>
            </li>
            <li className="social-links">
              <a href="https://www.instagram.com/musklions?igsh=MXVrb2gyaGxvajhqZA%3D%3D&utm_source=qr"><i className="fa fa-instagram fa-lg" aria-hidden="true"></i>Instagram</a>
              <a href="https://t.me/musk_lions"><i className="fa fa-telegram fa-lg" aria-hidden="true"></i>Telegramm</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mountain-copyright">
        &copy; 2015 - 2026 Musk Lions
        <br />
        Все права защищены
      </div>
    </footer>
  );
};

export default Footer;
