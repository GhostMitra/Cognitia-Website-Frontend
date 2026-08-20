import React, { useState, useEffect } from 'react';
import { BootLog } from './BootLog';
import { Cpu, Monitor, Sparkles, RefreshCw, Volume2, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

export type RetroThemeId = 'cognitia-gold' | 'matrix-terminal' | 'synthwave-pink' | 'gameboy-lcd';

export interface ThemeConfig {
  id: RetroThemeId;
  name: string;
  badge: string;
  bgClass: string;
  containerBorder: string;
  textColor: string;
  accentColor: string;
  progressFill: string;
  logoGlow: string;
  tagline: string;
}

export const THEMES: Record<RetroThemeId, ThemeConfig> = {
  'cognitia-gold': {
    id: 'cognitia-gold',
    name: 'Cognitia Gold & Cyan',
    badge: 'CLASSIC ARCADE',
    bgClass: 'bg-[#1a1440]',
    containerBorder: 'border-[#f4c151]',
    textColor: 'text-[#f4c151]',
    accentColor: 'text-[#00f0ff]',
    progressFill: 'bg-gradient-to-r from-[#f4c151] to-[#00f0ff]',
    logoGlow: 'shadow-[0_0_20px_rgba(244,193,81,0.6)]',
    tagline: 'RETRO 8-BIT COGNITIA ENGINE',
  },
  'matrix-terminal': {
    id: 'matrix-terminal',
    name: 'Matrix Emerald',
    badge: 'HACKER TERMINAL',
    bgClass: 'bg-[#080d08]',
    containerBorder: 'border-[#00ff66]',
    textColor: 'text-[#00ff66]',
    accentColor: 'text-[#33ff99]',
    progressFill: 'bg-[#00ff66]',
    logoGlow: 'shadow-[0_0_20px_rgba(0,255,102,0.6)]',
    tagline: 'NEURAL MAINFRAME BUS // V2.026',
  },
  'synthwave-pink': {
    id: 'synthwave-pink',
    name: 'Synthwave Sunset',
    badge: 'CYBERPUNK NEON',
    bgClass: 'bg-[#180521]',
    containerBorder: 'border-[#ff007f]',
    textColor: 'text-[#ff007f]',
    accentColor: 'text-[#ff9900]',
    progressFill: 'bg-gradient-to-r from-[#ff007f] via-[#b5179e] to-[#ff9900]',
    logoGlow: 'shadow-[0_0_20px_rgba(255,0,127,0.7)]',
    tagline: 'NEON WAVE RETRO SYNTH',
  },
  'gameboy-lcd': {
    id: 'gameboy-lcd',
    name: 'GameBoy Monochrome',
    badge: '8-BIT HANDHELD',
    bgClass: 'bg-[#8b956d]',
    containerBorder: 'border-[#0f380f]',
    textColor: 'text-[#0f380f]',
    accentColor: 'text-[#306230]',
    progressFill: 'bg-[#0f380f]',
    logoGlow: 'shadow-[0_0_12px_rgba(15,56,15,0.4)]',
    tagline: 'CLASSIC GREEN SCREEN LCD',
  },
};

export interface ThemeLoadingScreenProps {
  onBootComplete?: () => void;
  currentTheme?: RetroThemeId;
  onThemeChange?: (themeId: RetroThemeId) => void;
  isFastSwitch?: boolean;
  targetCartridgeName?: string;
}

export const ThemeLoadingScreen: React.FC<ThemeLoadingScreenProps> = ({
  onBootComplete,
  currentTheme = 'cognitia-gold',
  onThemeChange,
  isFastSwitch = false,
  targetCartridgeName,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<RetroThemeId>(currentTheme);
  const [progress, setProgress] = useState<number>(0);
  const [bootPhase, setBootPhase] = useState<string>('INIT');

  const activeTheme = THEMES[selectedTheme] || THEMES['cognitia-gold'];

  useEffect(() => {
    // Play boot/click sound effect when loader starts
    try {
      if (isFastSwitch) {
        sound.playClick();
      } else {
        sound.playBoot();
      }
    } catch (e) {
      /* ignore audio autoplay restriction */
    }

    const intervalTime = isFastSwitch ? 40 : 160;

    // Smooth retro progress ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setBootPhase('COMPLETE');
          if (onBootComplete) {
            setTimeout(onBootComplete, isFastSwitch ? 50 : 400);
          }
          return 100;
        }

        const step = isFastSwitch ? 25 : Math.floor(Math.random() * 12) + 5;
        const next = prev + step;
        if (next > 30 && prev <= 30) setBootPhase('BUS_CHECK');
        if (next > 65 && prev <= 65) setBootPhase('ASSETS_LOAD');
        if (next > 88 && prev <= 88) setBootPhase('READY');
        return Math.min(next, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleSelectTheme = (themeId: RetroThemeId) => {
    setSelectedTheme(themeId);
    if (onThemeChange) {
      onThemeChange(themeId);
    }
    try {
      sound.playBlip();
    } catch (e) {}
  };

  // Convert progress into pixel block segments [██████▒▒▒▒]
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const progressBlocks = '█'.repeat(filledBlocks) + '▒'.repeat(totalBlocks - filledBlocks);

  return (
    <div
      className={`w-full h-full min-h-[420px] flex flex-col justify-between p-4 sm:p-6 select-none relative overflow-hidden transition-colors duration-500 ${activeTheme.bgClass} ${activeTheme.textColor}`}
      id="theme-loading-screen"
    >
      {/* CRT Scanline & Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none scanline-overlay z-10 opacity-30" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between border-b-2 border-current pb-2 mb-2 font-['Silkscreen'] text-xs">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 animate-pulse" />
          <span className="tracking-widest uppercase">COGNITIA 2K26 // {activeTheme.badge}</span>
        </div>

        {/* Theme Selector Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(Object.keys(THEMES) as RetroThemeId[]).map((tKey) => {
            const th = THEMES[tKey];
            const isActive = tKey === selectedTheme;
            return (
              <button
                key={tKey}
                onClick={() => handleSelectTheme(tKey)}
                className={`px-2 py-0.5 text-[9px] font-['Silkscreen'] border transition-all ${
                  isActive
                    ? `${th.containerBorder} bg-black/60 font-bold scale-105 shadow-[2px_2px_0px_#000]`
                    : 'border-current/40 opacity-70 hover:opacity-100 hover:border-current'
                }`}
                title={`Switch to ${th.name}`}
              >
                {th.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Console Boot Centerpiece */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-2 sm:my-4 space-y-3 sm:space-y-5 text-center">
        {/* Retro Hardware CPU Icon with Theme Glow (No Logo Image) */}
        <div className={`relative p-3.5 bg-black/40 border-2 ${activeTheme.containerBorder} ${activeTheme.logoGlow} rounded-none transform transition-transform hover:scale-105`}>
          <Cpu className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto opacity-90 animate-pulse text-current" />
        </div>

        {/* Title & Tagline */}
        <div>
          <h2 className="font-['Press_Start_2P'] text-sm sm:text-lg md:text-2xl tracking-wider text-current drop-shadow-[2px_2px_0px_#000000]">
            COGNITIA 2K26
          </h2>
          <p className={`font-['Silkscreen'] text-[10px] sm:text-xs md:text-sm mt-1.5 ${activeTheme.accentColor} tracking-widest`}>
            {isFastSwitch && targetCartridgeName ? `MOUNTING ${targetCartridgeName}` : activeTheme.tagline}
          </p>
        </div>

        {/* 8-bit Segmented Progress Bar */}
        <div className="w-full max-w-md space-y-1.5">
          <div className="flex justify-between font-['VT323'] text-base tracking-widest px-1">
            <span>STATUS: {bootPhase}</span>
            <span className="font-mono">{progress}%</span>
          </div>

          <div className={`w-full bg-black/70 p-1.5 border-2 ${activeTheme.containerBorder} shadow-[4px_4px_0px_#000000]`}>
            <div className="font-mono text-xs sm:text-sm tracking-widest overflow-hidden whitespace-nowrap text-left text-current">
              {progressBlocks}
            </div>
          </div>
        </div>

        {/* Animated Diagnostic BootLog */}
        <div className="w-full max-w-lg bg-black/60 border border-current/40 p-3 text-left shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
          <BootLog maxLines={4} />
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-20 flex items-center justify-between font-['VT323'] text-xs border-t border-current/30 pt-2 opacity-80">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-current animate-spin" />
          <span>HARDWARE: PIXEL CONSOLE HUD V2.6</span>
        </div>
        <div>PRESS TAB FOR CARTRIDGE DECK MENU</div>
      </div>
    </div>
  );
};
