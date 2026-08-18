import { Award, Users, Zap, Sparkles, Terminal } from 'lucide-react';
import { CartridgeId } from '../../types';

interface DashboardCartridgeProps {
  onNavigate?: (id: CartridgeId) => void;
}

export function DashboardCartridge({ onNavigate }: DashboardCartridgeProps) {
  return (
    <div
      className="flex flex-col h-full justify-between items-center text-center gap-2 sm:gap-3 md:gap-4 select-none px-2 sm:px-4 py-2 sm:py-3"
      id="cartridge-main-view"
    >
      {/* Top Section: Prominent Big COGNITIA Logo & Badges with Ample Spacing */}
      <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 pt-1 w-full shrink-0">
        {/* Big Featured Logo with Soft Light Blue Shadow/Glow */}
        <div className="relative group flex items-center justify-center w-full max-w-[500px] sm:max-w-[620px] md:max-w-[760px] transition-all duration-300">
          <img
            src="/cognitia_logo.png"
            alt="COGNITIA"
            className="w-full h-auto max-h-[85px] sm:max-h-[105px] md:max-h-[120px] object-contain drop-shadow-[0_4px_20px_rgba(126,199,255,0.32)] filter brightness-105 contrast-105 transition-all duration-300 group-hover:brightness-115 group-hover:drop-shadow-[0_6px_30px_rgba(126,199,255,0.55)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Event Meta Badges with Breathing Room */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap pt-0.5">
          <span className="inline-flex items-center gap-1.5 bg-[#142338] text-[#7ec7ff] border border-[#1f4066] font-silkscreen text-[8.5px] sm:text-[9.5px] px-3 py-1 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7ec7ff] animate-pulse shadow-[0_0_6px_#7ec7ff]" />
            HACKATHON 2026
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#1e2f18] text-[#a7d38a] border border-[#2f4f24] font-silkscreen text-[8.5px] sm:text-[9.5px] px-3 py-1 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <Sparkles className="h-2.5 w-2.5 text-[#f4c151]" />
            OFFICIAL STAGE
          </span>
        </div>
      </div>

      {/* Center 3 Key Stat Highlights: Prize Pool, Total Participants, 30 Hour Hackathon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full max-w-5xl my-auto py-1">
        {/* 1. PRIZE POOL */}
        <div
          className="p-3 sm:p-4 rounded-lg bg-[#141618] border-[2.5px] border-black flex flex-col justify-between items-center text-center
                     shadow-[inset_2px_2px_0_0_#2b2e30,inset_-2px_-2px_0_0_#0a0b0c,3px_3px_0_0_rgba(0,0,0,0.6)]
                     transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-1.5 text-[#f4c151] pb-1">
            <Award className="h-4 w-4 text-[#f4c151]" />
            <span className="font-silkscreen text-[9px] sm:text-[10px] uppercase tracking-wider text-[#d4af37]">
              PRIZE POOL
            </span>
          </div>

          <div className="py-1.5 sm:py-2">
            <span className="font-pixel text-[22px] sm:text-[26px] md:text-[28px] text-[#a7d38a] block tracking-wide drop-shadow-[0_0_8px_rgba(167,211,138,0.35)] leading-none">
              ₹22,000
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#8fa892] mt-1.5 block">
              ₹22,000 in Total Cash Prizes
            </span>
          </div>

          <div className="w-full pt-1.5 border-t border-[#23272a]">
            <span className="font-silkscreen text-[7.5px] sm:text-[8px] text-[#7d8285]">
              ₹10K / ₹6K / ₹4K + ₹2K Bounties
            </span>
          </div>
        </div>

        {/* 2. TOTAL PARTICIPANTS */}
        <div
          className="p-3 sm:p-4 rounded-lg bg-[#141618] border-[2.5px] border-black flex flex-col justify-between items-center text-center
                     shadow-[inset_2px_2px_0_0_#2b2e30,inset_-2px_-2px_0_0_#0a0b0c,3px_3px_0_0_rgba(0,0,0,0.6)]
                     transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-1.5 text-[#7ec7ff] pb-1">
            <Users className="h-4 w-4 text-[#7ec7ff]" />
            <span className="font-silkscreen text-[9px] sm:text-[10px] uppercase tracking-wider text-[#6fb3d9]">
              PARTICIPANTS
            </span>
          </div>

          <div className="py-1.5 sm:py-2">
            <span className="font-pixel text-[22px] sm:text-[26px] md:text-[28px] text-[#7ec7ff] block tracking-wide drop-shadow-[0_0_8px_rgba(126,199,255,0.35)] leading-none">
              80
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#9ad4ff] mt-1.5 block">
              Selected Hackers &amp; Builders
            </span>
          </div>

          <div className="w-full pt-1.5 border-t border-[#23272a]">
            <span className="font-silkscreen text-[7.5px] sm:text-[8px] text-[#7d8285]">
              Curated Elite Cohort
            </span>
          </div>
        </div>

        {/* 3. 30 HOUR HACKATHON */}
        <div
          className="p-3 sm:p-4 rounded-lg bg-[#141618] border-[2.5px] border-black flex flex-col justify-between items-center text-center
                     shadow-[inset_2px_2px_0_0_#2b2e30,inset_-2px_-2px_0_0_#0a0b0c,3px_3px_0_0_rgba(0,0,0,0.6)]
                     transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-1.5 text-[#f2933d] pb-1">
            <Zap className="h-4 w-4 text-[#f2933d]" />
            <span className="font-silkscreen text-[9px] sm:text-[10px] uppercase tracking-wider text-[#e68a35]">
              SPRINT DURATION
            </span>
          </div>

          <div className="py-1.5 sm:py-2">
            <span className="font-pixel text-[22px] sm:text-[26px] md:text-[28px] text-[#f4c151] block tracking-wide drop-shadow-[0_0_8px_rgba(244,193,81,0.35)] leading-none">
              30 HOURS
            </span>
            <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#ffd17d] mt-1.5 block">
              Non-Stop Hackathon Sprint
            </span>
          </div>

          <div className="w-full pt-1.5 border-t border-[#23272a]">
            <span className="font-silkscreen text-[7.5px] sm:text-[8px] text-[#7d8285]">
              Ideate &bull; Build &bull; Ship
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Terminal Status Bar */}
      <div className="w-full max-w-5xl py-2 px-3 rounded bg-[#101214] border border-[#232629] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-[#a7d38a]" />
          <span className="font-silkscreen text-[8px] sm:text-[8.5px] text-[#8e9396]">
            STATUS: <span className="text-[#a7d38a]">SYSTEM ARMED &amp; READY</span>
          </span>
        </div>
        <div className="font-silkscreen text-[7.5px] sm:text-[8px] text-[#606467]">
          USE MENU ON TOP RIGHT TO SWITCH CARTRIDGES
        </div>
      </div>
    </div>
  );
}