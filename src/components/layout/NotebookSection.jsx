import React, { useState } from 'react';
import Lanyard from './Lanyard';
import GlowingLight from './GlowingLight';
import FloatingRightIcons from './FloatingRightIcons';

const virinchiLogo = '/virinchi_logo.png';

// Background component for Tab 3 behind the ID card
const VirinchiBackground = () => {
  const musicNotes = ['♪', '♫', '♬', '♩', '✨'];
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}>
      {/* Huge faded background logo */}
      <img 
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

      {/* CSS Animated Glow Effect */}
      <GlowingLight />
    </div>
  );
};

const pagesData = [
  { title: "Introduction", color: "#fefefe", sticky: { text: "Hello!", color: "#ff99cc", top: '10%', right: '-20px' }, polaroid: { src: '/group.png', caption: 'Team', side: 'left' } },
  { title: "Academic & Professional Background", color: "#f4f4f4", sticky: { text: "Ph.D", color: "#99ccff", top: '40%', right: '-30px' }, polaroid: { src: '/group1.png', caption: 'Memories', side: 'right' } },
  { title: "Role in Virinchi", color: "#fefefe", sticky: { text: "Leader", color: "#ffcc66", top: '70%', right: '-15px' }, polaroid: { src: '/people.png', caption: 'Events', side: 'left' } },
  { title: "Guidance & Mentorship", color: "#f4f4f4", sticky: null, polaroid: { src: '/core/pruthvi.png', caption: 'Guidance', side: 'right' } },
  { title: "Faculty Message", color: "#fefefe", sticky: { text: "Inspire", color: "#ccff99", top: '20%', right: '-25px' }, polaroid: { src: '/core/vaishnavi.png', caption: 'Faculty', side: 'left' } },
];

export default function NotebookSection() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pagesData.length - 1) setCurrentPage(p => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100vh', 
        background: 'linear-gradient(to bottom, #1a0815 0%, #0d0614 100%)',
        position: 'relative',
        overflow: 'visible'
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
          .notebook-container { 
            flex-direction: column !important; 
            justify-content: flex-start !important; 
            padding-top: 50px !important;
          }
          .id-card-section { 
            position: relative !important;
            width: 100% !important; 
            height: 250px !important;
            transform: scale(0.6); 
            transform-origin: top center;
          }
          .book-section { 
            width: 90vw !important; 
            height: 120vw !important; /* Keep proportion */
            margin: 0 auto;
            transform: scale(0.7); 
            transform-origin: top center; 
          }
        }
      `}</style>

      <VirinchiBackground />

      {/* Bottom Reddish-Pink Oval Glow */}
      <div style={{
        position: 'absolute',
        bottom: '-15vh',
        left: '75%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '40vh',
        background: 'radial-gradient(ellipse at center, rgba(255, 42, 133, 0.45) 0%, rgba(255, 42, 133, 0) 80%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 2, 
      }} />
      
      {/* Lanyard - absolute within Tab 3, no left/right clipping */}
      <div className="id-card-section" style={{
        position: 'absolute',
        left: 0,
        top: '-1vh',
        width: '50vw',
        height: '115vh',
        zIndex: 10,
        pointerEvents: 'auto'
      }}>
        <Lanyard position={[0, 0, 30]} fov={30} gravity={[0, -40, 0]} lanyardWidth={1.5} />
      </div>

      <div className="notebook-container" style={{ display: 'flex', width: '100%', maxWidth: '1200px', height: '86vh', margin: '0 auto', justifyContent: 'flex-end', padding: '0 20px', position: 'relative', zIndex: 15, pointerEvents: 'none' }}>
        
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
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    transformOrigin: 'top center',
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                    transform: index < currentPage ? 'rotateX(179.9deg)' : 'rotateX(0deg)',
                    transition: 'transform 1.4s ease-in-out'
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
                        top: page.sticky.top,
                        right: page.sticky.right,
                        width: '120px',
                        height: '120px',
                        backgroundColor: page.sticky.color,
                        boxShadow: '-3px 5px 10px rgba(0,0,0,0.15)',
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                        padding: '15px',
                        fontFamily: 'cursive',
                        fontSize: '1.2rem',
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
                  >
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flip Buttons */}
          <div style={{
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
  );
}
