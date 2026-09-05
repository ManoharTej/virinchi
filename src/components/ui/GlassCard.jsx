// REUSABLE GLASSMORPHIC CARD WITH DYNAMIC NEON BORDER GLOW

import React, { useRef, useState } from 'react';

export default function GlassCard({
  children,
  className = "",
  glowColor = "rgba(244, 63, 94, 0.35)",
  interactive = true,
  onClick
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-[#0c0d18]/80 backdrop-blur-xl border border-white/10 transition-all duration-500 ${
        interactive ? 'hover:-translate-y-1.5 hover:border-rose-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]' : ''
      } ${className}`}
    >
      {/* Dynamic flashlight glow on hover */}
      {interactive && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`
          }}
        />
      )}

      {/* Inner Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
