import React, { useState, useRef, useEffect } from 'react';
import './SocialHub.css';

const STORIES = [
  { id: 1, img: '/virinchi_logo.png', user: 'virinchi.vbit', active: true, label: 'Your Story' },
  { id: 2, img: '/virinchi_logo.png', user: 'virinchi.vbit', active: true, label: '@virinchi.vbit' },
  { id: 3, img: '/virinchi_logo.png', user: 'virinchi.vbit', active: false, label: 'Fest 2026' },
];

const REELS = [
  {
    id: 1,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-cheering-crowd-at-a-rock-concert-42664-large.mp4',
    poster: '/dance_stage_bg.jpg',
    likes: '14.8K',
    comments: '462',
    shares: '1.4K',
    author: '@virinchi.vbit',
    title: 'Virinchi Grand Fest 2026',
    desc: 'The energy was UNREAL! 🔥 Hyderabad’s biggest cultural extravaganza is back! Tag your squad who needs to be in this crowd! 💃✨ #Virinchi2026 #VBIT #CulturalFest',
    audio: 'Original Audio - Virinchi Anthem 2026'
  },
  {
    id: 2,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-people-dancing-in-a-party-with-lights-42661-large.mp4',
    poster: '/music_stage_bg.jpg',
    likes: '12.3K',
    comments: '318',
    shares: '920',
    author: '@virinchi.vbit',
    title: 'Freaks United Stage Takeover',
    desc: 'Stage is set, beat has dropped! 💥 Freaks United dropping pure choreography fire on the main stage! 🕺⚡ #FreaksUnited #VirinchiVBIT',
    audio: 'Bass Drop Remix - Freaks United'
  },
  {
    id: 3,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-party-crowd-raising-hands-at-a-music-festival-42662-large.mp4',
    poster: '/wings_intro_bg.jpg',
    likes: '19.4K',
    comments: '780',
    shares: '2.6K',
    author: '@virinchi.vbit',
    title: 'Rhythm Battle of the Bands',
    desc: 'Electric guitars screaming under the starlight! 🎸🥁 When Rhythm takes the mic, the entire campus sings along! #Rhythm #LiveConcert #VBITMusic',
    audio: 'Arena Live Solo - Rhythm Band'
  },
  {
    id: 4,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-with-lights-and-smoke-42663-large.mp4',
    poster: '/events_night.jpg',
    likes: '16.1K',
    comments: '534',
    shares: '1.8K',
    author: '@virinchi.vbit',
    title: 'Mega Flashmob Hyderabad',
    desc: '5000+ students, one massive beat! 🚀 Hyderabad streets witnessed the raw magic of Virinchi! Are you ready for what is coming next? #Flashmob #Virinchi',
    audio: 'Hyderabad Street Beat - Virinchi 2026'
  }
];

