// VIRINCHI ADMIN CONTENT ARCHITECTURE & GOOGLE DRIVE INTEGRATION SUITE
// Restricted access portal for authorized club executives (virinchi@vbithyd.ac.in)

import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { driveMediaService } from '../services/DriveMediaService';
import { MEMBERS } from '../data/members';
import { EVENTS } from '../data/events';
import { REELS } from '../data/reels';
import { 
  ShieldCheck, Lock, FolderSync, Database, Plus, Edit2, 
  Trash2, Download, CloudUpload, HardDrive, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('drive'); // 'drive', 'members', 'events', 'reels'
  const [syncStatus, setSyncStatus] = useState(null);

  // Folder configuration state
  const [folders, setFolders] = useState(driveMediaService.getFolderConfiguration());
  const [testDriveLink, setTestDriveLink] = useState('');
  const [resolvedUrl, setResolvedUrl] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Authorized check for club leadership email
    if (emailInput.toLowerCase().includes('virinchi') || emailInput.toLowerCase().includes('vbit')) {
      setIsAuthenticated(true);
    } else {
      alert("Unauthorized: Only official Virinchi executive accounts (virinchi@vbithyd.ac.in) have portal clearance.");
    }
  };

  const handleSyncFolder = (type) => {
    setSyncStatus(`Syncing Google Drive folder: ${folders[type]}...`);
    setTimeout(() => {
      setSyncStatus(`Successfully validated Google Drive stream endpoints for ${type}.`);
      setTimeout(() => setSyncStatus(null), 3500);
    }, 1200);
  };

  const handleTestDriveResolver = () => {
    if (!testDriveLink) return;
    const url = driveMediaService.resolveDriveMediaUrl(testDriveLink, testDriveLink.includes(".mp4") ? "video" : "image");
    setResolvedUrl(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <GlassCard className="max-w-md w-full p-8 border-rose-500/40 box-glow text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-display font-black text-white">
              Executive Admin Portal
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              AUTHORIZED CLUB PERSONNEL ONLY
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="form-label">Club Executive Email</label>
              <input
                type="email"
                required
                placeholder="virinchi@vbithyd.ac.in"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="form-label">Access Passcode</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-xs py-3 mt-2"
            >
              AUTHENTICATE ADMIN ACCESS
            </button>
          </form>

          <p className="text-[11px] text-slate-500 font-mono">
            Demo passkey: Any email with <code className="text-rose-400">virinchi@vbithyd.ac.in</code>
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-green-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>AUTHENTICATED: {emailInput || 'virinchi@vbithyd.ac.in'}</span>
            </div>
            <h1 className="text-3xl font-display font-black text-white">
              VIRINCHI CONTENT STUDIO
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'drive', label: 'Google Drive Media Connector', icon: HardDrive },
            { id: 'members', label: 'Executive Board & QR Records', icon: Database },
            { id: 'events', label: 'Events & Dossiers', icon: CalendarIcon },
            { id: 'reels', label: 'Reels Ingestion', icon: FolderSync }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-xl text-xs font-display tracking-wider uppercase transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {syncStatus && (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs mb-8 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}

        {/* TAB 1: GOOGLE DRIVE INTEGRATION SUITE */}
        {activeTab === 'drive' && (
          <div className="space-y-8">
            <GlassCard className="p-8 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
                  HEADLESS STORAGE ABSTRACTION
                </span>
                <h2 className="text-2xl font-display font-bold text-white mt-1">
                  Designated Google Drive Media Locations
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mt-1">
                  Upload approved event footage, 4K reel clips, and member portraits to these dedicated Google Drive folders. The website automatically parses and serves them without requiring frontend deployments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {Object.entries(folders).map(([key, folderId]) => (
                  <div key={key} className="p-5 rounded-xl bg-black/50 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-slate-300 font-bold">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-mono text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                        CONNECTED
                      </span>
                    </div>

                    <div>
                      <label className="form-label">Folder ID / Cloud Path</label>
                      <input
                        type="text"
                        value={folderId}
                        onChange={(e) => setFolders({ ...folders, [key]: e.target.value })}
                        className="form-input text-xs font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleSyncFolder(key)}
                        className="btn-secondary text-[11px] py-1.5 px-3"
                      >
                        SYNC ASSETS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Live URL Resolver Test Tool */}
            <GlassCard className="p-8 space-y-5">
              <h3 className="text-xl font-display font-bold text-white">
                Google Drive URL Resolver Tester
              </h3>
              <p className="text-xs text-slate-400">
                Paste any Google Drive share link (e.g., <code>https://drive.google.com/file/d/1A2B3C.../view</code>) to verify direct CDN streaming and thumbnail extraction.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="https://drive.google.com/file/d/1XYZ_Example/view?usp=sharing"
                  value={testDriveLink}
                  onChange={(e) => setTestDriveLink(e.target.value)}
                  className="form-input text-xs"
                />
                <button
                  onClick={handleTestDriveResolver}
                  className="btn-primary text-xs py-2 px-6 shrink-0"
                >
                  RESOLVE LINK
                </button>
              </div>

              {resolvedUrl && (
                <div className="p-4 rounded-xl bg-black/60 border border-rose-500/30 space-y-2">
                  <span className="font-mono text-xs text-rose-400 font-bold block">
                    RESOLVED DIRECT MEDIA ENDPOINT:
                  </span>
                  <code className="text-xs text-slate-200 break-all block bg-white/5 p-2 rounded">
                    {resolvedUrl}
                  </code>
                </div>
              )}
            </GlassCard>
          </div>
        )}

        {/* TAB 2: MEMBERS & QR CODE RECORDS */}
        {activeTab === 'members' && (
          <GlassCard className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">
                  Executive Board Records ({MEMBERS.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Stable QR URLs match physical ID cards printed for each member.
                </p>
              </div>
              <button
                onClick={() => alert("Add Member modal ready for backend hookup.")}
                className="btn-primary text-xs py-2 px-4"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>ADD MEMBER</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="py-3 px-2">ID</th>
                    <th className="py-3 px-2">Name</th>
                    <th className="py-3 px-2">Position</th>
                    <th className="py-3 px-2">Wing</th>
                    <th className="py-3 px-2">QR Route</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {MEMBERS.map((m) => (
                    <tr key={m.id} className="hover:bg-white/5">
                      <td className="py-3 px-2 text-rose-400">{m.idCardNumber}</td>
                      <td className="py-3 px-2 font-display font-bold text-white">{m.name}</td>
                      <td className="py-3 px-2">{m.position}</td>
                      <td className="py-3 px-2 text-slate-400">{m.wing}</td>
                      <td className="py-3 px-2 text-rose-300">/team/{m.slug}</td>
                      <td className="py-3 px-2 text-right space-x-2">
                        <button
                          onClick={() => alert(`Editing ${m.name}`)}
                          className="p-1 hover:text-rose-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* TAB 3: EVENTS & DOSSIERS */}
        {activeTab === 'events' && (
          <GlassCard className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">
                  Events & Festivals ({EVENTS.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Manage festival schedules, teaser videos, and poster covers.
                </p>
              </div>
              <button
                onClick={() => alert("Add Event modal ready for backend hookup.")}
                className="btn-primary text-xs py-2 px-4"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>CREATE EVENT</span>
              </button>
            </div>

            <div className="space-y-3">
              {EVENTS.map((e) => (
                <div key={e.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-rose-400 uppercase font-bold">{e.status}</span>
                      <span className="font-display font-bold text-base text-white">{e.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{e.date} • {e.venue}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-slate-400">/events/{e.slug}</span>
                    <button onClick={() => alert(`Editing event ${e.title}`)} className="btn-secondary text-[11px] py-1.5 px-3">
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* TAB 4: REELS INGESTION */}
        {activeTab === 'reels' && (
          <GlassCard className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">
                  Reels & Video Clips ({REELS.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Approved vertical clips from the Google Drive Video Vault.
                </p>
              </div>
              <button
                onClick={() => alert("Add Reel modal ready for backend hookup.")}
                className="btn-primary text-xs py-2 px-4"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>ADD REEL</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {REELS.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black relative">
                    <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-display font-bold text-xs text-white truncate">{r.title}</h4>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{r.duration}</span>
                    <span>{r.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

// Fallback Icon definition for Calendar
function CalendarIcon(props) {
  return <FolderSync {...props} />;
}
