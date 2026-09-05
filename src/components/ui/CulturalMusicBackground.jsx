// CULTURAL MUSIC BACKGROUND ENGINE
// Floating crimson red music notes, cultural swara waves, and ambient glowing mandalas

import React, { useEffect, useRef } from 'react';

export default function CulturalMusicBackground() {
  const canvasRef = useRef(null);

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

    // Cultural music symbols pool (Western + Classical Indian Swara notation)
    const symbols = ['♪', '♫', '♬', '𝄞', '𝄢', 'Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'];
    
    // Floating nodes
    const notes = [];
    const noteCount = 35;
    for (let i = 0; i < noteCount; i++) {
      notes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        fontSize: Math.floor(Math.random() * 22) + 14,
        speedY: (Math.random() * 0.4 + 0.15) * -1, // float upwards
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.15,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        color: Math.random() > 0.3 ? '#e11d48' : '#f43f5e'
      });
    }

    let animationId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Cultural Mandala Geometric Rings in crimson/rose
      ctx.save();
      ctx.translate(width * 0.85, height * 0.25);
      ctx.rotate(angle * 0.05);
      for (let r = 50; r <= 300; r += 50) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(225, 29, 72, ${0.03 + (r / 300) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
      }
      ctx.restore();

      // Second Mandala at Bottom Left
      ctx.save();
      ctx.translate(width * 0.1, height * 0.8);
      ctx.rotate(-angle * 0.03);
      for (let r = 40; r <= 240; r += 40) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.02 + (r / 240) * 0.02})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 10]);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Render Floating Crimson Red Music Symbols
      notes.forEach((n) => {
        n.y += n.speedY;
        n.x += n.speedX;
        n.rotation += n.rotSpeed;

        // Wrap around screen bounds
        if (n.y < -30) {
          n.y = height + 20;
          n.x = Math.random() * width;
        }
        if (n.x < -30) n.x = width + 20;
        if (n.x > width + 30) n.x = -20;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.rotation);
        ctx.font = `${n.fontSize}px 'JetBrains Mono', serif`;
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.opacity;
        ctx.shadowColor = '#e11d48';
        ctx.shadowBlur = 10;
        ctx.fillText(n.char, 0, 0);
        ctx.restore();
      });

      angle += 0.01;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas with floating red notes & mandalas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Fresh Clean Deep Radial Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px]"></div>
      <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-crimson-600/10 rounded-full blur-[160px]"></div>
      <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-pink-600/8 rounded-full blur-[150px]"></div>
    </div>
  );
}
