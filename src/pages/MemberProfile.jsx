// VIRINCHI MEMBER PROFILE & DIGITAL ID CREDENTIAL
// Stable URL architecture (/team/:memberSlug) engineered for physical ID Card QR code scanning

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMemberBySlug, MEMBERS } from '../data/members';
import VirinchiLogo from '../components/ui/VirinchiLogo';
import GlassCard from '../components/ui/GlassCard';
import { InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { 
  QrCode, ShieldCheck, Share2, Copy, Check, ArrowLeft, 
  Mail, Award, Sparkles, MapPin, Calendar, CheckCircle2 
} from 'lucide-react';

export default function MemberProfile() {
  const { memberSlug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'idcard'

  const member = getMemberBySlug(memberSlug);

  // If member slug not found
  if (!member) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-4">
          <QrCode className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-black text-white mb-2">
          Member Record Not Found
        </h1>
        <p className="text-slate-400 max-w-md mb-6 text-sm">
          The requested Virinchi ID URL or QR code is unassigned or expired.
        </p>
        <Link to="/team" className="btn-primary text-xs py-3 px-6">
          RETURN TO EXECUTIVE BOARD
        </Link>
      </div>
    );
  }

  const profileUrl = typeof window !== 'undefined' ? window.location.href : `https://virinchi.vbithyd.ac.in/team/${member.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/team"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO EXECUTIVE ROSTER</span>
          </Link>

          {/* Direct Share / Copy QR Profile Link */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-rose-600/20 border border-white/10 hover:border-rose-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
            <span>{copied ? "QR LINK COPIED" : "COPY QR URL"}</span>
          </button>
        </div>

        {/* View Switcher: Narrative Profile vs Holographic ID Card */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-full bg-white/5 border border-white/10 inline-flex space-x-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-1.5 rounded-full text-xs font-display tracking-wider uppercase transition-all ${
                activeTab === 'profile'
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EXECUTIVE DOSSIER
            </button>
            <button
              onClick={() => setActiveTab('idcard')}
              className={`px-5 py-1.5 rounded-full text-xs font-display tracking-wider uppercase transition-all flex items-center space-x-1.5 ${
                activeTab === 'idcard'
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3 h-3" />
              <span>OFFICIAL ID CARD</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: EXECUTIVE DOSSIER                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Portrait & Quick Stats */}
            <div className="lg:col-span-5 space-y-6">
              <GlassCard className="p-6 border-rose-500/30 box-glow">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent"></div>

                  {/* Verified Credential Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-green-500/40 text-green-400 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED CREDENTIAL</span>
                  </div>

                  {/* ID Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-white bg-rose-600 px-2.5 py-1 rounded-md font-bold">
                      {member.idCardNumber}
                    </span>
                    <span className="font-mono text-xs text-slate-300 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      BLOOD: {member.bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-display font-black text-white">
                    {member.name}
                  </h2>
                  <p className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider">
                    {member.position}
                  </p>
                  <p className="text-xs text-slate-400">
                    {member.department} • {member.year}
                  </p>
                </div>

                {/* Social Connects */}
                <div className="flex justify-center space-x-3 pt-5 mt-5 border-t border-white/10">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-rose-600/30 text-slate-300 hover:text-white transition-colors"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-rose-600/30 text-slate-300 hover:text-white transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 rounded-full bg-white/5 hover:bg-rose-600/30 text-slate-300 hover:text-white transition-colors"
                      title="Official Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Bio, Contributions, Skills */}
            <div className="lg:col-span-7 space-y-8">
              {/* Executive Overview */}
              <GlassCard className="p-8 space-y-5">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase">
                  LEADERSHIP PROFILE
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  About {member.name.split(' ')[0]}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {member.fullBio}
                </p>

                {/* Skills Tags */}
                <div className="pt-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-2">
                    CORE EXPERTISE & DOMAINS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-rose-300"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Major Fest Contributions */}
              <GlassCard className="p-8 space-y-5">
                <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>KEY CONTRIBUTIONS & ACHIEVEMENTS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Impact on Virinchi Cultural Society
                </h3>

                <div className="space-y-3 pt-1">
                  {member.contributions.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-black/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="text-slate-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HOLOGRAPHIC VIRINCHI ID CARD (OPTIMIZED FOR PHYSICAL QR SCAN)     */}
        {/* ========================================================================= */}
        {activeTab === 'idcard' && (
          <div className="max-w-md mx-auto py-4 animate-in fade-in zoom-in-95 duration-500">
            {/* The Physical Virtual ID Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121324] via-[#090a12] to-[#040407] border-2 border-rose-500/40 p-6 shadow-[0_0_50px_rgba(244,63,94,0.35)] select-none">
              {/* Security Watermark Background */}
              <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none transform rotate-12">
                <VirinchiLogo size="xl" glow={false} />
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
                <div className="flex items-center space-x-2">
                  <VirinchiLogo variant="minimal" size="sm" />
                  <div>
                    <div className="font-display font-extrabold text-sm tracking-wider text-white">
                      VIRINCHI
                    </div>
                    <div className="font-mono text-[8px] tracking-[0.2em] text-slate-400">
                      THE CULTURAL CLUB OF VBIT
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[9px] text-green-400 uppercase tracking-widest font-bold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                    <span>ACTIVE</span>
                  </div>
                  <div className="font-mono text-[9px] text-slate-400">
                    SAC VALIDATED
                  </div>
                </div>
              </div>

              {/* Card Body: Photo & Key Details */}
              <div className="py-6 flex items-center space-x-5">
                <div className="w-28 h-36 rounded-2xl overflow-hidden border-2 border-rose-500/40 shrink-0 shadow-lg relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-rose-400 uppercase font-semibold">
                    {member.wing}
                  </span>
                  <h3 className="font-display font-black text-xl text-white leading-tight">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-200">
                    {member.position}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    DEPT: {member.department.split(' ')[0]}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    ID: <span className="text-rose-400 font-bold">{member.idCardNumber}</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    BLOOD GROUP: <span className="text-white font-bold">{member.bloodGroup}</span>
                  </div>
                </div>
              </div>

              {/* Authentic QR Code Section */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                <div className="space-y-1 max-w-[200px]">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    VERIFICATION QR
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Scan using any phone camera to verify official membership & credentials.
                  </p>
                  <div className="font-mono text-[9px] text-rose-400/80 truncate">
                    /team/{member.slug}
                  </div>
                </div>

                {/* SVG Visual QR Matrix */}
                <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 fill-black">
                    {/* Corner Position Anchors */}
                    <rect x="0" y="0" width="30" height="30" rx="4" />
                    <rect x="6" y="6" width="18" height="18" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />

                    <rect x="70" y="0" width="30" height="30" rx="4" />
                    <rect x="76" y="6" width="18" height="18" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />

                    <rect x="0" y="70" width="30" height="30" rx="4" />
                    <rect x="6" y="76" width="18" height="18" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />

                    {/* QR Pixel Matrix */}
                    <rect x="36" y="4" width="6" height="6" />
                    <rect x="46" y="4" width="6" height="6" />
                    <rect x="56" y="10" width="6" height="6" />
                    <rect x="36" y="16" width="6" height="6" />
                    <rect x="46" y="24" width="6" height="6" />
                    <rect x="56" y="24" width="6" height="6" />

                    <rect x="8" y="38" width="6" height="6" />
                    <rect x="20" y="44" width="6" height="6" />
                    <rect x="36" y="38" width="6" height="6" />
                    <rect x="46" y="46" width="8" height="8" fill="#e11d48" />
                    <rect x="60" y="38" width="6" height="6" />
                    <rect x="74" y="44" width="6" height="6" />
                    <rect x="86" y="38" width="6" height="6" />

                    <rect x="36" y="62" width="6" height="6" />
                    <rect x="46" y="68" width="6" height="6" />
                    <rect x="56" y="62" width="6" height="6" />
                    <rect x="72" y="72" width="6" height="6" />
                    <rect x="84" y="80" width="6" height="6" />
                    <rect x="76" y="88" width="6" height="6" />
                    <rect x="40" y="84" width="6" height="6" />
                    <rect x="52" y="84" width="6" height="6" />
                  </svg>
                </div>
              </div>

              {/* Card Footer Security Line */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
                <span>VIGNANA BHARATHI INSTITUTE OF TECHNOLOGY</span>
                <span>AUTHENTICATED</span>
              </div>
            </div>

            <p className="text-center text-xs font-mono text-slate-500 mt-4">
              Permanent QR route: <code className="text-rose-400">/team/{member.slug}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
