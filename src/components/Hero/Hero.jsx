import React from 'react';
import mountainImage from '../../assets/MontainImg.jpg';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {

  return (
    <section className="mountain-hero chechen-pattern"
        style={{
        background: `linear-gradient(135deg, rgba(26, 18, 11, 0.9) 0%, rgba(44, 24, 16, 0.8) 100%), url(${mountainImage})`
        }}
      >
      <div className="hero-content">
        <h1 className="hero-title">Ароматы, которые не стираются за час</h1>
        <p className="hero-subtitle">
          Наслаждайтесь стойкостью парфюма как минимум 24 часа — ваша история будет длиться весь день и больше
        </p>
        <Link to="/collection" className="mountain-cta primary">
          Найти свой стойкий аромат
        </Link>
      </div>
    </section>
  );
};

export default Hero;

