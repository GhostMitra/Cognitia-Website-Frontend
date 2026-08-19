import React, { useEffect, useState } from 'react';
import { Cpu, RefreshCw, Sparkles } from 'lucide-react';
import { RetroThemeId, THEMES } from './ThemeLoadingScreen';

interface CartridgeSwapLoaderProps {
  targetCartridgeName: string;
  currentTheme?: RetroThemeId;
}

export const CartridgeSwapLoader: React.FC<CartridgeSwapLoaderProps> = ({
  targetCartridgeName,
  currentTheme = 'cognitia-gold',
}) => {
  const [progress, setProgress] = useState(15);
  const theme = THEMES[currentTheme] || THEMES['cognitia-gold'];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`w-full h-full min-h-[360px] flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none font-['VT323'] ${theme.bgClass} text-white relative overflow-hidden`}
    >
      {/* Soft Glow Background Overlay */}
      <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />

      {/* Main Swap Box */}
      <div className={`max-w-md w-full border-2 ${theme.containerBorder} bg-black/70 p-4 sm:p-5 shadow-[6px_6px_0px_#000000] relative space-y-3`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <div className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${theme.accentColor} animate-spin`} />
            <span className={`font-['Silkscreen'] text-xs uppercase tracking-wider ${theme.textColor}`}>
              CARTRIDGE SWAP PROTOCOL
            </span>
          </div>
          <span className="font-['Silkscreen'] text-[9px] bg-white/10 px-1.5 py-0.5 border border-white/20 text-gray-300">
            BUS 0x2026
          </span>
        </div>

        {/* Target Module Info */}
        <div className="py-2 flex flex-col items-center space-y-1.5">
          <div className={`p-2 bg-black/80 border border-white/30 ${theme.logoGlow} rounded-sm`}>
            <Cpu className={`w-8 h-8 ${theme.textColor} animate-pulse`} />
          </div>
          <h3 className={`font-['Silkscreen'] text-sm sm:text-base ${theme.accentColor} tracking-wider uppercase drop-shadow-[1px_1px_0px_#000]`}>
            LOADING {targetCartridgeName}
          </h3>
          <p className="text-xs text-gray-300 font-['VT323']">
            MOUNTING ROM MODULE &bull; PREPARING VIEWPORT
          </p>
        </div>

        {/* Rapid 8-Bit Progress Bar */}
        <div className="w-full space-y-1">
          <div className="flex items-center justify-between text-xs font-['Silkscreen'] text-gray-400">
            <span>READING ROM DATA</span>
            <span className={theme.textColor}>{progress}%</span>
          </div>
          <div className="w-full h-3 bg-black border border-white/30 p-0.5 shadow-[inset_1px_1px_0_0_#000]">
            <div
              className={`h-full ${theme.progressFill} transition-all duration-75 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="pt-1 flex items-center justify-between text-[10px] text-gray-400 font-['Silkscreen']">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#f4c151]" /> COGNITIA BUS READY
          </span>
          <span className="animate-pulse text-[#a7d38a]">OK</span>
        </div>
      </div>
    </div>
  );
};
