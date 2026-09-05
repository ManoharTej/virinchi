// VIRINCHI EQUALIZER TICKER BAR
// Continuous marquee ticker with frequency bars and cultural announcements

import React from 'react';
import { Sparkles, Radio } from 'lucide-react';

export default function EqualizerTicker() {
  const announcements = [
    "VIRINCHI — THE CULTURAL CLUB OF VBIT",
    "AUDITIONS 2025–26 OPEN FOR ALL 6 WINGS",
    "SWARA • NATYA • ABHINAYA • KALAKRITI • SAHITI • CHALANA",
    "FLAGSHIP FEST VIBHA '25 APPROACHING",
    "18+ YEARS OF CULTURAL EXCELLENCE AT VBIT",
    "REGISTER ON THE AUDITIONS PORTAL TODAY"
  ];

  return (
    <div className="w-full bg-[#080911] border-y border-rose-500/20 py-2.5 overflow-hidden select-none relative z-20">
      <div className="flex items-center space-x-8 animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        {[...announcements, ...announcements].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-3">
            {/* Animated Equalizer mini-bars */}
            <div className="flex items-end space-x-[2px] h-3.5">
              <span className="eq-bar h-2"></span>
              <span className="eq-bar h-3.5"></span>
              <span className="eq-bar h-1.5"></span>
              <span className="eq-bar h-3"></span>
            </div>

            <span className="font-mono text-xs tracking-[0.2em] font-semibold uppercase text-slate-300">
              {item}
            </span>

            <span className="text-rose-500 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
