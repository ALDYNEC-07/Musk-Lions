// components/ContactModal/ContactModal.jsx
import React from 'react';
import './AboutContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <div className="contact-header">
          <h2>Связь с нами</h2>
          <div className="contact-symbol">📞</div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div className="contact-details">
                <h4>Email</h4>
                <p>hello@musklions.ru</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div className="contact-details">
                <h4>Телефон</h4>
                <p>+7 (929) 252-37-37</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <div className="contact-details">
                <h4>Время работы</h4>
                <p>Пн-Пт: 10:00 - 20:00</p>
                <p>Сб-Вс: 11:00 - 18:00</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div className="contact-details">
                <h4>Адрес</h4>
                <p>Москва, ул. Горная, 15</p>
              </div>
            </div>
          </div>

          <div className="contact-actions">
            <button className="contact-btn primary">
              📧 Написать нам
            </button>
            <button className="contact-btn secondary">
              📱 Позвонить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
