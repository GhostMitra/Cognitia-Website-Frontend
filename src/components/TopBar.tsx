import { TitlePill } from './TitlePill';
import { CartridgeId } from '../types';

interface TopBarProps {
  currentCartridge: CartridgeId;
  onSelectCartridge: (id: CartridgeId) => void;
  onResetBoot: () => void;
}

export function TopBar({
  onResetBoot,
}: TopBarProps) {
  return (
    <header className="relative flex items-center justify-center pb-2 px-1 z-30" id="console-top-bar">
      {/* Center Title Pill */}
      <div className="flex items-center justify-center">
        <TitlePill
          firstWord="PIXEL"
          secondWord="HUD"
          subText="HACKATHON '26"
          onClick={onResetBoot}
        />
      </div>
    </header>
  );
}
