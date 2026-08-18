import React from "react";
import { SpideyMenuButton } from "./SpideyMenuButton";

interface ScreenViewportProps {
  children: React.ReactNode;
  activeCartridgeId?: string;
  cartridgeName?: string;
  scanlinesEnabled?: boolean;
  isMenuOpen?: boolean;
  onToggleMenu?: () => void;
}

export function ScreenViewport({
  children,
  activeCartridgeId = "dashboard",
  cartridgeName = "PIXEL HUD",
  scanlinesEnabled = true,
  isMenuOpen = false,
  onToggleMenu,
}: ScreenViewportProps) {
  return (
    <div
      className="relative flex-1 min-h-0 h-full flex flex-col rounded-md bg-[#222528]
                 border-[4px] sm:border-[5px] border-black shadow-[inset_4px_4px_0_0_#101113,inset_-4px_-4px_0_0_#383d42,0_4px_0_0_rgba(0,0,0,0.5)]
                 p-2.5 sm:p-3.5 md:p-4 overflow-visible"
      id="console-screen-viewport"
    >
      {/* Top-Right Hanging Upside-Down Spidey Spritesheet Menu Button (Prominent & 100% Unclipped) */}
      {onToggleMenu && (
        <div className="absolute top-1 sm:top-1.5 right-2 sm:right-3 translate-x-[33px] -translate-y-[25px] z-50 pointer-events-auto">
          <SpideyMenuButton isOpen={isMenuOpen} onClick={onToggleMenu} />
        </div>
      )}

      {/* Subtle CRT Scanlines */}
      {scanlinesEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-30 opacity-20 scanline-overlay rounded-md overflow-hidden"
          aria-hidden="true"
        />
      )}

      {/* Internal Viewport Header Bar */}
      {!isMenuOpen && (
        <div className="relative z-20 flex items-center justify-between pb-1.5 mb-1.5 sm:mb-2 border-b-[3px] border-black text-[8px] sm:text-[9px] font-silkscreen bg-[#1a1d20]/60 px-2 py-1 rounded shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 bg-[#a7d38a] border border-black shadow-[0_0_4px_#a7d38a]" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-white tracking-wider">
              {cartridgeName}
            </span>
            <span className="text-[#7d8285]">
              [{activeCartridgeId.toUpperCase()}]
            </span>
          </div>
          <div className="flex items-center gap-2 pr-20 sm:pr-24">
            <span className="font-silkscreen text-[#a7d38a] text-[8px] bg-[#142314] px-1.5 py-0.5 border border-[#244224]">
              SYSTEM READY
            </span>
          </div>
        </div>
      )}

      {/* Screen Interactive Render Area */}
      <div className="relative z-20 flex-1 min-h-0 h-full flex flex-col overflow-y-auto pr-1">
        {children}
      </div>
    </div>
  );
}
