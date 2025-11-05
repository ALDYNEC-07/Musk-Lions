import React, { useState } from 'react';
import { features } from '../../data/products';
import './Features.css';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="mountain-features">
      <div className="features-horizontal">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-horizontal-card ${index === activeFeature ? 'active' : ''}`}
            onClick={() => setActiveFeature(index)}
          >
            <div className="feature-content">
              <div className="mountain-feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-indicator">
                <div className="indicator-dot"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;