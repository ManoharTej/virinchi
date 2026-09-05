// VIRINCHI AWARDS & ACHIEVEMENTS TROPHY ROOM
// Honors, Inter-University Championships, Animated Stat Counters

import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { ACHIEVEMENTS, ACHIEVEMENT_STATS } from '../data/achievements';
import { Trophy, Award, Medal, Flame, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function Achievements() {
  const [wingFilter, setWingFilter] = useState('All');

  const wings = ['All', 'Abhinaya (Drama)', 'Swara (Music)', 'Natya (Dance)', 'Kalakriti (Arts)', 'Chalana (Media)'];

  const filteredAchievements = wingFilter === 'All'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.wing.includes(wingFilter.split(' ')[0]));

  const badgeIcons = {
    Trophy: Trophy,
    Award: Award,
    Medal: Medal,
    Flame: Flame
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & LAURELS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            HALL OF <span className="brand-gradient">ACHIEVEMENTS</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            STATE TROPHIES • NATIONAL CONCLAVES • EXCELLENCE SHIELDS
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto pt-2">
            Documenting the competitive victories and institutional accolades brought home by the cultural contingents of VBIT.
          </p>
        </div>

        {/* Counter Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {ACHIEVEMENT_STATS.map((stat, i) => (
            <GlassCard key={i} className="p-6 text-center border-rose-500/30 box-glow">
              <span className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-white">
                {stat.value}
              </span>
              <p className="font-mono text-xs text-slate-300 uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {wings.map((w) => (
            <button
              key={w}
              onClick={() => setWingFilter(w)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                wingFilter === w
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((ach) => {
            const IconComponent = badgeIcons[ach.icon] || Trophy;
            return (
              <GlassCard key={ach.id} className="p-7 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold">
                      {ach.badge}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                      {ach.year} • {ach.wing}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-1 group-hover:text-rose-400 transition-colors">
                      {ach.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Conferred by:</span>
                  <span className="text-white font-semibold">{ach.organization}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
