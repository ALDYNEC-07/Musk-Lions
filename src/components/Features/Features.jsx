import React from 'react';
import { features } from '../../data/products';
import './Features.css';

const Features = () => {
  return (
    <section className="mountain-features">
      <div className="mountain-features-grid">
        {features.map(feature => (
          <div key={feature.id} className="mountain-feature-card">
            <div className="mountain-feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;