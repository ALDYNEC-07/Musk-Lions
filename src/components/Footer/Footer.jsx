import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="mountain-footer">
      <div className="mountain-footer-content">
        <div className="mountain-footer-column">
          <h4>Musk Lions</h4>
          <p>Каждый аромат - это история, которая только начинается.</p>
        </div>
        
        <div className="mountain-footer-column">
          <h4>Контакты</h4>
          <ul>
            <li>📞 +7 (929) 252-37-37</li>
            <li><a href="https://www.instagram.com/musklions?igsh=MXVrb2gyaGxvajhqZA%3D%3D&utm_source=qr"><i className="fa fa-instagram fa-lg" aria-hidden="true"></i> - Instagram</a></li>
            <li><a href="https://t.me/musk_lions"><i className="fa fa-telegram fa-lg" aria-hidden="true"></i> - Telegramm</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mountain-copyright">
        &copy; 2015-2026 Musk Lions. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
