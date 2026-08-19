import { useState, useEffect } from 'react';
import { Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface CountdownData {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

interface BottomBarProps {
  statusText?: string;
  isCountdown?: boolean;
  countdown?: CountdownData;
  onOpenQuickMenu?: () => void;
  onReboot?: () => void;
}

export function BottomBar({
  countdown = { days: 12, hours: 8, mins: 44, secs: 20 },
}: BottomBarProps) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <footer
      className="relative flex items-center justify-center pt-2 px-1 z-30 w-full"
      id="console-bottom-bar"
    >
      <div className="flex items-center justify-center max-w-4xl w-full">
        {/* Full-Width Countdown Timer Boxes */}
        <div className="w-full flex items-center justify-center gap-1.5 sm:gap-3 min-w-0">
          {/* DAYS BOX */}
          <div
            className="grow flex items-center justify-center gap-1.5 bg-[#181c22] border-[3px] border-black rounded-xl py-1.5 sm:py-2 px-2 sm:px-4
                       shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44,0_0_10px_rgba(0,0,0,0.5)]"
          >
            <img src="/red_pin.png" alt="pin" className="w-3 h-3 sm:w-3.5 sm:h-3.5 pixelated shrink-0 hidden xs:inline-block" />
            <span className="font-pixel text-[13px] sm:text-[18px] md:text-[21px] text-[#00f0ff] tracking-wider leading-none drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] font-bold">
              {pad(countdown.days)}
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[11px] md:text-[12px] text-[#f4c151] uppercase font-bold tracking-wider leading-none">
              DAYS
            </span>
          </div>

          {/* HOURS BOX */}
          <div
            className="grow flex items-center justify-center gap-1.5 bg-[#181c22] border-[3px] border-black rounded-xl py-1.5 sm:py-2 px-2 sm:px-4
                       shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44,0_0_10px_rgba(0,0,0,0.5)]"
          >
            <span className="font-pixel text-[13px] sm:text-[18px] md:text-[21px] text-[#00f0ff] tracking-wider leading-none drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] font-bold">
              {pad(countdown.hours)}
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[11px] md:text-[12px] text-[#f4c151] uppercase font-bold tracking-wider leading-none">
              HOURS
            </span>
          </div>

          {/* MINS BOX */}
          <div
            className="grow flex items-center justify-center gap-1.5 bg-[#181c22] border-[3px] border-black rounded-xl py-1.5 sm:py-2 px-2 sm:px-4
                       shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44,0_0_10px_rgba(0,0,0,0.5)]"
          >
            <span className="font-pixel text-[13px] sm:text-[18px] md:text-[21px] text-[#00f0ff] tracking-wider leading-none drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] font-bold">
              {pad(countdown.mins)}
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[11px] md:text-[12px] text-[#f4c151] uppercase font-bold tracking-wider leading-none">
              MINS
            </span>
          </div>

          {/* SECONDS BOX */}
          <div
            className="grow flex items-center justify-center gap-1.5 bg-[#181c22] border-[3px] border-black rounded-xl py-1.5 sm:py-2 px-2 sm:px-4
                       shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44,0_0_10px_rgba(0,0,0,0.5)]"
          >
            <span className="font-pixel text-[13px] sm:text-[18px] md:text-[21px] text-[#00f0ff] tracking-wider leading-none drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] font-bold">
              {pad(countdown.secs)}
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[11px] md:text-[12px] text-[#f4c151] uppercase font-bold tracking-wider leading-none">
              SECS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

