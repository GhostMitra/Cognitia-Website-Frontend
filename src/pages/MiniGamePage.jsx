import React, { useState, useEffect } from 'react';
import { Gamepad2, RefreshCw, Trophy, Clock, Zap, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';
import confetti from 'canvas-confetti';

export function MiniGamePage() {
  const { theme, THEMES } = useTheme();
  const [timer, setTimer] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dots, setDots] = useState([]);
  const [caughtCount, setCaughtCount] = useState(0);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];
  const TOTAL_DOTS = 7;

  // Initialize 7 moving anomaly dots
  const startNewGame = () => {
    soundFX.buttonClick();
    const newDots = [];
    for (let i = 1; i <= TOTAL_DOTS; i++) {
      newDots.push({
        id: i,
        x: 12 + Math.random() * 76,
        y: 15 + Math.random() * 70,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        caught: false
      });
    }
    setDots(newDots);
    setCaughtCount(0);
    setTimer(30);
    setIsPlaying(true);
    setCompleted(false);
  };

  useEffect(() => {
    startNewGame();
  }, [theme]);

  // Animate dots bouncing & 30-second timer countdown
  useEffect(() => {
    let timerInterval;
    let animFrame;

    if (isPlaying && !completed) {
      // 1-second countdown timer
      timerInterval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 60FPS Bouncing animation loop for dots
      const updatePositions = () => {
        setDots(prevDots =>
          prevDots.map(dot => {
            if (dot.caught) return dot;

            let newX = dot.x + dot.vx;
            let newY = dot.y + dot.vy;
            let newVx = dot.vx;
            let newVy = dot.vy;

            // Bounce off walls
            if (newX <= 8 || newX >= 92) newVx = -newVx;
            if (newY <= 10 || newY >= 88) newVy = -newVy;

            return {
              ...dot,
              x: Math.max(8, Math.min(92, newX)),
              y: Math.max(10, Math.min(88, newY)),
              vx: newVx,
              vy: newVy
            };
          })
        );
        animFrame = requestAnimationFrame(updatePositions);
      };

      animFrame = requestAnimationFrame(updatePositions);
    }

    return () => {
      clearInterval(timerInterval);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isPlaying, completed]);

  // Catch Dot with Web Shooter Line
  const handleDotCatch = (e, id) => {
    if (!isPlaying || completed) return;
    soundFX.thwip();

    setDots(prevDots => {
      const nextDots = prevDots.map(d => d.id === id ? { ...d, caught: true } : d);
      const newCaught = nextDots.filter(d => d.caught).length;
      setCaughtCount(newCaught);

      if (newCaught >= TOTAL_DOTS) {
        setCompleted(true);
        setIsPlaying(false);
        soundFX.victoryChime();
        try {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        } catch (err) {}
      }

      return nextDots;
    });
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">

      {/* Header */}
      <div className="text-center space-y-2 w-full">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full theme-bg-primary text-white font-black text-[10px] sm:text-xs bungee-font comic-skew">
          <span>{currentThemeObj.badge} {currentThemeObj.name} ANOMALY HUNTER</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white flex items-center justify-center gap-2">
          <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 animate-bounce shrink-0" />
          <span>CATCH 7 ANOMALIES (30S)</span>
        </h2>
        <p className="text-slate-300 text-[10px] sm:text-xs mono-font">
          TAP & CATCH ALL 7 FAST-MOVING MULTIVERSE DOTS BEFORE TIME EXPIRES!
        </p>
      </div>

      {/* Dashboard */}
      <div className="flex items-center justify-between gap-2 bg-slate-900 border-3 border-black p-3 rounded-xl comic-border w-full">
        <div className="flex items-center space-x-3 text-[11px] sm:text-sm mono-font font-bold">
          <div className="flex items-center space-x-1 text-cyan-400">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin shrink-0" />
            <span>TIMER: {timer}s</span>
          </div>

          <div className="flex items-center space-x-1 text-yellow-300">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>CAUGHT: {caughtCount}/{TOTAL_DOTS}</span>
          </div>
        </div>

        <button
          onClick={startNewGame}
          className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black bungee-font text-[10px] sm:text-xs rounded-lg border-2 border-black flex items-center space-x-1 shadow shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RESTART</span>
        </button>
      </div>

      {/* Game Arena Viewport - OPTIMIZED HEIGHT ON MOBILE PHONES */}
      <div className="relative h-[340px] sm:h-[440px] bg-slate-950 rounded-2xl border-4 border-black overflow-hidden comic-border-lg w-full flex items-center justify-center">
        <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none" />

        {/* 7 Moving Anomaly Dots */}
        {dots.map(dot => (
          <button
            key={dot.id}
            onClick={(e) => handleDotCatch(e, dot.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-4 rounded-full border-3 border-black transition-all ${
              dot.caught
                ? 'bg-emerald-400 text-slate-950 scale-75 opacity-40 pointer-events-none'
                : 'theme-bg-primary text-white hover:scale-125 animate-pulse bio-glow cursor-pointer'
            }`}
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          >
            {dot.caught ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : <span className="text-xs sm:text-base">{currentThemeObj.badge}</span>}
          </button>
        ))}

        {/* Victory Screen */}
        {completed && (
          <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center space-y-3 animate-fade-in p-4 text-center">
            <div className="w-12 h-12 bg-yellow-400 text-slate-950 rounded-full flex items-center justify-center text-2xl font-black border-3 border-black animate-bounce bio-glow">
              🏆
            </div>
            <h3 className="text-xl sm:text-3xl font-black bungee-font text-yellow-300">
              ALL 7 ANOMALIES CAUGHT!
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-200 mono-font">
              VICTORY! CAUGHT ALL 7 ANOMALIES WITH {timer} SECONDS REMAINING!
            </p>

            <button
              onClick={startNewGame}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black bungee-font text-xs sm:text-sm rounded-xl comic-border"
            >
              PLAY AGAIN 🚀
            </button>
          </div>
        )}

        {/* Game Over Screen if Time Runs Out */}
        {!completed && !isPlaying && timer === 0 && (
          <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center space-y-3 animate-fade-in p-4 text-center">
            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-black border-3 border-black bio-glow">
              ⚡
            </div>
            <h3 className="text-xl sm:text-3xl font-black bungee-font text-red-500">
              TIME EXPIRED! ({caughtCount}/{TOTAL_DOTS})
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-200 mono-font">
              THE ANOMALIES ESCAPED! REFIRE YOUR WEB-SHOOTERS & TRY AGAIN!
            </p>

            <button
              onClick={startNewGame}
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black bungee-font text-xs sm:text-sm rounded-xl comic-border"
            >
              TRY AGAIN 🚀
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