export default function SocialHub({ isVisible = true }) {
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1054);
  const [likedMap, setLikedMap] = useState({});
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [doubleTapHeart, setDoubleTapHeart] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [confettiParticles, setConfettiParticles] = useState([]);

  const videoRef = useRef(null);
  const lastTapRef = useRef(0);
  const redirectTimerRef = useRef(null);

  const currentReel = REELS[activeReelIdx];

  // Auto play video when reel changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeReelIdx]);

  // Clean up redirect timer
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  // Handle Confetti Generation
  const triggerConfetti = () => {
    const colors = ['#ff0f43', '#0fc8ff', '#f09433', '#e6683c', '#bc1888', '#ffffff', '#ffd700'];
    const emojis = ['❤️', '✨', '🔥', '🎉', '💃', '🎸', '⭐'];
    const particles = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 350,
      y: -(Math.random() * 260 + 50),
      rot: Math.random() * 720 - 360,
      scale: Math.random() * 0.8 + 0.6,
      color: colors[i % colors.length],
      emoji: emojis[i % emojis.length],
      isEmoji: i % 4 === 0,
      duration: Math.random() * 0.6 + 0.8,
    }));
    setConfettiParticles(particles);
  };

  // Synchronized Follow Handler for Mobile & Right-Side Card
  const handleFollowClick = () => {
    if (!isFollowing) {
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
      setShowPlusOne(true);
      setTimeout(() => setShowPlusOne(false), 2000);

      // Trigger Visual Celebration & Confetti
      triggerConfetti();
      setShowCelebration(true);

      // Show toast
      setToastMsg('🎉 You followed @virinchi.vbit! Opening Instagram...');

      // Redirect after animation plays (1.4s delay for user to enjoy animation)
      redirectTimerRef.current = setTimeout(() => {
        window.open('https://www.instagram.com/virinchi.vbit/', '_blank');
        setShowCelebration(false);
        setToastMsg('');
      }, 1500);
    } else {
      // If already followed, directly open Instagram
      window.open('https://www.instagram.com/virinchi.vbit/', '_blank');
    }
  };

  // Video Tap: Single tap = Play/Pause, Double tap = Heart Like
  const handleVideoTap = () => {
    const now = Date.now();
    const timeDiff = now - lastTapRef.current;

    if (timeDiff < 300) {
      // Double tap detected: Like reel
      if (!likedMap[currentReel.id]) {
        setLikedMap(prev => ({ ...prev, [currentReel.id]: true }));
      }
      setDoubleTapHeart(true);
      setTimeout(() => setDoubleTapHeart(false), 800);
    } else {
      // Single tap: Toggle Play / Pause
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
    lastTapRef.current = now;
  };

  const toggleLike = (id) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://www.instagram.com/virinchi.vbit/');
      setToastMsg('✓ Instagram link copied to clipboard!');
      setTimeout(() => setToastMsg(''), 2500);
    }
  };

  const nextReel = () => {
    setActiveReelIdx((prev) => (prev + 1) % REELS.length);
  };

  const prevReel = () => {
    setActiveReelIdx((prev) => (prev - 1 + REELS.length) % REELS.length);
  };

  return (
    <div className={`social-hub-wrapper ${isVisible ? 'active' : ''}`}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="social-toast">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Fullscreen Celebration Confetti Overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-card">
            <div className="celebration-ig-icon">
              <img src="/virinchi_logo.png" alt="Virinchi Logo" />
              <span className="celebration-badge">✓</span>
            </div>
            <h3>YOU'RE NOW FOLLOWING</h3>
            <h2 className="celebration-handle">@virinchi.vbit</h2>
            <p className="celebration-sub">Taking you to official Instagram in a second...</p>
            <div className="celebration-bar-track">
              <div className="celebration-bar-fill" />
            </div>
            <button 
              className="celebration-now-btn"
              onClick={() => {
                window.open('https://www.instagram.com/virinchi.vbit/', '_blank');
                setShowCelebration(false);
              }}
            >
              Open Instagram Profile Now ↗
            </button>
          </div>

          {/* Particle Burst */}
          <div className="confetti-container">
            {confettiParticles.map(p => (
              <div
                key={p.id}
                className="confetti-particle"
                style={{
                  '--tx': `${p.x}px`,
                  '--ty': `${p.y}px`,
                  '--rot': `${p.rot}deg`,
                  '--scale': p.scale,
                  '--color': p.color,
                  '--dur': `${p.duration}s`,
                }}
              >
                {p.isEmoji ? (
                  <span style={{ fontSize: '20px' }}>{p.emoji}</span>
                ) : (
                  <div style={{ width: '10px', height: '14px', background: p.color, borderRadius: '2px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
         HERO CENTERED SMARTPHONE MOCKUP
      ═══════════════════════════════════════════════════════════ */}
      <div className="phone-group-wrapper">
        <div className="social-phone-container">
        {/* Floating +1 Follower Badge on Mobile */}
        {showPlusOne && (
          <div className="plus-one-badge">
            <span>+1 Follower! 🎉</span>
          </div>
        )}

        {/* Phone Notch & Top Status Bar */}
        <div className="phone-notch-bar">
          <div className="phone-speaker" />
          <div className="phone-camera" />
        </div>

        {/* Instagram Header Bar */}
        <div className="phone-ig-header">
          <div className="ig-brand">
            <span className="ig-logo-text">Instagram</span>
            <span className="ig-verified">✓</span>
          </div>
          <div className="ig-header-actions">
            <button 
              className="sound-toggle-btn" 
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button 
              onClick={handleFollowClick}
              className="ig-direct-link"
              title="Open @virinchi.vbit"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Stories Bar */}
        <div className="stories-bar">
          {STORIES.map(story => (
            <div key={story.id} className="story-item" onClick={handleFollowClick}>
              <div className={`story-ring ${story.active ? 'active' : ''}`}>
                <img src={story.img} alt={story.user} />
              </div>
              <span>{story.label}</span>
            </div>
          ))}
        </div>

        {/* Active Reel Video Player View */}
        <div className="active-reel-wrapper" onClick={handleVideoTap}>
          <video
            ref={videoRef}
            src={currentReel.video}
            poster={currentReel.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="reel-video"
          />

          {/* Video Play/Pause Indicator Icon on Tap */}
          {!isPlaying && (
            <div className="video-paused-indicator">
              <span>▶</span>
            </div>
          )}

          {/* Double Tap Heart Burst Animation */}
          {doubleTapHeart && (
            <div className="double-tap-heart">
              <span>❤️</span>
            </div>
          )}

          {/* Top Reel Navigation Indicators */}
          <div className="reel-progress-indicators">
            {REELS.map((r, idx) => (
              <div 
                key={r.id} 
                className={`progress-seg ${idx === activeReelIdx ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActiveReelIdx(idx); }}
              />
            ))}
          </div>

          {/* Reel Overlay Details */}
          <div className="reel-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="reel-info">
              {/* Author & Prominent Follow Button inside Phone */}
              <div className="reel-author">
                <img src="/virinchi_logo.png" alt="Virinchi Avatar" className="reel-author-avatar" />
                <div className="reel-author-names">
                  <span className="author-handle">{currentReel.author}</span>
                  <span className="author-verified-blue">✓</span>
                </div>
                
                {/* Follow Button on Phone Mockup */}
                <button 
                  className={`phone-follow-btn ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollowClick}
                >
                  {isFollowing ? '✓ Following' : '+ Follow'}
                </button>
              </div>

              <div className="reel-desc">{currentReel.desc}</div>
              <div className="reel-audio">
                <span className="audio-note-icon">🎵</span>
                <span className="audio-marquee">{currentReel.audio}</span>
              </div>
            </div>

            {/* Reel Action Buttons (Heart, Comment, Share, Prev/Next) */}
            <div className="reel-actions">
              <div className="action-btn" onClick={() => toggleLike(currentReel.id)}>
                <span className={`icon heart-icon ${likedMap[currentReel.id] ? 'liked' : ''}`}>
                  {likedMap[currentReel.id] ? '❤️' : '🤍'}
                </span>
                <span className="count">{likedMap[currentReel.id] ? 'Liked!' : currentReel.likes}</span>
              </div>

              <div className="action-btn" onClick={handleShare}>
                <span className="icon">💬</span>
                <span className="count">{currentReel.comments}</span>
              </div>

              <div className="action-btn" onClick={handleShare}>
                <span className="icon">↗️</span>
                <span className="count">{currentReel.shares}</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
           EXTERNAL REEL NAVIGATION ARROWS
        ═══════════════════════════════════════════════════════════ */}
        <div className="external-nav-arrows">
          <button onClick={prevReel} className="ext-arrow-btn" title="Previous Reel">▲</button>
          <button onClick={nextReel} className="ext-arrow-btn" title="Next Reel">▼</button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         RIGHT-SIDE DEDICATED INSTAGRAM PROFILE & FOLLOW COMPANION
      ═══════════════════════════════════════════════════════════ */}
      <div className="instagram-companion-card">
        <div className="companion-badge">OFFICIAL INSTAGRAM</div>
        
        {/* Instagram Profile Card Header */}
        <div className="companion-profile-header">
          <div className="companion-avatar-wrap" onClick={handleFollowClick}>
            <div className="companion-avatar-ring">
              <img src="/virinchi_logo.png" alt="Virinchi Logo" className="companion-avatar-img" />
            </div>
            <span className="companion-plus-icon">+</span>
          </div>

          <div className="companion-user-details">
            <div className="companion-username-row">
              <h2 className="companion-username">virinchi.vbit</h2>
              <span className="companion-verified-badge">✓</span>
            </div>
            <div className="companion-fullname">Virinchi Club Vbit</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="companion-stats-row">
          <div className="stat-box">
            <span className="stat-number">130</span>
            <span className="stat-label">posts</span>
          </div>
          <div className="stat-box stat-box-followers">
            <span className="stat-number highlight-followers">
              {followerCount.toLocaleString()}
            </span>
            <span className="stat-label">followers</span>
            {showPlusOne && <span className="stat-plus-bubble">+1</span>}
          </div>
          <div className="stat-box">
            <span className="stat-number">20</span>
            <span className="stat-label">following</span>
          </div>
        </div>

        {/* Bio Text */}
        <div className="companion-bio">
          <p>The Cultural Club of VBIT</p>
          <a href="https://www.instagram.com/virinchi.vbit/" target="_blank" rel="noreferrer" className="companion-bio-link">
            🔗 instagram.com/virinchi.vbit
          </a>
        </div>

        {/* Prominent Follow Button on Right Card */}
        <button 
          className={`companion-follow-btn ${isFollowing ? 'following' : ''}`}
          onClick={handleFollowClick}
        >
          <span className="btn-ig-glyph">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </span>
          <span>{isFollowing ? '✓ Following on Instagram' : 'Follow @virinchi.vbit on Instagram'}</span>
        </button>

        {/* Small live hint */}
        <div className="companion-footer-note">
          <span>⚡ Tap to follow & join Hyderabad's biggest student celebration</span>
        </div>
      </div>
    </div>
  );
}
