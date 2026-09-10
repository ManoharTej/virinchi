import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const FloatingPetals = () => {
  const petalsRef = useRef(null);
  
  useEffect(() => {
    const petals = document.querySelectorAll('.petal');
    animate(petals, {
      translateY: ['-10vh', '110vh'],
      translateX: () => (Math.random() - 0.5) * 500,
      rotate: () => Math.random() * 360,
      opacity: [0, 0.8, 0],
      duration: () => 5000 + Math.random() * 5000,
      delay: stagger(200),
      loop: true,
      easing: 'linear'
    });
  }, []);

  return (
    <div ref={petalsRef} style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
      {Array.from({length: 40}).map((_, i) => (
        <div key={i} className="petal" style={{
          position: 'absolute', top: 0, left: `${Math.random() * 100}%`,
          width: '15px', height: '15px', background: '#ff7eb3',
          borderRadius: '50% 0 50% 50%', filter: 'blur(1px)', opacity: 0
        }} />
      ))}
    </div>
  );
}

const FloatingKites = () => {
  useEffect(() => {
    const kites = document.querySelectorAll('.mini-kite');
    animate(kites, {
      translateY: () => (Math.random() - 0.5) * 200,
      translateX: () => (Math.random() - 0.5) * 200,
      rotate: () => (Math.random() - 0.5) * 20 - 10,
      duration: () => 3000 + Math.random() * 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({length: 15}).map((_, i) => (
        <svg key={i} className="mini-kite" viewBox="0 0 100 100" width={40 + Math.random() * 40} height={40 + Math.random() * 40} style={{
          position: 'absolute',
          top: `${10 + Math.random() * 60}%`,
          left: `${10 + Math.random() * 80}%`,
          opacity: 0.6 + Math.random() * 0.4
        }}>
          <polygon points="50,0 100,50 50,100 0,50" fill={i % 2 === 0 ? '#ff3366' : '#ffd700'} />
          <path d="M50,100 Q40,130 60,150 T50,200" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      ))}
    </div>
  );
}

const Equalizer = () => {
  useEffect(() => {
    const bars = document.querySelectorAll('.eq-bar');
    animate(bars, {
      scaleY: () => 0.2 + Math.random() * 0.8,
      duration: 300,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      delay: stagger(50)
    });
  }, []);

  return (
    <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '30vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '5px', pointerEvents: 'none', opacity: 0.3 }}>
      {Array.from({length: 40}).map((_, i) => (
        <div key={i} className="eq-bar" style={{
          width: '15px', height: '100%', background: 'linear-gradient(to top, #ff2a85, #00e5ff)',
          transformOrigin: 'bottom center', borderRadius: '5px 5px 0 0'
        }} />
      ))}
    </div>
  );
}

export default function EventsSection() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.event-panel');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth * 2
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', background: '#0d0614' }}>
      <div ref={scrollWrapperRef} style={{ width: '300vw', height: '100vh', display: 'flex' }}>
        
        {/* Panel 1: Bathukamma */}
        <div className="event-panel" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'linear-gradient(to right, #1a0815, #ff2a85)', display: 'flex', alignItems: 'center' }}>
          <FloatingPetals />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(255,42,133,0.3), transparent)', zIndex: 1 }} />
          <img src="/silhouette_bathukamma.jpg" style={{ position: 'absolute', bottom: '-5%', right: '5%', height: '90%', objectFit: 'contain', zIndex: 2, mixBlendMode: 'screen', filter: 'contrast(1.2)' }} alt="Bathukamma" />
          <div style={{ paddingLeft: '8%', zIndex: 10 }}>
            <h2 style={{ fontSize: '7rem', color: 'white', margin: 0, fontWeight: 900, lineHeight: 1, letterSpacing: '4px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>BATHUKAMMA</h2>
            <p style={{ fontSize: '1.5rem', color: '#ffb800', margin: '20px 0 0 0', letterSpacing: '8px', textTransform: 'uppercase' }}>Floral Energy & Tradition</p>
          </div>
        </div>

        {/* Panel 2: Sankranthi */}
        <div className="event-panel" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'linear-gradient(to right, #ff2a85, #00d2ff)', display: 'flex', alignItems: 'center' }}>
          <FloatingKites />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0,210,255,0.3), transparent)', zIndex: 1 }} />
          <img src="/silhouette_kite.jpg" style={{ position: 'absolute', bottom: '-5%', left: '5%', height: '80%', objectFit: 'contain', zIndex: 2, mixBlendMode: 'screen', filter: 'contrast(1.2)' }} alt="Sankranthi" />
          <div style={{ position: 'absolute', right: '8%', textAlign: 'right', zIndex: 10 }}>
            <h2 style={{ fontSize: '7rem', color: 'white', margin: 0, fontWeight: 900, lineHeight: 1, letterSpacing: '4px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>SANKRANTHI</h2>
            <p style={{ fontSize: '1.5rem', color: '#ffe600', margin: '20px 0 0 0', letterSpacing: '8px', textTransform: 'uppercase' }}>Colors in the Sky</p>
          </div>
        </div>

        {/* Panel 3: Cultural Fest */}
        <div className="event-panel" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'linear-gradient(to right, #00d2ff, #0a0a0a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Equalizer />
          <img src="/silhouette_dance.jpg" style={{ position: 'absolute', bottom: '-5%', left: '10%', height: '70%', objectFit: 'contain', zIndex: 2, mixBlendMode: 'screen', filter: 'contrast(1.2) sepia(1) hue-rotate(180deg) saturate(3)' }} alt="Dance" />
          <img src="/silhouette_sing.jpg" style={{ position: 'absolute', bottom: '-5%', right: '10%', height: '70%', objectFit: 'contain', zIndex: 2, mixBlendMode: 'screen', filter: 'contrast(1.2) sepia(1) hue-rotate(300deg) saturate(3)' }} alt="Singing" />
          <div style={{ textAlign: 'center', zIndex: 10, position: 'absolute', top: '15%' }}>
            <h2 style={{ fontSize: '8rem', color: 'white', margin: 0, fontWeight: 900, lineHeight: 1, letterSpacing: '4px', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>FESTIVAL</h2>
            <p style={{ fontSize: '2rem', color: '#ff3366', margin: '10px 0 0 0', letterSpacing: '12px', textTransform: 'uppercase' }}>The Ultimate Experience</p>
          </div>
        </div>

      </div>
    </section>
  );
}
