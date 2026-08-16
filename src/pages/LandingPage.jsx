import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Users, Shield, ArrowRight, Gamepad2, CheckCircle, Clock, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function LandingPage() {
  const { setActivePage, theme, setTheme, THEMES } = useTheme();
  const [timeLeft, setTimeLeft] = useState({ days: 67, hours: 22, minutes: 45, seconds: 22 });

  // Countdown timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme-Specific Custom Landing Page Data for all 8 Universes!
  const themeData = {
    'earth-2077': {
      splash: 'CYBERPUNK 2077 x SPIDER-MAN NIGHT CITY EDITION',
      prologue: 'PROLOGUE - EARTH-2077 NIGHT CITY PROTOCOL',
      prologueText: 'MEANWHILE IN NIGHT CITY 2077... CYBERNETIC NETRUNNERS OVERDRIVE COGNITIA 2026!',
      title: 'UNLEASH THE CYBER-SPIDER CODE VOLTAGE!',
      quote: '"WAKE UP NETRUNNER, WE\'VE GOT A MULTIVERSE TO CODE!"',
      author: '⚡ - CYBERPUNK SPIDER-MAN (EARTH-2077)',
    },
    'earth-141': {
      splash: 'CALL OF DUTY: MODERN WARFARE x SPIDER-MAN TASK FORCE 141',
      prologue: 'PROLOGUE - TASK FORCE 141 WARZONE EMERGENCY',
      prologueText: 'WEAPONIZE YOUR ALGORITHMS! TASK FORCE 141 SPIDER-NETRUNNERS DRAW THE LINE IN THE CODE!',
      title: 'STAY FROSTY. CODE THE WARZONE!',
      quote: '"WE DRAW THE LINE HERE IN THE CODE. NO ANOMALY ESCAPES THIS WARZONE!"',
      author: '🪖 - CAPTAIN PRICE & SPIDER-TASK FORCE 141',
    },
    'earth-69': {
      splash: 'GTA VI VICE CITY MIAMI x SPIDER-MAN MULTIVERSE EDITION',
      prologue: 'PROLOGUE - VICE CITY MIAMI SUNSET EMERGENCY',
      prologueText: 'WELCOME TO MIAMI BEACH! HUSTLE HARD, CODE FASTER, AND OUTRUN THE SIX-STAR WANTED LEVEL!',
      title: 'WELCOME TO MIAMI VICE CITY!',
      quote: '"WELCOME TO MIAMI BEACH, WEB-SLINGER! SUNSETS & MULTIVERSE CODE HUSTLE!"',
      author: '🌴 - MIAMI VICE CITY WEB-SLINGER (EARTH-69)',
    },
    'earth-1610': {
      splash: 'MILES MORALES BROOKLYN BIO-ELECTRIC EDITION',
      prologue: 'PROLOGUE - EARTH-1610 BIO-ELECTRIC EMERGENCY',
      prologueText: 'MILES MORALES CHARGES THE COGNITIA BIO-ELECTRIC HACKATHON!',
      title: 'UNLEASH THE BIO-ELECTRIC CODE VOLTAGE!',
      quote: '"EVERYONE TELLS ME HOW MY STORY IS SUPPOSED TO GO. NAH. I\'M GONNA DO MY OWN THING!"',
      author: '⚡ - MILES MORALES (EARTH-1610)',
    },
    'earth-616': {
      splash: 'CLASSIC SPIDER-MAN EARTH-616 BRONZE AGE EDITION',
      prologue: 'PROLOGUE - EARTH-616 CLASSIC SPIDEY ALARM',
      prologueText: 'WITH GREAT POWER COMES GREAT CODE RESPONSIBILITY! JOIN PETER PARKER IN COGNITIA 2026!',
      title: 'GREAT POWER. GREAT CODE.',
      quote: '"WITH GREAT POWER COMES GREAT CODE RESPONSIBILITY!"',
      author: '🔴 - PETER PARKER (EARTH-616 CLASSIC)',
    },
    'earth-65': {
      splash: 'SPIDER-GWEN NEON MAGENTA EARTH-65 EDITION',
      prologue: 'PROLOGUE - EARTH-65 NEON RHYTHM EMERGENCY',
      prologueText: 'WE ARE THE SPIDER-ALLIANCE! PLAY YOUR OWN BEAT & SHATTER GLITCHES!',
      title: 'WEB-SLING IN NEON MAGENTA!',
      quote: '"PLAY YOUR OWN BEAT AND BREAK THE MULTIVERSE GLITCHES!"',
      author: '🌸 - GWEN STACY (EARTH-65)',
    },
    'earth-928': {
      splash: 'SPIDER-MAN 2099 CYBERNETIC NUEVA YORK EDITION',
      prologue: 'PROLOGUE - EARTH-928 CANON EVENT ALIGNMENT',
      prologueText: 'SPIDER-MAN 2099 REPAIRS THE MULTIVERSE SPIDER-NET BEFORE COLLAPSE!',
      title: 'REPAIR THE CANON EVENT TIMELINE!',
      quote: '"WE MUST ALIGN THE HOLOGRAPHIC CANON LASERS BEFORE COLLAPSE!"',
      author: '🏙️ - MIGUEL O\'HARA (SPIDER-MAN 2099)',
    },
    'earth-90214': {
      splash: 'SPIDER-NOIR 1930 DETECTIVE INVESTIGATION EDITION',
      prologue: 'PROLOGUE - EARTH-90214 DETECTIVE NOIR CASE FILE',
      prologueText: 'WE HUNT FOR TRUTH IN THE SHADOWS OF THE SPIDER-NET TO SOLVE THE CYPHER CASE!',
      title: 'NOIR 1930 DETECTIVE INVESTIGATION',
      quote: '"IN MY UNIVERSE, IT\'S ALWAYS RAINING CODE..."',
      author: '🕵️ - SPIDER-MAN NOIR (EARTH-90214)',
    }
  };

  const currentData = themeData[theme] || themeData['earth-2077'];

  // All 8 Multiverse Themes
  const eras = [
    { id: 'earth-2077', label: 'CYBERPUNK 🌆' },
    { id: 'earth-141', label: 'WARZONE 🪖' },
    { id: 'earth-69', label: 'GTA VICE 🌴' },
    { id: 'earth-1610', label: 'MILES ⚡' },
    { id: 'earth-616', label: 'CLASSIC 🔴' },
    { id: 'earth-65', label: 'GWEN 🌸' },
    { id: 'earth-928', label: 'CYBER 2099 🏙️' },
    { id: 'earth-90214', label: 'NOIR 1930 🕵️' }
  ];

  return (
    <div className="space-y-4 sm:space-y-8 w-full max-w-full py-1 sm:py-2 relative">

      {/* 1. TOP SPLASH PAGE HEADER BANNERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 border-b-2 sm:border-b-4 border-black pb-2 w-full">
        <div className="px-2.5 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-400 via-red-600 to-cyan-400 text-slate-950 font-black text-[9px] sm:text-xs bungee-font comic-skew border-2 sm:border-3 border-black shadow-md flex items-center space-x-1 sm:space-x-2 truncate max-w-full">
          <span className="truncate">SPLASH #01 ★ {currentData.splash} ★</span>
        </div>

        <div className="px-3 py-1 bg-slate-950 text-yellow-400 font-extrabold text-[9px] sm:text-xs mono-font rounded-full border border-slate-700 shadow">
          8 UNIVERSES ONLINE
        </div>
      </div>

      {/* 2. PROLOGUE YELLOW COMIC CALLOUT BOX */}
      <div className="comic-prologue-box p-3 sm:p-5 space-y-1 sm:space-y-2 w-full">
        <div className="text-[9px] sm:text-xs bungee-font text-red-700 tracking-wider">
          {currentData.prologue}
        </div>
        <h3 className="text-xs sm:text-xl font-black bungee-font text-slate-950 leading-snug">
          {currentData.prologueText}
        </h3>
      </div>

      {/* 3. SLANTED 3D COMIC TITLE - COMPACT ON MOBILE */}
      <div className="text-center py-1 sm:py-2 space-y-2 w-full">
        <h1 className="text-2xl sm:text-6xl md:text-7xl font-black comic-header-3d tracking-tight leading-tight flex items-center justify-center gap-2">
          <span>{currentData.title}</span>
        </h1>
      </div>

      {/* 4. DIALOGUE QUOTE COMIC PANEL */}
      <div className="comic-panel p-3 sm:p-6 space-y-2 sm:space-y-4 relative bg-slate-950 border-2 sm:border-3 border-yellow-400 shadow-[3px_3px_0px_#000] w-full">
        <div className="text-[9px] sm:text-xs bungee-font text-slate-400 tracking-wider flex items-center gap-1.5">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
          <span>{currentData.author}</span>
        </div>

        <p className="text-xs sm:text-base font-black mono-font text-yellow-300 leading-relaxed italic">
          {currentData.quote}
        </p>
      </div>

      {/* 5. MULTIVERSE COUNTDOWN TO KICKOFF - COMPACT GRID ON MOBILE */}
      <div className="space-y-2 sm:space-y-4 text-center w-full">
        <div className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black bungee-font text-yellow-300">
          <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-400 animate-spin" />
          <span>COUNTDOWN TO KICKOFF ⚡</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-4 w-full max-w-4xl mx-auto">
          <div className="comic-countdown-card p-2 sm:p-4 text-center border-yellow-400">
            <div className="text-xl sm:text-5xl font-black bungee-font text-yellow-300">{timeLeft.days}</div>
            <div className="text-[9px] sm:text-xs bungee-font text-cyan-400 mt-0.5">DAYS</div>
          </div>

          <div className="comic-countdown-card p-2 sm:p-4 text-center border-yellow-400">
            <div className="text-xl sm:text-5xl font-black bungee-font text-yellow-300">{timeLeft.hours}</div>
            <div className="text-[9px] sm:text-xs bungee-font text-cyan-400 mt-0.5">HOURS</div>
          </div>

          <div className="comic-countdown-card p-2 sm:p-4 text-center border-yellow-400">
            <div className="text-xl sm:text-5xl font-black bungee-font text-yellow-300">{timeLeft.minutes}</div>
            <div className="text-[9px] sm:text-xs bungee-font text-cyan-400 mt-0.5">MINS</div>
          </div>

          <div className="comic-countdown-card p-2 sm:p-4 text-center border-yellow-400">
            <div className="text-xl sm:text-5xl font-black bungee-font text-yellow-300">{timeLeft.seconds}</div>
            <div className="text-[9px] sm:text-xs bungee-font text-cyan-400 mt-0.5">SECS</div>
          </div>
        </div>
      </div>

      {/* 6. ERA TONE SWITCHER - COMPACT & NEAT ON MOBILE PHONES */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-4 bg-slate-950 border-2 sm:border-3 border-black p-2 sm:p-4 rounded-xl sm:rounded-2xl w-full">
        <span className="text-[10px] sm:text-xs font-black bungee-font text-yellow-300 w-full text-center sm:w-auto mb-1 sm:mb-0">
          ERA TONE:
        </span>
        {eras.map(e => {
          const isActive = theme === e.id;
          return (
            <button
              key={e.id}
              onClick={() => {
                soundFX.buttonClick();
                setTheme(e.id);
              }}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-black bungee-font border-2 border-black transition-all ${isActive ? 'bg-yellow-400 text-slate-950 comic-skew shadow bio-glow scale-105' : 'bg-slate-900 text-slate-400 hover:text-white hover:border-cyan-400'
                }`}
            >
              {e.label}
            </button>
          );
        })}
      </div>

      {/* 7. QUICK ACTION CTAS - COMPACT MOBILE BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pt-1 w-full">
        <button
          onClick={() => {
            soundFX.buttonClick();
            setActivePage('registration');
          }}
          className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-4 theme-bg-primary hover:brightness-110 text-white font-black text-xs sm:text-lg rounded-xl sm:rounded-2xl bungee-font comic-panel transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group bio-glow shadow-xl"
        >
          <span>🎟️ REGISTER FOR HACKATHON</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            soundFX.buttonClick();
            setActivePage('track');
          }}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-4 bg-slate-900 text-cyan-300 font-black text-xs sm:text-base rounded-xl sm:rounded-2xl comic-panel transition-all hover:scale-105 hover:border-cyan-400"
        >
          🎯 EXPLORE TRACKS
        </button>

        <button
          onClick={() => {
            soundFX.buttonClick();
            setActivePage('minigame');
          }}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-base rounded-xl sm:rounded-2xl comic-panel transition-all flex items-center justify-center space-x-1.5 hover:scale-105"
        >
          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
          <span>🎮 WEB-SHOOTER 7-DOT CATCH (30S)</span>
        </button>
      </div>

    </div>
  );
}
