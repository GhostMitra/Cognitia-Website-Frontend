import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, ShieldAlert, Sparkles, Film } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function TrailerModal() {
  const { trailerModalOpen, setTrailerModalOpen, setActivePage } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (trailerModalOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            soundFX.victoryChime();
            return 100;
          }
          return prev + 1;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [trailerModalOpen, isPlaying]);

  if (!trailerModalOpen) return null;

  const handleClose = () => {
    setTrailerModalOpen(false);
    soundFX.buttonClick();
  };

  const handleRegisterClick = () => {
    setTrailerModalOpen(false);
    setActivePage('registration');
  };

  return (
    /* Rendered strictly INSIDE the tablet screen viewport! */
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border-4 border-red-600 rounded-2xl overflow-hidden shadow-2xl comic-border-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-600 to-blue-900 text-white border-b-4 border-black">
          <div className="flex items-center space-x-2">
            <Film className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="bungee-font text-sm tracking-wider text-yellow-300">
              COGNITIA MULTIVERSE PROMO TRAILER
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-white hover:text-yellow-300 bg-red-800 hover:bg-red-700 rounded-lg border-2 border-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas */}
        <div className="relative aspect-video bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none"></div>

          <div className="relative z-10 text-center space-y-3">
            <div className="inline-block p-3 rounded-full bg-red-600/20 border-2 border-red-500 bio-glow">
              <span className="text-4xl animate-bounce inline-block">🕷️</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold bungee-font text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-300 to-cyan-400">
              GREAT POWER. GREAT CODE.
            </h2>
            
            <p className="max-w-md mx-auto text-slate-300 text-xs mono-font">
              {progress < 30 && ">> DECRYPTING MULTIVERSE SIGNAL..."}
              {progress >= 30 && progress < 70 && ">> UNLEASHING 63 UNEXPLORED HACKER TEAMS ACROSS THE SPIDER-NET..."}
              {progress >= 70 && progress < 100 && ">> PREPARE YOUR ALGORITHMS FOR THE ULTIMATE THWIP-OFF!"}
              {progress >= 100 && ">> TRANSMISSION COMPLETE. JOIN THE ALLIANCE NOW!"}
            </p>

            <div className="flex items-center justify-center space-x-1 h-6">
              {[40, 70, 30, 90, 50, 80, 40, 100, 60, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-red-500 rounded-full transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.max(8, (h * (progress % 10)) / 10)}px` : '3px',
                    backgroundColor: i % 2 === 0 ? '#E62429' : '#00F0FF'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-2.5 bg-slate-950/90 border-t-2 border-slate-800 flex items-center justify-between space-x-3 z-20">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                soundFX.buttonClick();
              }}
              className="p-1.5 text-white bg-red-600 hover:bg-red-500 rounded border border-black"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-red-600 via-yellow-400 to-cyan-400 h-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="mono-font text-[10px] text-slate-400 w-10 text-right">
              {Math.floor(progress / 10)}s
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-950 flex items-center justify-between border-t-2 border-slate-800">
          <span className="text-[10px] mono-font text-slate-400">EARTH-616 // OFFICIAL PROMO TRAILER</span>
          <button
            onClick={handleRegisterClick}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-lg bungee-font text-xs comic-border"
          >
            🎟️ CLAIM SPIDER-PASS
          </button>
        </div>
      </div>
    </div>
  );
}
