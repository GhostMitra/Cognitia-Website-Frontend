import React from 'react';
import {
  Home, UserPlus, Upload, CreditCard, ScrollText, Target,
  Clock, Handshake, Users, Trophy, HelpCircle, Settings, Gamepad2, Compass, ChevronLeft
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function RadarMenu() {
  const { radarOpen, setRadarOpen, activePage, setActivePage, crtEnabled } = useTheme();

  const navItems = [
    { id: 'landing', label: 'ACTIVITY LOG (LANDING)', icon: Home, num: '01' },
    { id: 'registration', label: 'CLAIM SPIDER-PASS', icon: UserPlus, num: '02' },
    { id: 'submission', label: 'REPORT SIGHTINGS (SUBMIT)', icon: Upload, num: '03' },
    { id: 'payment', label: 'VIP OSCORP SWAG', icon: CreditCard, num: '04' },
    { id: 'rules', label: 'SPIDER CODE & RULES', icon: ScrollText, num: '05' },
    { id: 'track', label: 'WEB WATCH (TRACKS)', icon: Target, num: '06' },
    { id: 'timeline', label: 'EVENTS (TIMELINE)', icon: Clock, num: '07' },
    { id: 'sponsor', label: 'SPONSOR LABS', icon: Handshake, num: '08' },
    { id: 'members', label: 'RECRUIT MEMBERS', icon: Users, num: '09' },
    { id: 'prizes', label: 'PRIZES ($50K POOL)', icon: Trophy, num: '10' },
    { id: 'faq', label: 'HELP & FAQ', icon: HelpCircle, num: '11' },
    { id: 'minigame', label: 'UNTANGLE MINI-GAME', icon: Gamepad2, num: '12' },
    { id: 'settings', label: 'TRACKER SETTINGS', icon: Settings, num: '13' },
  ];

  if (!radarOpen) return null;

  const handleSelect = (id) => {
    soundFX.buttonClick();
    setActivePage(id);
    setRadarOpen(false);
  };

  return (
    <div className={`w-full md:w-72 shrink-0 bg-slate-950/95 border-r-4 border-black p-4 space-y-4 flex flex-col justify-between z-30 transition-all duration-300 ease-in-out animate-fade-in select-none relative ${
      crtEnabled ? 'crt-lines' : ''
    }`}>
      
      {/* Menu Header */}
      <div className="space-y-2 border-b-2 border-slate-800 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-cyan-400 animate-spin" />
            <h3 className="text-sm font-black bungee-font text-cyan-400 tracking-wider">
              SPIDEY RADAR
            </h3>
          </div>
          <button
            onClick={() => {
              soundFX.buttonClick();
              setRadarOpen(false);
            }}
            className="p-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] mono-font text-slate-400">SELECT TARGET NAVIGATION NODE</p>
      </div>

      {/* Navigation Links */}
      <div className="space-y-1.5 overflow-y-auto max-h-[65vh] pr-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full p-2.5 rounded-xl border-2 text-left font-black bungee-font text-xs flex items-center justify-between transition ${
                isActive
                  ? 'theme-bg-primary text-white border-black comic-skew shadow-md'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                <span className="truncate">{item.label}</span>
              </div>
              <span className="text-[9px] mono-font text-slate-400 shrink-0">#{item.num}</span>
            </button>
          );
        })}
      </div>

      {/* Menu Footer */}
      <div className="pt-2 border-t border-slate-800 text-[10px] mono-font text-slate-500 text-center">
        COGNITIA 2026 // SECTOR RADAR ONLINE
      </div>

    </div>
  );
}
