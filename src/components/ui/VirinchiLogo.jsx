// VIRINCHI OFFICIAL BRAND LOGO COMPONENT
// Uses the exact official brandmark provided by the user with crimson/hot-pink glowing aura

import React from 'react';
import logoImg from '../../assets/virinchi_logo.png';

export default function VirinchiLogo({
  size = "md", // "sm", "md", "lg", "xl", "hero"
  glow = true,
  className = "",
  showSubtitle = true
}) {
  const heightMap = {
    sm: "h-8 sm:h-9",
    md: "h-11 sm:h-13",
    lg: "h-16 sm:h-20",
    xl: "h-24 sm:h-28",
    hero: "h-28 sm:h-36 md:h-44"
  };

  const currentHeight = heightMap[size] || "h-12";

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official Virinchi Logo Image with Crimson Neon Glow */}
      <div className="relative group flex items-center justify-center">
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/30 via-pink-600/40 to-orange-500/20 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 scale-95"></div>
        )}
        <img
          src={logoImg}
          alt="VIRINCHI — THE CULTURAL CLUB OF VBIT"
          className={`${currentHeight} w-auto object-contain drop-shadow-[0_0_20px_rgba(244,63,94,0.45)] transition-transform duration-300 group-hover:scale-[1.02]`}
        />
      </div>

      {/* Official Brand Tagline */}
      {showSubtitle && size !== "sm" && (
        <div className="mt-2 text-center">
          <span className="font-display font-black text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-slate-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            THE CULTURAL CLUB OF VBIT
          </span>
        </div>
      )}
    </div>
  );
}
