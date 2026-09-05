// VIRINCHI FOOTER COMPONENT
// Editorial layout preserving strict brand identity

import React from 'react';
import { Link } from 'react-router-dom';
import VirinchiLogo from '../ui/VirinchiLogo';
import { CLUB_INFO } from '../../data/clubInfo';
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Mail, MapPin, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#040407] border-t border-rose-500/20 pt-16 pb-12 overflow-hidden z-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-rose-600/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand identity */}
          <div className="lg:col-span-2 flex flex-col space-y-5">
            <Link to="/" className="inline-block">
              <VirinchiLogo variant="full" size="md" />
            </Link>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              The premier cultural society of Vignana Bharathi Institute of Technology. Fostering artistic expression, musical synergy, dramatic brilliance, and student leadership since 2007.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={CLUB_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Virinchi Instagram"
                className="p-2.5 rounded-full bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={CLUB_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Virinchi YouTube"
                className="p-2.5 rounded-full bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 transition-all"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={CLUB_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Virinchi LinkedIn"
                className="p-2.5 rounded-full bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CLUB_INFO.email}`}
                aria-label="Virinchi Email"
                className="p-2.5 rounded-full bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="flex flex-col space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-rose-400 font-bold">
              EXPLORE
            </span>
            <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About Virinchi</Link>
            <Link to="/team" className="text-slate-400 hover:text-white text-sm transition-colors">Executive Board</Link>
            <Link to="/events" className="text-slate-400 hover:text-white text-sm transition-colors">Events & Fests</Link>
            <Link to="/reels" className="text-slate-400 hover:text-white text-sm transition-colors">Reels & Media Wall</Link>
            <Link to="/gallery" className="text-slate-400 hover:text-white text-sm transition-colors">Photo Gallery</Link>
          </div>

          {/* Col 4: Archive & Pride */}
          <div className="flex flex-col space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-rose-400 font-bold">
              HERITAGE
            </span>
            <Link to="/legacy" className="text-slate-400 hover:text-white text-sm transition-colors">Legacy & Timeline</Link>
            <Link to="/achievements" className="text-slate-400 hover:text-white text-sm transition-colors">Trophy Room</Link>
            <Link to="/join" className="text-slate-400 hover:text-white text-sm transition-colors">Join Virinchi</Link>
            <Link to="/admin" className="text-slate-500 hover:text-rose-400 text-xs font-mono transition-colors pt-2">Admin Portal</Link>
          </div>

          {/* Col 5: Location & Affiliation */}
          <div className="flex flex-col space-y-3 text-xs text-slate-400">
            <span className="font-mono text-xs tracking-widest uppercase text-rose-400 font-bold">
              CAMPUS HEADQUARTERS
            </span>
            <div className="flex items-start space-x-2 pt-1">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                Student Activity Center (SAC),<br />
                Vignana Bharathi Institute of Technology,<br />
                Aushapur, Ghatkesar, Hyderabad, Telangana 501301
              </span>
            </div>
            <div className="p-3 mt-2 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300">
              Official Cultural Society of VBIT (Est. 2007)
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} VIRINCHI — THE CULTURAL CLUB OF VBIT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-2">
            <span>BUILT WITH PASSION FOR ARTS & CULTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
