import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="mountain-hero chechen-pattern">
      <div className="hero-content">
        <h1 className="hero-title">Сила гор в каждом аромате</h1>
        <p className="hero-subtitle">
          Традиции чеченского качества встречаются с изысканностью французской парфюмерии
        </p>
        <a href="#" className="mountain-cta">Открыть коллекцию</a>
      </div>
    </section>
  );
};

export default Hero;