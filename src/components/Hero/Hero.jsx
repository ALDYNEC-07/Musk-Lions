import React from 'react';
import './Hero.css';

const Hero = () => {

  return (
    <section className="mountain-hero chechen-pattern">
      <div className="hero-content">
        <h1 className="hero-title">Ароматы, создающие истории</h1>
        <p className="hero-subtitle">
          Найдите аромат, который создаст вашу историю
        </p>
        <a href="#" className="mountain-cta">Открыть коллекцию</a>
      </div>
    </section>
  );
};

export default Hero;

