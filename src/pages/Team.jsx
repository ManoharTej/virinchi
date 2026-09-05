// VIRINCHI EXECUTIVE BOARD & CREW ROSTER
// Filterable by Wing, with preview badges and direct QR ID card access

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { MEMBERS } from '../data/members';
import { InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { Users, QrCode, ArrowRight, Mail, Sparkles } from 'lucide-react';

export default function Team() {
  const [filterWing, setFilterWing] = useState("All");

  const wings = ["All", "Executive Board", "Swara (Music)", "Natya (Dance)", "Abhinaya (Drama)", "Chalana (Media)", "Kalakriti (Arts)"];

  const filteredMembers = filterWing === "All"
    ? MEMBERS
    : MEMBERS.filter(m => m.wing === filterWing || (filterWing === "Executive Board" && m.wing.includes("Executive")));

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>EXECUTIVE LEADERSHIP 2025–26</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            EXECUTIVE <span className="brand-gradient">BOARD</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            THE OFFICIAL CURATORS OF VIRINCHI CULTURAL SOCIETY
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto pt-2">
            Each board member is issued a unique digital credential. Click on any member to inspect their official Virinchi ID card and verified QR record.
          </p>
        </div>

        {/* Wing Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {wings.map((w) => (
            <button
              key={w}
              onClick={() => setFilterWing(w)}
              className={`px-4 py-2 rounded-full text-xs font-display tracking-wider uppercase transition-all duration-300 ${
                filterWing === w
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_20px_rgba(225,29,72,0.6)]'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <GlassCard key={member.id} className="group p-5 flex flex-col justify-between">
              <div>
                {/* Photo & Card Badges */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent"></div>

                  {/* QR Identifier Icon */}
                  <Link
                    to={`/team/${member.slug}`}
                    title="Scan Member QR ID Card"
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/80 backdrop-blur-md border border-rose-500/30 text-rose-400 hover:text-white hover:bg-rose-600 transition-colors shadow-lg"
                  >
                    <QrCode className="w-4 h-4" />
                  </Link>

                  {/* ID Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-white bg-rose-600/80 px-2 py-0.5 rounded backdrop-blur-sm font-semibold">
                      {member.idCardNumber}
                    </span>
                    <span className="font-mono text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {member.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-rose-400 tracking-wider uppercase font-semibold">
                    {member.wing}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-rose-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-rose-300/80 font-medium">
                    {member.position}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 pt-1 leading-relaxed">
                    {member.shortIntro}
                  </p>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <Link
                  to={`/team/${member.slug}`}
                  className="btn-secondary text-[11px] py-1.5 px-3.5 group-hover:border-rose-500/50"
                >
                  <span>PROFILE</span>
                  <ArrowRight className="w-3 h-3 text-rose-400" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
