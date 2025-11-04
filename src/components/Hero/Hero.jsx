import React from 'react';
import mountainImage from '../../assets/h.png';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {

  return (
    <section className="mountain-hero chechen-pattern"
        style={{
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(35, 22, 18, 0.8) 100%), url(${mountainImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center bottom 80%', backgroundRepeat: 'no-repeat'
        }}
      >
      <div className="hero-content">
        <h1 className="hero-title">Ароматы, которые не стираются за час</h1>
        <p className="hero-subtitle">
          Наслаждайтесь стойкостью в течение дня. Ваш аромат не выдохнется к обеду 
        </p>
        <Link to="/collection" className="mountain-cta primary">
          Найти свой стойкий аромат
        </Link>
      </div>
    </section>
  );
};

export default Hero;

