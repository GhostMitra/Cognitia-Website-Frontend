import { sound } from '../utils/audio';

interface TitlePillProps {
  firstWord?: string;
  secondWord?: string;
  subText?: string;
  onClick?: () => void;
}

export function TitlePill({
  firstWord = 'PIXEL',
  secondWord = 'HUD',
  subText = 'OS-86',
  onClick,
}: TitlePillProps) {
  const handleClick = () => {
    sound.playBlip(740);
    if (onClick) onClick();
  };

  const Comp = onClick ? 'button' : 'div';

  return (
    <Comp
      id="console-title-pill"
      onClick={onClick ? handleClick : undefined}
      className={`flex items-center gap-2.5 rounded-lg border-[3.5px] border-black
                 bg-[#1c4e7d] px-4 sm:px-6 py-1 sm:py-1.5
                 shadow-[inset_2px_2px_0_0_#58a2e0,inset_-2px_-2px_0_0_#0f2e4d,2px_2px_0_0_rgba(0,0,0,0.5)]
                 ${onClick ? 'cursor-pointer active:translate-x-[1px] active:translate-y-[1px]' : ''}`}
    >
      <span className="font-pixel text-[9px] sm:text-[11px] tracking-wider text-white drop-shadow-[1px_1px_0_#000]">
        {firstWord}
      </span>
      
      {/* Spider Eyes Center Jewel (Two Pixel Slits with Black Border) */}
      <div className="flex items-center gap-1 bg-[#102d4a] px-1.5 py-1 rounded-sm border border-black" aria-hidden="true">
        <div className="h-2.5 w-1.5 sm:h-3 sm:w-2 bg-white rounded-xs shadow-[0_0_2px_#fff]" />
        <div className="h-2.5 w-1.5 sm:h-3 sm:w-2 bg-white rounded-xs shadow-[0_0_2px_#fff]" />
      </div>

      <span className="font-pixel text-[9px] sm:text-[11px] tracking-wider text-white drop-shadow-[1px_1px_0_#000]">
        {secondWord}
      </span>

      {subText && (
        <span className="hidden md:inline-block rounded-xs bg-[#0b1f33] px-1.5 py-0.5 font-silkscreen text-[8px] text-[#78a6c8] border border-[#163b5f]">
          {subText}
        </span>
      )}
    </Comp>
  );
}
