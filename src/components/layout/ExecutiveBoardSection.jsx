import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger, createMotionPath } from 'animejs';
import ProfileCard from './ProfileCard';
import PixelCard from './PixelCard';

gsap.registerPlugin(ScrollTrigger);

// --- DATA STRUCTURE ---
const coreLeadership = [
  { id: 1, name: 'P Pruthvi', role: 'CHAIR PERSON', desc: 'ECE - LEAD', image: '/core/pruthvi.png' },
  { id: 2, name: 'G Vaishnavi', role: 'VICE CHAIR PERSON', desc: 'IT - LEAD', image: '/core/vaishnavi.png' },
  { id: 3, name: 'K Manohar Tej', role: 'CLUB ADMINISTRATOR', desc: 'CSM - LEAD', image: '/core/manohar.png' }
];

const portfolioNames = [
  'cultural',
  'documentation',
  'social_media_promotions',
  'public_relations',
  'marketing',
  'hospitality',
  'production',
  'designing',
  'treasury'
];

// --- COMPONENTS ---

export const AnimatedMusicalBackground = ({ viewBox = "0 0 1920 1080" }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Animate drawing the staff lines
    animate('.musical-path', {
      strokeDashoffset: [3000, 0],
      easing: 'easeInOutSine',
      duration: 8000,
      delay: stagger(150),
      direction: 'alternate',
      loop: true
    });

    const paths = document.querySelectorAll('.musical-path');
    const notes = document.querySelectorAll('.musical-note');
    const duration = 50000;
    const stavesCount = 10; // 5 top + 5 bottom

    notes.forEach((note, i) => {
      // Create a global stagger so notes form a zigzag/diagonal pattern instead of vertical columns
      const delay = (i / notes.length) * duration;

      animate(note, {
        offsetDistance: ['0%', '100%'],
        easing: 'linear',
        duration: duration,
        loop: true,
        delay: delay
      });
    });
  }, []);

  const staves = [];
  // Staff 1 (Top curve flowing down-right)
  for(let i=0; i<5; i++) {
    staves.push(`M-100,${150 + i*35} C400,${400 + i*35} 800,${50 + i*35} 1400,${300 + i*35} C1800,${450 + i*35} 2200,${200 + i*35} 2500,${400 + i*35}`);
  }
  // Staff 2 (Bottom curve flowing up-right)
  for(let i=0; i<5; i++) {
    staves.push(`M-100,${700 + i*35} C500,${900 + i*35} 1000,${500 + i*35} 1600,${700 + i*35} C2000,${850 + i*35} 2300,${600 + i*35} 2600,${800 + i*35}`);
  }
  // Staff 3 (Bleeding into Tab 5 - top half)
  for(let i=0; i<5; i++) {
    staves.push(`M-100,${1200 + i*35} C400,${1100 + i*35} 800,${1500 + i*35} 1400,${1250 + i*35} C1800,${1400 + i*35} 2200,${1150 + i*35} 2500,${1300 + i*35}`);
  }
  // Staff 4 (Deep into Tab 5 - bottom half)
  for(let i=0; i<5; i++) {
    staves.push(`M-100,${1700 + i*35} C500,${1900 + i*35} 1000,${1600 + i*35} 1500,${1800 + i*35} C1900,${1650 + i*35} 2300,${1900 + i*35} 2600,${1700 + i*35}`);
  }

  const svgNotesList = [
    // Single Note
    "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
    // Double Note
    "M22 3H10v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h10v6.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3z"
  ];
  const notesArray = Array.from({length: 10});

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden', opacity: 0.35 }}>
      <svg ref={svgRef} width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
        {staves.map((d, i) => (
          <path 
            key={i}
            className="musical-path"
            d={d}
            fill="none"
            stroke="rgba(255, 42, 133, 0.4)"
            strokeWidth="2"
          />
        ))}
      </svg>
      {notesArray.map((_, i) => {
        const size = `${1.5 + Math.random() * 1.5}rem`;
        return (
          <div 
            key={i}
            className="musical-note"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: size,
              height: size,
              color: '#ff3366', 
              offsetPath: `path('${staves[i % staves.length]}')`,
              offsetRotate: '0deg',
              transform: 'translateY(-35%)',
              opacity: 0.9
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d={svgNotesList[i % svgNotesList.length]} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

const BasicProfileCard = ({ name, role, desc, avatarUrl, size = 'medium', portfolioName }) => {
  const cardRef = useRef(null);

  // Hover 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX, rotateY, transformPerspective: 1000, ease: 'power2.out', duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, ease: 'power3.out', duration: 0.6
    });
  };

  const styles = {
    large: { width: '280px', height: '420px', imgHeight: '240px', titleSize: '1.6rem', roleSize: '0.85rem' },
    medium: { width: '220px', height: '320px', imgHeight: '180px', titleSize: '1.3rem', roleSize: '0.8rem' },
    small: { width: '150px', height: '220px', imgHeight: '110px', titleSize: '0.95rem', roleSize: '0.65rem' },
    oc: { width: '250px', height: '260px', imgHeight: '170px', titleSize: '1.3rem', roleSize: '0.85rem' }
  }[size];

  const formatPortfolioName = (name) => {
    if (!name) return { text: '', isShort: false };
    const map = {
      'social_media_promotions': 'SMP',
      'public_relations': 'PR',
      'social media promotions': 'SMP',
      'public relations': 'PR'
    };
    const key = name.toLowerCase().replace(/_/g, ' ');
    const isShort = !!map[key];
    return { text: map[key] || name, isShort };
  };

  if (size === 'oc') {
    const pName = formatPortfolioName(portfolioName);
    return (
      <div
        ref={cardRef}
        className="profile-card oc-card-hover"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: styles.width,
          height: styles.height,
          flexShrink: 0,
          background: 'rgba(20, 10, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 42, 133, 0.2)',
          borderRadius: '16px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          transition: 'border-color 0.3s ease',
          cursor: 'pointer',
          position: 'relative'
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'}
        onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 42, 133, 0.2)'}
      >
        <style>{`
          .oc-card-hover:hover .oc-logo {
            filter: invert(19%) sepia(90%) saturate(7460%) hue-rotate(335deg) brightness(110%) contrast(116%) !important;
          }
        `}</style>
        <div style={{
          width: '100%', height: '100%', borderRadius: '12px',
          background: avatarUrl ? `url(${avatarUrl}) center/cover` : 'linear-gradient(45deg, #2a1122, #0d0614)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
            {!avatarUrl && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '2px' }}>PHOTO</span>}
          </div>
          
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)', zIndex: 1 }} />
          
          <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 2 }}>
            <img className="oc-logo" src="/virinchi_logo.png" alt="logo" style={{ height: '24px', transition: 'all 0.3s ease', filter: 'brightness(0) invert(1)' }} />
          </div>

          <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
             <span style={{ color: 'white', fontSize: pName.isShort ? '0.85rem' : '0.5rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'right', maxWidth: '120px' }}>{pName.text}</span>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1 }} />

          <div style={{ position: 'absolute', bottom: '15px', left: '15px', zIndex: 2 }}>
             <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.2rem', fontWeight: 800 }}>{name}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="profile-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: styles.width,
        height: styles.height,
        flexShrink: 0,
        background: 'rgba(20, 10, 30, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 42, 133, 0.2)',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'}
      onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 42, 133, 0.2)'}
    >
      <div style={{
        width: '100%', height: styles.imgHeight, borderRadius: '12px',
        background: 'linear-gradient(45deg, #2a1122, #0d0614)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>PHOTO</span>
      </div>
      <h3 style={{ margin: '0 0 4px 0', fontSize: styles.titleSize, color: '#ffffff', fontWeight: 800 }}>{name}</h3>
      <p style={{ margin: '0 0 12px 0', fontSize: styles.roleSize, color: '#00ffff', letterSpacing: '1px', fontWeight: 600 }}>{role}</p>
      {desc && <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{desc}</p>}
    </div>
  );
};

export default function ExecutiveBoardSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [portfolios, setPortfolios] = useState([
    { title: 'CORE LEADERSHIP', type: 'core', data: coreLeadership }
  ]);
  const [coreMobileProgress, setCoreMobileProgress] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const autoAdvanceTimeout = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth > 768) return;

    if (currentIndex > 0 && currentIndex < portfolios.length - 1) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [currentIndex, portfolios.length]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const fetched = await Promise.all(
        portfolioNames.map(async (name) => {
          try {
            const res = await fetch(`/portfolios/${name}/data.json`);
            if (!res.ok) return null;
            const data = await res.json();
            return { type: 'portfolio', ...data };
          } catch (e) {
            console.error('Failed to load portfolio:', name);
            return null;
          }
        })
      );
      
      setPortfolios([
        { title: 'CORE LEADERSHIP', type: 'core', data: coreLeadership },
        ...fetched.filter(Boolean)
      ]);
    };

    fetchPortfolios();
  }, []);

  // Entrance animations
  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
    );
  }, []);

  const prevIndexRef = useRef(currentIndex);

  // View transition animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768 && currentIndex === 0) return;
    
    const direction = currentIndex > prevIndexRef.current ? 100 : -100;
    prevIndexRef.current = currentIndex;

    const cards = containerRef.current.querySelectorAll('.profile-card, .pixel-card');
    gsap.fromTo(cards,
      { opacity: 0, x: direction, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.5)', clearProps: 'opacity,transform,scale' }
    );
  }, [currentIndex]);

  // Mobile Global ScrollTrigger
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768 && portfolios.length > 1) {
        const totalSteps = 3;
        const st = ScrollTrigger.create({
          trigger: '.executive-board-section',
          start: 'top top',
          end: `+=${totalSteps * 100}%`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress * 2;
            setCoreMobileProgress(p);
          }
        });
        scrollTriggerRef.current = st;
        
        // Force GSAP to recalculate layout so downstream sections (Tab 5) don't overlap Tab 4
        setTimeout(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }, 150);
      }
    });
    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, [portfolios]);

  const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, portfolios.length - 1));
  const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  return (
    <section className="executive-board-section" style={{
      height: '100vh', width: '100%', position: 'relative',
      background: 'linear-gradient(to bottom, #0d0614 0%, #1a0815 100%)', padding: '10px 20px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <AnimatedMusicalBackground />
      <style>{`
        .lead-card-content {
          background: rgba(20, 10, 30, 0.6);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          color: white;
          text-align: center;
        }
        .lead-image-wrapper {
          width: 190px;
          height: 190px;
          margin-bottom: 15px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
        }
        .lead-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .lead-text h4 {
          margin: 0 0 5px 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.2rem;
          color: white;
        }
        .lead-text p {
          margin: 0;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          color: #ff3366;
          letter-spacing: 2px;
        }
        .nav-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }
        .nav-btn:hover:not(:disabled) {
          background: rgba(255, 42, 133, 0.2);
          border-color: rgba(255, 42, 133, 0.5);
          transform: translateY(-50%) scale(1.1) !important;
          box-shadow: 0 0 20px rgba(255, 42, 133, 0.4);
        }
        @keyframes slow-fade-glow {
          0% { box-shadow: 0 0 0px rgba(255, 42, 133, 0); background: rgba(255,255,255,0.05); }
          50% { box-shadow: 0 0 25px rgba(255, 42, 133, 0.9); background: rgba(255,42,133,0.4); border-color: rgba(255,42,133,0.9); }
          100% { box-shadow: 0 0 0px rgba(255, 42, 133, 0); background: rgba(255,255,255,0.05); }
        }
        .nav-btn-core-glow {
          animation: slow-fade-glow 2s infinite ease-in-out;
          animation-delay: 1.55s;
        }
        .eb-title {
          position: absolute;
          color: #ffffff;
          font-weight: 900;
          margin: 0;
          line-height: 1.1;
          z-index: 100;
          transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .eb-title.center {
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 5rem;
        }
        .eb-title.corner {
          top: 40px;
          left: 40px;
          transform: translateX(0);
          font-size: 1.5rem;
        }
        .portfolio-content-wrapper {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 60px;
        }
        .leads-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 60px;
        }
        .oc-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 80px;
        }
        @media (max-width: 768px) {
          .eb-title.center {
            top: 40px !important;
            font-size: 3.1rem !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 1.1;
          }
          .eb-subtitle {
            top: 155px !important;
            font-size: 0.85rem !important;
            letter-spacing: 2px !important;
            border: 1px solid rgba(255,255,255,0.4);
            padding: 5px 15px !important;
            border-radius: 5px;
          }
          .core-desktop-container { display: none !important; }
          .core-mobile-container { display: block !important; transform: scale(1.15); transform-origin: top center; }
          .nav-btn { 
            display: flex !important; 
            width: 40px !important; 
            height: 40px !important; 
            font-size: 1rem !important; 
          }
          .nav-btn-left { left: 5px !important; }
          .nav-btn-right { right: 5px !important; }
          .mobile-container-wrapper { 
            flex: 1 !important;
            min-height: 0 !important;
            margin-top: 60px !important;
            width: 100% !important;
            align-items: stretch !important;
          }
          .portfolio-mobile-scroll { 
            height: 100% !important; 
            width: 100% !important;
            overflow-y: auto !important; 
            padding-bottom: 80px !important;
            padding-top: 10px !important;
            display: block !important;
            flex: none !important;
          }
          .portfolio-content-wrapper {
            display: block !important;
            flex: none !important;
          }
          .leads-grid { gap: 30px !important; }
          .oc-grid { gap: 40px !important; }
        }
      `}</style>
      {/* Subtle Background Elements */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,42,133,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,255,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Executive Board Sliding Logo */}
      <h2 className={`eb-title ${currentIndex === 0 ? 'center' : 'corner'}`}>
        Executive <span style={{ color: '#ff2a85' }}>Board</span>
      </h2>

      {/* Tab 0: Core Leadership Static Title */}
      <h3 className="eb-subtitle" style={{ 
        position: 'absolute', top: '120px', left: '50%', transform: 'translateX(-50%)',
        color: '#ffffff', fontSize: '1.5rem', margin: 0, textTransform: 'uppercase', letterSpacing: '4px', zIndex: 10,
        opacity: currentIndex === 0 ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: 'none'
      }}>
        {portfolios[0] ? portfolios[0].title.replace(/_/g, ' ') : ''}
      </h3>

      {/* Tabs 1+: Portfolio Title Header */}
      <div style={{ position: 'relative', width: '100%', marginTop: '60px', marginBottom: '20px', height: '60px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ 
          color: '#ffffff', fontSize: '3.5rem', fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '8px', textShadow: '0 0 20px rgba(255,42,133,0.6), 0 0 40px rgba(255,42,133,0.3)',
          opacity: currentIndex === 0 ? 0 : 1,
          transform: currentIndex === 0 ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          transitionDelay: currentIndex === 0 ? '0s' : '0.3s'
        }}>
          {portfolios[currentIndex] && currentIndex !== 0 ? portfolios[currentIndex].title.replace(/_/g, ' ') : ''}
        </h2>
      </div>

      {/* GLOBAL PAGINATION */}
      <div style={{ position: 'absolute', bottom: '30px', right: '40px', color: 'rgba(255,255,255,0.5)', fontSize: '1rem', letterSpacing: '3px', fontWeight: 600, zIndex: 10 }}>
        <span style={{ color: '#fff' }}>{String(currentIndex + 1).padStart(2, '0')}</span> / {String(portfolios.length).padStart(2, '0')}
      </div>

      {/* LEFT NAVIGATION ARROW */}
      <button className="nav-btn nav-btn-left" onClick={handlePrev} disabled={currentIndex === 0} style={{ 
        position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 50, 
        opacity: currentIndex === 0 ? 0 : 1, pointerEvents: currentIndex === 0 ? 'none' : 'auto' 
      }}>&lt;</button>

      {/* RIGHT NAVIGATION ARROW */}
      <button className={`nav-btn nav-btn-right ${currentIndex === 0 && (typeof window === 'undefined' || window.innerWidth > 768 || coreMobileProgress >= 1.8) ? 'nav-btn-core-glow' : ''}`} onClick={handleNext} disabled={currentIndex === portfolios.length - 1} style={{ 
        position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 50, 
        opacity: currentIndex === portfolios.length - 1 ? 0.3 : (currentIndex === 0 && typeof window !== 'undefined' && window.innerWidth <= 768 && coreMobileProgress < 1.8) ? 0 : 1, 
        pointerEvents: (currentIndex === 0 && typeof window !== 'undefined' && window.innerWidth <= 768 && coreMobileProgress < 1.8) ? 'none' : 'auto',
        transition: 'opacity 0.5s ease'
      }}>&gt;</button>

      {/* Dynamic Grid Layouts based on portfolio */}
      <div ref={containerRef} className="mobile-container-wrapper" style={{ 
        width: '100%', maxWidth: '1400px', zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px', 
        marginTop: currentIndex === 0 ? '55px' : '10px',
        transition: 'margin-top 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
      }}>
        
        {portfolios[currentIndex].type === 'core' && (
          <>
            <div className="core-desktop-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px', width: '100%' }}>
              {portfolios[currentIndex].data.map((member, i) => (
                <div key={member.id}>
                  <ProfileCard 
                    name={member.name}
                    title={member.role}
                    handle="virinchiclub"
                    status="Executive"
                    contactText="Connect"
                    avatarUrl={member.image || "/virinchi_logo.png"}
                    avatarBottom={i === 0 ? '50px' : '65px'}
                    showUserInfo={false}
                    enableTilt={true}
                    enableMobileTilt={true}
                    behindGlowColor={i === 0 ? "rgba(255, 42, 133, 0.67)" : i === 1 ? "rgba(125, 190, 255, 0.67)" : "rgba(255, 255, 42, 0.67)"}
                    innerGradient="linear-gradient(145deg,#2a1122 0%,#0d0614 100%)"
                    behindGlowEnabled={true}
                  />
                </div>
              ))}
            </div>

            <div className="core-mobile-container" style={{ position: 'relative', width: '290px', height: '400px', display: 'none' }}>
              {portfolios[currentIndex].data.map((member, i) => {
                const op = Math.max(0, Math.min(1, 1 - Math.abs(coreMobileProgress - i)));
                return (
                  <div className={`core-mobile-card-${i}`} key={`mob-${member.id}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: op, pointerEvents: op > 0.5 ? 'auto' : 'none' }}>
                    <ProfileCard 
                      name={member.name}
                      title={member.role}
                      handle="virinchiclub"
                      status="Executive"
                      contactText="Connect"
                      avatarUrl={member.image || "/virinchi_logo.png"}
                      avatarBottom={i === 0 ? '50px' : '65px'}
                      showUserInfo={false}
                      enableTilt={true}
                      enableMobileTilt={true}
                      behindGlowColor={i === 0 ? "rgba(255, 42, 133, 0.67)" : i === 1 ? "rgba(125, 190, 255, 0.67)" : "rgba(255, 255, 42, 0.67)"}
                      innerGradient="linear-gradient(145deg,#2a1122 0%,#0d0614 100%)"
                      behindGlowEnabled={true}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {portfolios[currentIndex].type === 'portfolio' && (
          <div 
            className="portfolio-mobile-scroll portfolio-content-wrapper"
            onScroll={(e) => {
              if (typeof window !== 'undefined' && window.innerWidth > 768) return;
              const target = e.target;
              const { scrollTop, scrollHeight, clientHeight } = target;
              
              if (scrollTop + clientHeight >= scrollHeight - 20) {
                if (currentIndex > 0 && currentIndex < portfolios.length - 1) {
                  if (!autoAdvanceTimeout.current) {
                    autoAdvanceTimeout.current = setTimeout(() => {
                      setCurrentIndex(prev => prev + 1);
                      target.scrollTop = 0;
                      autoAdvanceTimeout.current = null;
                    }, 500);
                  }
                } else if (currentIndex === portfolios.length - 1) {
                  if (!autoAdvanceTimeout.current) {
                    autoAdvanceTimeout.current = setTimeout(() => {
                      if (scrollTriggerRef.current) {
                        window.scrollTo({
                          top: scrollTriggerRef.current.end + 20,
                          behavior: 'smooth'
                        });
                      }
                      autoAdvanceTimeout.current = null;
                    }, 500);
                  }
                }
              } else {
                if (autoAdvanceTimeout.current) {
                  clearTimeout(autoAdvanceTimeout.current);
                  autoAdvanceTimeout.current = null;
                }
              }
            }}
          >
            {/* LEADS SECTION */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
              <div className="leads-grid">
                {[...portfolios[currentIndex].leads]
                  .sort((a, b) => {
                    const aIsCoLead = (a.role || '').toLowerCase().includes('co-lead') ? 1 : 0;
                    const bIsCoLead = (b.role || '').toLowerCase().includes('co-lead') ? 1 : 0;
                    return aIsCoLead - bIsCoLead;
                  })
                  .map((member, i) => (
                  <div key={member.id}>
                    <PixelCard variant={i % 2 === 0 ? "pink" : "blue"}>
                      <div className="lead-card-content">
                        <div className="lead-image-wrapper">
                          <img src={member.image || "/virinchi_logo.png"} alt={member.name} />
                        </div>
                        <div className="lead-text">
                          <h4>{member.name}</h4>
                          <p>{member.role}</p>
                        </div>
                      </div>
                    </PixelCard>
                  </div>
                ))}
              </div>
            </div>

            {/* OC SECTION */}
            {portfolios[currentIndex].oc && portfolios[currentIndex].oc.length > 0 && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="oc-grid">
                  {portfolios[currentIndex].oc.map(member => (
                    <BasicProfileCard key={member.id} {...member} role="OC" avatarUrl={member.image || undefined} size="oc" portfolioName={portfolios[currentIndex].title} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
