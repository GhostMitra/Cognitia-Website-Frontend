import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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
}

export function BottomBar({
  statusText = 'HACKATHON LIVE &bull; 8 CARTRIDGES READY',
  isCountdown = false,
  countdown = { days: 12, hours: 8, mins: 44, secs: 20 },
}: BottomBarProps) {
  const [muted, setMuted] = useState(sound.isMuted());

  useEffect(() => {
    const unsub = sound.subscribe((isMuted) => setMuted(isMuted));
    return () => unsub();
  }, []);

  const handleToggleMute = () => {
    sound.toggleMute();
    sound.playClick();
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <footer
      className="relative flex items-center justify-center pt-2 px-1 z-30"
      id="console-bottom-bar"
    >
      <div className="flex items-center gap-2 sm:gap-2.5 max-w-2xl w-full justify-center">
        {isCountdown ? (
          /* Separate Individual Countdown Boxes with outer light blue HUD text color & increased text height */
          <div className="grow flex items-center justify-center gap-1.5 sm:gap-2.5 min-w-0">
            {/* DAYS BOX */}
            <div
              className="grow flex items-center justify-center gap-1.5 bg-[#22252a] border-[3px] border-black rounded-lg py-1 sm:py-1.5 px-2 sm:px-3
                         shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44]"
            >
              <span className="font-pixel text-[13px] sm:text-[15px] md:text-[17px] text-[#7ec7ff] tracking-wider leading-none drop-shadow-[0_0_6px_rgba(126,199,255,0.6)]">
                {pad(countdown.days)}
              </span>
              <span className="font-silkscreen text-[9px] sm:text-[10px] md:text-[11px] text-[#9ad4ff] uppercase font-bold tracking-wider leading-none">
                DAYS
              </span>
            </div>

            {/* HOURS BOX */}
            <div
              className="grow flex items-center justify-center gap-1.5 bg-[#22252a] border-[3px] border-black rounded-lg py-1 sm:py-1.5 px-2 sm:px-3
                         shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44]"
            >
              <span className="font-pixel text-[13px] sm:text-[15px] md:text-[17px] text-[#7ec7ff] tracking-wider leading-none drop-shadow-[0_0_6px_rgba(126,199,255,0.6)]">
                {pad(countdown.hours)}
              </span>
              <span className="font-silkscreen text-[9px] sm:text-[10px] md:text-[11px] text-[#9ad4ff] uppercase font-bold tracking-wider leading-none">
                HOURS
              </span>
            </div>

            {/* MINS BOX */}
            <div
              className="grow flex items-center justify-center gap-1.5 bg-[#22252a] border-[3px] border-black rounded-lg py-1 sm:py-1.5 px-2 sm:px-3
                         shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44]"
            >
              <span className="font-pixel text-[13px] sm:text-[15px] md:text-[17px] text-[#7ec7ff] tracking-wider leading-none drop-shadow-[0_0_6px_rgba(126,199,255,0.6)]">
                {pad(countdown.mins)}
              </span>
              <span className="font-silkscreen text-[9px] sm:text-[10px] md:text-[11px] text-[#9ad4ff] uppercase font-bold tracking-wider leading-none">
                MINS
              </span>
            </div>

            {/* SECONDS BOX */}
            <div
              className="grow flex items-center justify-center gap-1.5 bg-[#22252a] border-[3px] border-black rounded-lg py-1 sm:py-1.5 px-2 sm:px-3
                         shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44]"
            >
              <span className="font-pixel text-[13px] sm:text-[15px] md:text-[17px] text-[#7ec7ff] tracking-wider leading-none drop-shadow-[0_0_6px_rgba(126,199,255,0.6)]">
                {pad(countdown.secs)}
              </span>
              <span className="font-silkscreen text-[9px] sm:text-[10px] md:text-[11px] text-[#9ad4ff] uppercase font-bold tracking-wider leading-none">
                SECS
              </span>
            </div>
          </div>
        ) : (
          /* Single Recessed Dark Status Pill for other cartridges */
          <div
            className="grow flex items-center justify-center bg-[#22252a] border-[3px] border-black rounded-lg py-1.5 sm:py-2 px-4
                       shadow-[inset_2px_2px_0_0_#101114,inset_-2px_-2px_0_0_#383c44]"
          >
            <span className="font-pixel text-[10px] sm:text-[12px] md:text-[13px] text-[#7ec7ff] tracking-widest uppercase drop-shadow-[0_0_4px_rgba(126,199,255,0.4)]">
              {statusText}
            </span>
          </div>
        )}

        {/* Audio Mute/Unmute Pill */}
        <button
          id="btn-sound-toggle-bottom"
          type="button"
          onClick={handleToggleMute}
          title={muted ? 'Unmute 8-Bit Audio' : 'Mute 8-Bit Audio'}
          className="h-8 w-11 sm:h-9 sm:w-12 shrink-0 rounded-lg bg-white border-[3px] border-black flex items-center justify-center
                     shadow-[2px_2px_0_rgba(0,0,0,0.6)] cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
        >
          {muted ? (
            <VolumeX className="w-4 h-4 text-black" />
          ) : (
            <Volume2 className="w-4 h-4 text-black animate-pulse" />
          )}
        </button>
      </div>
    </footer>
  );
}
