// VIRINCHI EVENTS & FESTIVALS DIRECTORY
// Upcoming & Past Fests, Categories, Rich Posters, Timeline

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { EVENTS } from '../data/events';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';

export default function Events() {
  const [filterTab, setFilterTab] = useState('All'); // 'All', 'Upcoming', 'Past'
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Mega Flagship', 'Inter-College', 'Music', 'Heritage'];

  const filteredEvents = EVENTS.filter((evt) => {
    const matchesTab = filterTab === 'All' || evt.status === filterTab;
    const matchesCat = categoryFilter === 'All' || evt.category === categoryFilter;
    return matchesTab && matchesCat;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>FESTIVALS & PRODUCTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            VIRINCHI <span className="brand-gradient">EVENTS</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            FLAGSHIPS • INTER-COLLEGE BATTLEFIELDS • ACOUSTIC NIGHTS
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto pt-2">
            Explore the flagship cultural festivals that define campus life at VBIT. Each event is supported by comprehensive dossiers, schedules, and media archives.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Status Tabs */}
          <div className="p-1 rounded-full bg-white/5 border border-white/10 inline-flex space-x-1">
            {['All', 'Upcoming', 'Past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-5 py-1.5 rounded-full text-xs font-display tracking-wider uppercase transition-all ${
                  filterTab === tab
                    ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  categoryFilter === cat
                    ? 'bg-white/20 text-white font-semibold border border-rose-500/50'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <GlassCard key={evt.id} className="group flex flex-col justify-between overflow-hidden">
              <div>
                {/* Poster Cover */}
                <div className="relative aspect-video overflow-hidden border-b border-white/10">
                  <img
                    src={evt.poster}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a14] via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold ${
                        evt.status === 'Upcoming'
                          ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.8)]'
                          : 'bg-slate-800/90 text-slate-300'
                      }`}
                    >
                      {evt.status}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-slate-300 font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                      {evt.category}
                    </span>
                  </div>
                </div>

                {/* Event Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs font-mono text-rose-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-white group-hover:text-rose-400 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {evt.summary}
                  </p>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <Link
                  to={`/events/${evt.slug}`}
                  className="btn-primary w-full text-xs py-2.5 flex items-center justify-center space-x-2"
                >
                  <span>EXPLORE EVENT DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
