import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="mountain-hero">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={`${process.env.PUBLIC_URL}/hero-videoo.mp4`} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
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
