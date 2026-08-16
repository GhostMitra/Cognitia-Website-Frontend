import React from 'react';
import { Ticket, CheckCircle, Shield, QrCode } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function PaymentPage() {
  const { theme, THEMES, showAlert } = useTheme();
  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🎟️ 100% FREE SPIDER-PASS ACCESS
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          FREE ENTRY FOR ALL MULTIVERSE HACKERS
        </p>
      </div>

      <div className="comic-panel-yellow p-4 sm:p-6 space-y-4 max-w-xl mx-auto w-full text-center">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <span className="text-xs font-black bungee-font text-slate-950">SPIDER-PASS TICKET RECEIPT</span>
          <span className="px-2.5 py-0.5 bg-emerald-400 text-slate-950 text-[10px] font-mono font-bold rounded">
            FREE $0.00
          </span>
        </div>

        <div className="bg-slate-950 border-3 border-black p-4 rounded-xl text-left space-y-3 text-white font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 bungee-font text-sm">SPIDER-VERSE PASS</span>
            <span className="text-[10px] text-cyan-400">{currentThemeObj.badge} {currentThemeObj.name}</span>
          </div>

          <p className="text-[11px] text-slate-300">
            Access Granted: Full entry to all 48-hour hackathon workshops, mentorship sessions, discord channels, and $50,000 bounty pools!
          </p>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <QrCode className="w-12 h-12 text-yellow-400" />
            <div className="text-right text-[9px] text-slate-400">
              <div>TICKET ID: #SPIDEY-FREE-2026</div>
              <div>FEE: $0.00 (100% FREE)</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.victoryChime();
            showAlert('TICKET DOWNLOADED', 'Your free Spider-Pass has been saved to your device!', 'success');
          }}
          className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm bungee-font rounded-xl border-3 border-black comic-border shadow-xl"
        >
          📥 DOWNLOAD FREE SPIDER-PASS RECEIPT
        </button>
      </div>

    </div>
  );
}
