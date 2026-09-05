// VIRINCHI OFFICIAL BRAND LOGO COMPONENT
// Preserves exact typography, musical equalizer bars, harmonic frequency crest, and crimson/hot-pink identity

import React from 'react';

export default function VirinchiLogo({
  variant = "full", // "full", "horizontal", "emblem", "minimal"
  size = "md", // "sm", "md", "lg", "xl", "hero"
  animated = false,
  glow = true,
  className = ""
}) {
  // Height scale mapping
  const heightMap = {
    sm: "h-7",
    md: "h-10",
    lg: "h-14",
    xl: "h-20",
    hero: "h-28 md:h-36"
  };

  const currentHeight = heightMap[size] || "h-10";

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentHeight} w-auto overflow-visible`}
      >
        <defs>
          {/* Crimson to Hot-Pink to Orange Gradient */}
          <linearGradient id="virinchiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a5f" />
            <stop offset="45%" stopColor="#f43f5e" />
            <stop offset="85%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          <linearGradient id="equalizerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="60%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          {/* Volumetric Neon Glow Filter */}
          <filter id="virinchiGlow" x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Musical Equalizer Bars on top of the emblem (Frequency Peaks) */}
        <g className={animated ? "animate-pulse" : ""} filter={glow ? "url(#virinchiGlow)" : undefined}>
          {/* Left Frequency Bars */}
          <rect x="195" y="18" width="4" height="24" rx="2" fill="url(#equalizerGrad)" opacity="0.8" />
          <rect x="205" y="10" width="4" height="32" rx="2" fill="url(#equalizerGrad)" opacity="0.9" />
          <rect x="215" y="4" width="4" height="38" rx="2" fill="url(#equalizerGrad)" />
          
          {/* Central Wave Crest / Musical Pulse */}
          <rect x="225" y="0" width="5" height="42" rx="2.5" fill="#ff4d79" />
          <circle cx="227.5" cy="-6" r="3.5" fill="#ff2a5f" />

          {/* Right Frequency Bars */}
          <rect x="236" y="4" width="4" height="38" rx="2" fill="url(#equalizerGrad)" />
          <rect x="246" y="10" width="4" height="32" rx="2" fill="url(#equalizerGrad)" opacity="0.9" />
          <rect x="256" y="18" width="4" height="24" rx="2" fill="url(#equalizerGrad)" opacity="0.8" />

          {/* High-frequency dynamic signal arc */}
          <path
            d="M 180 32 Q 227 -12 274 32"
            stroke="url(#virinchiGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* The Stylized VIRINCHI Wordmark (Bold, Musical-Geometric Identity) */}
        <g filter={glow ? "url(#virinchiGlow)" : undefined}>
          {/* V */}
          <path
            d="M 35 48 L 54 104 L 72 48 L 61 48 L 54 84 L 46 48 Z"
            fill="url(#virinchiGrad)"
          />
          {/* I */}
          <path
            d="M 85 48 L 96 48 L 96 104 L 85 104 Z"
            fill="url(#virinchiGrad)"
          />
          {/* R */}
          <path
            d="M 112 48 L 138 48 C 150 48 157 55 157 65 C 157 73 151 79 141 81 L 158 104 L 145 104 L 131 83 L 123 83 L 123 104 L 112 104 Z M 123 58 L 123 74 L 136 74 C 142 74 146 71 146 66 C 146 61 142 58 136 58 Z"
            fill="url(#virinchiGrad)"
          />
          {/* I */}
          <path
            d="M 172 48 L 183 48 L 183 104 L 172 104 Z"
            fill="url(#virinchiGrad)"
          />
          {/* N */}
          <path
            d="M 199 48 L 210 48 L 235 88 L 235 48 L 246 48 L 246 104 L 235 104 L 210 64 L 210 104 L 199 104 Z"
            fill="url(#virinchiGrad)"
          />
          {/* C */}
          <path
            d="M 297 58 C 291 51 282 48 271 48 C 255 48 244 60 244 76 C 244 92 255 104 271 104 C 282 104 291 101 297 94 L 290 85 C 285 91 278 94 271 94 C 261 94 255 86 255 76 C 255 66 261 58 271 58 C 278 58 285 61 290 67 Z"
            fill="url(#virinchiGrad)"
          />
          {/* H */}
          <path
            d="M 314 48 L 325 48 L 325 70 L 350 70 L 350 48 L 361 48 L 361 104 L 350 104 L 350 80 L 325 80 L 325 104 L 314 104 Z"
            fill="url(#virinchiGrad)"
          />
          {/* I */}
          <path
            d="M 377 48 L 388 48 L 388 104 L 377 104 Z"
            fill="url(#virinchiGrad)"
          />
        </g>

        {/* Frequency Underline Accents */}
        <line x1="35" y1="112" x2="388" y2="112" stroke="url(#virinchiGrad)" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="35" cy="112" r="2" fill="#ff2a5f" />
        <circle cx="388" cy="112" r="2" fill="#f97316" />

        {/* Subtitle: THE CULTURAL CLUB OF VBIT */}
        {variant !== "minimal" && (
          <text
            x="211"
            y="126"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="10.5"
            fontFamily="Syne, sans-serif"
            fontWeight="700"
            letterSpacing="5.5"
            opacity="0.95"
          >
            THE CULTURAL CLUB OF VBIT
          </text>
        )}
      </svg>
    </div>
  );
}
