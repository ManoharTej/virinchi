import React, { useState, useEffect } from 'react';

const colors = [
  'rgba(255, 0, 50, 0.4)',      // Red
  'rgba(0, 200, 255, 0.4)',     // Light Blue
  'rgba(255, 50, 150, 0.4)',    // Pink
  'rgba(255, 150, 0, 0.4)',     // Orange
  'rgba(150, 50, 255, 0.4)',    // Purple
  'rgba(0, 255, 150, 0.4)',     // Neon Green
];

export default function GlowingLight() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 3500); // Change every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '-20%', // Pulled further down
        left: '0%', 
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors[colorIndex]} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 3s ease-in-out' // Extremely smooth fade between colors
      }}
    />
  );
}
