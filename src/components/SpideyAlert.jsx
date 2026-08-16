import React from 'react';
import { ShieldAlert, CheckCircle, Info, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function SpideyAlert() {
  const { alertState, closeAlert } = useTheme();

  if (!alertState || !alertState.open) return null;

  const { title, message, type } = alertState;

  const handleClose = () => {
    soundFX.buttonClick();
    closeAlert();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border-4 border-yellow-400 rounded-2xl p-6 space-y-4 shadow-2xl comic-border-lg text-center">
        
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white bg-slate-950 border border-slate-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="w-14 h-14 mx-auto rounded-full bg-yellow-400 text-slate-950 border-3 border-black flex items-center justify-center text-2xl font-black bio-glow">
          {type === 'success' ? '✓' : type === 'error' ? '⚡' : '🕷️'}
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-black bungee-font text-yellow-300">
            {title || 'SPIDEY SYSTEM ALERT'}
          </h3>
          <p className="text-xs text-slate-200 mono-font leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black bungee-font text-xs rounded-xl border-3 border-black comic-skew shadow-lg"
        >
          ACKNOWLEDGE & CLOSE 🚀
        </button>
      </div>
    </div>
  );
}
