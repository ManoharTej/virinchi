import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import clouds1Img from './assets/clouds_1.jpg';
import clouds2Img from './assets/clouds_2.jpg';

/* ═══════════════════════════════════════════════════════════
   VIRINCHI — Infinite Anime Sky with Foreground
   Features true 3D flapping birds and a hand-coded vector landscape.
═══════════════════════════════════════════════════════════ */

// A beautiful provided landscape image at the bottom of the page
const AnimeLandscape = ({ handRef }) => {
  useEffect(() => {
    // Start Puppet Hand Animation once the hand element mounts
    if (handRef.current) {
      animate(handRef.current, {
        rotateZ: [-5, 8],
        translateY: [-2, 2],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 1200
      });
    }
  }, [handRef]);

  return (
    <div style={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      width: '100%', 
      height: '110vh', // Takes up the bottom of the page, visible only when scrolling down
      overflow: 'hidden', 
      zIndex: 'auto', // AUTO allows children to interleave with outside elements (like the string)
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <img 
        src="/mountains.png" 
        alt="Mountains" 
        style={{ 
          width: '80%', 
          height: 'auto', 
          transform: 'translateX(5%) translateY(18%)', 
          filter: 'blur(1px)',
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 10 // Mountains are behind the string (55)
        }} 
      />
      <img 
        src="/ground.png" 
        alt="Foreground Ground" 
        style={{ 
          width: '100%', 
          height: 'auto', 
          transform: 'translateY(5%)', 
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 12 // In front of mountains
        }} 
      />

      {/* Hero Characters on the left */}
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '45vw', maxWidth: '700px', zIndex: 60 }}>
        {/* Animated Hand (Placed BEHIND people) */}
        <img 
          ref={handRef}
          src="/hand.png" 
          alt="Hand"
          style={{ 
            position: 'absolute', 
            top: '1.8%',
            left: '50%',
            width: '12%',
            height: 'auto',
            transformOrigin: 'bottom left',
            zIndex: 61 // Inside the 60 wrapper
          }} 
        />
        {/* The main people image */}
        <img 
          src="/people.png" 
          alt="Characters" 
          style={{ 
            position: 'relative', 
            zIndex: 65, 
            width: '100%', 
            height: 'auto', 
            display: 'block', 
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
          }} 
        />
      </div>
    </div>
  );
};

