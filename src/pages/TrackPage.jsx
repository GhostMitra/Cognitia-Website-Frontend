import React, { useState } from 'react';
import { Target, Zap, Shield, Cpu, Code, Award, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function TrackPage() {
  const { setActivePage, showAlert } = useTheme();

  const tracks = [
    {
      id: 'cyberpunk-ai',
      badge: '🌆',
      title: 'CYBERPUNK AI & LLM AGENTS',
      prize: '$15,000 BOUNTY',
      desc: 'Build autonomous AI agents, neural decoders, or LLM-driven cyberpunk tools that bend the rules of code.',
      tags: ['GENAI', 'AUTONOMOUS AGENTS', 'PYTHON', 'STARK-LLM'],
      color: 'border-yellow-400 text-yellow-300'
    },
    {
      id: 'warzone-security',
      badge: '🪖',
      title: 'WARZONE CYBERSECURITY & ZERO-TRUST',
      prize: '$12,000 BOUNTY',
      desc: 'Fortify digital fortresses. Build threat detectors, encryption ciphers, and zero-trust security tools.',
      tags: ['SECURITY', 'CIPHERS', 'RUST', 'ZERO-TRUST'],
      color: 'border-amber-500 text-amber-400'
    },
    {
      id: 'vice-web3',
      badge: '🌴',
      title: 'VICE CITY WEB3 & DECENTRALIZED FINANCE',
      prize: '$12,000 BOUNTY',
      desc: 'Architect high-speed decentralized apps, smart contracts, or digital asset vaults under Miami palm trees.',
      tags: ['BLOCKCHAIN', 'SOLANA', 'SMART CONTRACTS', 'WEB3'],
      color: 'border-pink-500 text-pink-400'
    },
    {
      id: 'multiverse-open',
      badge: '⚡',
      title: 'MULTIVERSE OPEN INNOVATION & GAME DEV',
      prize: '$11,000 BOUNTY',
      desc: 'No limits. Build web games, bio-electric interfaces, or any wild software that pushes human creativity.',
      tags: ['OPEN TRACK', 'THREE.JS', 'CANVAS', 'GAME DEV'],
      color: 'border-cyan-400 text-cyan-300'
    }
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🎯 HACKATHON TRACKS & BOUNTIES
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          $50,000+ TOTAL PRIZE POOL // 4 EPIC BOUNTY TRACKS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 w-full">
        {tracks.map(t => (
          <div key={t.id} className={`comic-panel p-4 sm:p-6 space-y-3 bg-slate-950 border-3 ${t.color} flex flex-col justify-between`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl">{t.badge}</span>
                <span className="px-2.5 py-1 bg-black border border-yellow-400 text-yellow-300 bungee-font text-[10px] sm:text-xs rounded">
                  {t.prize}
                </span>
              </div>

              <h3 className="text-sm sm:text-xl font-black bungee-font text-white pt-1">
                {t.title}
              </h3>

              <p className="text-slate-300 text-xs mono-font leading-relaxed">
                {t.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex flex-wrap gap-1">
                {t.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-900 text-cyan-300 text-[9px] font-mono rounded border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  soundFX.buttonClick();
                  showAlert(`SELECT ${t.title}`, `You selected the ${t.title}! Register your team to compete for this bounty!`, 'info');
                  setActivePage('registration');
                }}
                className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs bungee-font rounded-xl border-2 border-black flex items-center justify-center space-x-1.5 shadow"
              >
                <span>CHOOSE THIS TRACK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
