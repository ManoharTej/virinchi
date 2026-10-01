import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WingsSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   GLASSMORPHISM INFO BOX FOR STAGES 2 & 3
═══════════════════════════════════════════════════════════ */
const GlassBox = ({ stageNumber, title, subtitle, description, accentColor, side = 'left', sideOffset = '15%', highlights = [], meterLabel = '' }) => (
  <div className="wings-glass-box" style={{
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [side]: sideOffset,
    width: '34%',
    maxWidth: '520px',
    padding: '42px 45px',
    background: 'rgba(7, 3, 15, 0.65)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    borderRadius: '28px',
    border: `1px solid rgba(255, 255, 255, 0.14)`,
    boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px ${accentColor}18, inset 0 1px 0 rgba(255,255,255,0.12)`,
    zIndex: 20,
  }}>
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '5px 14px',
      borderRadius: '20px',
      background: `${accentColor}15`,
      border: `1px solid ${accentColor}40`,
      marginBottom: '16px',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
      <span style={{ fontSize: '0.75rem', color: accentColor, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
        {stageNumber} // {subtitle}
      </span>
    </div>

    <h2 className="wings-glass-title" style={{
      fontSize: 'clamp(2.4rem, 3.4vw, 3.4rem)',
      color: '#fff',
      fontWeight: 900,
      margin: '0 0 16px 0',
      lineHeight: 1.08,
      letterSpacing: '1px',
      textShadow: `0 0 35px ${accentColor}44`,
      fontFamily: "'Unbounded', 'Outfit', sans-serif",
    }}>{title}</h2>

    <div style={{
      width: '70px',
      height: '4px',
      borderRadius: '2px',
      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      marginBottom: '22px',
      boxShadow: `0 0 16px ${accentColor}`,
    }} />

    <p className="wings-glass-desc" style={{
      color: 'rgba(255, 255, 255, 0.82)',
      fontSize: '1.02rem',
      lineHeight: 1.7,
      margin: '0 0 24px 0',
    }}>{description}</p>

    {highlights.length > 0 && (
      <div className="wings-glass-highlights" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
        {highlights.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.88rem',
            color: 'rgba(255, 255, 255, 0.9)',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '7px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <span style={{ color: accentColor, fontSize: '0.9rem' }}>✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    )}

    {meterLabel && (
      <div className="wings-glass-meter" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
      }}>
        <span>{meterLabel}</span>
        <span style={{ color: accentColor, fontWeight: 700 }}>LIVE ON STAGE</span>
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   STARS AND SHOOTING STARS
═══════════════════════════════════════════════════════════ */
const WingsStars = () => (
  <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
    {Array.from({length:100}).map((_,i) => (
      <div key={i} style={{
        position:'absolute',
        top:`${Math.random()*100}%`,
        left:`${Math.random()*100}%`,
        width:Math.random()*2+'px',
        height:Math.random()*2+'px',
        background:'#fff',
        borderRadius:'50%',
        opacity:Math.random()*0.8+0.2,
        animation:`wings_twinkle ${2+Math.random()*3}s infinite alternate`
      }}/>
    ))}
  </div>
);

const WingsShootingStars = () => (
  <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
    {Array.from({length: 6}).map((_, i) => (
      <div key={`ss-${i}`} style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        width: '150px',
        height: '2px',
        background: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))',
        borderRadius: '50%',
        transform: 'rotate(-45deg)',
        animation: `wings_shootingStar ${4 + Math.random() * 6}s ${Math.random() * 10}s infinite linear`,
        opacity: 0,
      }} />
    ))}
  </div>
);

const FreaksBeams = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
    {/* Left Angled Rig Beams (Coordinates from user double-clicks, shifted 1px right) */}
    <div className="wings-light-beam" style={{ left: '11.5%', top: '32.4%', animation: 'beamSweep 3s infinite alternate ease-in-out' }} />
    <div className="wings-light-beam" style={{ left: '14.6%', top: '35.3%', animation: 'beamSweep 3.2s infinite alternate ease-in-out 0.5s' }} />
    <div className="wings-light-beam" style={{ left: '17.3%', top: '37.1%', animation: 'beamSweep 2.8s infinite alternate ease-in-out 1s' }} />
    <div className="wings-light-beam" style={{ left: '24.1%', top: '42.7%', animation: 'beamSweep 3.5s infinite alternate ease-in-out 1.5s' }} />
    <div className="wings-light-beam" style={{ left: '31.5%', top: '46.1%', animation: 'beamSweep 3.1s infinite alternate ease-in-out 0.8s' }} />
    <div className="wings-light-beam" style={{ left: '35.2%', top: '46.2%', animation: 'beamSweep 3.4s infinite alternate ease-in-out 1.2s' }} />
    <div className="wings-light-beam" style={{ left: '39.0%', top: '46.2%', animation: 'beamSweep 2.9s infinite alternate ease-in-out 0.3s' }} />
    
    {/* Color-changing Glow Orbs (3 top ones, shifted 20px up) */}
    <div className="wings-light-glow" style={{ left: '34.4%', top: '39.0%', animationDelay: '0s' }} />
    <div className="wings-light-glow" style={{ left: '39.4%', top: '39.6%', animationDelay: '0.5s' }} />
    <div className="wings-light-glow" style={{ left: '43.7%', top: '40.0%', animationDelay: '1s' }} />
  </div>
);

const RythmGlares = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
    {/* Right Rig Beams (Coordinates from user double-clicks) */}
    <div className="wings-light-beam" style={{ left: '57.1%', top: '46.2%', animation: 'beamSweep 3s infinite alternate ease-in-out' }} />
    <div className="wings-light-beam" style={{ left: '60.8%', top: '46.1%', animation: 'beamSweep 3.2s infinite alternate ease-in-out 0.5s' }} />
    <div className="wings-light-beam" style={{ left: '64.5%', top: '45.7%', animation: 'beamSweep 2.8s infinite alternate ease-in-out 1s' }} />
    <div className="wings-light-beam" style={{ left: '72.0%', top: '42.7%', animation: 'beamSweep 3.5s infinite alternate ease-in-out 1.5s' }} />
    <div className="wings-light-beam" style={{ left: '78.55%', top: '37.7%', animation: 'beamSweep 3.1s infinite alternate ease-in-out 0.8s' }} />
    <div className="wings-light-beam" style={{ left: '81.8%', top: '34.8%', animation: 'beamSweep 3.4s infinite alternate ease-in-out 1.2s' }} />
    <div className="wings-light-beam" style={{ left: '83.95%', top: '33.0%', animation: 'beamSweep 2.9s infinite alternate ease-in-out 0.3s' }} />

    {/* Color-changing Glow Orbs (3 top ones, shifted 20px up) */}
    <div className="wings-light-glow" style={{ left: '65.4%', top: '40.0%', animationDelay: '0.4s' }} />
    <div className="wings-light-glow" style={{ left: '60.7%', top: '40.5%', animationDelay: '0.8s' }} />
    <div className="wings-light-glow" style={{ left: '56.1%', top: '41.0%', animationDelay: '1.2s' }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   WINGS SECTION MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const WingsSection = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef(null);

  const [animStep, setAnimStep] = useState(0);
  const hasTriggeredRef = useRef(false);

  // 1. Strict Scroll Lock on Entry & Sequenced Cinematic Reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;

        // Force strict scroll lock at body level so users can't scroll past the intro
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Auto snap cleanly to the exact top of the section
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        // Trigger Step 1: Deep cinematic smoke rolls in
        setAnimStep(1);

        // Trigger Step 2: 2x Virinchi Logo appears
        const timer1 = setTimeout(() => {
          setAnimStep(2);
        }, 1800);

        // Trigger Step 3: Freaks & Rythm elegant titles slide in
        const timer2 = setTimeout(() => {
          setAnimStep(3);
        }, 3500);

        // Trigger Step 4: Unlock scroll and show hint
        const timer3 = setTimeout(() => {
          setAnimStep(4);
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
          // Important: refresh GSAP after unlocking body overflow so it recalculates scroll heights correctly
          ScrollTrigger.refresh();
        }, 5500);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      }
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const isMobile = window.innerWidth <= 768;

  // 2. Horizontal Scroll Pinning via GSAP
  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollDistance = window.innerWidth * 2; // 3 panels, 2 transitions

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          snap: {
            snapTo: 1 / 2, // 3 panels = 2 transitions, so snapping to 0, 0.5, 1
            duration: { min: 0.2, max: 0.6 },
            ease: 'power1.inOut'
          }
        }
      });

      // Slide all 3 panels left smoothly
      tl.to(panelsRef.current, {
        xPercent: -66.666,
        ease: 'none'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="wings-container-wrapper" style={{ position: 'relative', width: '100%' }}>
      <section ref={sectionRef} id="tab7" className="wings-section-wrapper">

      {/* 3 panels horizontal container */}
      <div ref={panelsRef} style={{ display: 'flex', width: '300vw', height: '100vh' }}>

        {/* ═══════════ PANEL 1: WINGS OF VIRINCHI INTRO ═══════════ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          background: '#0d0614',
          overflow: 'hidden',
        }}>

          {/* SVG filters for real smoke displacement */}
          <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
            <defs>
              <filter id="smoke-warp-left">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="1" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="smoke-warp-right">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="stage-floor-smoke-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="5" result="turb">
                  <animate attributeName="baseFrequency" dur="10s" values="0.018;0.025;0.016;0.018" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="30" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* White stroke kinetic watermark text */}
          <div className="wings-watermark-track">
            <span className="wings-watermark-text">VIRINCHI FESTIVAL • FREAKS UNITED • RHYTHM • THE CULTURAL WINGS • </span>
            <span className="wings-watermark-text">VIRINCHI FESTIVAL • FREAKS UNITED • RHYTHM • THE CULTURAL WINGS • </span>
          </div>

          <div className={`wings-smoke-texture ${animStep >= 1 ? 'active' : ''}`} />

          {/* Realistic smoke layers */}
          <div className={`wings-fog-left ${animStep >= 1 ? 'active' : ''}`} />
          <div className={`wings-fog-right ${animStep >= 1 ? 'active' : ''}`} />

          {/* Elegant Titles (Left) */}
          <div className={`elegant-title-box elegant-title-box-freaks ${animStep >= 3 ? 'active' : ''}`}>
            <div className="elegant-tag elegant-tag-freaks">DANCE WING</div>
            <h1 className="elegant-text elegant-text-freaks">FREAKS<br/>UNITED</h1>
          </div>

          {/* Giant Logo (Center) */}
          <div className="wings-center-container">
            <img
              src="/virinchi_logo.png"
              alt="Virinchi Logo"
              className={`wings-revealed-logo ${animStep >= 2 ? 'active' : ''}`}
            />
            <div className={`wings-center-subtitle ${animStep >= 2 ? 'active' : ''}`}>
              WINGS OF VIRINCHI
            </div>
          </div>

          {/* Elegant Titles (Right) */}
          <div className={`elegant-title-box elegant-title-box-rythm ${animStep >= 3 ? 'active' : ''}`}>
            <div className="elegant-tag elegant-tag-rythm">MUSIC WING</div>
            <h1 className="elegant-text elegant-text-rythm">RHYTHM</h1>
          </div>

          {/* Scroll Hint */}
          <div className={`wings-scroll-ready-hint ${animStep >= 4 ? 'active' : ''}`}>
            <span>SCROLL TO EXPLORE WINGS</span>
            <span className="wings-scroll-arrow">❯❯❯</span>
          </div>

        </div>

        {/* ═══════════ PANEL 2: FREAKS UNITED (Dance Stage) ═══════════ */}
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'linear-gradient(to bottom, #02040f 0%, #08122c 100%)' }}>
          
          {/* Starry Night Background - Left Half */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', top: 0, right: 0, width: '60%', height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 50px)',
            maskImage: 'linear-gradient(to right, transparent, black 50px)'
          }}>
            <WingsStars />
            <WingsShootingStars />
            
            {/* Moon */}
            <div style={{
              position: 'absolute', top: '15%', left: '25%',
              width: '70px', height: '70px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 0%, #dce5ff 40%, #8090c4 100%)',
              boxShadow: '0 0 35px 12px rgba(180,210,255,0.3)',
              zIndex: 0
            }} />
          </div>

          <div className="wings-stage-bg" style={{
            position: 'absolute', top: '50%', right: 0, width: '60%', height: '30%',
            background: 'linear-gradient(to bottom, transparent, #08122c)',
            zIndex: 0, pointerEvents: 'none'
          }} />

          {/* Continuous Stage - Left Half */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', bottom: '40px', right: 0, width: '60%', height: '100%',
            backgroundImage: "url('/stage.png')",
            backgroundSize: isMobile ? '220vw auto' : '150vw auto',
            backgroundPosition: isMobile ? '-10vw bottom' : '-15vw bottom',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            pointerEvents: 'none',
            WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to right, transparent, black 50px)',
            maskImage: isMobile ? 'none' : 'linear-gradient(to right, transparent, black 50px)'
          }} />

          {/* Stage Lights (Focus Beams) */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', zIndex: 2, pointerEvents: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 50px)',
            maskImage: 'linear-gradient(to right, transparent, black 50px)',
            overflow: 'hidden'
          }}>
            <div 
              onDoubleClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                console.log(`%c[FreaksBeams - Left Panel] Double Click at: left: '${x.toFixed(1)}%', top: '${y.toFixed(1)}%'`, 'color: #ff0f43; font-weight: bold; font-size: 14px;');
              }}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: isMobile ? '-10vw' : '-15vw',
                width: isMobile ? '220vw' : '150vw',
                height: isMobile ? '76vw' : '51.66vw',
                pointerEvents: 'auto' // Needed to capture clicks
              }}
            >
              <FreaksBeams />
            </div>
          </div>

          {/* Strobe Light Effect on Crowd */}
          <div className="wings-strobe-overlay" style={{ right: 0, zIndex: 2, width: '60%' }} />

          {/* Localized Fog (Red) - placed in front of crowd */}
          <div className="wings-fog-stage-freaks" style={{ zIndex: 2 }} />

          {/* Stage People - Freaks (In front of lights, behind crowd, darkened silhouette with floor smoke) */}
          <div className="wings-performers wings-performers-freaks" style={{
            position: 'absolute', bottom: '26vh', right: '8%',
            width: '280px', height: 'auto',
            zIndex: 4,
            pointerEvents: 'none',
          }}>
            <img
              src="/fuc.png"
              alt="Stage Performers"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(0.28) contrast(1.35) drop-shadow(0 0 15px rgba(255, 15, 67, 0.45))',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.6) 70%, transparent 95%)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.6) 70%, transparent 95%)',
              }}
            />

            {/* Stage Footlight Glow & Realistic Concert Dry-Ice Fog hiding legs */}
            <div style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-20%',
              width: '140%',
              height: '95px',
              pointerEvents: 'none',
              opacity: 0.50,
            }}>
              {/* Ground footlight glow */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '10%',
                width: '80%',
                height: '50px',
                background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.25) 50%, transparent 80%)',
                filter: 'blur(8px)',
                mixBlendMode: 'screen',
              }} />
              {/* Fog Cloud 1 - Center Billow */}
              <div className="wings-floor-smoke" style={{
                position: 'absolute',
                bottom: '-5px',
                left: '15%',
                width: '70%',
                height: '80px',
                background: 'radial-gradient(ellipse 65% 50% at 50% 65%, rgba(255, 255, 255, 0.85) 0%, rgba(235, 242, 255, 0.45) 50%, transparent 75%)',
                animation: 'rollingStageFog1 6s ease-in-out infinite alternate',
              }} />
              {/* Fog Cloud 2 - Left Billow */}
              <div className="wings-floor-smoke" style={{
                position: 'absolute',
                bottom: '-10px',
                left: '-5%',
                width: '60%',
                height: '75px',
                background: 'radial-gradient(ellipse 60% 50% at 50% 65%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 242, 255, 0.4) 50%, transparent 75%)',
                animation: 'rollingStageFog2 8s ease-in-out infinite alternate 0.5s',
              }} />
              {/* Fog Cloud 3 - Right Billow */}
              <div className="wings-floor-smoke" style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-5%',
                width: '60%',
                height: '75px',
                background: 'radial-gradient(ellipse 60% 50% at 50% 65%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 242, 255, 0.4) 50%, transparent 75%)',
                animation: 'rollingStageFog3 7s ease-in-out infinite alternate 1s',
              }} />
            </div>
          </div>

          {/* Continuous Crowd Background - Left Half (In front of performers, zIndex 5) */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', bottom: isMobile ? '-5vh' : '-10vh', right: 0, width: '60%', height: '100%',
            backgroundImage: "url('/publicgroup.png')",
            backgroundSize: isMobile ? '220vw auto' : '140vw auto',
            backgroundPosition: isMobile ? '-10vw bottom' : '-10vw bottom',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
            zIndex: 5,
            pointerEvents: 'none',
            WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to right, transparent, black 50px)',
            maskImage: isMobile ? 'none' : 'linear-gradient(to right, transparent, black 50px)'
          }} />


          {/* Freaks United Logo Image */}
          <div className="wings-panel-logo" style={{
            position: 'absolute', top: '13%', right: '40%',
            width: '140px', height: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 6,
            filter: 'drop-shadow(0 0 15px rgba(255, 15, 67, 0.5))'
          }}>
            <img src="/fu.png" alt="Freaks United Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Crazy Font Text on Roof (White outline area in sketch) */}
          <div className="crazy-stage-text freaks-roof-text">
            FREAKS UNITED
          </div>

          {/* Glass Morph Box - Freaks */}
          <GlassBox
            side="left"
            sideOffset="5%"
            stageNumber="STAGE 01"
            title="Freaks United"
            subtitle="The Dance Wing"
            accentColor="#ff0f43"
            description="Where rhythm meets gravity, and passion takes center stage. Freaks United is the official dance wing of Virinchi — a powerhouse of choreography, freestyle, and pure energy. From classical to hip-hop, our dancers own every beat and every spotlight."
            highlights={[
              "50+ Dynamic Choreographers & Dancers",
              "Inter-College Fest Champions & Flagship Performers",
              "Signature Annual Mega-Flashmobs across Hyderabad"
            ]}
            meterLabel="BEAT DYNAMICS // 140 BPM"
          />
        </div>

        {/* ═══════════ PANEL 3: RHYTHM (Music Stage) ═══════════ */}
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'linear-gradient(to bottom, #02040f 0%, #08122c 100%)' }}>

          {/* Starry Night Background - Right Half */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', top: 0, left: 0, width: '60%', height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            WebkitMaskImage: 'linear-gradient(to left, transparent, black 50px)',
            maskImage: 'linear-gradient(to left, transparent, black 50px)'
          }}>
            <WingsStars />
            <WingsShootingStars />

            {/* Moon for Rythm panel too just in case! */}
            <div style={{
              position: 'absolute', top: '25%', right: '25%',
              width: '70px', height: '70px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 0%, #dce5ff 40%, #8090c4 100%)',
              boxShadow: '0 0 35px 12px rgba(180,210,255,0.3)',
              zIndex: 0,
              opacity: 0.6 // Slightly faded in this panel
            }} />
          </div>

          <div className="wings-stage-bg" style={{
            position: 'absolute', top: '50%', left: 0, width: '60%', height: '30%',
            background: 'linear-gradient(to bottom, transparent, #08122c)',
            zIndex: 0, pointerEvents: 'none'
          }} />

          {/* Continuous Stage - Right Half */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', bottom: '40px', left: 0, width: '60%', height: '100%',
            backgroundImage: "url('/stage.png')",
            backgroundSize: isMobile ? '220vw auto' : '150vw auto',
            backgroundPosition: isMobile ? '-110vw bottom' : '-75vw bottom',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            pointerEvents: 'none',
            WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to left, transparent, black 50px)',
            maskImage: isMobile ? 'none' : 'linear-gradient(to left, transparent, black 50px)'
          }} />

          {/* Stage Lights (Glowing Orbs) */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', top: 0, left: 0, width: '60%', height: '100%', zIndex: 2, pointerEvents: 'none',
            WebkitMaskImage: 'linear-gradient(to left, transparent, black 50px)',
            maskImage: 'linear-gradient(to left, transparent, black 50px)',
            overflow: 'hidden'
          }}>
            <div 
              onDoubleClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                console.log(`%c[RythmGlares - Right Panel] Double Click at: left: '${x.toFixed(1)}%', top: '${y.toFixed(1)}%'`, 'color: #0fc8ff; font-weight: bold; font-size: 14px;');
              }}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: isMobile ? '-110vw' : '-75vw',
                width: isMobile ? '220vw' : '150vw',
                height: isMobile ? '76vw' : '51.66vw',
                pointerEvents: 'auto' // Needed to capture clicks
              }}
            >
              <RythmGlares />
            </div>
          </div>

          {/* Strobe Light Effect on Crowd */}
          <div className="wings-strobe-overlay" style={{ left: 0, zIndex: 2, width: '60%' }} />

          {/* Localized Fog (Cyan) - placed in front of crowd */}
          <div className="wings-fog-stage-rythm" style={{ zIndex: 2 }} />

          {/* Stage People - Rhythm (In front of lights, behind crowd, darkened silhouette with floor smoke) */}
          <div className="wings-performers wings-performers-rythm" style={{
            position: 'absolute', bottom: '26vh', left: '8%',
            width: '280px', height: 'auto',
            zIndex: 4,
            pointerEvents: 'none',
          }}>
            <img
              src="/ryth.png"
              alt="Stage Performers"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(0.28) contrast(1.35) drop-shadow(0 0 15px rgba(15, 200, 255, 0.45))',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.6) 70%, transparent 95%)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.6) 70%, transparent 95%)',
              }}
            />

            {/* Stage Footlight Glow & Realistic Concert Dry-Ice Fog hiding legs */}
            <div style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-20%',
              width: '140%',
              height: '95px',
              pointerEvents: 'none',
              opacity: 0.50,
            }}>
              {/* Ground footlight glow */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '10%',
                width: '80%',
                height: '50px',
                background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.25) 50%, transparent 80%)',
                filter: 'blur(8px)',
                mixBlendMode: 'screen',
              }} />
              {/* Fog Cloud 1 - Center Billow */}
              <div className="wings-floor-smoke" style={{
                position: 'absolute',
                bottom: '-5px',
                left: '15%',
                width: '70%',
                height: '80px',
                background: 'radial-gradient(ellipse 65% 50% at 50% 65%, rgba(255, 255, 255, 0.85) 0%, rgba(235, 242, 255, 0.45) 50%, transparent 75%)',
                animation: 'rollingStageFog1 6s ease-in-out infinite alternate',
              }} />
              {/* Fog Cloud 2 - Left Billow */}
              <div className="wings-floor-smoke" style={{
                position: 'absolute',
                bottom: '-10px',
                left: '-5%',
                width: '60%',
                height: '75px',
                background: 'radial-gradient(ellipse 60% 50% at 50% 65%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 242, 255, 0.4) 50%, transparent 75%)',
                animation: 'rollingStageFog2 8s ease-in-out infinite alternate 0.5s',
              }} />
              {/* Fog Cloud 3 - Right Billow */}
              <div className="wings-floor-smoke" style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-5%',
                width: '60%',
                height: '75px',
                background: 'radial-gradient(ellipse 60% 50% at 50% 65%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 242, 255, 0.4) 50%, transparent 75%)',
                animation: 'rollingStageFog3 7s ease-in-out infinite alternate 1s',
              }} />
            </div>
          </div>

          {/* Continuous Crowd Background - Right Half (In front of performers, zIndex 5) */}
          <div className="wings-stage-bg" style={{
            position: 'absolute', bottom: isMobile ? '-5vh' : '-10vh', left: 0, width: '60%', height: '100%',
            backgroundImage: "url('/publicgroup.png')",
            backgroundSize: isMobile ? '220vw auto' : '140vw auto',
            backgroundPosition: isMobile ? '-110vw bottom' : '-70vw bottom',
            backgroundRepeat: 'no-repeat',
            opacity: 1,
            zIndex: 5,
            pointerEvents: 'none',
            WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to left, transparent, black 50px)',
            maskImage: isMobile ? 'none' : 'linear-gradient(to left, transparent, black 50px)'
          }} />


          {/* Rhythm Logo Image */}
          <div className="wings-panel-logo" style={{
            position: 'absolute', top: '12%', left: '40%',
            width: '98px', height: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 6,
            filter: 'drop-shadow(0 0 15px rgba(15, 200, 255, 0.5))'
          }}>
            <img src="/rhythm.png" alt="Rhythm Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Crazy Font Text on Roof */}
          <div className="crazy-stage-text rythm-roof-text">RHYTHM</div>

          {/* Glass Morph Box - Rhythm */}
          <GlassBox
            side="right"
            sideOffset="5%"
            stageNumber="STAGE 02"
            title="Rhythm"
            subtitle="The Music Wing"
            accentColor="#0fc8ff"
            description="The musical soul of VBIT campus. From classical melodies to high-energy rock anthems, Rhythm brings the soundtrack of our lives to every stage. We don't just play music — we make every note unforgettable."
            highlights={[
              "Full 7-Piece Live Concert Band & Solo Virtuosos",
              "Fusion Classical, Rock, Electronic & Unplugged",
              "Lead Soundscapes for Vibha & Annual College Fests"
            ]}
            meterLabel="AUDIO SPECTRUM // 20Hz - 20kHz"
          />
        </div>

      </div>
      </section>
    </div>
  );
};

export default WingsSection;