const KiteSystem = ({ handRef }) => {
  const kiteContainerRef = useRef(null);
  const kiteSwayRef = useRef(null);
  const stringRef = useRef(null);

  useEffect(() => {
    // 1. Kite Sway Animation (Wind effect)
    if (kiteSwayRef.current) {
       animate(kiteSwayRef.current, {
         rotateZ: [-5, 5],
         translateX: [-15, 15],
         translateY: [-10, 10],
         direction: 'alternate',
         loop: true,
         easing: 'easeInOutSine',
         duration: 3500
       });
    }

    // 3. Mouse move for Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 60;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 60;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 4. Scroll for Kite 
    const updateKite = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      
      const scrollProgress = Math.min(sy / vh, 1); // 0 to 1
      
      // Top: Starts at 5vh, ends at 12vh (moved 3 points higher)
      const currentTop = 5 + (7 * scrollProgress); 
      
      // Left: Starts at 45vw, ends at 33vw (the empty spot in the clouds)
      const currentLeft = 45 - (12 * scrollProgress);

      if (kiteContainerRef.current) {
        kiteContainerRef.current.style.top = `${currentTop}vh`;
        kiteContainerRef.current.style.left = `${currentLeft}vw`;
        kiteContainerRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.8)`;
      }

      // Draw dynamic string perfectly connecting hand to kite
      if (handRef.current && kiteContainerRef.current && stringRef.current) {
        const handRect = handRef.current.getBoundingClientRect();
        const kiteRect = kiteContainerRef.current.getBoundingClientRect();
        
        // Attach exact at the fingers/grip area
        const hX = handRect.left + handRect.width * 0.85;
        const hY = handRect.top + handRect.height * 0.18;

        const kX = kiteRect.left + kiteRect.width * 0.5;
        const kY = kiteRect.top + kiteRect.height;

        const midX = (hX + kX) / 2;
        const midY = Math.max(hY, kY) + 50; 

        stringRef.current.setAttribute('d', `M ${hX} ${hY} Q ${midX} ${midY} ${kX} ${kY}`);
      }
      
      requestAnimationFrame(updateKite);
    };
    
    const rAF = requestAnimationFrame(updateKite);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rAF);
    };
  }, [handRef]);

  return (
    <>
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 55 }}>
        <path ref={stringRef} fill="transparent" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      </svg>
      
      <div ref={kiteContainerRef} style={{ position: 'fixed', left: '45%', top: '5vh', zIndex: 56, pointerEvents: 'none' }}>
         <div ref={kiteSwayRef}>
           <svg width="150" height="350" viewBox="0 0 100 250" style={{ overflow: 'visible' }}>
             {/* Kite Body - Striped/Colorful */}
             <polygon points="50,0 100,50 50,120 0,50" fill="#ff0055" /> 
             <polygon points="50,0 100,50 50,50" fill="#ffb800" />
             <polygon points="100,50 50,120 50,50" fill="#00e5ff" />
             <polygon points="50,120 0,50 50,50" fill="#ff0055" />
             <polygon points="0,50 50,0 50,50" fill="#00d26a" />
             {/* Ribbons/Tail */}
             <path d="M 50 120 Q 20 160 50 200 T 50 280 T 50 360" fill="transparent" stroke="#ffb800" strokeWidth="6" strokeLinecap="round" />
             <path d="M 50 120 Q 80 170 50 220 T 50 320 T 50 420" fill="transparent" stroke="#ff0055" strokeWidth="6" strokeLinecap="round" />
             <path d="M 50 120 Q 40 180 50 240 T 50 340 T 50 440" fill="transparent" stroke="#00e5ff" strokeWidth="6" strokeLinecap="round" />
           </svg>
         </div>
      </div>
    </>
  );
};


// A flock of birds using true 3D rotation for realistic flapping
const AnimatedFlock = ({ top, left, scale, delay, duration, count = 8 }) => {
  const flockRef = useRef(null);

  useEffect(() => {
    // 1. Drift across the sky
    animate(flockRef.current, {
      translateX: [-500, window.innerWidth + 1000],
      translateY: [0, -200], // drift upwards slightly
      duration: duration,
      loop: true,
      easing: 'linear',
      delay: delay
    });

    // 2. Realistic 3D Flapping
    animate(`.bird-wing-${delay}`, {
      rotateX: [-30, 60], // Slower, deeper flap
      duration: 800 + (Math.random() * 200),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    // 3. Organic bobbing
    animate(`.bird-bobber-${delay}`, {
      translateY: ['-20px', '20px'],
      duration: 1800,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: stagger(250) 
    });
  }, [delay, duration]);

  const birds = Array.from({ length: count }).map((_, i) => {
    const bx = Math.random() * 500; 
    const by = Math.random() * 250;
    const bscale = 0.3 + Math.random() * 0.4;
    
    return (
      <div 
        key={i}
        className={`bird-bobber-${delay}`}
        style={{ position: 'absolute', left: bx, top: by, transform: `scale(${bscale})`, opacity: 0.6, display: 'flex', perspective: '500px' }}
      >
        {/* Left Wing (Black silhouette) */}
        <svg 
          className={`bird-wing-${delay}`}
          width="30" height="20" viewBox="0 0 30 20" 
          style={{ transformOrigin: 'right center' }}
        >
          <path d="M 30 10 Q 15 0 0 5 Q 10 12 30 10 Z" fill="#111" />
        </svg>
        {/* Right Wing (Black silhouette) */}
        <svg 
          className={`bird-wing-${delay}`}
          width="30" height="20" viewBox="0 0 30 20" 
          style={{ transformOrigin: 'left center' }}
        >
          <path d="M 0 10 Q 15 0 30 5 Q 20 12 0 10 Z" fill="#111" />
        </svg>
      </div>
    );
  });

  return (
    <div ref={flockRef} style={{ position: 'absolute', top, left, width: '400px', height: '200px', transform: `scale(${scale})`, zIndex: 30, pointerEvents: 'none' }}>
      {birds}
    </div>
  );
};

// 10 Background Kites scattered across the screen and moving
const BackgroundKites = () => {
  const kitesRef = useRef(null);

  useEffect(() => {
    // Large swooping movement across the screen
    animate('.bg-kite', {
      translateX: (el) => [0, window.innerWidth * 0.8],
      translateY: (el) => ['-50px', '50px'],
      rotateZ: (el) => [parseFloat(el.dataset.r) - 10, parseFloat(el.dataset.r) + 10],
      duration: (el, i) => 25000 + i * 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: stagger(1000)
    });
  }, []);

  const kiteData = [
    { top: '10%', left: '10%', s: 0.25, r: 15 },
    { top: '40%', left: '20%', s: 0.2, r: -10 },
    { top: '20%', left: '40%', s: 0.22, r: 25 },
    { top: '60%', left: '15%', s: 0.18, r: -5 },
    { top: '25%', left: '55%', s: 0.24, r: 10 },
    { top: '80%', left: '5%', s: 0.2, r: -15 },
    { top: '15%', left: '75%', s: 0.25, r: 5 },
    { top: '50%', left: '80%', s: 0.21, r: 20 },
    { top: '75%', left: '90%', s: 0.19, r: -8 },
    { top: '5%', left: '95%', s: 0.23, r: 12 },
  ];

  return (
    <div ref={kitesRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 15 }}>
      {kiteData.map((k, i) => (
        <div 
          key={i} 
          className="bg-kite" 
          data-r={k.r}
          style={{ position: 'absolute', top: k.top, left: k.left, transform: `scale(${k.s}) rotate(${k.r}deg)`, opacity: 0.8 }}
        >
          <svg width="150" height="350" viewBox="0 0 100 250">
            <polygon points="50,0 100,50 50,120 0,50" fill="#ff0055" /> 
            <polygon points="50,0 100,50 50,50" fill="#ffb800" />
            <polygon points="100,50 50,120 50,50" fill="#00e5ff" />
            <polygon points="50,120 0,50 50,50" fill="#ff0055" />
            <polygon points="0,50 50,0 50,50" fill="#00d26a" />
            {/* Ribbons/Tail */}
            <path d="M 50 120 Q 20 160 50 200 T 50 280 T 50 360" fill="transparent" stroke="#ffb800" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 120 Q 80 170 50 220 T 50 320 T 50 420" fill="transparent" stroke="#ff0055" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 120 Q 40 180 50 240 T 50 340 T 50 440" fill="transparent" stroke="#00e5ff" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);
  const handRef = useRef(null); // Reference for the hero's hand

  useEffect(() => {
    // Continuous Cloud Movement
    animate(layer1Ref.current, { backgroundPositionX: ['0%', '100%'], duration: 180000, loop: true, easing: 'linear' });
    animate(layer2Ref.current, { backgroundPositionX: ['0%', '100%'], duration: 120000, loop: true, easing: 'linear' });
    animate(layer3Ref.current, { backgroundPositionX: ['100%', '0%'], duration: 150000, loop: true, easing: 'linear' });
    animate(layer4Ref.current, { backgroundPositionX: ['0%', '100%'], duration: 90000, loop: true, easing: 'linear' });
    
    // Parallax Depth on Scroll
    const handleScroll = () => {
      const sy = window.scrollY;
      if (layer1Ref.current) layer1Ref.current.style.transform = `translateY(\${sy * 0.1}px)`;
      if (layer2Ref.current) layer2Ref.current.style.transform = `translateY(\${sy * 0.3}px)`;
      if (layer3Ref.current) layer3Ref.current.style.transform = `translateY(\${sy * 0.5}px)`;
      if (layer4Ref.current) layer4Ref.current.style.transform = `translateY(\${sy * 0.7}px)`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '200vh', 
      background: 'linear-gradient(180deg, #1c73db 0%, #4facfe 50%, #89f7fe 100%)',
      overflow: 'hidden'
    }}>
      
      {/* CLOUDS (mix-blend-mode: screen) */}
      <div 
        ref={layer1Ref}
        style={{
          position: 'absolute', top: '10%', left: '-10%', width: '120%', height: '100vh',
          background: `url(${clouds2Img}) repeat-x center/auto 100%`,
          mixBlendMode: 'screen', opacity: 0.6, pointerEvents: 'none', willChange: 'background-position'
        }} 
      />
      <div 
        ref={layer2Ref}
        style={{
          position: 'absolute', top: '30%', right: '-5%', width: '150%', height: '120vh',
          background: `url(${clouds1Img}) repeat-x center/auto 100%`,
          mixBlendMode: 'screen', opacity: 0.8, pointerEvents: 'none', willChange: 'background-position'
        }} 
      />
      <div 
        ref={layer3Ref}
        style={{
          position: 'absolute', top: '90%', left: '-5%', width: '200%', height: '100vh',
          background: `url(${clouds2Img}) repeat-x center/auto 100%`,
          mixBlendMode: 'screen', opacity: 0.9, pointerEvents: 'none', willChange: 'background-position'
        }} 
      />
      <div 
        ref={layer4Ref}
        style={{
          position: 'absolute', top: '120%', left: '-20%', width: '200%', height: '150vh',
          background: `url(${clouds1Img}) repeat-x center/auto 100%`,
          mixBlendMode: 'screen', opacity: 1, pointerEvents: 'none', willChange: 'background-position'
        }} 
      />

      {/* BIRDS */}
      <AnimatedFlock top="15%" left="0" scale={0.6} delay={1000} duration={35000} count={6} />
      <AnimatedFlock top="110%" left="0" scale={0.8} delay={0} duration={30000} count={8} />

      {/* BACKGROUND KITES */}
      <BackgroundKites />

      {/* KITE SYSTEM (Parallax Kite and String) */}
      <KiteSystem handRef={handRef} />

      {/* NEW FOREGROUND MOUNTAINS & TREES */}
      <AnimeLandscape handRef={handRef} />


      {/* --- SCROLLY-TELLING UI OVERLAYS --- */}

      {/* TAB 1: Hero Section (100vh) */}
      <section style={{ height: '100vh', display: 'flex', width: '100%', position: 'relative', zIndex: 100 }}>
        
        {/* HEADER MENU */}
        <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 120 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <img src="/virinchi_logo.png" alt="Logo" style={{ width: '75px', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} />
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)', letterSpacing: '1px', marginLeft: '3px' }}>THE CULTURAL CLUB OF VBIT</span>
          </div>
          
          <nav style={{ display: 'flex', gap: '25px', color: 'white', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.5px' }}>
            <span style={{ position: 'relative' }}>Home <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '2px', background: 'white', borderRadius: '2px' }}></div><div style={{ position: 'absolute', bottom: '-11px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', background: 'white', borderRadius: '50%' }}></div></span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>About</span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>People</span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>Events</span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>Gallery</span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>Reels</span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>Legacy</span>
            <span style={{ opacity: 0.7, cursor: 'pointer' }}>Contact</span>
          </nav>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ color: 'white', fontSize: '14px' }}>♫</span>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 30 24" fill="white">
                <rect width="30" height="2" rx="1" />
                <rect y="11" width="30" height="2" rx="1" />
                <rect y="22" width="30" height="2" rx="1" />
              </svg>
            </div>
          </div>
        </header>



        {/* Left Side: Big Glow Logo */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '140px', paddingTop: '60px' }}>
          <img 
            src="/virinchi_logo.png" 
            alt="Virinchi Logo" 
            style={{ width: '38vw', maxWidth: '600px', filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.7)) drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} 
          />
          <p style={{ color: 'white', letterSpacing: '4px', fontSize: '1rem', marginTop: '10px', marginLeft: '30px', fontWeight: 500, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            THE CULTURAL CLUB OF VBIT
          </p>

          <div style={{ marginTop: '40px', marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: 'white', fontSize: '12px', marginLeft: '3px' }}>▶</span>
            </div>
            <span style={{ color: 'white', fontSize: '11px', letterSpacing: '2px' }}>WATCH OUR WORLD</span>
          </div>
        </div>

        {/* Right Side: Media Cards Cluster (6 Polaroids scattered like the photo, tilted inward) */}
        <div style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ position: 'relative', width: '700px', height: '600px', transformStyle: 'preserve-3d', transform: 'perspective(1500px) rotateY(-20deg) rotateX(5deg)' }}>
            
            {/* Soft background magical glow behind the cluster */}
            <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,51,102,0.15) 0%, rgba(0,229,255,0.1) 50%, transparent 80%)', filter: 'blur(40px)', zIndex: 0, transform: 'translateZ(-50px)' }}></div>

            <div style={{ position: 'absolute', top: '0%', left: '5%', zIndex: 1, transform: 'translateZ(10px)' }}>
              <div className="polaroid" style={{ transform: 'rotate(12deg) scale(0.8)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,51,102,0.2)' }}>
                <img src="/people1.png" alt="Event 1" />
              </div>
            </div>

            <div style={{ position: 'absolute', top: '5%', left: '45%', zIndex: 2, transform: 'translateZ(20px)' }}>
              <div className="polaroid" style={{ transform: 'rotate(-10deg) scale(0.9)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.2)' }}>
                <img src="/city.png" alt="Event 2" />
              </div>
            </div>

            <div style={{ position: 'absolute', top: '35%', left: '-5%', zIndex: 3, transform: 'translateZ(30px)' }}>
              <div className="polaroid" style={{ transform: 'rotate(-8deg) scale(0.95)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,184,0,0.2)' }}>
                <img src="/mountains.png" alt="Event 3" />
              </div>
            </div>

            <div style={{ position: 'absolute', top: '30%', left: '50%', zIndex: 5, transform: 'translateZ(40px)' }}>
              <div className="polaroid" style={{ transform: 'rotate(10deg) scale(1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(255,51,102,0.3)' }}>
                <img src="/people.png" alt="Event 4" />
                <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}><span style={{ color: 'white', fontSize: '16px', marginLeft: '3px' }}>▶</span></div>
              </div>
            </div>

            <div style={{ position: 'absolute', top: '65%', left: '10%', zIndex: 4, transform: 'translateZ(25px)' }}>
              <div className="polaroid" style={{ transform: 'rotate(8deg) scale(0.9)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.2)' }}>
                <img src="/cityscape.png" alt="Event 5" />
              </div>
            </div>

            <div style={{ position: 'absolute', top: '60%', left: '40%', zIndex: 6, transform: 'translateZ(35px)' }}>
              <div className="polaroid" style={{ transform: 'rotate(-5deg) scale(0.95)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,184,0,0.2)' }}>
                <img src="/people1.png" alt="Event 6" />
              </div>
            </div>

          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '20px', height: '32px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '10px', display: 'flex', justifyContent: 'center', padding: '4px' }}>
            <div style={{ width: '2px', height: '6px', background: 'white', borderRadius: '1px' }} />
          </div>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)' }}>SCROLL DOWN</span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>↓</span>
        </div>
      </section>

      {/* TAB 2: About Virinchi (100vh) */}
      <section style={{ height: '100vh', display: 'flex', width: '100%', padding: '50px', position: 'relative', zIndex: 100 }}>
        
        {/* Content Aligned to the Right (45%) */}
        <div style={{ 
          width: '45%', 
          marginLeft: 'auto', 
          marginRight: '5%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* A dark glassmorphism container for the About section to ensure readability against the landscape */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.4)', 
            backdropFilter: 'blur(10px)', 
            padding: '50px', 
            borderRadius: '20px', 
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ color: '#fff', fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              About <span style={{ color: '#ff3366' }}>Virinchi</span>
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#ff3366', margin: '0 auto 30px auto' }}></div>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px' }}>
              Virinchi is the vibrant cultural heart of VBIT, a dynamic collective of artists, musicians, dancers, and creators. 
              We are dedicated to fostering artistic expression and nurturing talent across various creative domains.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Join our energetic community, discover your passion, and be part of extraordinary performances and events that define the cultural landscape of our campus. Let the rhythm guide you!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

