// VIRINCHI REELS & SOCIAL MEDIA WALL
// Vertical video showcase with live playback, full-screen player, sound controls, likes & comments

import React, { useState } from 'react';
import { REELS } from '../data/reels';
import LightboxModal from '../components/ui/LightboxModal';
import { 
  Play, Pause, Heart, Share2, Volume2, VolumeX, 
  Maximize2, Video, Music, Sparkles, Filter 
} from 'lucide-react';

export default function Reels() {
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState({});
  const [filterWing, setFilterWing] = useState('All');

  const wings = ['All', 'Natya (Dance)', 'Swara (Music)', 'Abhinaya (Drama)', 'Chalana (Media)', 'Kalakriti (Arts)'];

  const filteredReels = filterWing === 'All'
    ? REELS
    : REELS.filter(r => r.wing.includes(filterWing.split(' ')[0]));

  const handleLike = (reelId, e) => {
    e.stopPropagation();
    setLikedReels(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleShare = (reel, e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(`Reel link copied: "${reel.title}"`);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Video className="w-3.5 h-3.5" />
            <span>VERTICAL MEDIA VAULT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            VIRINCHI <span className="brand-gradient">REELS</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            CONCERT DROPS • STREET BATTLES • ACOUSTIC SESSIONS
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto pt-2">
            High-octane short clips curated by the Chalana media crew. Tap any card for full cinematic video streaming.
          </p>
        </div>

        {/* Wing Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {wings.map((w) => (
            <button
              key={w}
              onClick={() => setFilterWing(w)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                filterWing === w
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Vertical Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredReels.map((reel, idx) => {
            const isLiked = likedReels[reel.id];
            return (
              <div
                key={reel.id}
                onClick={() => {
                  setActiveReelIndex(idx);
                  setIsPlaying(true);
                }}
                className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#0a0b14] border border-white/10 hover:border-rose-500/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.8)] select-none"
              >
                {/* Poster / Video Element */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20"></div>

                {/* Top Details */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white bg-rose-600/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold shadow">
                    {reel.wing.split(' ')[0]}
                  </span>

                  <span className="font-mono text-[10px] text-slate-200 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-rose-600/80 backdrop-blur-md flex items-center justify-center text-white box-glow group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Right Quick Action Floating Buttons */}
                <div className="absolute right-4 bottom-24 flex flex-col space-y-3 z-10">
                  {/* Like */}
                  <button
                    onClick={(e) => handleLike(reel.id, e)}
                    className="flex flex-col items-center text-slate-200 hover:text-white"
                  >
                    <div className={`p-2.5 rounded-full backdrop-blur-md border ${
                      isLiked ? 'bg-rose-600 border-rose-500 text-white' : 'bg-black/60 border-white/20'
                    }`}>
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-[10px] font-mono mt-1 drop-shadow">
                      {isLiked ? 'Liked' : reel.likes}
                    </span>
                  </button>

                  {/* Share */}
                  <button
                    onClick={(e) => handleShare(reel, e)}
                    className="flex flex-col items-center text-slate-200 hover:text-white"
                  >
                    <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono mt-1 drop-shadow">
                      {reel.shares}
                    </span>
                  </button>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-4 left-4 right-16 space-y-1.5 z-10 text-left">
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-rose-400">
                    <Music className="w-3 h-3 shrink-0" />
                    <span className="truncate">{reel.audioTrack}</span>
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                    {reel.title}
                  </h3>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {reel.caption}
                  </p>

                  <div className="font-mono text-[10px] text-slate-400 pt-1">
                    By {reel.author} • {reel.views} Views
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Video Modal Player */}
      {activeReelIndex !== null && (
        <LightboxModal
          isOpen={activeReelIndex !== null}
          onClose={() => setActiveReelIndex(null)}
          item={filteredReels[activeReelIndex]}
          onPrev={() => setActiveReelIndex(prev => (prev > 0 ? prev - 1 : filteredReels.length - 1))}
          onNext={() => setActiveReelIndex(prev => (prev < filteredReels.length - 1 ? prev + 1 : 0))}
        />
      )}
    </div>
  );
}
