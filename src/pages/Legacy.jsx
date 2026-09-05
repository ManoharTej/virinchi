// VIRINCHI HISTORICAL ARCHIVE & LEGACY
// 2007 to Present: Evolution, Past Leadership, and Historic Milestones

import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { LEGACY_TIMELINE, PAST_LEADERSHIP } from '../data/legacy';
import { History, Award, Users, Calendar, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Legacy() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <History className="w-3.5 h-3.5" />
            <span>CHRONICLES • 2007 TO PRESENT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            VIRINCHI <span className="brand-gradient">LEGACY</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            EIGHTEEN YEARS OF SHAPING THE CULTURAL SOUL OF VBIT
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto pt-2">
            Explore the transformative journey of Virinchi: from an intimate campus acoustic gathering in 2007 to a statewide cultural powerhouse.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. VISUAL TIMELINE OF HISTORIC MILESTONES                                */}
        {/* ========================================================================= */}
        <div className="relative mb-24">
          {/* Central neon timeline stem */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-rose-600 via-pink-500 to-transparent"></div>

          <div className="space-y-12">
            {LEGACY_TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left/Right Content Card */}
                  <div className="w-full md:w-1/2">
                    <GlassCard className="p-7 sm:p-8 space-y-4 border-rose-500/30 box-glow">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl font-black text-rose-400">
                          {item.year}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider">
                          {item.era}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-2 text-xs text-rose-300">
                        <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span><strong>Milestone:</strong> {item.milestone}</span>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#050508] border-2 border-rose-500 text-rose-400 z-10 box-glow shrink-0">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
                  </div>

                  {/* Opposite Photo Preview */}
                  <div className="w-full md:w-1/2">
                    <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] shadow-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PREVIOUS EXECUTIVE BOARDS & LEADERSHIP                                */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
              HONOR ROLL
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
              PAST <span className="brand-gradient">LEADERSHIP</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Saluting the former presidents and executive leaders who laid the foundation for today's triumphs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAST_LEADERSHIP.map((board, idx) => (
              <GlassCard key={idx} className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-display font-bold text-lg text-white">
                    Tenure: {board.tenure}
                  </span>
                  <Award className="w-5 h-5 text-rose-500" />
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-mono text-slate-500 uppercase block">President:</span>
                    <span className="text-slate-200 font-semibold">{board.president}</span>
                  </div>
                  <div>
                    <span className="font-mono text-slate-500 uppercase block">Vice President:</span>
                    <span className="text-slate-200">{board.vicePresident}</span>
                  </div>
                  <div>
                    <span className="font-mono text-slate-500 uppercase block">General Secretary:</span>
                    <span className="text-slate-200">{board.generalSecretary}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-300 italic border-t border-white/5">
                  "{board.keyAchievement}"
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
