import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';
import { AnimatedMusicalBackground } from './ExecutiveBoardSection';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const ghostRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%', // Trigger when the section is mostly in view
        toggleActions: 'play none none none'
      }
    });

    // 1. Initial State Setup
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8, y: 40 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });

    // 2. Timeline Sequence
    tl.to({}, { duration: 0.5 }) // Wait 0.5 second after section is in view
      .to(ghostRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }) // Fade out GhostFibers in 0.5s
      .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)' }) // Animate Logo first
      .to(contentRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.3"); // Animate texts & socials after logo

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="tab9" className="contact-section-minimal">
      
      {/* Background 2: Musical Background (Base Layer) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <AnimatedMusicalBackground />
      </div>

      {/* Background 1: Dark solid layer (Top Layer that fades out) */}
      <div ref={ghostRef} style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#0d0614', pointerEvents: 'none' }}>
      </div>
      
      <div className="contact-content-minimal">
        <div ref={logoRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/virinchi_logo.png" alt="Virinchi Logo" className="minimal-logo" />
        </div>

        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="minimal-subtitle">The Cultural Club of VBIT</p>
          
          <div className="minimal-socials">
            <a href="https://www.instagram.com/virinchi.vbit/" target="_blank" rel="noreferrer" className="minimal-social-link">
              <InstagramIcon />
              <span>Instagram</span>
            </a>
            <a href="https://www.linkedin.com/company/virinchi-vbit/posts/?feedView=all" target="_blank" rel="noreferrer" className="minimal-social-link">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a href="tel:+910000000000" className="minimal-social-link">
              <PhoneIcon />
              <span>+91 00000 00000</span>
            </a>
          </div>
        </div>
      </div>

      <div className="minimal-footer-bottom">
        <p>Vignana Bharathi Institute of Technology, Hyderabad</p>
        <p className="copyright">© 2026 Virinchi. All Rights Reserved.</p>
      </div>

    </section>
  );
}
