import React, { useState } from 'react';
import { Users, Search, UserCheck, Shield, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function MembersPage() {
  const { showAlert } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const members = [
    { name: 'Miles Morales', role: 'Full Stack Netrunner', universe: 'Earth-1610', badge: '⚡', status: 'LOOKING FOR TEAM' },
    { name: 'Gwen Stacy', role: 'AI / LLM Architect', universe: 'Earth-65', badge: '🌸', status: 'TEAM FULL' },
    { name: 'Peter Parker', role: 'Cybersecurity Spec', universe: 'Earth-616', badge: '🔴', status: 'LOOKING FOR TEAM' },
    { name: 'Miguel O\'Hara', role: 'Game Dev / Graphics', universe: 'Earth-928', badge: '🏙️', status: 'MENTOR' },
  ];

  const filtered = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          👥 HACKER DIRECTORY & MATCHMAKING
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          FIND TEAMMATES & CONNECT ACROSS 8 UNIVERSES
        </p>
      </div>

      <div className="relative w-full max-w-xl mx-auto">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="SEARCH HACKERS BY CODENAME OR ROLE..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full">
        {filtered.map((m, idx) => (
          <div key={idx} className="comic-panel p-4 sm:p-5 space-y-3 bg-slate-950 border-3 border-yellow-400 flex items-start justify-between w-full">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{m.badge}</span>
                <h3 className="text-sm sm:text-base font-black bungee-font text-white">{m.name}</h3>
              </div>
              <p className="text-xs font-mono text-cyan-300">{m.role}</p>
              <p className="text-[10px] font-mono text-slate-400">{m.universe}</p>
            </div>

            <button
              onClick={() => {
                soundFX.buttonClick();
                showAlert(`CONNECT WITH ${m.name}`, `Sent team invite to ${m.name}! Check your Spidey Tracker inbox.`, 'success');
              }}
              className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-[10px] sm:text-xs bungee-font rounded-lg border-2 border-black shrink-0"
            >
              INVITE 📩
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
