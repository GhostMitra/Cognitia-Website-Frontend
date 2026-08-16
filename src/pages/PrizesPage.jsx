import React from 'react';
import { Trophy, Award, Gift, Sparkles, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function PrizesPage() {
  const { setActivePage } = useTheme();

  const podium = [
    { rank: '1ST PLACE', title: 'GRAND MULTIVERSE CHAMPION', prize: '$20,000 CASH', desc: 'Custom Trophy + Stark Labs Incubator Access + All-Expenses Paid Trip to NYC', color: 'border-yellow-400 text-yellow-300 bg-yellow-400/10' },
    { rank: '2ND PLACE', title: 'RUNNER UP CHAMPION', prize: '$12,000 CASH', desc: 'High-End Developer Workstations + Cloud Compute Credits + Mentorship', color: 'border-cyan-400 text-cyan-300 bg-cyan-400/10' },
    { rank: '3RD PLACE', title: 'BRONZE MULTIVERSE WINNER', prize: '$8,000 CASH', desc: 'VR Headsets + $2,000 API Credits + Swag Pack', color: 'border-amber-600 text-amber-400 bg-amber-600/10' }
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🏆 PRIZE POOLS & TROPHIES
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          $50,000+ CASH + CLOUD CREDITS + HARDWARE SWAG
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 w-full">
        {podium.map((p, idx) => (
          <div key={idx} className={`comic-panel p-4 sm:p-6 space-y-3 bg-slate-950 border-3 ${p.color} flex flex-col justify-between text-center`}>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-black flex items-center justify-center mx-auto text-2xl bio-glow">
                🏆
              </div>

              <span className="px-3 py-1 bg-black border border-yellow-400 text-yellow-300 bungee-font text-[10px] sm:text-xs rounded inline-block">
                {p.rank}
              </span>

              <h3 className="text-sm sm:text-lg font-black bungee-font text-white pt-1">
                {p.title}
              </h3>

              <div className="text-xl sm:text-2xl font-black bungee-font text-yellow-300">
                {p.prize}
              </div>

              <p className="text-slate-300 text-xs mono-font leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-2 w-full">
        <button
          onClick={() => {
            soundFX.buttonClick();
            setActivePage('registration');
          }}
          className="w-full sm:w-auto px-8 py-3.5 theme-bg-primary text-white font-black text-xs sm:text-base bungee-font rounded-xl comic-panel shadow-xl bio-glow"
        >
          🎟️ CLAIM YOUR SPIDER-PASS NOW
        </button>
      </div>

    </div>
  );
}
