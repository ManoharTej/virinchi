import React, { useEffect, useRef } from 'react';
import { animate, random } from 'animejs';

// Custom clean SVGs for the requested elements
const icons = [
  // Mic
  <svg viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
  </svg>,
  // Bathukamma (Floral Stack)
  <svg viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
    <ellipse cx="12" cy="21" rx="10" ry="2" />
    <path d="M4 20 C 4 17, 20 17, 20 20 Z" />
    <path d="M6 17 C 6 14, 18 14, 18 17 Z" />
    <path d="M8 14 C 8 11, 16 11, 16 14 Z" />
    <path d="M10 11 C 10 8, 14 8, 14 11 Z" />
    <circle cx="12" cy="7" r="1.5" />
  </svg>,
  // Music Note
  <svg viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>,
  // Kite
  <svg viewBox="0 0 24 36" width="35" height="50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 2L4 10L12 22L20 10Z" fill="currentColor" stroke="none" />
    <path d="M12 2V22M4 10H20" stroke="#0d0614" strokeWidth="1" />
    <path d="M12 22 Q 8 26, 12 28 T 12 34" fill="none" stroke="currentColor" />
  </svg>
];

export default function FloatingRightIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current.querySelectorAll('.floating-right-icon');
    
    // Anime.js continuous looping with random physics
    els.forEach((el, i) => {
      const animateIcon = () => {
        const startX = random(-20, 20);
        
        animate(el, {
          translateY: [window.innerHeight + 100, -100], // Float entirely offscreen bottom to top
          translateX: [startX, startX + random(-40, 40)], // Gentle sway
          rotate: [random(-15, 15), random(-45, 45)], // Gentle spin
          opacity: [0, 0.8, 0.8, 0], // Fade in at bottom, fade out at top
          duration: random(15000, 25000), // Very slow, majestic float
          ease: 'linear',
          onComplete: animateIcon // Infinite loop without staggered delay gap
        });
      };
      
      // Initial stagger
      setTimeout(animateIcon, i * (20000 / els.length));
    });

  }, []);

  // Create a continuous stream by repeating the icons array
  const allIcons = [...icons, ...icons, ...icons];

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        right: '2%', // Right edge position as requested
        width: '100px', // Marked column width
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 50 // Sit above background but below interactive elements
      }}
    >
      {allIcons.map((Icon, i) => (
        <div 
          key={i} 
          className="floating-right-icon"
          style={{
            position: 'absolute',
            bottom: '-100px', // Start completely out of view
            left: `${20 + Math.random() * 40}%`, // Randomized X within the column
            color: '#ffffff', // "just white okk"
            transformOrigin: 'center center',
            filter: 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))' // Soft glow to match the vibe
          }}
        >
          {Icon}
        </div>
      ))}
    </div>
  );
}
