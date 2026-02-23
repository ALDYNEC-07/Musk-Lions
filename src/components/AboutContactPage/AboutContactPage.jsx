import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AboutContactPage.css';

const AboutContactPage = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.hash.replace('#', '');

    if (sectionId) {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.hash]);

  return (
    <div className="about-contact-page">
      <div className="about-contact-header">
        <h1>О НАС И СВЯЗЬ</h1>
      </div>

      <section id="about" className="about-contact-card">
        <div className="about-title-row">
          <h2>О Musk Lions</h2>
          <span className="about-symbol">🦁</span>
        </div>

        <div className="about-sections">
          <div className="about-block">
            <h3>Наша философия</h3>
            <p>
              Musk Lions - это искусство парфюмерии, вдохновленное мощью и грацией горных львов.
              Мы создаем ароматы, которые пробуждают внутреннюю силу и уверенность.
            </p>
          </div>

          <div className="about-block">
            <h3>Ручная работа</h3>
            <p>
              Каждый флакон - это уникальная композиция, созданная вручную из отборных натуральных
              ингредиентов. Ограниченный тираж гарантирует исключительность каждого аромата.
            </p>
          </div>
        </div>

        <div className="about-highlights">
          <span>Эксклюзивные композиции</span>
          <span>Натуральные ингредиенты</span>
          <span>Ручная сборка</span>
          <span>Ограниченный тираж</span>
        </div>
      </section>

      <section id="contact" className="about-contact-card">
        <div className="about-title-row">
          <h2>Связь с нами</h2>
          <span className="about-symbol">📞</span>
        </div>

        <div className="contact-grid">
          <div className="contact-item">
            <h4>Email</h4>
            <a href="mailto:hello@musklions.ru">hello@musklions.ru</a>
          </div>

          <div className="contact-item">
            <h4>Телефон</h4>
            <a href="tel:+79292523737">+7 (929) 252-37-37</a>
          </div>

          <div className="contact-item">
            <h4>Время работы</h4>
            <p>Пн-Пт: 10:00 - 20:00</p>
            <p>Сб-Вс: 11:00 - 18:00</p>
          </div>

          <div className="contact-item">
            <h4>Адрес</h4>
            <p>Москва, ул. Горная, 15</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContactPage;
