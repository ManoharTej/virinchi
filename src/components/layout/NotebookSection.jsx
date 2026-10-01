import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lanyard from './Lanyard';
import GlowingLight from './GlowingLight';

gsap.registerPlugin(ScrollTrigger);

const virinchiLogo = '/virinchi_logo.png';

// Background component for Tab 3 behind the ID card
const VirinchiBackground = () => {
  const musicNotes = ['♪', '♫', '♬', '♩', '✨'];
  
  return (
    <div className="virinchi-bg-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}>
      {/* Huge faded background logo */}
      <img 
        className="bg-logo"
        src="/virinchi_logo.png" 
        alt="Virinchi Logo" 
        style={{
          position: 'absolute',
          left: '5vw',
          top: '35%',
          transform: 'translateY(-50%)',
          width: '40vw',
          opacity: 0.2,
          filter: 'grayscale(100%) brightness(200%)',
        }}
      />
    </div>
  );
};

// Back half of the 3D Spiral Binding (Hole and inner wire)
const NotebookBindingBack = () => (
  <div style={{
    position: 'absolute', top: '-20px', left: 0, width: '100%', height: '40px',
    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
    zIndex: 5, pointerEvents: 'none', padding: '0 5vw'
  }}>
    {[...Array(35)].map((_, i) => (
      <svg key={i} width="30" height="50" viewBox="0 0 30 50" style={{ overflow: 'visible', filter: 'drop-shadow(0px 5px 3px rgba(0,0,0,0.4))' }}>
        <defs>
          <radialGradient id={`holeDepth${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#222" />
          </radialGradient>
        </defs>
        <rect x="7" y="35" width="16" height="12" rx="3" fill={`url(#holeDepth${i})`} />
        <path d="M 8,47 L 22,47" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        <path d="M 8,35 L 22,35" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
        <path d="M 18,10 Q 24,25 18,40" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="6" filter="blur(2px)" />
        <path d="M 18,42 C 24,35 24,25 18,20" fill="none" stroke="#333" strokeWidth="5" />
      </svg>
    ))}
  </div>
);

// Front half of the 3D Spiral Binding (Outer thick wire)
const NotebookBindingFront = () => (
  <div style={{
    position: 'absolute', top: '-20px', left: 0, width: '100%', height: '40px',
    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
    zIndex: 15, pointerEvents: 'none', padding: '0 5vw'
  }}>
    {[...Array(35)].map((_, i) => (
      <svg key={i} width="30" height="50" viewBox="0 0 30 50" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`thickMetal${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="15%" stopColor="#ccc" />
            <stop offset="30%" stopColor="#fff" />
            <stop offset="60%" stopColor="#999" />
            <stop offset="80%" stopColor="#ddd" />
            <stop offset="100%" stopColor="#333" />
          </linearGradient>
        </defs>
        <path d="M 12,45 C 0,30 0,10 18,2" fill="none" stroke={`url(#thickMetal${i})`} strokeWidth="7" strokeLinecap="round" />
        <path d="M 11,43 C 1,30 1,12 16,4" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ))}
  </div>
);


const pagesData = [
  { title: "Introduction", color: "#fefefe", sticky: { text: "Hello!", color: "#ff99cc", top: '10%', right: '-20px' }, polaroid: { src: '/group.png', caption: 'Team', side: 'left' } },
  { title: "Academic & Professional Background", color: "#f4f4f4", sticky: { text: "Ph.D", color: "#99ccff", top: '40%', right: '-30px' }, polaroid: { src: '/group1.png', caption: 'Memories', side: 'right' } },
  { title: "Role in Virinchi", color: "#fefefe", sticky: { text: "Leader", color: "#ffcc66", top: '70%', right: '-15px' }, polaroid: { src: '/people.png', caption: 'Events', side: 'left' } },
  { title: "Guidance & Mentorship", color: "#f4f4f4", sticky: null, polaroid: { src: '/core/pruthvi.png', caption: 'Guidance', side: 'right' } },
  { title: "Faculty Message", color: "#fefefe", sticky: { text: "Inspire", color: "#ccff99", top: '20%', right: '-25px' }, polaroid: { src: '/core/vaishnavi.png', caption: 'Faculty', side: 'left' } },
];

export default function NotebookSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobilePortrait = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
      
      if (isMobilePortrait) {
        // Hide flip buttons on mobile since it's scroll-based
        gsap.set('.flip-btns', { display: 'none' });
        
        // Ensure elements are at 0 because flexbox handles their position now
        gsap.set('.mobile-horizontal-wrapper', { x: 0 });
        gsap.set('.book-section', { x: 0, opacity: 1 });
        gsap.set('.id-card-section', { x: 0 }); 
        
        let hasEntered = false;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=800%', // Long scroll distance for all actions
            scrub: 1,
            pin: true,
            onEnter: () => {
              if (!hasEntered) {
                hasEntered = true;
                // Snap to top
                wrapperRef.current.scrollIntoView({ behavior: 'auto' });
                // Lock scroll while ID card falls
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                
                setTimeout(() => {
                  document.body.style.overflow = 'auto';
                  document.documentElement.style.overflow = 'auto';
                }, 1000); // 1 second for physics to settle
              }
            }
          }
        });

        // 1. Buffer tween (falling card)
        tl.to({}, { duration: 0.5 });

        // 2. Horizontal Scroll: move the wrapper containing both panels to the left
        tl.to('.mobile-horizontal-wrapper', { x: '-100vw', duration: 1.5, ease: 'power2.inOut' }, 'reveal');
        
        // Move the background logo out of view
        tl.to('.bg-logo', { x: '-100vw', duration: 1.5, ease: 'power2.inOut' }, 'reveal');
        
        // 3. Pause slightly to let user read cover page
        tl.to({}, { duration: 0.5 });

        // 4. Flip pages one by one on scroll
        const pages = document.querySelectorAll('.page-element');
        pages.forEach((page, index) => {
          if (index < pages.length - 1) { // Don't flip the very last page
            tl.to(page, { rotateX: 179.9, duration: 1.5, ease: 'power1.inOut' }, `+=0.2`);
          }
        });

        // 5. Auto-close the book rapidly when they reach the end!
        tl.to({}, { duration: 0.5 }); // Brief pause at the last page
        for (let i = pages.length - 2; i >= 0; i--) {
          tl.to(pages[i], { rotateX: 0, duration: 0.8, ease: 'power2.inOut' }, i === pages.length - 2 ? '+=0' : '-=0.6');
        }
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const nextPage = () => {
    if (currentPage < pagesData.length - 1) setCurrentPage(p => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <div 
      ref={wrapperRef}
      className="notebook-wrapper"
      style={{ 
        width: '100%', 
        height: '100vh', 
        background: 'linear-gradient(to bottom, #1a0815 0%, #0d0614 100%)',
        position: 'relative',
        overflow: 'hidden' // Need hidden so X movement doesn't cause body scroll
      }}
    >
      {/* 
        We use an inline style block here for standard keyframes to sway the ID card 
      */}
      <style>{`
        @keyframes sway {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        .lined-paper {
          background-image: 
            linear-gradient(#e5e5e5 1px, transparent 1px);
          background-size: 100% 40px;
          background-position: 0 40px;
        }
        .page-shadow {
          box-shadow: inset -10px 0 20px rgba(0,0,0,0.05), 5px 0 15px rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
          .mobile-horizontal-wrapper {
             width: 200vw !important;
             height: 100vh !important;
             display: flex !important;
             flex-direction: row !important;
          }
          .notebook-container { 
            position: relative !important;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            margin: 0 !important;
            padding: 45px 0 0 0 !important;
          }
          .id-card-section { 
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            width: 100vw !important; 
            height: 100vh !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            transform-origin: center center !important;
          }
          .lanyard-scale-wrapper {
            transform: scale(1);
            width: 100%;
            height: 100%;
          }
          .book-section { 
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 90vw !important; 
            height: 75vh !important; 
            transform: scale(1) !important; 
            transform-origin: center center !important; 
          }
          .lined-paper {
             padding: 40px 20px !important;
          }
          .lined-paper h1 {
             font-size: 2rem !important;
             margin-bottom: 10px !important;
          }
          .lined-paper p {
             font-size: 1.1rem !important;
             line-height: 1.5 !important;
          }
        }
      `}</style>

      <VirinchiBackground />

      {/* Giant Coil spanning the whole viewport, acting as a binder connecting from Tab 2 */}
      <div className="giant-coil-wrapper" style={{ position: 'absolute', top: typeof window !== 'undefined' && window.innerWidth <= 768 ? '20px' : '0px', width: '100vw', zIndex: 50 }}>
        <NotebookBindingBack />
        <NotebookBindingFront />
      </div>
      
      {/* HORIZONTAL WRAPPER FOR MOBILE (200vw total width side by side) */}
      <div className="mobile-horizontal-wrapper" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        
        {/* PANEL 1: Lanyard */}
        <div className="id-card-section" style={{
          position: 'absolute',
          left: 0,
          top: '-1vh',
          width: '50vw',
          height: '115vh',
          zIndex: 10,
          pointerEvents: 'auto'
        }}>
          {/* Glow Behind ID Card */}
          <GlowingLight style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', zIndex: -1 }} />
          <div className="lanyard-scale-wrapper">
             <Lanyard position={[0, 0, 30]} fov={30} gravity={[0, -40, 0]} lanyardWidth={1.5} />
          </div>
        </div>

        {/* PANEL 2: Notebook */}
        <div className="notebook-container" style={{ display: 'flex', width: '100%', maxWidth: '1200px', height: '86vh', margin: '0 auto', justifyContent: 'flex-end', padding: '0 20px', position: 'relative', zIndex: 15, pointerEvents: 'none' }}>
          
          {/* Glow Behind Notebook */}
          <GlowingLight style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', zIndex: -1 }} />

          {/* RIGHT: Spiral Notebook */}
          <div className="book-section" style={{ width: '55%', height: '85%', position: 'relative', perspective: '2500px', pointerEvents: 'auto' }}>
            
            {/* Notebook Base / Back Cover */}
            <div style={{
              position: 'absolute',
              top: 0, right: 0, bottom: 0, left: 0,
              background: '#dcdcdc',
              borderRadius: '0 0 15px 15px',
              boxShadow: '10px 15px 30px rgba(0,0,0,0.2)'
            }}></div>

            {/* Notebook Pages */}
            <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
              {pagesData.map((page, index) => {
                // We render pages in reverse order so the first page is on top
                const zIndex = pagesData.length - index;
                return (
                  <div 
                    key={index}
                    className="page-element"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%',
                      transformOrigin: 'top center',
                      zIndex: zIndex,
                      transformStyle: 'preserve-3d',
                      // On desktop, use React state. On mobile, let GSAP control it.
                      transform: typeof window !== 'undefined' && window.innerWidth <= 768 && window.innerHeight > window.innerWidth ? 'rotateX(0deg)' : (index < currentPage ? 'rotateX(179.9deg)' : 'rotateX(0deg)'),
                      transition: typeof window !== 'undefined' && window.innerWidth <= 768 && window.innerHeight > window.innerWidth ? 'none' : 'transform 1.4s ease-in-out'
                    }}
                  >
                    {/* FRONT OF PAGE */}
                    <div 
                      className="lined-paper page-shadow"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: page.color,
                        borderRadius: '0 0 15px 15px', 
                        backfaceVisibility: 'hidden',
                        padding: '60px 40px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <h1 style={{ color: '#ff3366', fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'sans-serif', borderBottom: '2px solid rgba(255,51,102,0.3)', paddingBottom: '10px' }}>
                        {page.title}
                      </h1>
                      <p style={{ color: '#444', fontSize: '1.2rem', lineHeight: '2' }}>
                        Content for {page.title} goes here. (Placeholder text that you can replace later).
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>

                      {/* Optional Sticky Note */}
                      {page.sticky && (
                        <div style={{
                          position: 'absolute',
                          top: `calc(${page.sticky.top} - 10%)`,
                          right: page.sticky.right,
                          width: '80px',
                          height: '40px',
                          backgroundColor: page.sticky.color,
                          boxShadow: '-3px 5px 10px rgba(0,0,0,0.15)',
                          transform: `rotate(${Math.random() * 10 - 5}deg)`,
                          padding: '5px 10px',
                          fontFamily: 'cursive',
                          fontSize: '0.9rem',
                          color: '#222',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          backfaceVisibility: 'hidden',
                          zIndex: 10
                        }}>
                          {page.sticky.text}
                        </div>
                      )}

                      {/* Polaroid with Paperclip */}
                      {page.polaroid && (
                        <div style={{
                          position: 'absolute',
                          bottom: '20px', 
                          [page.polaroid.side]: '20px', 
                          width: '180px',
                          background: page.color, // Match notebook color
                          padding: '10px 10px 10px 10px', // Removed bottom padding since there's no text
                          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                          transform: `rotate(${page.polaroid.side === 'left' ? -8 : 8}deg)`,
                          zIndex: 5,
                          backfaceVisibility: 'hidden'
                        }}>
                          {/* Tape placed as drawn */}
                          <div style={{
                            position: 'absolute',
                            top: '-12px', 
                            [page.polaroid.side === 'left' ? 'left' : 'right']: '30px',
                            width: '60px',
                            height: '24px',
                            background: 'rgba(255, 235, 100, 0.75)', // Yellow tape
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1), inset 0 0 2px rgba(255,235,100,0.8)',
                            backdropFilter: 'blur(1px)',
                            transform: `rotate(${page.polaroid.side === 'left' ? -8 : 8}deg)`,
                            zIndex: 6
                          }} />
                          {/* Photo */}
                          <img src={page.polaroid.src} alt="Polaroid" style={{ width: '100%', height: '180px', objectFit: 'cover', background: '#ccc' }} />
                        </div>
                      )}
                    </div>

                    {/* BACK OF PAGE (Seen when flipped up) */}
                    <div 
                      className="lined-paper"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#f0f0f0',
                        borderRadius: '15px 15px 0 0', 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateX(180deg)',
                        boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.05)'
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Flip Buttons */}
            <div className="flip-btns" style={{
              position: 'absolute',
              top: '50%',
              left: '-70px',
              right: '-70px',
              transform: 'translateY(-50%)',
              display: 'flex',
              justifyContent: 'space-between',
              pointerEvents: 'none', // Allow clicking through the container itself
              zIndex: 100
            }}>
              <button 
                onClick={prevPage}
                disabled={currentPage === 0}
                style={{
                  pointerEvents: 'auto',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  backgroundColor: currentPage === 0 ? '#666' : '#ff3366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'background 0.3s'
                }}
              >
                &lt;
              </button>
              <button 
                onClick={nextPage}
                disabled={currentPage === pagesData.length - 1}
                style={{
                  pointerEvents: 'auto',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  backgroundColor: currentPage === pagesData.length - 1 ? '#666' : '#ff3366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: currentPage === pagesData.length - 1 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'background 0.3s'
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
