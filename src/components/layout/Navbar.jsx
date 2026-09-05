// VIRINCHI RESPONSIVE NAVIGATION SYSTEM
// Desktop & Mobile Universal Hamburger Drawer + Quick Action System

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VirinchiLogo from '../ui/VirinchiLogo';
import { Menu, X, Sparkles, QrCode, Music, Volume2, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route transition
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', subtitle: 'Cinematic Experience' },
    { name: 'About', path: '/about', subtitle: 'Ethos, VBIT Heritage & 6 Wings' },
    { name: 'Executive Board', path: '/team', subtitle: 'Leadership & QR Credentials' },
    { name: 'Events & Fests', path: '/events', subtitle: 'VIBHA, Tarang & Flagships' },
    { name: 'Reels Vault', path: '/reels', subtitle: 'High-Octane Vertical Clips' },
    { name: 'Photo Gallery', path: '/gallery', subtitle: 'Stage & Crowd Chronicles' },
    { name: 'Legacy Archive', path: '/legacy', subtitle: '2007 to Present Timeline' },
    { name: 'Achievements', path: '/achievements', subtitle: 'Trophy Cabinet & Honors' },
    { name: 'Join Virinchi', path: '/join', subtitle: 'Open Auditions Portal' },
    { name: 'Admin Studio', path: '/admin', subtitle: 'Drive Sync & Content Manager' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#040407]/90 backdrop-blur-2xl border-b border-rose-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Logo Brand Link */}
          <Link
            to="/"
            className="group flex items-center space-x-3 focus:outline-none select-none"
            aria-label="Virinchi Home"
          >
            <VirinchiLogo variant="minimal" size="sm" animated={false} glow={true} />
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-sm tracking-wider text-white group-hover:text-rose-400 transition-colors">
                VIRINCHI
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-slate-400">
                THE CULTURAL CLUB OF VBIT
              </span>
            </div>
          </Link>

          {/* Quick Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            {navLinks.slice(1, 6).map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-1 text-xs font-display tracking-wider uppercase transition-all rounded-full ${
                    active
                      ? 'text-white font-bold bg-rose-600/40 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Elements: Join CTA + Universal Hamburger */}
          <div className="flex items-center space-x-3">
            <Link
              to="/join"
              className="btn-primary text-xs py-2 px-5 hidden sm:inline-flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUDITIONS</span>
            </Link>

            {/* Universal Hamburger Toggle (Available on ALL viewports) */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="group p-2.5 rounded-xl bg-white/5 hover:bg-rose-600/20 border border-white/10 hover:border-rose-500/40 text-white transition-all flex items-center space-x-2"
              aria-label="Toggle Full Menu"
            >
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-slate-300 group-hover:text-white">
                MENU
              </span>
              {drawerOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Universal Fullscreen Cinematic Overlay Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-[#040407]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-12 transition-all duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center space-x-3">
            <VirinchiLogo variant="minimal" size="sm" />
            <div>
              <span className="font-display font-black text-white text-base tracking-wider block">
                VIRINCHI
              </span>
              <span className="font-mono text-[9px] text-rose-400 tracking-[0.25em]">
                THE CULTURAL CLUB OF VBIT
              </span>
            </div>
          </Link>

          <button
            onClick={() => setDrawerOpen(false)}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-rose-600/40 border border-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-rose-400" />
          </button>
        </div>

        {/* Drawer Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 overflow-y-auto max-h-[70vh]">
          {navLinks.map((link, idx) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  active
                    ? 'bg-rose-600/20 border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.4)]'
                    : 'bg-white/5 border-white/5 hover:border-rose-500/30 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-rose-400">0{idx + 1}</span>
                    <h3 className={`font-display font-black text-xl sm:text-2xl uppercase tracking-wider transition-colors ${
                      active ? 'text-rose-300' : 'text-white group-hover:text-rose-400'
                    }`}>
                      {link.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1 pl-7">
                    {link.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-rose-500 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            );
          })}
        </div>

        {/* Drawer Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>SAC BUILDING • VIGNANA BHARATHI INSTITUTE OF TECHNOLOGY</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/join" onClick={() => setDrawerOpen(false)} className="btn-primary text-xs py-2 px-6">
              AUDITION NOW
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
