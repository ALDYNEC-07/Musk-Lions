// components/AboutModal/AboutModal.jsx
import React from 'react';
import './AboutContactModal.css';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content about-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <div className="about-header">
          <h2>О Musk Lions</h2>
          <div className="brand-symbol">🦁</div>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h3>Наша философия</h3>
            <p>
              Musk Lions — это искусство парфюмерии, вдохновленное мощью и грацией горных львов. 
              Мы создаем ароматы, которые пробуждают внутреннюю силу и уверенность.
            </p>
          </div>

          <div className="about-section">
            <h3>Ручная работа</h3>
            <p>
              Каждый флакон — это уникальная композиция, созданная вручную из отборных натуральных ингредиентов. 
              Ограниченный тираж гарантирует исключительность каждого аромата.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-item">
              <span className="feature-text">Эксклюзивные композиции</span>
            </div>
            <div className="feature-item">
              <span className="feature-text">Натуральные ингредиенты</span>
            </div>
            <div className="feature-item">
              <span className="feature-text">Ручная сборка</span>
            </div>
            <div className="feature-item">
              <span className="feature-text">Ограниченный тираж</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;