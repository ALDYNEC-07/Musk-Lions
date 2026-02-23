import React, { useState, useRef, useEffect } from 'react';
import { features } from '../../data/products';
import './Features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const featuresRef = useRef();

  // Закрытие при клике вне блока
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setActiveFeature(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFeatureClick = (index) => {
    setActiveFeature(activeFeature === index ? null : index);
  };

  return (
    <section className="mountain-features" ref={featuresRef}>
      <div className="features-horizontal">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-horizontal-card ${index === activeFeature ? 'active' : ''}`}
            onClick={() => handleFeatureClick(index)}
          >
            <div className="feature-content">
              <div className="mountain-feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-indicator">
                <div className="indicator-dot"></div>
                {/* Добавляем крестик для закрытия */}
                {index === activeFeature}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;