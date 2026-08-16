import React from 'react';
import { Volume2, VolumeX, Tv, Sliders, Shield, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function SettingsPage() {
  const { theme, setTheme, THEMES, audioMuted, toggleMute, crtEnabled, toggleCrt, volume, setVolume } = useTheme();

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          ⚙️ HARDWARE & AUDIO CONTROLS
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          SYSTEM PREFERENCES & SOUNDBOARD SYNTHESIZER
        </p>
      </div>

      <div className="comic-panel p-4 sm:p-6 space-y-4 bg-slate-950 border-3 border-yellow-400 max-w-xl mx-auto w-full">
        {/* Sound FX Toggle */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs sm:text-sm font-black bungee-font text-white">WEB AUDIO SYNTHESIZER</h3>
            <p className="text-[10px] text-slate-400 mono-font">Retro web-shooter sound effects & victory chimes</p>
          </div>

          <button
            onClick={toggleMute}
            className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs bungee-font flex items-center space-x-1.5 ${
              !audioMuted ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {!audioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{!audioMuted ? 'ON' : 'MUTED'}</span>
          </button>
        </div>

        {/* CRT Scanline Toggle */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs sm:text-sm font-black bungee-font text-white">CRT SCANLINES OVERLAY</h3>
            <p className="text-[10px] text-slate-400 mono-font">Retro comic display monitor scanlines</p>
          </div>

          <button
            onClick={toggleCrt}
            className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs bungee-font flex items-center space-x-1.5 ${
              crtEnabled ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>{crtEnabled ? 'ACTIVE' : 'OFF'}</span>
          </button>
        </div>

        {/* Sound FX Test Buttons */}
        <div className="pt-2 space-y-2">
          <h3 className="text-xs font-black bungee-font text-yellow-300">TEST AUDIO SOUNDBOARD:</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => soundFX.thwip()}
              className="py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs rounded-lg border border-slate-700"
            >
              🕸️ THWIP WEB
            </button>
            <button
              onClick={() => soundFX.spiderSense()}
              className="py-2 bg-slate-900 hover:bg-slate-800 text-yellow-300 font-mono text-xs rounded-lg border border-slate-700"
            >
              ⚡ SPIDER-SENSE
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
