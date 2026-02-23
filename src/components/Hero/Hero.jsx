import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = heroRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <section className="mountain-hero" ref={heroRef}>
      <video className="hero-video" ref={videoRef} autoPlay muted loop playsInline preload="metadata">
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
