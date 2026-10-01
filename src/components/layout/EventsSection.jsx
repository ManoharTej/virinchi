import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitFlapText from './SplitFlapText';
import GlowingLight from './GlowingLight';
import { AnimatedMusicalBackground } from './ExecutiveBoardSection';

import clouds1Img from '../../assets/clouds_1.jpg';
import clouds2Img from '../../assets/clouds_2.jpg';

gsap.registerPlugin(ScrollTrigger);

function hexToRgb(hex) {
  const h = parseInt(hex.replace('#',''), 16);
  return [(h >> 16) & 0xff, (h >> 8) & 0xff, h & 0xff];
}
function lerpColor(a, b, t) {
  const [ar,ag,ab] = hexToRgb(a), [br,bg,bb] = hexToRgb(b);
  return `rgb(${Math.round(ar+(br-ar)*t)},${Math.round(ag+(bg-ag)*t)},${Math.round(ab+(bb-ab)*t)})`;
}

// Sky color palette: Sunrise (0), Morning/Bathukamma (0.33), Midday/Sankranthi (0.66), Sunset (0.85), Night (1.0)
const SKY_TOP    = ['#ff7043', '#1565C0', '#1565C0', '#ff3b7c', '#02040f'];
const SKY_BOTTOM = ['#ffcc80', '#4FC3F7', '#4FC3F7', '#ff9a44', '#08122c'];

function getGradient(t, tops, bottoms) {
  const keys = [0, 0.333, 0.666, 0.85, 1];
  let i = Math.max(0, keys.findIndex((k, j) => t <= k && j > 0) - 1);
  if (i < 0) i = keys.length - 2;
  const seg = (t - keys[i]) / (keys[i+1] - keys[i]);
  return {
    top: lerpColor(tops[i], tops[i+1], seg),
    bot: lerpColor(bottoms[i], bottoms[i+1], seg)
  };
}

const FloatingPetals = () => {
  const colors = ['#ff69b4','#ff1493','#ff85c8','#ffb3d9','#ff4da6','#ffd1dc'];
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:15}}>
      {Array.from({length:30}).map((_,i) => (
        <div key={i} style={{
          position:'absolute',
          left:`${5+Math.random()*90}%`,
          top:'0',
          width:'13px', height:'13px',
          background: colors[i%colors.length],
          borderRadius:'50% 0 50% 50%',
          animation:`ev_petalFall ${4+Math.random()*5}s ${Math.random()*4}s linear infinite`,
          opacity:0,
          transform:`rotate(${Math.random()*360}deg)`,
        }} />
      ))}
    </div>
  );
};

const FloatingKites = () => {
  const cols = ['#ff3366','#ffd700','#00e5ff','#ff9800','#e040fb','#76ff03'];
  
  const handleHover = (e) => {
    const rX = (Math.random() - 0.5) * 300;
    const rY = -50 - Math.random() * 150;
    const rRot = (Math.random() - 0.5) * 180;
    gsap.to(e.currentTarget, {
      x: rX, y: rY, rotation: rRot, duration: 0.6, ease: 'power2.out',
      onComplete: () => {
        gsap.to(e.currentTarget, {x: 0, y: 0, rotation: 0, duration: 4, ease: 'power1.inOut'});
      }
    });
  };

  return (
    <div style={{position:'absolute',inset:0,zIndex:15}}>
      {Array.from({length:14}).map((_,i) => (
        <div key={i} 
          onMouseEnter={handleHover}
          style={{
            position:'absolute',
            top:`${5+Math.random()*55}%`,
            left:`${5+Math.random()*88}%`,
            width:30+Math.random()*35, 
            height:40+Math.random()*40,
            animation:`ev_kiteDrift ${3+Math.random()*4}s ${Math.random()*2}s ease-in-out infinite alternate`,
            cursor:'pointer' // show pointer so they know it's interactive
          }}
        >
          <svg viewBox="0 0 80 110" width="100%" height="100%" style={{opacity:0.9, pointerEvents:'none'}}>
            <polygon points="40,0 80,40 40,80 0,40" fill={cols[i%cols.length]} />
            <line x1="40" y1="80" x2="30" y2="140" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/>
          </svg>
        </div>
      ))}
    </div>
  );
};

