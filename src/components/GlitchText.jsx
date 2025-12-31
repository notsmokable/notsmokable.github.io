import React from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, as: Component = 'h1', className = '', ...props }) => {
  // We can use Framer Motion for some juice, or pure CSS for the glitch.
  // Using pure CSS for the "split RGB" look is often more performant and authentic.

  return (
    <Component
      className={`glitch-wrapper ${className}`}
      data-text={text}
      {...props}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span className="glitch-main">{text}</span>
      <span className="glitch-layer layer-1" aria-hidden="true">{text}</span>
      <span className="glitch-layer layer-2" aria-hidden="true">{text}</span>

      <style>{`
        .glitch-wrapper {
          position: relative;
        }
        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .layer-1 {
          color: var(--color-primary);
          z-index: -1;
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
          opacity: 0.8;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, 0);
        }
        .layer-2 {
          color: var(--color-secondary);
          z-index: -2;
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
          opacity: 0.8;
          clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
          transform: translate(2px, 0);
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 0); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 0); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 0); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
          100% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, 0); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 0); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 0); }
          80% { clip-path: inset(60% 0 30% 0); transform: translate(2px, 0); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 0); }
        }
      `}</style>
    </Component>
  );
};

export default GlitchText;
