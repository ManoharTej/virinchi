import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
const SKY_TOP    = ['#ff7043', '#2979FF', '#1565C0', '#ff3b7c', '#02040f'];
const SKY_BOTTOM = ['#ffcc80', '#81d4fa', '#4FC3F7', '#ff9a44', '#08122c'];

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
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:15}}>
      {Array.from({length:14}).map((_,i) => (
        <svg key={i} viewBox="0 0 80 110"
          width={30+Math.random()*35} height={40+Math.random()*40}
          style={{
            position:'absolute',
            top:`${5+Math.random()*55}%`,
            left:`${5+Math.random()*88}%`,
            animation:`ev_kiteDrift ${3+Math.random()*4}s ${Math.random()*2}s ease-in-out infinite alternate`,
            opacity:0.9,
          }}
        >
          <polygon points="40,0 80,40 40,80 0,40" fill={cols[i%cols.length]} />
          <line x1="40" y1="80" x2="30" y2="140" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/>
        </svg>
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
  const moonRef = useRef(null);
  const starsRef = useRef(null);
  const cloudLayer1Ref = useRef(null);
  const cloudLayer2Ref = useRef(null);
  const fadeOverlayRef = useRef(null);

  // Pre-generate stars
  const STARS = Array.from({length:100}, () => ({
    x: Math.random()*100, y: Math.random()*70,
    r: 0.6 + Math.random()*1.8, d: Math.random()*3,
  }));

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Continuous background drift for clouds
      if (cloudLayer1Ref.current) gsap.to(cloudLayer1Ref.current, { backgroundPositionX: '100%', duration: 180, repeat: -1, ease: 'none' });
      if (cloudLayer2Ref.current) gsap.to(cloudLayer2Ref.current, { backgroundPositionX: '100%', duration: 120, repeat: -1, ease: 'none' });

      const panels = gsap.utils.toArray('.ev-panel', slidesRef.current);
      const totalScroll = window.innerWidth * (panels.length - 1);

      // 1. Pin and slide horizontally
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + totalScroll,
        }
      });

      // 2. Morphological Sky effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => '+=' + totalScroll,
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
             // Sunset colorization for clouds during sunset
             let cloudSunset = 1;
             if (progress < 0.8) {
                cloudSunset = (progress - 0.7) / 0.1;
             } else if (progress > 0.85) {
                cloudSunset = Math.max(0, 1 - (progress - 0.85) / 0.1);
             }
             cloudFilter = `sepia(${cloudSunset * 0.8}) saturate(${1 + cloudSunset * 1.5}) hue-rotate(-15deg)`;
          }

          if (cloudLayer1Ref.current) {
             cloudLayer1Ref.current.style.transform = `translateX(-${progress * 25}%)`;
             cloudLayer1Ref.current.style.filter = cloudFilter;
             // Fade small clouds down to 0.15 for night starting right after sunset peaks
             const c1Fade = progress < 0.85 ? 0.5 : Math.max(0.15, 0.5 - ((progress - 0.85) / 0.15) * 0.35);
             cloudLayer1Ref.current.style.opacity = c1Fade;
          }
          if (cloudLayer2Ref.current) {
             cloudLayer2Ref.current.style.transform = `translateX(-${progress * 40}%)`;
             cloudLayer2Ref.current.style.filter = cloudFilter;
             // Big clouds fade out completely for night by 0.95
             const c2Fade = progress < 0.85 ? 0.8 : Math.max(0.2, 0.8 - ((progress - 0.85) / 0.15) * 0.6);
             cloudLayer2Ref.current.style.opacity = c2Fade;
          }

          // Custom Sun Trajectory 
          const sunX = -10 + progress * 106;
          let sunY;
          if (progress <= 0.66) {
             sunY = 140 * Math.pow(progress - 0.66, 2) + 15; // Climbs to peak at Sankranthi
          } else {
             sunY = 1200 * Math.pow(progress - 0.66, 2) + 15; // Drops sharply into sunset/night
          }
          
          if (sunRef.current) {
            sunRef.current.style.left = `${sunX}%`;
            sunRef.current.style.top  = `${sunY}%`;
            sunRef.current.style.opacity = 1; // Keep Sun solid, no transparency fade!
          }

          // Single Sun Image Filter Logic
          let sunFilter = 'none';
          if (progress <= 0.72) {
             // Midday (Whitish/Bright, slightly dialed back so it doesn't blow out the clouds in front of it)
             let intensity = 1;
             if (progress < 0.2) intensity = progress / 0.2;
             
             sunFilter = `brightness(${1 + 0.5 * intensity}) saturate(${1 - 0.5 * intensity})`;
          } else {
             // Sunset becomes reddish-yellow rapidly
             const sunsetProg = Math.min(1, Math.max(0, (progress - 0.72) / 0.18));
             sunFilter = `sepia(${sunsetProg * 0.9}) hue-rotate(-${sunsetProg * 45}deg) saturate(${1 + sunsetProg * 2.5}) brightness(${1 - sunsetProg * 0.1})`;
          }

          if (mornSunRef.current) {
             mornSunRef.current.style.filter = sunFilter;
          }

          // Dynamic Moon Rise (Eases beautifully into position)
          let moonY = 80;
          if (progress > 0.66) {
             const moonRiseProg = Math.min(1, (progress - 0.66) / 0.25);
             // Custom cubic easing (easeOutQuart-ish)
             const ease = 1 - Math.pow(1 - moonRiseProg, 4);
             moonY = 80 - ease * (80 - 18);
          }
          const moonFade = progress < 0.66 ? 0 : Math.min(1, (progress - 0.66) / 0.15);
          if (moonRef.current) {
            moonRef.current.style.top = `${moonY}%`;
            moonRef.current.style.opacity = moonFade;
          }

          // Stars fade in during sunset drop
          const starFade = progress < 0.66 ? 0 : Math.min(1, (progress - 0.66) / 0.27);
          if (starsRef.current) {
             starsRef.current.style.opacity = starFade;
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
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
      `}</style>

      <section ref={containerRef} style={{width:'100%',height:'100vh',overflow:'hidden',position:'relative',background:'#0d0614'}}>
        
        {/* Morphological Sky Layer */}
        <div ref={skyRef} style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to bottom, #ff7043 0%, #ffcc80 100%)'
        }}/>

        {/* STARS */}
        <div ref={starsRef} style={{position:'absolute',inset:0,zIndex:2,opacity:0,pointerEvents:'none'}}>
          {STARS.map((s,i)=>(
            <div key={i} style={{
              position:'absolute', left:`${s.x}%`, top:`${s.y}%`,
              width:`${s.r*2}px`, height:`${s.r*2}px`,
              borderRadius:'50%', background:'white',
              animation:`twinkle ${1.5+s.d}s ${s.d*0.5}s ease-in-out infinite`,
            }}/>
          ))}
        </div>

        {/* SUN (Slightly reigned in size to sit properly behind clouds) */}
        <div ref={sunRef} style={{
          position:'absolute', zIndex:2, pointerEvents:'none',
          left:'5%', top:'85%',
          transform:'translate(-50%,-50%)',
          width:'240px', height:'240px',
        }}>
          <img ref={mornSunRef} src="/morningsun.png" alt="Dynamic Sun" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
            transition: 'filter 0.1s linear',
            mixBlendMode: 'screen'
          }} />
        </div>

        {/* MOON (Rises dynamically) */}
        <div ref={moonRef} style={{
          position:'absolute', zIndex:2, pointerEvents:'none',
          left:'85%', top:'80%',
          transform:'translate(-50%,-50%)',
          width:'70px', height:'70px',
          borderRadius:'50%',
          background:'radial-gradient(circle, #ffffff 0%, #dce5ff 40%, #8090c4 100%)',
          boxShadow: '0 0 35px 12px rgba(180,210,255,0.3)',
          animation:'moonGlow 4s ease-in-out infinite',
          opacity:0,
        }}/>

        {/* Tab 1/2 Clouds Layer 1 (Small / Distant Clouds) */}
        <div ref={cloudLayer1Ref} style={{
          position: 'absolute', top: '10vh', left: 0, width: '200vw', height: '100vh',
          background: `url(${clouds2Img}) repeat-x center/auto 100%`,
          mixBlendMode: 'screen', opacity: 0.5, pointerEvents: 'none', zIndex: 3
        }} />

        {/* Tab 1/2 Clouds Layer 2 (Big / Close Clouds) */}
        <div ref={cloudLayer2Ref} style={{
          position: 'absolute', top: '45vh', left: 0, width: '250vw', height: '80vh',
          background: `url(${clouds1Img}) repeat-x center/auto 100%`,
          mixBlendMode: 'screen', opacity: 0.8, pointerEvents: 'none', zIndex: 4
        }} />

        {/* Black Fade Overlay for Panel 1 */}
        <div ref={fadeOverlayRef} style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: '#0d0614', pointerEvents: 'none'
        }}/>

        {/* Horizontal Slide Content */}
        <div ref={slidesRef} style={{width:'400vw',height:'100vh',display:'flex', position:'relative', zIndex: 20}}>

          {/* Panel 1: EVENTS INTRO */}
          <div className="ev-panel" style={{width:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{fontSize:'clamp(5rem,15vw,12rem)',color:'white',margin:0,fontWeight:900,textTransform:'uppercase',letterSpacing:'20px',textShadow:'0 0 60px rgba(255,51,102,0.7)'}}>EVENTS</h1>
            <div style={{position:'absolute',bottom:'12%',display:'flex',alignItems:'center',gap:'12px',opacity:0.5}}>
              <span style={{color:'white',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase'}}>Scroll to explore</span>
              <div style={{width:'32px',height:'2px',background:'white'}}/>
              <span style={{color:'white',fontSize:'15px'}}>&#8594;</span>
            </div>
          </div>

          {/* Panel 2: BATHUKAMMA */}
          <div className="ev-panel" style={{width:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <FloatingPetals />
            <div style={{zIndex:30,textAlign:'center'}}>
              <h2 style={{fontSize:'clamp(3.5rem,7.5vw,7.5rem)',color:'#fff',margin:0,fontWeight:900,lineHeight:1,letterSpacing:'4px', textShadow: '0 4px 15px rgba(0,0,0,0.7)'}}>BATHUKAMMA</h2>
            </div>
          </div>

          {/* Panel 3: SANKRANTHI */}
          <div className="ev-panel" style={{width:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <FloatingKites />
            <div style={{zIndex:30,textAlign:'center'}}>
              <h2 style={{fontSize:'clamp(3.5rem,7.5vw,7.5rem)',color:'#fff',margin:0,fontWeight:900,lineHeight:1,letterSpacing:'4px', textShadow: '0 4px 15px rgba(0,0,0,0.7)'}}>SANKRANTHI</h2>
            </div>
          </div>

          {/* Panel 4: CULTURAL FEST */}
          <div className="ev-panel" style={{width:'100vw',height:'100vh',flexShrink:0,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{textAlign:'center',zIndex:30}}>
              <h2 style={{fontSize:'clamp(4rem,8.5vw,8.5rem)',color:'#fff',margin:0,fontWeight:900,lineHeight:1,letterSpacing:'6px',textShadow:'0 0 60px rgba(255,80,200,0.8), 0 8px 30px rgba(0,0,0,0.9)'}}>CULTURAL FEST</h2>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