const ShootingStars = ({ opacityRef }) => {
  return (
    <div ref={opacityRef} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:2,overflow:'hidden',opacity:0}}>
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
          animation: `ev_shootingStar ${4 + Math.random() * 6}s ${Math.random() * 10}s infinite linear`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
};

export default function EventsSection() {
  const containerRef = useRef(null);
  const slidesRef = useRef(null);
  const skyRef = useRef(null);
  const sunRef = useRef(null);
  const mornSunRef = useRef(null);
  const middaySunRef = useRef(null);
  const moonRef = useRef(null);
  const starsRef = useRef(null);
  const shootingStarsRef = useRef(null);
  const cloudLayer1Ref = useRef(null);
  const cloudLayer2Ref = useRef(null);
  const fadeOverlayRef = useRef(null);
  const parallaxWrapperRef = useRef(null);
  const fgParallaxRef = useRef(null);
  const powerlinesRef = useRef(null);
  const endFadeOverlayRef = useRef(null);
  const memoriesTextRef = useRef(null);
  const galleryContainerRef = useRef(null);

  const [startFlap, setStartFlap] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const photos = [
    { src: '/group.png', top: '5%', left: '8%', speed: 1.5, zIndex: 5, width: isMobile ? '120px' : '280px', label: 'Folder 1' },
    { src: '/group1.png', top: '35%', left: '25%', speed: 0.8, zIndex: 2, width: isMobile ? '140px' : '350px', label: 'Folder 2' },
    { src: '/silhouette_bathukamma.jpg', top: '10%', left: '55%', speed: 2, zIndex: 10, width: isMobile ? '110px' : '250px', label: 'Folder 3' },
    { src: '/core/pruthvi.png', top: '50%', left: '75%', speed: 1.2, zIndex: 7, width: isMobile ? '100px' : '220px', label: 'Folder 4' },
    { src: '/core/vaishnavi.png', top: '60%', left: '12%', speed: 2.5, zIndex: 15, width: isMobile ? '100px' : '220px', label: 'Folder 5' },
    { src: '/core/manohar.png', top: '15%', left: '35%', speed: 0.5, zIndex: 1, width: isMobile ? '80px' : '180px', label: 'Folder 6' },
    { src: '/people.png', top: '40%', left: '45%', speed: 1.8, zIndex: 8, width: isMobile ? '130px' : '320px', label: 'Folder 7' },
    { src: '/group.png', top: '25%', left: '82%', speed: 1.1, zIndex: 4, width: isMobile ? '110px' : '260px', label: 'Folder 8' },
    { src: '/group1.png', top: '65%', left: '50%', speed: 2.2, zIndex: 12, width: isMobile ? '120px' : '280px', label: 'Folder 9' },
    { src: '/people.png', top: '5%', left: '78%', speed: 0.9, zIndex: 3, width: isMobile ? '100px' : '220px', label: 'Folder 10' },
  ];

  // Pre-generate stars
  const STARS = Array.from({length:100}, () => ({
    x: Math.random()*100, y: Math.random()*70,
    r: 0.6 + Math.random()*1.8, d: Math.random()*3,
  }));

  useEffect(() => {
    // Mouse Parallax Logic
    const handleMouseMove = (e) => {
      // OPTIMIZATION: Only run heavy mouse parallax if we are scrolled down to the events section 
      // (Roughly past 100vh * 3) to save CPU/GPU on Hero and Notebook sections
      if (window.scrollY < window.innerHeight * 2.5) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      if (parallaxWrapperRef.current && fgParallaxRef.current) {
        // Move background slightly opposite to mouse
        gsap.to(parallaxWrapperRef.current, {
          x: -x * 30, y: -y * 15, duration: 1, ease: 'power2.out'
        });
        // Move foreground slightly WITH mouse (strong depth)
        gsap.to(fgParallaxRef.current, {
          x: x * 40, y: y * 10, duration: 1, ease: 'power2.out'
        });
      }

      // Parallax for Memories Polaroids (if they are sliding up into view)
      if (galleryContainerRef.current) {
        // Cache the photos once or just use children to avoid expensive querySelectorAll
        const photos = galleryContainerRef.current.children[0].children; 
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const speed = parseFloat(photo.getAttribute('data-speed'));
          if (speed) {
            gsap.to(photo, {
              x: x * speed * 50,
              y: y * speed * 50,
              rotateY: x * speed * 10,
              rotateX: -y * speed * 10,
              ease: 'power2.out',
              duration: 1
            });
          }
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    let ctx = gsap.context(() => {
      // Continuous background drift for clouds
      if (cloudLayer1Ref.current) gsap.to(cloudLayer1Ref.current, { backgroundPositionX: '100%', duration: 180, repeat: -1, ease: 'none' });
      if (cloudLayer2Ref.current) gsap.to(cloudLayer2Ref.current, { backgroundPositionX: '100%', duration: 120, repeat: -1, ease: 'none' });

      const panels = gsap.utils.toArray('.ev-panel', slidesRef.current);
      if (panels.length === 0) return;
      
      const horizontalScroll = window.innerWidth * (panels.length - 1);
      const fadeScroll = window.innerHeight * 1.5; // Huge buffer so user can stop scrolling without unpinning
      const totalScroll = horizontalScroll + fadeScroll;

      let fadeTimeout = null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + totalScroll,
          onUpdate: (self) => {
            if (self.progress > 0.995) {
              if (finalTl.paused() || finalTl.progress() === 0) {
                if (!fadeTimeout) {
                  fadeTimeout = setTimeout(() => {
                    finalTl.timeScale(1).play();
                  }, 1000);
                }
              }
            } else if (self.progress < 0.95) {
              if (fadeTimeout) {
                clearTimeout(fadeTimeout);
                fadeTimeout = null;
              }
              if (finalTl.progress() > 0 && !finalTl.reversed()) {
                window.dispatchEvent(new Event('lock-scroll'));
                finalTl.timeScale(1.5).reverse();
              }
            }
          }
        }
      });

      // Phase 1: Slide panels horizontally
      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        duration: horizontalScroll / totalScroll
      });
      
      // Phase 2: Empty spacer so the Cultural Fest panel remains pinned and still during the fade buffer
      tl.to({}, { duration: fadeScroll / totalScroll });

      // --- AUTOMATIC FINAL SEQUENCE (Not scrubbed) ---
      const finalTl = gsap.timeline({ 
        paused: true,
        onReverseComplete: () => {
          window.dispatchEvent(new Event('unlock-scroll'));
        }
      });
      
      // 1. Fade entire screen to Tab 3 background (#0d0614)
      if (endFadeOverlayRef.current) {
        finalTl.to(endFadeOverlayRef.current, {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 1
        });
      }

      // 2. Start Flapping text and fade it in
      if (memoriesTextRef.current) {
        finalTl.call(() => setStartFlap(true));
        finalTl.to(memoriesTextRef.current, {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.5
        }, "+=0.1"); // small delay
      }

      // 3. Shrink and move MEMORIES text to top right
      if (memoriesTextRef.current) {
        finalTl.to(memoriesTextRef.current, {
          scale: isMobile ? 0.45 : 0.9,
          y: isMobile ? '0vh' : '-36vh',
          x: isMobile ? '0vw' : '25vw',
          duration: 1.5,
          ease: 'power3.out'
        }, "+=2.2"); // wait for text flapping to finish
      }

      // 4. Polaroids fly from bottom into a messy center stack
      if (galleryContainerRef.current) {
        const photoElements = gsap.utils.toArray('.gallery-photo', galleryContainerRef.current);
        
        finalTl.set(galleryContainerRef.current, { top: 0 }, "<"); // Put container in place
        
        finalTl.fromTo(photoElements, {
          top: '100vh',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          rotationZ: () => Math.random() * 90 - 45,
          scale: 0.5,
          opacity: 0
        }, {
          top: '50%',
          left: '50%',
          rotationZ: () => Math.random() * 40 - 20, // messy stack
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        }, "<"); // start at same time as text moves

        // 5. Wait 100ms after the LAST folder reaches the center, then SCATTER
        finalTl.to(photoElements, {
          top: (i) => photos[i].top,
          left: (i) => photos[i].left,
          xPercent: 0,
          yPercent: 0,
          rotationZ: 0,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.05,
          onComplete: () => {
             // Unlock scroll!
             window.dispatchEvent(new Event('unlock-scroll'));
          }
        }, "+=0.1");
      }

      // Cleanup flap state on reverse
      finalTl.call(() => setStartFlap(false), [], 0);

      // 2. Morphological Sky effect (Only spans the horizontal scroll!)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => '+=' + horizontalScroll,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1

          // Fade out the black overlay from Panel 1. 
          if (fadeOverlayRef.current) {
            let overlayOpacity = 1 - (progress / 0.25);
            if (overlayOpacity < 0) overlayOpacity = 0;
            if (overlayOpacity > 1) overlayOpacity = 1;
            fadeOverlayRef.current.style.opacity = overlayOpacity;
          }

          if (skyRef.current) {
            const {top, bot} = getGradient(progress, SKY_TOP, SKY_BOTTOM);
            skyRef.current.style.background = `linear-gradient(to bottom, ${top} 0%, ${bot} 100%)`;
          }
          
          // Parallax and fade clouds
          let cloudFilter = 'none';
          if (progress > 0.7 && progress < 0.95) {
             let cloudSunset = 1;
             if (progress < 0.8) cloudSunset = (progress - 0.7) / 0.1;
             else if (progress > 0.85) cloudSunset = Math.max(0, 1 - (progress - 0.85) / 0.1);
             cloudFilter = `sepia(${cloudSunset * 0.8}) saturate(${1 + cloudSunset * 1.5}) hue-rotate(-15deg)`;
          }

          if (cloudLayer1Ref.current) {
             cloudLayer1Ref.current.style.transform = `translateX(-${progress * 25}%)`;
             cloudLayer1Ref.current.style.filter = cloudFilter;
             const c1Fade = progress < 0.85 ? 0.5 : Math.max(0.15, 0.5 - ((progress - 0.85) / 0.15) * 0.35);
             cloudLayer1Ref.current.style.opacity = c1Fade;
          }
          if (cloudLayer2Ref.current) {
             cloudLayer2Ref.current.style.transform = `translateX(-${progress * 40}%)`;
             cloudLayer2Ref.current.style.filter = cloudFilter;
             const c2Fade = progress < 0.85 ? 0.8 : Math.max(0.2, 0.8 - ((progress - 0.85) / 0.15) * 0.6);
             cloudLayer2Ref.current.style.opacity = c2Fade;
          }

          // Foreground powerlines parallax based on scroll
          if (powerlinesRef.current) {
             powerlinesRef.current.style.transform = `translateX(-${progress * 50}%)`;
          }

          // Custom Sun Trajectory 
          let sunX;
          if (progress <= 0.666) {
             sunX = -10 + (progress / 0.666) * 60; // Sunrise at -10%, Midday at 50% (Sankranthi)
          } else {
             sunX = 50 + ((progress - 0.666) / 0.334) * 50; // Sunset off the right edge (100%)
          }

          let sunY;
          if (progress <= 0.333) {
             // 0 to 0.333 (VBIT to Bathukamma): Sun rises from 80% to 20%
             sunY = 80 - (progress / 0.333) * 60;
          } else if (progress <= 0.666) {
             // 0.333 to 0.666 (Bathukamma to Sankranthi): Sun stays high in the sky (midday)
             sunY = 20;
          } else {
             // 0.666 to 1.0 (Sankranthi to Cultural Fest): Sun sets sharply
             const p = (progress - 0.666) / 0.334; // 0 to 1
             sunY = 20 + Math.pow(p, 2.5) * 120; // Drops to 140%
          }
          
          if (sunRef.current) {
            sunRef.current.style.left = `${sunX}%`;
            sunRef.current.style.top  = `${sunY}%`;

            let middayOpacity = 0;
            let morningOpacity = 0;

            if (progress < 0.2) {
               // Sunrise: crossfade from morning sun to midday sun
               middayOpacity = progress / 0.2;
               morningOpacity = 1 - middayOpacity;
            } else if (progress <= 0.666) {
               // Midday: Bathukamma to Sankranthi
               middayOpacity = 1;
               morningOpacity = 0;
            } else if (progress < 0.8) {
               // Sunset start: crossfade from midday to morning (orange)
               morningOpacity = (progress - 0.666) / 0.134;
               middayOpacity = 1 - morningOpacity;
            } else {
               // Deep Sunset / Night
               morningOpacity = 1;
               middayOpacity = 0;
            }

            if (middaySunRef.current) middaySunRef.current.style.opacity = middayOpacity;
            
            if (mornSunRef.current) {
               mornSunRef.current.style.opacity = morningOpacity;
               if (progress > 0.8) {
                  const p = Math.min(1, (progress - 0.8) / 0.2);
                  mornSunRef.current.style.filter = `sepia(${p * 0.5}) saturate(${1 + p * 2}) hue-rotate(-${p * 15}deg)`;
               } else {
                  mornSunRef.current.style.filter = 'none';
               }
            }
          }

          // Moon Rise
          let moonY = 80;
          if (progress > 0.66) {
             const moonRiseProg = Math.min(1, (progress - 0.66) / 0.25);
             const ease = 1 - Math.pow(1 - moonRiseProg, 4);
             moonY = 80 - ease * (80 - 18);
          }
          const moonFade = progress < 0.66 ? 0 : Math.min(1, (progress - 0.66) / 0.15);
          if (moonRef.current) {
            moonRef.current.style.top = `${moonY}%`;
            moonRef.current.style.opacity = moonFade;
          }

          // Stars fade in
          const starFade = progress < 0.66 ? 0 : Math.min(1, (progress - 0.66) / 0.27);
          if (starsRef.current) starsRef.current.style.opacity = starFade;
          
          // Shooting stars show up late at night (Panel 4)
          if (shootingStarsRef.current) {
             shootingStarsRef.current.style.opacity = progress > 0.8 ? (progress - 0.8) / 0.2 : 0;
          }
        }
      });
    }, containerRef);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div className="events-section-wrapper" style={{ position: 'relative', width: '100%' }}>
      <style>{`
        @keyframes ev_petalFall {
          0%   { transform:translateY(-8vh) rotate(0deg); opacity:0; }
          8%   { opacity:0.85; }
          92%  { opacity:0.85; }
          100% { transform:translateY(108vh) rotate(540deg); opacity:0; }
        }
        @keyframes ev_kiteDrift {
          from { transform:translateY(0) rotate(-6deg); }
          to   { transform:translateY(-28px) rotate(6deg); }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.2; }
          50% { opacity:1; }
        }
        @keyframes moonGlow {
          0%,100% { box-shadow:0 0 35px 12px rgba(180,210,255,0.3); }
          50% { box-shadow:0 0 60px 25px rgba(180,210,255,0.6); }
        }
        @keyframes ev_shootingStar {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; width: 0; }
          5% { width: 150px; opacity: 1; }
          10% { transform: translateX(-500px) translateY(500px) rotate(-45deg); opacity: 0; width: 0; }
          100% { opacity: 0; }
        }
        .ev-title-1 {
          font-size: clamp(5rem, 15vw, 12rem);
          letter-spacing: 20px;
        }
        .ev-title-2 {
          font-size: clamp(3.5rem, 7.5vw, 7.5rem);
          letter-spacing: 4px;
        }
        .ev-title-3 {
          font-size: clamp(4rem, 8.5vw, 8.5rem);
          letter-spacing: 6px;
        }
        
        @media (max-width: 768px) {
          .ev-title-1 {
            font-size: clamp(2.5rem, 12vw, 4rem);
            letter-spacing: 8px;
          }
          .ev-title-2 {
            font-size: clamp(1.8rem, 10vw, 3.5rem);
            letter-spacing: 2px;
            text-align: center;
          }
          .ev-title-3 {
            font-size: clamp(2rem, 11vw, 4rem);
            letter-spacing: 3px;
            text-align: center;
          }
          .ev-sun {
            width: clamp(150px, 40vw, 320px) !important;
            height: clamp(150px, 40vw, 320px) !important;
          }
          .ev-moon {
            width: clamp(40px, 15vw, 70px) !important;
            height: clamp(40px, 15vw, 70px) !important;
          }
          .ev-cloud-1 {
            background-size: auto 100% !important;
          }
          .ev-cloud-2 {
            background-size: auto 100% !important;
          }
          @media (max-width: 768px) {
            .ev-cloud-1 {
              background-size: auto 50% !important;
              top: 5vh !important;
            }
            .ev-cloud-2 {
              background-size: auto 40% !important;
              top: 15vh !important;
            }
          }
      `}</style>

      <section ref={containerRef} className="events-section-container" style={{width:'100%',height:'100vh',overflow:'hidden',position:'relative',background:'#0d0614'}}>
        
        {/* PARALLAX WRAPPER FOR BACKGROUND */}
        <div className="ev-parallax-bg" style={{position:'absolute', inset: 0, pointerEvents:'none', zIndex: 0}}>
          <div ref={parallaxWrapperRef} style={{position:'absolute', inset: -60}}>
          {/* Morphological Sky Layer */}
          <div ref={skyRef} style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, #ff7043 0%, #ffcc80 100%)'
          }}/>

          {/* STARS */}
          <div ref={starsRef} style={{position:'absolute',inset:0,zIndex:2,opacity:0}}>
            {STARS.map((s,i)=>(
              <div key={i} style={{
                position:'absolute', left:`${s.x}%`, top:`${s.y}%`,
                width:`${s.r*2}px`, height:`${s.r*2}px`,
                borderRadius:'50%', background:'white',
                animation:`twinkle ${1.5+s.d}s ${s.d*0.5}s ease-in-out infinite`,
              }}/>
            ))}
          </div>

          <ShootingStars opacityRef={shootingStarsRef} />

          {/* SUN */}
          <div ref={sunRef} className="ev-sun" style={{
            position:'absolute', zIndex:2, pointerEvents:'none',
            left:'5%', top:'85%',
            transform:'translate(-50%,-50%)',
            width:'320px', height:'320px',
            // A soft white glow behind the sun to naturally make it look 'whiter' and brighter
            // without using CSS filters on the PNG that ruin the smooth alpha edges!
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 15%, rgba(255,255,255,0) 50%)',
            borderRadius: '50%'
          }}>
            <img ref={middaySunRef} src="/middaysun.png" alt="Midday Sun" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
              mixBlendMode: 'screen', opacity: 0,
              transform: 'scale(0.9)', // Match sizes seamlessly
              filter: 'none' // REMOVED filter to prevent harsh banding on the outer glow!
            }} />
            <img ref={mornSunRef} src="/morningsun.png" alt="Dynamic Sun" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
              mixBlendMode: 'screen', opacity: 1,
              transform: 'scale(1.2)' // Scale up morning sun to match midday sun
            }} />
          </div>

          {/* MOON */}
          <div ref={moonRef} className="ev-moon" style={{
            position:'absolute', zIndex:2,
            left:'85%', top:'80%',
            transform:'translate(-50%,-50%)',
            width:'70px', height:'70px',
            borderRadius:'50%',
            background:'radial-gradient(circle, #ffffff 0%, #dce5ff 40%, #8090c4 100%)',
            boxShadow: '0 0 35px 12px rgba(180,210,255,0.3)',
            animation:'moonGlow 4s ease-in-out infinite',
            opacity:0,
          }}/>

          {/* Clouds */}
          <div ref={cloudLayer1Ref} className="ev-cloud-1" style={{
            position: 'absolute', top: '10vh', left: 0, width: '200vw', height: '100vh',
            background: `url(${clouds2Img}) repeat-x center/auto 100%`,
            mixBlendMode: 'screen', opacity: 0.5, zIndex: 3
          }} />

          <div ref={cloudLayer2Ref} className="ev-cloud-2" style={{
            position: 'absolute', top: '45vh', left: 0, width: '250vw', height: '80vh',
            background: `url(${clouds1Img}) repeat-x center/auto 100%`,
            mixBlendMode: 'screen', opacity: 0.8, zIndex: 4
          }} />
        </div>
        </div>

        {/* PARALLAX FOR FOREGROUND SILHOUETTES */}
        <div ref={fgParallaxRef} className="ev-parallax-bg" style={{position:'absolute', inset: -30, pointerEvents:'none', zIndex: 5}}>
           <div ref={powerlinesRef} style={{position:'absolute', bottom:0, left:0, width:'200vw', height:'25vh'}}>
             <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={{width:'100%', height:'100%', fill:'#030108'}}>
                {/* Rolling hills/ground base */}
                <path d="M0,200 L1000,200 L1000,190 Q800,170 500,195 T0,185 Z" />
                
                {/* Power Pole 1 */}
                <rect x="150" y="80" width="4" height="120" />
                <rect x="130" y="90" width="44" height="2" />
                <rect x="135" y="105" width="34" height="1.5" />
                
                {/* Power Pole 2 (Big) */}
                <rect x="450" y="40" width="6" height="160" />
                <rect x="420" y="55" width="66" height="3" />
                <rect x="430" y="70" width="46" height="2" />

                {/* Power Pole 3 */}
                <rect x="850" y="90" width="3" height="110" />
                <rect x="835" y="100" width="33" height="2" />

                {/* Wires */}
                <path d="M0,70 Q150,110 450,40" fill="none" stroke="#030108" strokeWidth="1.5" opacity="0.8" />
                <path d="M0,80 Q150,120 450,55" fill="none" stroke="#030108" strokeWidth="1" opacity="0.8" />
                <path d="M0,95 Q150,135 450,70" fill="none" stroke="#030108" strokeWidth="0.8" opacity="0.6" />
                
                <path d="M450,40 Q650,110 850,90" fill="none" stroke="#030108" strokeWidth="1.5" opacity="0.8" />
                <path d="M450,55 Q650,125 850,100" fill="none" stroke="#030108" strokeWidth="1" opacity="0.8" />
                
                <path d="M850,90 Q950,100 1000,95" fill="none" stroke="#030108" strokeWidth="1.5" opacity="0.8" />
                <path d="M850,100 Q950,110 1000,105" fill="none" stroke="#030108" strokeWidth="1" opacity="0.8" />
             </svg>
           </div>
        </div>

        {/* Tab 4 Background Fade Overlay for Panel 1 */}
        <div ref={fadeOverlayRef} className="ev-parallax-bg" style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'linear-gradient(to bottom, #1a0815 0%, #0d0614 100%)', pointerEvents: 'none'
        }}>
          <AnimatedMusicalBackground viewBox="0 1080 1920 1080" />
        </div>

        {/* Horizontal Slide Content */}
        <div ref={slidesRef} className="ev-slides-container" style={{width:'400vw',height:'100vh',display:'flex', position:'relative', zIndex: 20}}>

          {/* Panel 1: EVENTS INTRO */}
          <div className="ev-panel" style={{width:'100vw',maxWidth:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <h1 className="ev-title-1" style={{color:'white',margin:0,fontWeight:900,textTransform:'uppercase',textShadow:'0 0 60px rgba(255,51,102,0.7)'}}>EVENTS</h1>
            <div style={{position:'absolute',bottom:'12%',display:'flex',alignItems:'center',gap:'12px',opacity:0.5}}>
              <span style={{color:'white',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase'}}>Scroll to explore</span>
              <div style={{width:'32px',height:'2px',background:'white'}}/>
              <span style={{color:'white',fontSize:'15px'}}>&#8594;</span>
            </div>
          </div>

          {/* Panel 2: BATHUKAMMA */}
          <div className="ev-panel" style={{width:'100vw',maxWidth:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <FloatingPetals />
            <div style={{zIndex:30,textAlign:'center'}}>
              <h2 className="ev-title-2" style={{color:'#fff',margin:0,fontWeight:900,lineHeight:1, textShadow: '0 4px 15px rgba(0,0,0,0.7)'}}>BATHUKAMMA</h2>
            </div>
          </div>

          {/* Panel 3: SANKRANTHI */}
          <div className="ev-panel" style={{width:'100vw',maxWidth:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <FloatingKites />
            <div style={{zIndex:30,textAlign:'center'}}>
              <h2 className="ev-title-2" style={{color:'#fff',margin:0,fontWeight:900,lineHeight:1, textShadow: '0 4px 15px rgba(0,0,0,0.7)'}}>SANKRANTHI</h2>
            </div>
          </div>

          {/* Panel 4: CULTURAL FEST */}
          <div className="ev-panel" style={{width:'100vw',maxWidth:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <div style={{textAlign:'center',zIndex:30}}>
              <h2 className="ev-title-3" style={{color:'#fff',margin:0,fontWeight:900,lineHeight:1,textShadow:'0 0 60px rgba(255,80,200,0.8), 0 8px 30px rgba(0,0,0,0.9)'}}>CULTURAL FEST</h2>
            </div>
          </div>

        </div>

        {/* Final Fade to Black Overlay (Glow moved to App.jsx for seamless boundary) */}
        <div ref={endFadeOverlayRef} className="ev-parallax-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0d0614', zIndex: 100, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        </div>

        {/* SplitFlapText that appears after the fade */}
        <div ref={memoriesTextRef} className="ev-parallax-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110, opacity: 0, pointerEvents: 'none', transform: isMobile ? 'scale(0.85)' : 'scale(2)' }}>
          {startFlap && (
            <SplitFlapText
              words={["        ", "MEMORIES"]}
              flipDuration={0.12}
              stagger={0.06}
              cycleDelay={100}
              charset="alphanumeric"
              flipsPerChar={8}
              tileColor="#0a0f1c"
              textColor="#f8fafc"
              tileRadius={8}
              gap={6}
              fontSize={52}
              loop={false}
              padTo={8}
            />
          )}
        </div>

        {/* Gallery / Memories - Hidden below initially, slides up */}
        <div ref={galleryContainerRef} className="ev-parallax-bg" style={{ position: 'absolute', top: '100vh', left: 0, width: '100vw', height: '100vh', zIndex: 120, perspective: '1000px', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {photos.map((p, i) => (
              <div 
                key={i} 
                className="gallery-photo polaroid"
                data-speed={p.speed}
                style={{
                  position: 'absolute',
                  top: p.top,
                  left: p.left,
                  width: p.width,
                  zIndex: p.zIndex,
                  cursor: 'pointer',
                  pointerEvents: 'auto', // Re-enable pointer events for the actual photos
                  transformStyle: 'preserve-3d',
                  transition: 'z-index 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.zIndex = 150;
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.zIndex = p.zIndex;
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
                onClick={() => {
                  if (!startFlap) return;
                  window.dispatchEvent(new Event('open-dome'));
                  setTimeout(() => {
                    const tab6 = document.getElementById('tab6');
                    if (tab6) tab6.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
              >
                <img src={p.src} alt={p.label} />
                <div style={{ position: 'absolute', bottom: '10px', left: 0, width: '100%', textAlign: 'center', fontFamily: '"Permanent Marker", Courier, monospace', fontSize: '1.2rem', color: '#111', zIndex: 10 }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
