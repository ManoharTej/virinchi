// VIRINCHI RESPONSIVE NAVIGATION SYSTEM
// Desktop minimal glass navbar + Full-screen mobile cinematic overlay + Replay Intro trigger

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VirinchiLogo from '../ui/VirinchiLogo';
import { Menu, X, Play, Sparkles } from 'lucide-react';

export default function Navbar({ onReplayIntro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile overlay on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Reels', path: '/reels' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Legacy', path: '/legacy' },
    { name: 'Achievements', path: '/achievements' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-rose-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Logo Brand Link */}
          <Link
            to="/"
            className="group flex items-center space-x-3 text-decoration-none focus:outline-none"
            aria-label="Virinchi Home"
          >
            <VirinchiLogo variant="minimal" size="sm" animated={false} glow={true} />
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display font-black text-sm tracking-wider text-white group-hover:text-rose-400 transition-colors">
                VIRINCHI
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400">
                THE CULTURAL CLUB OF VBIT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-display tracking-wider uppercase transition-all duration-300 rounded-full ${
                    active
                      ? 'text-white font-bold bg-gradient-to-r from-rose-600/40 to-pink-500/20 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Elements: Replay Intro, Join CTA, Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* Replay Cinematic Intro button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Watch Cinematic Intro"
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/40 text-[11px] font-mono text-slate-300 hover:text-rose-300 transition-all duration-300"
              >
                <Play className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>PLAY INTRO</span>
              </button>
            )}

            {/* Join CTA button */}
            <Link
              to="/join"
              className="btn-primary text-xs py-2 px-5 hidden sm:inline-flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>JOIN VIRINCHI</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-rose-600/20 hover:border-rose-500/40 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Cinematic Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#050508]/98 backdrop-blur-2xl xl:hidden flex flex-col justify-between p-6 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        {/* Mobile Header Row */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <VirinchiLogo variant="minimal" size="sm" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-rose-600/30 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-rose-400" />
          </button>
        </div>

        {/* Mobile Links List */}
        <div className="flex flex-col space-y-4 py-8 overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-2xl font-display font-extrabold uppercase tracking-widest flex items-center justify-between py-2 border-b border-white/5 transition-all ${
                  active ? 'text-rose-400 pl-3 border-rose-500/40' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-rose-500/60">→</span>
              </Link>
            );
          })}

          <Link
            to="/admin"
            className="text-sm font-mono tracking-widest uppercase text-slate-500 hover:text-rose-400 pt-2"
          >
            [ ADMIN ACCESS ]
          </Link>
        </div>

        {/* Mobile Footer CTAs */}
        <div className="pt-6 border-t border-white/10 flex flex-col space-y-3">
          <Link
            to="/join"
            className="btn-primary w-full py-3.5 text-center"
          >
            JOIN VIRINCHI AUDITIONS
          </Link>

          {onReplayIntro && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="btn-secondary w-full py-2.5 text-xs text-center"
            >
              <Play className="w-3 h-3 text-rose-400 mr-2" />
              PLAY CINEMATIC INTRO
            </button>
          )}

          <p className="text-center text-[10px] font-mono text-slate-500 pt-2">
            VIRINCHI • THE CULTURAL CLUB OF VBIT • HYDERABAD
          </p>
        </div>
      </div>
    </>
  );
}
