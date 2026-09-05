// VIRINCHI ABOUT PAGE
// Cultural mission, VBIT heritage since 2007, 6 Wings, Student Impact

import React from 'react';
import { Link } from 'react-router-dom';
import VirinchiLogo from '../components/ui/VirinchiLogo';
import GlassCard from '../components/ui/GlassCard';
import { CLUB_INFO } from '../data/clubInfo';
import { Sparkles, Music, Flame, Award, BookOpen, Video, Palette, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export default function About() {
  const pillarIcons = {
    Music: Music,
    Flame: Flame,
    Sparkles: Sparkles,
    Palette: Palette,
    BookOpen: BookOpen,
    Video: Video
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGINS & ETHOS • ESTD. 2007</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            ABOUT <span className="brand-gradient">VIRINCHI</span>
          </h1>

          <p className="font-mono text-sm tracking-[0.25em] text-slate-400 uppercase font-semibold">
            THE CULTURAL CLUB OF VBIT
          </p>

          <p className="text-slate-300 text-lg leading-relaxed pt-2">
            We are the heartbeat, the rhythm, and the creative sanctuary for thousands of engineering students discovering the artist within.
          </p>
        </div>

        {/* Core Manifesto Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="border-l-2 border-rose-500 pl-4">
              <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
                WHY VIRINCHI EXISTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Cultivating Identity Beyond Equations & Code
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Founded in 2007 at <strong>Vignana Bharathi Institute of Technology (VBIT)</strong>, Hyderabad, Virinchi was born from a fundamental conviction: that rigorous engineering minds achieve their highest potential when balanced by the expressive power of cultural arts.
            </p>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Virinchi is not an extracurricular checkbox — it is a student-powered creative laboratory where introverts find their voice, dancers choreograph state-champion routines, actors spark social revolutions through street theatre, and aspiring film technicians produce 4K concert spectacles.
            </p>

            <div className="pt-2 flex flex-col space-y-3">
              {[
                "Affiliated directly with the Student Activity Center (SAC) of VBIT",
                "Entirely student-conceived, rehearsed, staged, and directed",
                "State and national competition representation across India",
                "Safe, inclusive environment welcoming artists of every skill tier"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <GlassCard className="p-8 border-rose-500/30 box-glow">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80"
                  alt="Virinchi Live Stage"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-slate-200">
                  VBIT Cultural Amphitheatre during the VIBHA Mega Concert
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display text-2xl font-black text-rose-400">18+</div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">Years Continuous Legacy</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display text-2xl font-black text-rose-400">500+</div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">Stage Performances</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* The 6 Wings Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
              STRUCTURAL EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
              THE 6 SPECIALIZED <span className="brand-gradient">WINGS</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Every production is driven by 6 dedicated artistic divisions functioning in complete harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUB_INFO.manifesto.pillars.map((pillar) => {
              const IconComponent = pillarIcons[pillar.icon] || Sparkles;
              return (
                <GlassCard key={pillar.id} className="p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                        WING
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-black text-white">
                      {pillar.name}
                    </h3>
                    <p className="font-mono text-xs text-rose-400 mb-3">
                      {pillar.category}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <Link
                      to="/join"
                      className="text-xs font-mono text-rose-400 hover:text-white flex items-center space-x-1"
                    >
                      <span>AUDITION FOR {pillar.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Student Impact Testimonials */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
              ALUMNI & STUDENT VOICES
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
              THE VIRINCHI EFFECT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Virinchi gave me the confidence to stand before thousands of people without fear. It transformed an awkward engineer into a passionate stage frontman.",
                name: "Alumnus (Batch 2023)",
                role: "Former President • Swara Lead"
              },
              {
                quote: "The discipline of synchronizing 40 dancers taught me more about organizational leadership than any textbook ever could.",
                name: "Alumna (Batch 2024)",
                role: "Former Head of Natya"
              },
              {
                quote: "Directing street plays with Abhinaya made me critically conscious of social realities. Virinchi gives engineering a beating heart.",
                name: "Core Member (Class 2025)",
                role: "Abhinaya Theatre Lead"
              }
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-black/60 border border-white/5 flex flex-col justify-between">
                <p className="text-slate-300 text-sm italic leading-relaxed mb-4">
                  "{t.quote}"
                </p>
                <div>
                  <div className="font-display font-bold text-white text-sm">{t.name}</div>
                  <div className="font-mono text-[11px] text-rose-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
            Ready to shape the cultural soundscape of VBIT?
          </h3>
          <div className="flex justify-center gap-4">
            <Link to="/join" className="btn-primary text-xs py-3 px-8">
              APPLY FOR AUDITIONS
            </Link>
            <Link to="/team" className="btn-secondary text-xs py-3 px-6">
              MEET THE BOARD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
