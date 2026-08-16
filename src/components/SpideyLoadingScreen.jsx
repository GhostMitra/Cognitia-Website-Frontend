import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowRight, Terminal, Smartphone, Download, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function SpideyLoadingScreen({ onStart, mode = 'initial' }) {
  const { theme, setTheme, THEMES, audioMuted, toggleMute, installPwa } = useTheme();
  const [phase, setPhase] = useState(mode === 'overlay' ? 'fast' : 'loading'); // 'loading' | 'theme-selector' | 'pwa-setup'
  const [progress, setProgress] = useState(mode === 'overlay' ? 80 : 0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'INITIALIZING COGNITIA SPIDEY TRACKER OS...',
    'CONNECTING TO MULTIVERSE SATELLITE NODES...',
    'DECRYPTING HACKER ALLIANCE SIGNALS...',
    'CALIBRATING BIO-ELECTRIC VOLTAGE...',
    'MARVEL COMIC ENGINE READY!'
  ];

  useEffect(() => {
    if (mode === 'overlay') return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setPhase('theme-selector');
            soundFX.victoryChime();
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    if (mode === 'overlay') return;
    const logTimer = setInterval(() => {
      setLogIndex(prev => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(logTimer);
  }, [mode]);

  const handleNextToPwa = () => {
    soundFX.buttonClick();
    setPhase('pwa-setup');
  };

  const handleStart = () => {
    soundFX.buttonClick();
    onStart();
  };

  if (mode === 'overlay') {
    return (
      <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 animate-fade-in text-center p-6">
        <div className="w-12 h-12 rounded-full bg-red-600 border-3 border-black flex items-center justify-center text-2xl shadow-2xl animate-bounce bio-glow">
          🕷️
        </div>

        <div className="bg-slate-900 border-2 border-black px-4 py-1 rounded-full inline-flex items-center space-x-2 comic-skew mx-auto">
          <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-black pixel-font text-cyan-400">LOADING SPIDEY TRACKER NODE...</span>
        </div>

        <div className="w-48 bg-slate-900 h-2 rounded-full border border-black overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 via-yellow-400 to-cyan-400 h-full w-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-y-auto min-h-0 scroll-smooth">
      
      {/* PHASE 1: SPIDEY TRACKER APP LOADING SCREEN */}
      {phase === 'loading' && (
        <div className="w-full max-w-lg bg-slate-950 border-4 border-black rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl comic-border-lg animate-fade-in my-auto">
          <div className="bg-slate-900 border-2 border-black px-4 py-1 rounded-full inline-flex items-center space-x-2 comic-skew mx-auto">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black pixel-font text-cyan-400">BOOTING SPIDEY TRACKER OS</span>
          </div>

          <div className="flex flex-col items-center justify-center relative py-1">
            <div className="w-1 bg-white h-12 sm:h-16 shadow-glow" />
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 border-3 border-black flex items-center justify-center text-xl sm:text-2xl shadow-2xl animate-bounce -mt-1 bio-glow">
              🕷️
            </div>
          </div>

          <div className="bg-slate-900 border-2 border-slate-800 p-2.5 rounded-xl text-left font-mono text-[10px] sm:text-[11px] text-cyan-300 space-y-1">
            {logs.slice(0, logIndex + 1).map((log, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <span className="text-red-500 font-bold">&gt;&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-center space-x-1 sm:space-x-1.5">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(step => (
                <div
                  key={step}
                  className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 border-2 border-black rounded-sm transition-all duration-150 ${
                    progress >= step ? 'bg-cyan-400 bio-glow' : 'bg-slate-900'
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] sm:text-xs pixel-font text-yellow-300">
              LOADING COGNITIA APP... {progress}%
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: INITIAL UNIVERSE SETTINGS & THEME SELECTOR */}
      {phase === 'theme-selector' && (
        <div className="w-full max-w-xl bg-slate-950 border-4 border-black rounded-3xl p-4 sm:p-8 space-y-4 shadow-2xl comic-border-lg animate-fade-in my-auto overflow-y-auto max-h-[88vh]">
          <div className="space-y-1">
            <span className="px-3 py-1 bg-yellow-400 text-slate-950 font-black text-[10px] sm:text-xs bungee-font rounded comic-skew">
              STEP 2 // SELECT UNIVERSE THEME
            </span>
            <h3 className="text-lg sm:text-2xl font-black bungee-font text-white pt-1">
              CHOOSE UNIVERSE SETTINGS
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mono-font">
              SELECT MULTIVERSE THEME & AUDIO PREFERENCES
            </p>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 max-h-[45vh] overflow-y-auto p-1 pr-1 border border-slate-800 rounded-xl">
            {THEMES.map(t => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    soundFX.buttonClick();
                    setTheme(t.id);
                  }}
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black text-left flex items-center justify-between transition ${
                    isActive
                      ? 'theme-bg-primary text-white comic-skew shadow-lg bio-glow'
                      : 'bg-slate-900 text-slate-300 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="text-base sm:text-xl shrink-0">{t.badge}</span>
                    <div className="truncate">
                      <div className="text-[10px] sm:text-xs font-black bungee-font truncate">{t.name}</div>
                      <div className="text-[8px] sm:text-[10px] mono-font opacity-80 truncate">{t.sub}</div>
                    </div>
                  </div>

                  <span
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-black shrink-0"
                    style={{ backgroundColor: t.primaryColor }}
                  />
                </button>
              );
            })}
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border-2 border-slate-800">
            <span className="text-[10px] sm:text-xs bungee-font text-slate-300">WEB AUDIO SYNTHESIZER</span>
            <button
              onClick={() => {
                toggleMute();
              }}
              className={`px-3 py-1 rounded-lg sm:rounded-xl border-2 border-black text-[10px] sm:text-xs bungee-font flex items-center space-x-1.5 transition ${
                !audioMuted ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {!audioMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{!audioMuted ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>

          {/* Next Button -> Goes to PWA Install Screen */}
          <button
            onClick={handleNextToPwa}
            className="w-full py-3.5 sm:py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm sm:text-base bungee-font rounded-xl sm:rounded-2xl border-3 border-black shadow-2xl comic-skew transition-transform transform active:scale-95 flex items-center justify-center space-x-2 bio-glow"
          >
            <span>NEXT: PWA INSTALL SETUP ➔</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}

      {/* PHASE 3: DEDICATED PWA INSTALL SETUP SCREEN AFTER THEME SELECTOR */}
      {phase === 'pwa-setup' && (
        <div className="w-full max-w-lg bg-slate-950 border-4 border-yellow-400 rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl comic-border-lg animate-fade-in my-auto text-center">
          
          <div className="space-y-1">
            <span className="px-3 py-1 bg-yellow-400 text-slate-950 font-black text-[10px] sm:text-xs bungee-font rounded comic-skew">
              STEP 3 // PWA APP INSTALLATION
            </span>
            <h3 className="text-xl sm:text-2xl font-black bungee-font text-white pt-2">
              INSTALL SPIDEY TRACKER APP?
            </h3>
            <p className="text-xs text-slate-300 mono-font leading-relaxed">
              Install Cognitia Spidey Tracker as a Progressive Web App on your home screen for offline access, full-screen device mode, and instant Multiverse updates!
            </p>
          </div>

          <div className="w-16 h-16 bg-slate-900 border-3 border-cyan-400 rounded-full flex items-center justify-center mx-auto text-3xl bio-glow">
            📱
          </div>

          {/* Install CTA Button */}
          <button
            onClick={() => {
              installPwa();
            }}
            className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm bungee-font rounded-xl sm:rounded-2xl border-3 border-black shadow-xl comic-skew transition-transform transform active:scale-95 flex items-center justify-center space-x-2 bio-glow"
          >
            <Smartphone className="w-4 h-4" />
            <span>📱 INSTALL APP TO HOME SCREEN</span>
          </button>

          {/* Enter Hackathon Button */}
          <button
            onClick={handleStart}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm bungee-font rounded-xl sm:rounded-2xl border-3 border-black shadow-xl transition-transform transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>🚀 ENTER MULTIVERSE HACKATHON NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      )}

    </div>
  );
}
