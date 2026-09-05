// FULLSCREEN MEDIA LIGHTBOX MODAL WITH KEYBOARD NAVIGATION

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  item,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-rose-600/40 text-white transition-colors border border-white/10"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-rose-600/40 text-white transition-colors border border-white/10 hidden sm:flex items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-rose-600/40 text-white transition-colors border border-white/10 hidden sm:flex items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Media Content Container */}
      <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            controls
            autoPlay
            className="max-h-[75vh] w-auto rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.3)] object-contain"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title || "Virinchi Cultural Memory"}
            className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.3)] object-contain"
          />
        )}

        {/* Media Details */}
        <div className="mt-4 text-center max-w-2xl">
          <div className="flex items-center justify-center space-x-3 mb-1">
            {item.event && (
              <span className="font-mono text-xs text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                {item.event}
              </span>
            )}
            {item.category && (
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                {item.category}
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-display font-bold text-white">
            {item.title}
          </h3>
          {item.caption && (
            <p className="text-sm text-slate-300 mt-1">
              {item.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
