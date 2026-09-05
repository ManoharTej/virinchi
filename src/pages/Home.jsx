// VIRINCHI HOMEPAGE
// Cinematic Festival Hero + Audio Frequency Engine + Wings Showcase + Flagship Highlights + Executive Grid

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VirinchiLogo from '../components/ui/VirinchiLogo';
import AudioFrequencyVisualizer from '../components/ui/AudioFrequencyVisualizer';
import EqualizerTicker from '../components/layout/EqualizerTicker';
import GlassCard from '../components/ui/GlassCard';
import { CLUB_INFO } from '../data/clubInfo';
import { MEMBERS } from '../data/members';
import { EVENTS } from '../data/events';
import { REELS } from '../data/reels';
import { ArrowRight, Play, Sparkles, Calendar, Users, QrCode, Music, Flame, Award, ChevronRight, Video } from 'lucide-react';

export default function Home({ onPlayIntro }) {
  const [activeWing, setActiveWing] = useState(0);
  const featuredEvent = EVENTS[0]; // VIBHA
  const boardPreview = MEMBERS.slice(0, 4);
  const reelsPreview = REELS.slice(0, 4);

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SECTION                                                */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10">
        {/* Background Atmospheric Lighting & Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-20"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-600/20 via-pink-600/30 to-orange-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>

        {/* Brand Tagline Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-rose-500/30 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span className="font-mono text-xs tracking-[0.25em] text-slate-200 uppercase font-semibold">
            ESTD. 2007 • VIGNANA BHARATHI INSTITUTE OF TECHNOLOGY
          </span>
        </div>

        {/* Central Exact Virinchi Brandmark */}
        <div className="mb-4 transform hover:scale-[1.02] transition-transform duration-500">
          <VirinchiLogo size="hero" animated={true} glow={true} />
        </div>

        {/* Hero Narrative Paragraph */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8">
          The premier cultural powerhouse of VBIT. 6 artistic wings, state-champion performers, and electrifying mega fests that transform university life into cinematic memories.
        </p>

        {/* Dynamic Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link to="/join" className="btn-primary text-sm px-8 py-3.5 shadow-[0_0_35px_rgba(225,29,72,0.6)]">
            <Sparkles className="w-4 h-4" />
            <span>JOIN VIRINCHI</span>
          </Link>

          <Link to="/events" className="btn-secondary text-sm px-7 py-3.5">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>EXPLORE FESTS</span>
          </Link>

          {onPlayIntro && (
            <button
              onClick={onPlayIntro}
              className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>REPLAY INTRO</span>
            </button>
          )}
        </div>

        {/* Live Canvas Audio Waveform Integration */}
        <div className="w-full max-w-5xl mt-2">
          <div className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase mb-1">
            [ INTERACTIVE AUDIO FREQUENCY RESONATOR • HOVER TO MODULATE ]
          </div>
          <AudioFrequencyVisualizer height={140} barCount={72} />
        </div>
      </section>

      {/* Ticker Bar */}
      <EqualizerTicker />

      {/* ========================================================================= */}
      {/* 2. STATS BANNER                                                          */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#08080f]/90 border-b border-white/5 relative z-10">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {CLUB_INFO.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-300 mt-2">
                  {stat.label}
                </span>
                <span className="text-[10px] font-mono text-rose-400/80 mt-0.5">
                  {stat.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 6 CULTURAL WINGS (INTERACTIVE SELECTOR)                           */}
      {/* ========================================================================= */}
      <section className="section-padding relative z-10">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-rose-400 mb-2">
                <Music className="w-3.5 h-3.5" />
                <span>MULTIDISCIPLINARY ARTISTRY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white">
                THE 6 CULTURAL <span className="brand-gradient">WINGS</span>
              </h2>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 text-rose-400 hover:text-rose-300 font-mono text-xs tracking-wider uppercase mt-4 md:mt-0 transition-colors"
            >
              <span>EXPLORE CULTURAL MANIFESTO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Wings Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {CLUB_INFO.manifesto.pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActiveWing(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between h-28 ${
                  activeWing === idx
                    ? 'bg-rose-600/20 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-rose-400">0{idx + 1}</span>
                  <span className={`w-2 h-2 rounded-full ${activeWing === idx ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white tracking-wide">
                    {pillar.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {pillar.category}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active Wing Spotlight Card */}
          <GlassCard className="p-8 sm:p-10 border-rose-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase">
                  WING SPOTLIGHT • 0{activeWing + 1}
                </div>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
                  {CLUB_INFO.manifesto.pillars[activeWing].name} — {CLUB_INFO.manifesto.pillars[activeWing].category}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {CLUB_INFO.manifesto.pillars[activeWing].description}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/team"
                    className="btn-primary text-xs py-2.5 px-5"
                  >
                    MEET THE CREW
                  </Link>
                  <Link
                    to="/join"
                    className="btn-secondary text-xs py-2.5 px-5"
                  >
                    AUDITION FOR THIS WING
                  </Link>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/60 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 box-glow">
                  <Flame className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-white text-lg">
                  Auditions Ongoing
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Selected candidates participate in state-level university fests, inter-college battles, and flagship campus productions.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAGSHIP EVENT SHOWCASE (VIBHA)                                       */}
      {/* ========================================================================= */}
      <section className="section-padding bg-[#07070d] relative z-10 border-y border-white/5">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Event Media Preview */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-rose-500/30 box-glow">
              <img
                src={featuredEvent.poster}
                alt={featuredEvent.title}
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* Tag Badges */}
              <div className="absolute top-6 left-6 flex items-center space-x-2">
                <span className="bg-rose-600 text-white font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(225,29,72,0.8)]">
                  FLAGSHIP FEST
                </span>
                <span className="bg-black/60 backdrop-blur-md text-slate-200 font-mono text-xs px-3 py-1 rounded-full border border-white/10">
                  {featuredEvent.status}
                </span>
              </div>

              {/* Bottom Details on Image */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-rose-400 font-mono text-xs tracking-widest uppercase">
                  {featuredEvent.date} • {featuredEvent.venue}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                  {featuredEvent.title}
                </h3>
              </div>
            </div>

            {/* Event Content & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-rose-400">
                CAMPUS CULTURAL EXTRAVAGANZA
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                EXPERIENCE <span className="brand-gradient">VIBHA</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {featuredEvent.summary}
              </p>

              <div className="space-y-2 pt-1">
                {featuredEvent.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <span className="text-rose-500 font-bold mt-0.5">✔</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="btn-primary text-xs py-3 px-6"
                >
                  VIEW FEST DOSSIER
                </Link>
                <Link
                  to="/events"
                  className="text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center space-x-1"
                >
                  <span>ALL EVENTS</span>
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXECUTIVE BOARD PREVIEW & QR ID SYSTEM                                */}
      {/* ========================================================================= */}
      <section className="section-padding relative z-10">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-rose-400 mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>STUDENT LEADERSHIP & IDENTITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white">
                EXECUTIVE <span className="brand-gradient">BOARD</span>
              </h2>
            </div>
            <Link
              to="/team"
              className="inline-flex items-center space-x-2 text-rose-400 hover:text-rose-300 font-mono text-xs tracking-wider uppercase mt-4 md:mt-0 transition-colors"
            >
              <span>VIEW FULL ROSTER & QR CARDS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardPreview.map((member) => (
              <GlassCard key={member.id} className="group p-5 flex flex-col justify-between">
                <div>
                  {/* Member Photo */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* QR Code Icon Badge */}
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-rose-400">
                      <QrCode className="w-4 h-4" />
                    </div>

                    {/* ID Card Number */}
                    <div className="absolute bottom-3 left-3 font-mono text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                      {member.idCardNumber}
                    </div>
                  </div>

                  {/* Member Text Info */}
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs text-rose-400/90 font-medium">
                      {member.position}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 pt-1">
                      {member.shortIntro}
                    </p>
                  </div>
                </div>

                {/* Direct Link to Unique QR Profile URL */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">
                    {member.year}
                  </span>
                  <Link
                    to={`/team/${member.slug}`}
                    className="text-xs font-mono text-rose-400 hover:text-white flex items-center space-x-1"
                  >
                    <span>ID CARD</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. REELS & VERTICAL MEDIA TEASER                                         */}
      {/* ========================================================================= */}
      <section className="section-padding bg-[#07070e] relative z-10 border-y border-white/5">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-[0.3em] text-rose-400 mb-2">
                <Video className="w-3.5 h-3.5" />
                <span>HIGH-ENERGY SHORTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white">
                VIRINCHI <span className="brand-gradient">REELS</span>
              </h2>
            </div>
            <Link
              to="/reels"
              className="inline-flex items-center space-x-2 text-rose-400 hover:text-rose-300 font-mono text-xs tracking-wider uppercase mt-4 md:mt-0 transition-colors"
            >
              <span>OPEN FULL MEDIA WALL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {reelsPreview.map((reel) => (
              <Link
                key={reel.id}
                to="/reels"
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 hover:border-rose-500/50 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md font-mono text-[10px] text-white">
                  {reel.duration}
                </div>

                {/* Center Play Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-[0_0_25px_rgba(225,29,72,0.8)]">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-rose-400">
                    {reel.views} Views
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-2 mt-0.5">
                    {reel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HIGH IMPACT JOIN CTA BANNER                                           */}
      {/* ========================================================================= */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/20 to-black pointer-events-none -z-10"></div>
        <div className="site-container">
          <GlassCard className="p-10 sm:p-16 text-center border-rose-500/40 relative overflow-hidden box-glow-strong">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BECOME PART OF THE LEGACY</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white leading-none">
                JOIN <span className="brand-gradient">VIRINCHI</span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Whether you sing, dance, act, design, write, film or lead, there is a place for your passion in the official cultural society of VBIT.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/join"
                  className="btn-primary text-sm px-10 py-4 shadow-[0_0_40px_rgba(244,63,94,0.7)]"
                >
                  START AUDITION APPLICATION
                </Link>
                <Link
                  to="/about"
                  className="btn-secondary text-sm px-8 py-4"
                >
                  READ CLUB DOSSIER
                </Link>
              </div>

              <p className="font-mono text-xs text-slate-400 pt-2">
                VIRINCHI — THE CULTURAL CLUB OF VBIT • SAC BUILDING
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
