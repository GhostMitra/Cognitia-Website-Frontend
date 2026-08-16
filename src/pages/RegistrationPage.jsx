import React, { useState } from 'react';
import { User, Mail, Shield, Code, Cpu, QrCode, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';
import confetti from 'canvas-confetti';

export function RegistrationPage() {
  const { setActivePage, theme, THEMES, showAlert } = useTheme();
  const [formData, setFormData] = useState({
    name: 'Peter Parker',
    email: 'spidey@starklabs.org',
    role: 'Full Stack Netrunner',
    universe: 'Earth-616',
    superpower: 'Bio-Electric Web-Slinging'
  });
  const [submitted, setSubmitted] = useState(false);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.victoryChime();
    setSubmitted(true);
    try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } }); } catch (err) {}
    showAlert('SPIDER-PASS GENERATED', 'Your official Multiverse Hacker Pass has been issued!', 'success');
  };

  return (
    <div className="w-full max-w-full space-y-6 py-1 sm:py-2 select-none">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🎟️ MULTIVERSE SPIDER-PASS REGISTRATION
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          FREE REGISTRATION // CLAIM YOUR VERIFIED DIGITAL SPIDER-VERSE ACCESS PASS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
        
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="comic-panel p-4 sm:p-6 space-y-4 bg-slate-950 border-3 border-yellow-400 w-full">
          <div className="border-b-2 border-slate-800 pb-2">
            <h3 className="text-lg font-black bungee-font text-yellow-300">
              STEP 1: HACKER IDENTITY
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-200">
            <div>
              <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">CODENAME / FULL NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">MULTIVERSE EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">SPECIALIZATION ROLE</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
              >
                <option>Full Stack Netrunner</option>
                <option>AI / LLM Bio-Architect</option>
                <option>Cyberpunk Web3 Specialist</option>
                <option>Game Dev & Graphics Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">PRIMARY SUPERPOWER</label>
              <input
                type="text"
                value={formData.superpower}
                onChange={(e) => setFormData({ ...formData, superpower: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 sm:py-4 theme-bg-primary hover:brightness-110 text-white font-black text-xs sm:text-base bungee-font rounded-xl sm:rounded-2xl comic-panel transition flex items-center justify-center space-x-2 bio-glow shadow-xl"
          >
            <span>🎟️ GENERATE VERIFIED SPIDER-PASS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Live Digital Spider-Pass Preview */}
        <div className="comic-panel-yellow p-4 sm:p-6 space-y-4 text-center w-full">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="text-[10px] font-black bungee-font text-slate-950">LIVE DIGITAL ACCESS PASS</span>
            <span className="px-2 py-0.5 bg-black text-yellow-300 text-[9px] font-mono rounded">VERIFIED</span>
          </div>

          <div className="bg-slate-950 border-3 border-black p-4 rounded-xl text-left space-y-3 text-white font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 bungee-font text-sm">{formData.name}</span>
              <span className="text-[10px] text-cyan-400">{currentThemeObj.badge} {currentThemeObj.name}</span>
            </div>

            <div className="text-[11px] text-slate-300">
              <div>EMAIL: <strong className="text-white">{formData.email}</strong></div>
              <div>ROLE: <strong className="text-cyan-300">{formData.role}</strong></div>
              <div>POWER: <strong className="text-yellow-300">{formData.superpower}</strong></div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <QrCode className="w-12 h-12 text-yellow-400" />
              <div className="text-right text-[9px] text-slate-400">
                <div>PASS ID: #SPIDEY-2026</div>
                <div>STATUS: ACTIVE</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActivePage('payment')}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm bungee-font rounded-xl border-3 border-black comic-border"
          >
            CLAIM FREE BADGE RECEIPT 🚀
          </button>
        </div>

      </div>

    </div>
  );
}
