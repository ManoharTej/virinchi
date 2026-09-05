// CINEMATIC INTRO EXPERIENCE
// Sequence: Blackness -> Single Red Pulse -> Audio Waveform -> Equalizer Energy -> Virinchi Logo -> Seamless Entry

import React, { useState, useEffect, useRef } from 'react';
import VirinchiLogo from '../ui/VirinchiLogo';

export default function CinematicIntro({ onComplete }) {
  // Phase progression: 0 (black), 1 (pulse), 2 (waveform), 3 (equalizer & particles), 4 (logo morph), 5 (resolve & dissolve)
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    // 10 second overall sequence with strict timing milestones
    const timers = [
      setTimeout(() => setPhase(1), 800),    // 0.8s: Single red pulse
      setTimeout(() => setPhase(2), 2400),   // 2.4s: Audio waveform starts
      setTimeout(() => setPhase(3), 4800),   // 4.8s: Equalizer energy & particles
      setTimeout(() => setPhase(4), 7200),   // 7.2s: Frequency morphs into Virinchi logo
      setTimeout(() => setPhase(5), 9400),   // 9.4s: Full illumination & transition
      setTimeout(() => {
        handleSkip();
      }, 10800)                              // 10.8s: Complete transition
    ];

    // Progress bar counter
    const startTime = Date.now();
    const duration = 10500;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
    }, 50);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  // Canvas visual synthesis for the frequency wave & particle energy
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 40,
        y: height * 0.5 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 2.5 + 1,
        color: Math.random() > 0.4 ? '#f43f5e' : '#e11d48',
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    let frame = 0;

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Phase 1: Tiny red pulse in the center of blackness
      if (phase === 1) {
        const pulseSize = Math.sin(frame * 0.08) * 8 + 12;
        const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulseSize * 4);
        glow.addColorStop(0, 'rgba(255, 42, 95, 1)');
        glow.addColorStop(0.4, 'rgba(225, 29, 72, 0.7)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseSize * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Phase 2: Frequency waveform expands horizontally
      if (phase >= 2 && phase < 4) {
        const waveProgress = phase === 2 ? Math.min(1, (frame - 70) / 70) : 1;
        const halfSpan = (width * 0.45) * Math.max(0.1, waveProgress);

        ctx.beginPath();
        for (let x = cx - halfSpan; x <= cx + halfSpan; x += 4) {
          const normX = (x - (cx - halfSpan)) / (halfSpan * 2);
          const envelope = Math.sin(normX * Math.PI);
          const freq = Math.sin(normX * 18 - frame * 0.12) * Math.cos(normX * 36 + frame * 0.08);
          const amp = (phase === 3 ? 55 : 30) * envelope;
          const y = cy + freq * amp;

          if (x === cx - halfSpan) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = phase === 3 ? '#ff2a5f' : '#f43f5e';
        ctx.lineWidth = phase === 3 ? 3.5 : 2;
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = phase === 3 ? 25 : 12;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Phase 3: Equalizer energy surges and particles erupt
      if (phase === 3) {
        // Render reactive particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.005;
          if (p.alpha <= 0) {
            p.x = cx + (Math.random() - 0.5) * 300;
            p.y = cy + (Math.random() - 0.5) * 40;
            p.alpha = Math.random() * 0.8 + 0.2;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Draw erupting vertical equalizer spikes
        const barCount = 36;
        const barWidth = 4;
        const span = 320;
        const startX = cx - span / 2;
        for (let i = 0; i < barCount; i++) {
          const bx = startX + (i / barCount) * span;
          const dist = Math.abs(i - barCount / 2) / (barCount / 2);
          const h = (Math.sin(frame * 0.2 + i * 0.4) * 0.5 + 0.5) * (75 * (1 - dist * 0.5));

          const grad = ctx.createLinearGradient(0, cy - h, 0, cy + h);
          grad.addColorStop(0, '#ff4d79');
          grad.addColorStop(0.5, '#e11d48');
          grad.addColorStop(1, '#ff8a00');

          ctx.fillStyle = grad;
          ctx.fillRect(bx, cy - h, barWidth, h * 2);
        }
      }

      animRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase]);

  const handleSkip = () => {
    try {
      localStorage.setItem('virinchi_intro_seen', 'true');
    } catch (e) {
      // safe fallback
    }
    if (onComplete) onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none overflow-hidden transition-opacity duration-1000 ${
        phase === 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background visual canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Center Stage: Frequency Morphs into Virinchi Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Phase 0 & 1: Initial frequency text prompt */}
        {phase <= 1 && (
          <div className="flex flex-col items-center space-y-3 transition-opacity duration-700">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-rose-500/70 animate-pulse">
              [ INITIALIZING FREQUENCY ]
            </span>
          </div>
        )}

        {/* Phase 2: Signal expansion */}
        {phase === 2 && (
          <div className="flex flex-col items-center space-y-2 animate-pulse">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-rose-400">
              AUDIO WAVEFORM SYNCHRONIZING
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
          </div>
        )}

        {/* Phase 3: Energy surge */}
        {phase === 3 && (
          <div className="flex flex-col items-center space-y-2">
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-rose-400 font-bold drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]">
              EQUALIZER ENERGY SURGE
            </span>
          </div>
        )}

        {/* Phase 4 & 5: The Exact Virinchi Logo Emerges from the Frequency */}
        {phase >= 4 && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative p-6">
              {/* Radial flare behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600/30 via-pink-500/40 to-orange-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

              <VirinchiLogo size="hero" animated={true} glow={true} />
            </div>

            {/* Subtitle Reveal: THE CULTURAL CLUB OF VBIT */}
            <div className="mt-4 flex flex-col items-center space-y-2">
              <span className="font-display font-bold text-xs md:text-sm tracking-[0.4em] uppercase text-slate-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                THE CULTURAL CLUB OF VBIT
              </span>
              <div className="h-[2px] w-36 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-rose-400/80">
                SINCE 2007 • HYDERABAD
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top Right Subtle Skip Control */}
      <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
        <button
          onClick={handleSkip}
          className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-rose-600/20 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-white transition-all duration-300 text-xs font-mono tracking-wider backdrop-blur-md"
        >
          <span>SKIP INTRO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:animate-ping"></span>
        </button>
      </div>

      {/* Bottom Timeline Indicator */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col items-center max-w-md mx-auto">
        <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-600 via-pink-500 to-orange-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="w-full flex justify-between items-center mt-2 text-[10px] font-mono text-slate-500">
          <span>FREQUENCY OVERTURE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
