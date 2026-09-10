import React, { useState, useEffect } from 'react';

const silhouettes = [
  '/silhouette_dance.jpg',
  '/silhouette_sing.jpg',
  '/silhouette_bathukamma.jpg',
  '/silhouette_kite.jpg'
];

const colors = [
  '#ff3366', // Neon Pink/Red
  '#ff9933', // Neon Orange
  '#ffea00', // Neon Yellow
  '#00ffcc', // Neon Cyan/Green
  '#33ccff', // Neon Light Blue
  '#b366ff', // Neon Purple
  '#ff66b3'  // Neon Magenta
];

export default function SilhouetteCircle() {
  const [imgIndex, setImgIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    // Change image every 4 seconds
    const imgInterval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % silhouettes.length);
    }, 4000);

    // Change color every 2 seconds
    const colorInterval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, 2000);

    return () => {
      clearInterval(imgInterval);
      clearInterval(colorInterval);
    };
  }, []);

  const currentColor = colors[colorIndex];

  return (
    <div style={{
      position: 'absolute',
      bottom: '5%',
      left: '5%',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: `radial-gradient(circle at center, ${currentColor} 0%, #0d0614 60%)`,
      transition: 'background 2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      {silhouettes.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Silhouette ${idx}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: imgIndex === idx ? 0.8 : 0,
            transition: 'opacity 1.5s ease-in-out',
            mixBlendMode: 'multiply',
            // Fade out the bottom of the image into transparent
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        />
      ))}
    </div>
  );
}
