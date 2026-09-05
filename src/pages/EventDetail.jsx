// VIRINCHI DEDICATED EVENT DETAIL PAGE
// Route: /events/:eventSlug — Comprehensive dossier with video, schedule & gallery

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug } from '../data/events';
import GlassCard from '../components/ui/GlassCard';
import LightboxModal from '../components/ui/LightboxModal';
import { 
  Calendar, MapPin, Clock, ArrowLeft, Users, Play, 
  Sparkles, CheckCircle2, Phone, Share2, Ticket 
} from 'lucide-react';

export default function EventDetail() {
  const { eventSlug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const event = getEventBySlug(eventSlug);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-display font-black text-white mb-2">
          Event Record Not Found
        </h1>
        <p className="text-slate-400 max-w-md mb-6 text-sm">
          The requested festival or cultural event link does not exist in our archive.
        </p>
        <Link to="/events" className="btn-primary text-xs py-3 px-6">
          VIEW ALL EVENTS
        </Link>
      </div>
    );
  }

  const galleryItems = event.gallery ? event.gallery.map((img, i) => ({
    id: `evt-gal-${i}`,
    image: img,
    title: `${event.title} — Memory 0${i + 1}`,
    event: event.title,
    caption: `Exclusive photograph from ${event.title}`
  })) : [];

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/events"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO EVENTS CALENDAR</span>
          </Link>
        </div>

        {/* Hero Event Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 mb-12 box-glow">
          <div className="relative aspect-[21/9] sm:aspect-[21/8] min-h-[300px]">
            <img
              src={event.poster}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent"></div>

            {/* Badges on Banner */}
            <div className="absolute top-6 left-6 flex items-center space-x-2">
              <span className="bg-rose-600 text-white font-mono text-xs px-3.5 py-1 rounded-full uppercase tracking-wider font-bold shadow-lg">
                {event.category}
              </span>
              <span className="bg-black/70 backdrop-blur-md text-slate-200 font-mono text-xs px-3 py-1 rounded-full border border-white/10">
                {event.status}
              </span>
            </div>

            {/* Event Title on Banner */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-rose-400 font-semibold">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {event.date}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {event.time}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {event.venue}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                {event.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                {event.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Dossier Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Dossier (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <GlassCard className="p-8 space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase">
                EVENT DOSSIER
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                About the Festival
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {event.summary}
              </p>

              {/* Highlights */}
              <div className="pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  FESTIVAL HIGHLIGHTS:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Teaser Video Preview */}
            {event.teaserVideo && (
              <GlassCard className="p-8 space-y-4">
                <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-rose-400">
                  <Play className="w-4 h-4 fill-rose-500" />
                  <span>OFFICIAL VIDEO TEASER</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Festival Atmosphere Preview
                </h3>
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black">
                  <video
                    src={event.teaserVideo}
                    controls
                    poster={event.poster}
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            )}

            {/* Festival Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <GlassCard className="p-8 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase">
                  TIMELINE & AGENDA
                </div>
                <h3 className="text-2xl font-display font-black text-white">
                  Stage Schedule
                </h3>

                <div className="space-y-4">
                  {event.schedule.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-colors gap-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-600/20">
                          {slot.day}
                        </span>
                        <span className="font-display font-bold text-sm text-white">
                          {slot.title}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slate-400 sm:text-right">
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Event Photo Highlights */}
            {galleryItems.length > 0 && (
              <GlassCard className="p-8 space-y-5">
                <h3 className="text-2xl font-display font-black text-white">
                  Captured Memories
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {galleryItems.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenLightbox(idx)}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-mono text-white bg-rose-600 px-2.5 py-1 rounded-full">
                          VIEW FULL
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Registration Card */}
            <GlassCard className="p-6 space-y-4 border-rose-500/40 box-glow">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-rose-400 font-bold">
                  PARTICIPATION STATUS
                </span>
                <span className="font-mono text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                  OPEN
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                Register for {event.title.split('—')[0]}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Open to all VBIT departments and recognized university delegates. Passes are scanned at the security gates.
              </p>

              <Link
                to="/join"
                className="btn-primary w-full text-xs py-3 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(225,29,72,0.6)]"
              >
                <Ticket className="w-4 h-4" />
                <span>AUDITION / PASS INQUIRY</span>
              </Link>
            </GlassCard>

            {/* Event Coordinators */}
            {event.coordinators && (
              <GlassCard className="p-6 space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  STUDENT CONVENERS
                </div>
                <div className="space-y-3">
                  {event.coordinators.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <div className="font-display font-bold text-sm text-white">{c.name}</div>
                      <div className="font-mono text-xs text-rose-400">{c.role}</div>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-400 pt-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{c.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Location & Guidelines */}
            <GlassCard className="p-6 space-y-3 text-xs text-slate-400 font-mono">
              <div className="text-white font-display font-bold text-sm">
                VENUE LOCATION:
              </div>
              <p className="leading-relaxed">
                VBIT Open Air Amphitheatre & Central Lawns, Aushapur, Ghatkesar.
              </p>
              <div className="pt-2 text-[11px] text-rose-400">
                • College ID card mandatory for all students
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        item={galleryItems[lightboxIndex]}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
}
