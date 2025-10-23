import React, { useEffect, useState } from 'react';
import './SmokeAnimation.css';

const SmokeAnimation = ({ 
  startPosition, 
  onComplete 
}) => {
  const [phase, setPhase] = useState('emerging');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Создаем частицы дыма
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 500,
        duration: Math.random() * 1000 + 1000
      });
    }
    setParticles(newParticles);

    // Управление фазами анимации
    const phases = [
      { phase: 'forming', delay: 800 },
      { phase: 'moving', delay: 1800 },
      { phase: 'dissolving', delay: 2800 },
      { phase: 'complete', delay: 3500 }
    ];

    phases.forEach(({ phase, delay }) => {
      setTimeout(() => {
        setPhase(phase);
        if (phase === 'complete' && onComplete) {
          onComplete();
        }
      }, delay);
    });
  }, [onComplete]);

  const getAnimationClass = () => {
    return `smoke-animation ${phase}`;
  };

  return (
    <div 
      className={getAnimationClass()}
      style={{
        left: startPosition.x,
        top: startPosition.y
      }}
    >
      {/* Частицы дыма */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="smoke-particle"
          style={{
            '--size': `${particle.size}px`,
            '--delay': `${particle.delay}ms`,
            '--duration': `${particle.duration}ms`,
            '--particle-index': particle.id
          }}
        />
      ))}
    </div>
  );
};

export default SmokeAnimation;