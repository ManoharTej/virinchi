// VIRINCHI — THE CULTURAL CLUB OF VBIT
// Main Application Controller & Route Registry

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CinematicIntro from './components/intro/CinematicIntro';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import MemberProfile from './pages/MemberProfile';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Reels from './pages/Reels';
import Gallery from './pages/Gallery';
import Legacy from './pages/Legacy';
import Achievements from './pages/Achievements';
import Join from './pages/Join';
import Admin from './pages/Admin';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro on first visit unless manually triggered
    try {
      return !localStorage.getItem('virinchi_intro_seen');
    } catch (e) {
      return true;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    window.scrollTo(0, 0);
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-slate-100 flex flex-col justify-between selection:bg-rose-600 selection:text-white">
      <ScrollToTop />

      {/* Cinematic Intro (10-second frequency-to-logo transformation) */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Global Navigation Bar */}
      <Navbar onReplayIntro={handleReplayIntro} />

      {/* Main Page Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onPlayIntro={handleReplayIntro} />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:memberSlug" element={<MemberProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventSlug" element={<EventDetail />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/legacy" element={<Legacy />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/join" element={<Join />} />
          <Route path="/admin" element={<Admin />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Home onPlayIntro={handleReplayIntro} />} />
        </Routes>
      </main>

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  );
}
