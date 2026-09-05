// VIRINCHI CINEMATIC CULTURAL STAGE (HOME)
// Non-scrollable viewport-fitted interactive cultural console + Exact Logo + Swara Soundboard + Wings Hologram

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VirinchiLogo from '../components/ui/VirinchiLogo';
import AudioFrequencyVisualizer from '../components/ui/AudioFrequencyVisualizer';
import GlassCard from '../components/ui/GlassCard';
import { CLUB_INFO } from '../data/clubInfo';
import { swaraSynth } from '../utils/audioSynth';
import { 
  Sparkles, Music, Flame, Award, Volume2, ArrowRight, 
  ChevronRight, Calendar, Users, QrCode, Play, Layers 
} from 'lucide-react';

export default function Home() {
  const [activeMode, setActiveMode] = useState('spectrum'); // 'spectrum', 'vibha', 'soundboard'
  const [activeWingIndex, setActiveWingIndex] = useState(0);
  const [activeNote, setActiveNote] = useState(null);

  const swaras = [
    { note: 'Sa', freq: 'Shadja (261Hz)', desc: 'Origin / Root' },
    { note: 'Re', freq: 'Rishabh (293Hz)', desc: 'Motion' },
    { note: 'Ga', freq: 'Gandhar (329Hz)', desc: 'Melody' },
    { note: 'Ma', freq: 'Madhyam (349Hz)', desc: 'Equilibrium' },
    { note: 'Pa', freq: 'Pancham (392Hz)', desc: 'Resonance' },
    { note: 'Dha', freq: 'Dhaivat (440Hz)', desc: 'Ascent' },
    { note: 'Ni', freq: 'Nishad (493Hz)', desc: 'Climax' },
    { note: 'Sa^', freq: 'Tara Sa (523Hz)', desc: 'Transcendence' },
  ];

  const handlePlaySwara = (noteName) => {
    setActiveNote(noteName);
    swaraSynth.playSwara(noteName, 0.7);
    setTimeout(() => setActiveNote(null), 500);
  };

  const wings = CLUB_INFO.manifesto.pillars;
  const currentWing = wings[activeWingIndex];

  return (
    <div className="relative h-[calc(100vh-80px)] min-h-[640px] max-h-[1080px] w-full flex flex-col justify-between px-4 sm:px-8 pt-20 pb-4 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* TOP STATUS BAR                                                            */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-between py-1 z-20">
        <div className="flex items-center space-x-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-slate-300 font-semibold">
            VBIT SAC CULTURAL CONSOLE • ESTD. 2007
          </span>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveMode('spectrum')}
            className={`px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-display tracking-wider uppercase transition-all ${
              activeMode === 'spectrum'
                ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.6)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            6 WINGS
          </button>
          <button
            onClick={() => setActiveMode('soundboard')}
            className={`px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-display tracking-wider uppercase transition-all flex items-center space-x-1 ${
              activeMode === 'soundboard'
                ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.6)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3 h-3 text-rose-400" />
            <span>SWARA SYNTH</span>
          </button>
          <button
            onClick={() => setActiveMode('vibha')}
            className={`px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-display tracking-wider uppercase transition-all ${
              activeMode === 'vibha'
                ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.6)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            VIBHA '25
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTER STAGE: THE EXACT VIRINCHI BRAND IDENTITY                           */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center justify-center text-center my-auto z-20 py-2">
        {/* Exact Logo with Glowing Ambiance */}
        <div className="relative group transition-transform duration-500 hover:scale-[1.02]">
          <VirinchiLogo size="hero" glow={true} showSubtitle={true} />
        </div>

        {/* Dynamic Multi-Wave Audio Frequency Visualizer */}
        <div className="w-full max-w-2xl my-2">
          <AudioFrequencyVisualizer height={55} barCount={48} />
        </div>

        {/* ========================================================================= */}
        {/* DYNAMIC MODE 1: SWARA SOUNDBOARD (Interactive Web Audio API Synthesizer)  */}
        {/* ========================================================================= */}
        {activeMode === 'soundboard' && (
          <div className="w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-rose-500/40 rounded-2xl p-4 sm:p-5 box-glow animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
              <span className="flex items-center text-rose-400">
                <Music className="w-3.5 h-3.5 mr-1.5" />
                CLASSICAL SAPTAK (CLICK TO MODULATE FREQUENCY)
              </span>
              <span className="text-[10px] text-slate-500">MADHYA SAPTAK</span>
            </div>

            {/* Saptak Keys Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {swaras.map((sw) => {
                const isActive = activeNote === sw.note;
                return (
                  <button
                    key={sw.note}
                    onClick={() => handlePlaySwara(sw.note)}
                    className={`py-3 px-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-150 ${
                      isActive
                        ? 'bg-rose-600 border-rose-400 scale-95 shadow-[0_0_20px_rgba(244,63,94,0.9)] text-white'
                        : 'bg-white/5 border-rose-500/20 hover:border-rose-500/60 hover:bg-rose-600/20 text-slate-200'
                    }`}
                  >
                    <span className="font-display font-black text-base sm:text-lg text-rose-300">
                      {sw.note}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 truncate max-w-full">
                      {sw.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DYNAMIC MODE 2: 6 WINGS SPECTRUM DISPLAY                                 */}
        {/* ========================================================================= */}
        {activeMode === 'spectrum' && (
          <div className="w-full max-w-3xl bg-black/65 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 box-glow animate-in fade-in duration-300">
            {/* Wing Pills Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {wings.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => setActiveWingIndex(idx)}
                  className={`py-1.5 px-2 rounded-lg text-center transition-all border ${
                    activeWingIndex === idx
                      ? 'bg-rose-600/30 border-rose-500 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="font-display font-black text-xs">{w.name}</div>
                  <div className="text-[9px] font-mono text-slate-400 truncate">{w.category.split(' ')[0]}</div>
                </button>
              ))}
            </div>

            {/* Current Wing Spotlight Information */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-left p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
              <div className="space-y-1 max-w-md">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                    WING 0{activeWingIndex + 1}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    {currentWing.name} — {currentWing.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {currentWing.description}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <Link
                  to="/join"
                  className="btn-primary text-[10px] sm:text-xs py-2 px-4 shadow-[0_0_15px_rgba(225,29,72,0.6)]"
                >
                  <span>AUDITION</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  to="/team"
                  className="btn-secondary text-[10px] sm:text-xs py-2 px-3"
                >
                  <span>LEADS</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DYNAMIC MODE 3: VIBHA '25 FEST DOSSIER PREVIEW                           */}
        {/* ========================================================================= */}
        {activeMode === 'vibha' && (
          <div className="w-full max-w-2xl bg-black/70 backdrop-blur-xl border border-rose-500/40 rounded-2xl p-5 box-glow text-left flex flex-col sm:flex-row items-center justify-between gap-5 animate-in fade-in duration-300">
            <div className="space-y-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                MEGA FLAGSHIP FEST
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                VIBHA 2025
              </h3>
              <p className="text-xs text-slate-300 font-mono">
                3 Days of Live Music, Dance Battles, Drama & Pronites.
              </p>
              <div className="flex items-center space-x-3 text-[11px] font-mono text-rose-400 pt-1">
                <span>OCT 16–18, 2025</span>
                <span>•</span>
                <span>VBIT OPEN AIR AMPHITHEATRE</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 shrink-0 w-full sm:w-auto">
              <Link
                to="/events/vibha-annual-fest"
                className="btn-primary text-xs py-2.5 px-6 text-center"
              >
                OPEN FEST DOSSIER
              </Link>
              <Link
                to="/join"
                className="btn-secondary text-xs py-2 px-6 text-center"
              >
                VOLUNTEER / AUDITION
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CONSOLE CONTROLS & HUD SUMMARY                                     */}
      {/* ========================================================================= */}
      <div className="w-full border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2 z-20">
        <div className="flex items-center space-x-4">
          <span className="text-rose-400 font-bold">18+ YEARS CULTURAL LEGACY</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">120+ PERFORMERS</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">28+ STATE & NATIONAL TROPHIES</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/join"
            className="text-white hover:text-rose-400 font-semibold flex items-center space-x-1"
          >
            <span>APPLY FOR AUDITIONS</span>
            <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
          </Link>
          <span className="text-slate-600">•</span>
          <Link
            to="/team"
            className="text-slate-400 hover:text-white"
          >
            QR ID CARDS
          </Link>
        </div>
      </div>
    </div>
  );
}
