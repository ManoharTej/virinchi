// VIRINCHI AUDITIONS & MEMBERSHIP APPLICATION PORTAL
// Multi-wing domain selector + Portfolio drive links + Instant registration confirmation

import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { CLUB_INFO } from '../data/clubInfo';
import { 
  Sparkles, CheckCircle2, Send, Music, Flame, Award, 
  BookOpen, Video, Palette, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function Join() {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    year: '1st Year (Freshman)',
    department: 'Computer Science & Engg (CSE)',
    selectedWings: ['Swara (Music)'],
    experience: '',
    driveLink: '',
    consent: true
  });

  const [submitted, setSubmitted] = useState(false);

  const availableWings = [
    { name: "Swara (Music & Vocals)", desc: "Singing, instrumentals, acoustic jams" },
    { name: "Natya (Dance & Choreo)", desc: "Hip-hop, classical fusion, contemporary" },
    { name: "Abhinaya (Drama & Theatre)", desc: "Street plays (Nukkad), monologues, skits" },
    { name: "Kalakriti (Fine Arts & Craft)", desc: "Stage design, live painting, installations" },
    { name: "Sahiti (Literary & Spoken)", desc: "Debating, anchoring, slam poetry" },
    { name: "Chalana (Cinematography & Media)", desc: "Video editing, photography, lights, sound" }
  ];

  const handleWingToggle = (wingName) => {
    setFormData(prev => {
      const exists = prev.selectedWings.includes(wingName);
      if (exists) {
        if (prev.selectedWings.length === 1) return prev; // keep at least 1
        return { ...prev, selectedWings: prev.selectedWings.filter(w => w !== wingName) };
      } else {
        return { ...prev, selectedWings: [...prev.selectedWings, wingName] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.rollNumber) {
      alert("Please fill in your name, roll number, and official email.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUDITIONS 2025–26 CYCLE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
            JOIN <span className="brand-gradient">VIRINCHI</span>
          </h1>

          <p className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
            THE OFFICIAL CULTURAL CLUB OF VBIT • SAC BUILDING
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto pt-2">
            Step onto the grandest college stages in Telangana. Apply for open audition rounds across all 6 specialized cultural wings.
          </p>
        </div>

        {/* Form Container or Success Dossier */}
        {!submitted ? (
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-8 sm:p-12 border-rose-500/30 box-glow">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Personal Information */}
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-4 border-b border-white/10 pb-2">
                    1. Student Identity & Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Manohar Tej"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className="form-label">VBIT Roll Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 22P61A05XX"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        className="form-input font-mono"
                      />
                    </div>

                    <div>
                      <label className="form-label">Student / College Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. student@vbithyd.ac.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className="form-label">WhatsApp Contact Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input font-mono"
                      />
                    </div>

                    <div>
                      <label className="form-label">Academic Year *</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="form-input"
                      >
                        <option>1st Year (Freshman)</option>
                        <option>2nd Year (Sophomore)</option>
                        <option>3rd Year (Junior)</option>
                        <option>Final Year (Senior)</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Department / Branch *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="form-input"
                      >
                        <option>Computer Science & Engg (CSE)</option>
                        <option>CSE (AI & ML)</option>
                        <option>CSE (Data Science)</option>
                        <option>Information Technology (IT)</option>
                        <option>Electronics & Comm (ECE)</option>
                        <option>Electrical & Electronics (EEE)</option>
                        <option>Mechanical Engineering</option>
                        <option>Civil Engineering</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Wing Selection */}
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-2 border-b border-white/10 pb-2">
                    2. Select Cultural Wing(s)
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    You may select multiple wings if your creative talents span several disciplines.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableWings.map((w) => {
                      const isSelected = formData.selectedWings.includes(w.name);
                      return (
                        <div
                          key={w.name}
                          onClick={() => handleWingToggle(w.name)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start space-x-3 select-none ${
                            isSelected
                              ? 'bg-rose-600/20 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-rose-600 border-rose-500' : 'border-slate-500'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div>
                            <div className="font-display font-bold text-sm text-white">{w.name}</div>
                            <div className="text-[11px] text-slate-400">{w.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Portfolio Links & Experience */}
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-4 border-b border-white/10 pb-2">
                    3. Prior Experience & Media Showcase
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Google Drive / Portfolio / Instagram Audio/Video Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or Instagram link"
                        value={formData.driveLink}
                        onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                        className="form-input"
                      />
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        Provide view access to audio files, dance routines, artwork, or acting showreels.
                      </span>
                    </div>

                    <div>
                      <label className="form-label">Short Artist Statement / Audition Note</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your background, instruments played, dance styles, or passion for cultural arts..."
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="form-input resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>Official VBIT Student Activity Council Submission</span>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto text-xs py-3.5 px-8 shadow-[0_0_25px_rgba(225,29,72,0.6)]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>SUBMIT AUDITION APPLICATION</span>
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        ) : (
          /* Confirmation Dossier */
          <div className="max-w-xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
            <GlassCard className="p-8 sm:p-12 border-green-500/40 space-y-6 box-glow">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-3xl font-display font-black text-white">
                Application Received!
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your audition request for <strong>{formData.selectedWings.join(", ")}</strong> has been registered with the Virinchi Executive Committee.
              </p>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application Reference:</span>
                  <span className="text-rose-400 font-bold">VRN-AUD-2025-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="text-slate-200">{formData.department.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audition Venue:</span>
                  <span className="text-slate-200">VBIT SAC Audition Hall 2</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                You will receive a WhatsApp and email confirmation with your audition time slot within 48 hours.
              </p>

              <div className="pt-2 flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-xs py-2 px-5"
                >
                  SUBMIT ANOTHER RESPONSE
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
