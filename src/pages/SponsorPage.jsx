import React from 'react';
import { Building2, Globe, Shield, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function SponsorPage() {
  const sponsors = [
    { name: 'STARK INDUSTRIES', tier: 'TITLE SPONSOR', logo: '⚡', desc: 'Providing arc-reactor compute clusters & bio-electric AI hardware.' },
    { name: 'OSCORP CORP', tier: 'GOLD SPONSOR', logo: '🧪', desc: 'Powering web-shooter materials & zero-trust security bounties.' },
    { name: 'DAILY BUGLE MEDIA', tier: 'MEDIA PARTNER', logo: '📰', desc: 'Live broadcasting hackathon coverage across 8 Multiverse channels.' },
    { name: 'WEB3 VENTURES', tier: 'VENTURE PARTNER', logo: '🌐', desc: 'Offering $100,000 follow-on seed funding for top 3 winners.' }
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🤝 SPONSORS & PARTNERS
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          POWERED BY INDUSTRY LEADERS ACROSS THE MULTIVERSE
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full">
        {sponsors.map((s, idx) => (
          <div key={idx} className="comic-panel p-4 sm:p-6 space-y-3 bg-slate-950 border-3 border-yellow-400 flex items-start space-x-3 w-full">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-black flex items-center justify-center text-2xl shrink-0">
              {s.logo}
            </div>

            <div className="space-y-1">
              <span className="px-2 py-0.5 bg-black border border-cyan-400 text-cyan-300 bungee-font text-[9px] rounded">
                {s.tier}
              </span>
              <h3 className="text-sm sm:text-lg font-black bungee-font text-white">
                {s.name}
              </h3>
              <p className="text-slate-300 text-xs mono-font leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
