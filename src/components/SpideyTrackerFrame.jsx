import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Tv, Menu, Film, Ticket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { RadarMenu } from './RadarMenu';
import { TrailerModal } from './TrailerModal';
import { SpideyAlert } from './SpideyAlert';
import { SpideyLoadingScreen } from './SpideyLoadingScreen';
import { WebCanvas } from './WebCanvas';
import { soundFX } from '../audio/soundFX';

export function SpideyTrackerFrame({ children }) {
  const {
    theme,
    THEMES,
    audioMuted,
    toggleMute,
    crtEnabled,
    toggleCrt,
    activePage,
    isPageLoading,
    radarOpen,
    setRadarOpen,
    setTrailerModalOpen,
    setActivePage
  } = useTheme();

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  // Real-time ticker countdown to hackathon kick-off
  const [tickerTime, setTickerTime] = useState({ days: 12, hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    /* Outer Viewport Wrapper - Uses 100dvh (Dynamic Viewport Height) so mobile browser address & nav bars never cut off the bottom! */
    <div className="fixed inset-0 h-[100dvh] w-screen max-w-full theme-bg-app p-1 sm:p-3 flex flex-col items-center justify-between overflow-x-hidden overflow-y-hidden select-none transition-colors duration-300">

      {/* MAIN SPIDEY TRACKER HARDWARE DEVICE FRAME */}
      <div className="relative w-full h-full max-w-full max-h-full theme-bg-frame border-3 sm:border-8 border-black rounded-2xl sm:rounded-3xl pt-2 sm:pt-7 pb-2 sm:pb-5 px-1.5 sm:px-5 shadow-2xl comic-border-lg flex flex-col min-h-0 overflow-x-hidden transition-colors duration-300">

        {/* 1. TOP CENTER HARDWARE SPIDEY TRACKER LOGO BADGE */}
        <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 bg-slate-950 border-2 sm:border-3 border-black px-3 sm:px-6 py-0.5 sm:py-1 rounded-full shadow-2xl mx-auto shrink-0 mb-0.5">
          <span className="text-[9px] sm:text-xs font-black pixel-font text-cyan-400 tracking-wider">SPIDEY</span>
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-red-600 border border-black flex items-center justify-center text-[9px] sm:text-xs animate-pulse">
            🕷️
          </div>
          <span className="text-[9px] sm:text-xs font-black pixel-font text-cyan-400 tracking-wider">TRACKER</span>
        </div>

        {/* 2. TOP BEZEL HEADER BAR */}
        <div className="flex items-center justify-between pb-1 sm:pb-2 px-1.5 sm:px-3 border-b-2 sm:border-b-4 border-black/40 mb-1 sm:mb-2 shrink-0 w-full overflow-x-hidden">
          {/* Status LEDs */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-[8px] sm:text-[10px] pixel-font text-slate-200 truncate pr-1">
            <span className="flex items-center gap-1.5 text-emerald-300 shrink-0 pl-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>ONLINE</span>
            </span>
            <span className="flex items-center gap-1 text-yellow-300 truncate">
              <span>{currentThemeObj.badge}</span> <span className="truncate">{currentThemeObj.name}</span>
            </span>
          </div>

          {/* In-Screen Spidey Radar Trigger Button */}
          <button
            onClick={() => {
              soundFX.buttonClick();
              setRadarOpen(!radarOpen);
            }}
            className="px-2 sm:px-4 py-0.5 sm:py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-lg sm:rounded-xl border-2 sm:border-3 border-black text-[8px] sm:text-xs bungee-font flex items-center space-x-1 sm:space-x-2 comic-skew shadow transition-transform transform active:scale-95 shrink-0"
          >
            <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{radarOpen ? 'CLOSE' : 'SPIDEY RADAR'}</span>
          </button>
        </div>

        {/* 3. INNER DISPLAY SCREEN */}
        <div className={`relative flex-1 min-h-0 theme-bg-screen rounded-xl sm:rounded-2xl border-3 sm:border-4 border-black overflow-x-hidden overflow-y-hidden shadow-inner flex flex-row ${
          crtEnabled ? 'crt-lines' : ''
        }`}>
          {/* Web Canvas Layer */}
          <WebCanvas />

          {/* Page Loading Overlay */}
          {isPageLoading && <SpideyLoadingScreen mode="overlay" />}

          {/* Integrated Embedded Alert Pop-Up */}
          <SpideyAlert />

          {/* Integrated Left Navigation Sidebar */}
          <RadarMenu />

          {/* Main Viewport Content */}
          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-2 sm:p-6 md:p-8 flex flex-col w-full max-w-full scroll-smooth inner-screen-content">
            {children}
          </div>
        </div>

        {/* 4. BOTTOM CONTROL BAR & MARQUEE TICKER */}
        <div className="pt-1 mt-1 flex items-center justify-between gap-1 sm:gap-2 shrink-0 relative w-full overflow-x-hidden">
          
          {/* Bottom Left Action Banner */}
          <button
            onClick={() => {
              soundFX.buttonClick();
              setTrailerModalOpen(true);
            }}
            className="px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-[8px] sm:text-xs bungee-font border-2 sm:border-3 border-black rounded-lg shadow-xl comic-skew transition-transform transform active:scale-95 flex items-center space-x-1 shrink-0 z-40"
          >
            <Film className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
            <span className="hidden xs:inline">TRAILER</span>
          </button>

          {/* Center Marquee Bar */}
          <div className="flex-1 max-w-2xl bg-slate-950 border-2 sm:border-3 border-black px-1 sm:px-3 py-0.5 rounded-lg sm:rounded-xl flex items-center space-x-1 sm:space-x-2 overflow-hidden shadow">
            <span className="px-1 py-0.5 theme-bg-primary text-white font-black text-[7px] sm:text-[9px] bungee-font rounded comic-skew shrink-0">
              TICKER
            </span>
            <p className="animate-marquee inline-block text-[8px] sm:text-xs mono-font text-yellow-300 whitespace-nowrap">
              🚨 SPIDEY SIGHTINGS: 63 UNEXPLORED HACKER TEAMS JOINED COGNITIA 2026 // ⏱️ KICK-OFF COUNTDOWN: {tickerTime.days}d {tickerTime.hours}h {tickerTime.minutes}m {tickerTime.seconds}s // PRIZE POOL: $50,000+ // SHARE YOUR SPIDEY SIGHTINGS ON X! 🕸️
            </p>
          </div>

          {/* Audio Mute & CRT & [ GET TICKETS ] */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0 z-40">
            <button
              onClick={toggleMute}
              className={`p-1 rounded-lg border-2 border-black transition ${
                audioMuted ? 'bg-slate-800 text-slate-400' : 'bg-yellow-400 text-slate-950'
              }`}
              title="Toggle Web Audio"
            >
              {audioMuted ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />}
            </button>

            <button
              onClick={toggleCrt}
              className={`hidden sm:flex px-2 py-1 rounded-lg border-2 border-black text-xs bungee-font items-center space-x-1 ${
                crtEnabled ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
              title="Toggle CRT Scanlines"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>CRT</span>
            </button>

            <button
              onClick={() => {
                soundFX.buttonClick();
                setActivePage('registration');
              }}
              className="px-1.5 sm:px-4 py-0.5 sm:py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-[8px] sm:text-xs bungee-font border-2 sm:border-3 border-black rounded-lg shadow-xl comic-skew transition-transform transform active:scale-95 flex items-center space-x-1"
            >
              <Ticket className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span>TICKETS</span>
            </button>
          </div>

        </div>

      </div>

      {/* 5. OFFICIAL COGNITIA HACKATHON LOGO FOOTER */}
      <div className="flex flex-col items-center justify-center space-y-0.5 py-0.5 z-30 shrink-0 w-full overflow-x-hidden">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span className="text-xs sm:text-xl animate-pulse">🕸️</span>
          <h2 className="text-[10px] sm:text-2xl font-black bungee-font text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400 drop-shadow-[1px_1px_0px_#000000]">
            COGNITIA 2026
          </h2>
          <span className="text-xs sm:text-xl animate-pulse">🕸️</span>
        </div>
      </div>

      {/* Promo Trailer Video Modal */}
      <TrailerModal />
    </div>
  );
}
