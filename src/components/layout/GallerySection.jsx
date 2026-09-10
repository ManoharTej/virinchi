import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function GallerySection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      const photos = document.querySelectorAll('.gallery-photo');
      photos.forEach(photo => {
        const speed = parseFloat(photo.getAttribute('data-speed'));
        gsap.to(photo, {
          x: xPos * speed * 50,
          y: yPos * speed * 50,
          rotateY: xPos * speed * 10,
          rotateX: -yPos * speed * 10,
          ease: 'power2.out',
          duration: 1
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const photos = [
    { src: '/group.png', top: '10%', left: '10%', speed: 1.5, zIndex: 5, width: '300px', label: 'Inception 2024' },
    { src: '/group1.png', top: '40%', left: '30%', speed: 0.8, zIndex: 2, width: '400px', label: 'Flashmob' },
    { src: '/silhouette_bathukamma.jpg', top: '20%', left: '60%', speed: 2, zIndex: 10, width: '250px', label: 'Bathukamma 23' },
    { src: '/core/pruthvi.png', top: '60%', left: '70%', speed: 1.2, zIndex: 7, width: '220px', label: 'Leadership' },
    { src: '/core/vaishnavi.png', top: '70%', left: '15%', speed: 2.5, zIndex: 15, width: '200px', label: 'Planning' },
    { src: '/core/manohar.png', top: '15%', left: '40%', speed: 0.5, zIndex: 1, width: '180px', label: 'Behind Scenes' },
    { src: '/people.png', top: '55%', left: '45%', speed: 1.8, zIndex: 8, width: '350px', label: 'Crowd Vibe' },
  ];

  return (
    <section ref={containerRef} style={{ width: '100%', minHeight: '150vh', background: '#050505', position: 'relative', overflow: 'hidden', perspective: '1000px' }}>
      
      {/* Background Title */}
      <div style={{ position: 'sticky', top: '40vh', width: '100%', textAlign: 'center', zIndex: 0, opacity: 0.1, pointerEvents: 'none' }}>
        <h2 style={{ fontSize: '12rem', color: 'white', margin: 0, letterSpacing: '30px', fontWeight: 900 }}>MEMORIES</h2>
      </div>

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
              transformStyle: 'preserve-3d',
              transition: 'z-index 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.zIndex = 50;
              gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.zIndex = p.zIndex;
              gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
            }}
          >
            <img src={p.src} alt={p.label} />
            <div style={{ position: 'absolute', bottom: '10px', left: 0, width: '100%', textAlign: 'center', fontFamily: '"Permanent Marker", Courier, monospace', fontSize: '1.2rem', color: '#111', zIndex: 10 }}>
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
