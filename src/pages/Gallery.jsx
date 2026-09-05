// VIRINCHI PHOTO GALLERY
// Masonry layout with category filtering and interactive full-screen lightbox

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import LightboxModal from '../components/ui/LightboxModal';
import { Image, Filter, Maximize2, Sparkles } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  const categories = ['All', 'Stage', 'Crowd', 'Dance', 'Music', 'BTS'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Image className="w-3.5 h-3.5" />
            <span>VISUAL CHRONICLES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            PHOTO <span className="brand-gradient">GALLERY</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            MOMENTS OF ECSTASY • STAGE ILLUMINATION • BEHIND THE SCENES
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto pt-2">
            Capturing the raw energy, massive festival crowds, and emotional climaxes that define the Virinchi legacy at VBIT.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-display tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItemIndex(idx)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-[#0a0b14] border border-white/10 hover:border-rose-500/50 cursor-pointer transition-all duration-500 hover:-translate-y-1 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                loading="lazy"
              />

              {/* Hover Dark Vignette & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-rose-400 bg-rose-600/30 border border-rose-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.event}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && (
        <LightboxModal
          isOpen={activeItemIndex !== null}
          onClose={() => setActiveItemIndex(null)}
          item={filteredItems[activeItemIndex]}
          onPrev={() => setActiveItemIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
          onNext={() => setActiveItemIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
        />
      )}
    </div>
  );
}
