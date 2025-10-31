import React from 'react';
import mountainImage from '../../assets/Гора3.jpg';
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
        <h1 className="hero-title">Ароматы, создающие истории</h1>
        <p className="hero-subtitle">
          Найдите аромат, который создаст вашу историю
        </p>
        <Link to="/collection" className="mountain-cta primary">
          Открыть коллекцию
        </Link>
      </div>
    </section>
  );
};

export default Hero;

