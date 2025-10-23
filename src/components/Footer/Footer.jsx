import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="mountain-footer">
      <div className="mountain-footer-content">
        <div className="mountain-footer-column">
          <h4>Musk Lions</h4>
          <p>Сила традиций в современной парфюмерии. Гордимся своим наследием.</p>
        </div>
        
        <div className="mountain-footer-column">
          <h4>Контакты</h4>
          <ul>
            <li>+7 (999) 123-45-67</li>
            <li>info@musk-lions.ru</li>
            <li>Грозный, пр. Мухаммеда Али, 15</li>
          </ul>
        </div>
      </div>
      
      <div className="mountain-copyright">
        &copy; 2024 Musk Lions. С уважением к традициям.
      </div>
    </footer>
  );
};

export default Footer;