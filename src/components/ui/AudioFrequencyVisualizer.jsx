// VIRINCHI AUDIO FREQUENCY VISUALIZER
// Real-time canvas audio wave and equalizer particle synthesis

import React, { useEffect, useRef } from 'react';

export default function AudioFrequencyVisualizer({
  height = 200,
  barCount = 64,
  interactive = true,
  className = ""
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 800;
      canvas.height = height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, width, h);

      // Gradient for waves
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'rgba(225, 29, 72, 0.15)');
      grad.addColorStop(0.3, 'rgba(244, 63, 94, 0.7)');
      grad.addColorStop(0.7, 'rgba(251, 113, 133, 0.8)');
      grad.addColorStop(1, 'rgba(249, 115, 22, 0.2)');

      const centerY = h * 0.5;
      const sensitivity = mouseRef.current.active ? (1 - mouseRef.current.y) * 1.5 : 0.8;

      // Draw dynamic multi-frequency waves
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const waveOffset = w * 1.2;
        const waveSpeed = 0.035 * (w + 1);

        for (let x = 0; x <= width; x += 4) {
          const normX = x / width;
          // Gaussian envelope so wave peaks in center
          const envelope = Math.sin(normX * Math.PI);
          
          const freq1 = Math.sin(normX * 12 + phase * waveSpeed + waveOffset);
          const freq2 = Math.cos(normX * 24 - phase * 0.02 + waveOffset);
          const freq3 = Math.sin(normX * 48 + phase * 0.05);

          const displacement = (freq1 * 25 + freq2 * 14 + freq3 * 6) * envelope * sensitivity;
          const y = centerY + displacement * (w === 0 ? 1 : (w === 1 ? -0.8 : 0.6));

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = w === 1 ? 'rgba(244, 63, 94, 0.85)' : (w === 0 ? 'rgba(225, 29, 72, 0.4)' : 'rgba(249, 115, 22, 0.4)');
        ctx.lineWidth = w === 1 ? 2.5 : 1.5;
        ctx.stroke();
      }

      // Draw subtle vertical equalizer frequency bars across the center
      const step = width / barCount;
      const barWidth = Math.max(2, step * 0.4);

      for (let i = 0; i < barCount; i++) {
        const x = i * step + step / 2;
        const norm = i / barCount;
        const envelope = Math.sin(norm * Math.PI);
        const noise = Math.sin(i * 0.5 + phase * 0.08) * Math.cos(i * 0.2 - phase * 0.05);
        const barH = Math.max(4, Math.abs(noise) * (h * 0.35) * envelope * sensitivity);

        const barGrad = ctx.createLinearGradient(0, centerY - barH, 0, centerY + barH);
        barGrad.addColorStop(0, '#f43f5e');
        barGrad.addColorStop(0.5, '#e11d48');
        barGrad.addColorStop(1, '#9f1239');

        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(x - barWidth / 2, centerY - barH, barWidth, barH * 2, 2);
        ctx.fill();
      }

      phase += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, barCount, interactive]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
