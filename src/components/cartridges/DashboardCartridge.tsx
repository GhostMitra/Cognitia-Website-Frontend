import React from 'react';
import {
  Award,
  Users,
  Zap,
  Sparkles,
  Terminal,
  UserPlus,
  LogIn,
  Layers,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Code2,
  Cpu,
  Trophy,
} from 'lucide-react';
import { CartridgeId } from '../../types';
import { sound } from '../../utils/audio';

interface DashboardCartridgeProps {
  onNavigate?: (id: CartridgeId) => void;
}

export function DashboardCartridge({ onNavigate }: DashboardCartridgeProps) {
  const handleNav = (id: CartridgeId) => {
    sound.playClick();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <div
      className="flex flex-col h-full justify-between items-center text-center gap-3 sm:gap-4 md:gap-5 select-none px-2 sm:px-4 py-2 sm:py-3 max-w-6xl mx-auto w-full"
      id="cartridge-main-view"
    >
      {/* 1. Top Section: Prominent Big COGNITIA Logo & Event Badges */}
      <div className="flex flex-col items-center justify-center space-y-2 pt-1 w-full shrink-0">
        <div className="relative group flex items-center justify-center w-full max-w-[480px] sm:max-w-[600px] md:max-w-[700px] transition-all duration-300">
          <img
            src="/cognitia_logo.png"
            alt="COGNITIA 2K26"
            className="w-full h-auto max-h-[80px] sm:max-h-[100px] md:max-h-[110px] object-contain drop-shadow-[0_4px_20px_rgba(126,199,255,0.35)] filter brightness-105 contrast-105 transition-all duration-300 group-hover:brightness-115 group-hover:drop-shadow-[0_6px_30px_rgba(126,199,255,0.6)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Event Meta Badges */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-0.5">
          <span className="inline-flex items-center gap-1.5 bg-[#142338] text-[#7ec7ff] border border-[#1f4066] font-silkscreen text-[8.5px] sm:text-[9.5px] px-3 py-1 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7ec7ff] animate-pulse shadow-[0_0_6px_#7ec7ff]" />
            HACKATHON 2026
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#1e2f18] text-[#a7d38a] border border-[#2f4f24] font-silkscreen text-[8.5px] sm:text-[9.5px] px-3 py-1 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <Sparkles className="h-2.5 w-2.5 text-[#f4c151]" />
            OFFICIAL STAGE
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#2b182b] text-[#ff77e9] border border-[#522352] font-silkscreen text-[8.5px] sm:text-[9.5px] px-3 py-1 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <Zap className="h-2.5 w-2.5 text-[#ff77e9]" />
            30-HR SPRINT
          </span>
        </div>
      </div>

      {/* 2. Key Stat Metrics Grid (3 Main Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full">
        {/* PRIZE POOL */}
        <div
          className="p-3.5 sm:p-4 rounded-lg bg-[#141618] border-[2.5px] border-black flex flex-col justify-between items-center text-center
                     shadow-[inset_2px_2px_0_0_#2b2e30,inset_-2px_-2px_0_0_#0a0b0c,3px_3px_0_0_rgba(0,0,0,0.6)]
                     transition-transform hover:-translate-y-1 hover:border-[#f4c151]"
        >
          <div className="flex items-center gap-1.5 text-[#f4c151] pb-1">
            <Award className="h-4 w-4 text-[#f4c151]" />
            <span className="font-silkscreen text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#d4af37]">
              PRIZE POOL
            </span>
          </div>

          <div className="py-2">
            <span className="font-pixel text-[24px] sm:text-[28px] md:text-[30px] text-[#a7d38a] block tracking-wide drop-shadow-[0_0_10px_rgba(167,211,138,0.4)] leading-none">
              ₹22,000
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9.5px] text-[#8fa892] mt-1.5 block">
              ₹22,000 Total Cash &amp; Bounties
            </span>
          </div>

          <div className="w-full pt-2 border-t border-[#23272a]">
            <span className="font-silkscreen text-[8px] sm:text-[8.5px] text-[#7d8285]">
              ₹10K / ₹6K / ₹4K + ₹2K Bounties
            </span>
          </div>
        </div>

        {/* PARTICIPANTS */}
        <div
          className="p-3.5 sm:p-4 rounded-lg bg-[#141618] border-[2.5px] border-black flex flex-col justify-between items-center text-center
                     shadow-[inset_2px_2px_0_0_#2b2e30,inset_-2px_-2px_0_0_#0a0b0c,3px_3px_0_0_rgba(0,0,0,0.6)]
                     transition-transform hover:-translate-y-1 hover:border-[#7ec7ff]"
        >
          <div className="flex items-center gap-1.5 text-[#7ec7ff] pb-1">
            <Users className="h-4 w-4 text-[#7ec7ff]" />
            <span className="font-silkscreen text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#6fb3d9]">
              SELECTED BUILDERS
            </span>
          </div>

          <div className="py-2">
            <span className="font-pixel text-[24px] sm:text-[28px] md:text-[30px] text-[#7ec7ff] block tracking-wide drop-shadow-[0_0_10px_rgba(126,199,255,0.4)] leading-none">
              80 HACKERS
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9.5px] text-[#9ad4ff] mt-1.5 block">
              Curated Elite Cohort
            </span>
          </div>

          <div className="w-full pt-2 border-t border-[#23272a]">
            <span className="font-silkscreen text-[8px] sm:text-[8.5px] text-[#7d8285]">
              1 to 4 Members Per Team
            </span>
          </div>
        </div>

        {/* SPRINT DURATION */}
        <div
          className="p-3.5 sm:p-4 rounded-lg bg-[#141618] border-[2.5px] border-black flex flex-col justify-between items-center text-center
                     shadow-[inset_2px_2px_0_0_#2b2e30,inset_-2px_-2px_0_0_#0a0b0c,3px_3px_0_0_rgba(0,0,0,0.6)]
                     transition-transform hover:-translate-y-1 hover:border-[#f2933d]"
        >
          <div className="flex items-center gap-1.5 text-[#f2933d] pb-1">
            <Zap className="h-4 w-4 text-[#f2933d]" />
            <span className="font-silkscreen text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#e68a35]">
              SPRINT DURATION
            </span>
          </div>

          <div className="py-2">
            <span className="font-pixel text-[24px] sm:text-[28px] md:text-[30px] text-[#f4c151] block tracking-wide drop-shadow-[0_0_10px_rgba(244,193,81,0.4)] leading-none">
              30 HOURS
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9.5px] text-[#ffd17d] mt-1.5 block">
              Non-Stop Building &amp; Mentorship
            </span>
          </div>

          <div className="w-full pt-2 border-t border-[#23272a]">
            <span className="font-silkscreen text-[8px] sm:text-[8.5px] text-[#7d8285]">
              Ideate &bull; Build &bull; Ship &bull; Win
            </span>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Navigation Cards (Professional Direct Links) */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-silkscreen text-[9.5px] sm:text-[10.5px] text-[#7ec7ff] uppercase tracking-widest flex items-center gap-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5 text-[#f4c151]" />
            QUICK ACCESS MODULES
          </span>
          <span className="font-silkscreen text-[8px] text-gray-400">SELECT ACTION</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {/* Action 1: Register Team */}
          <button
            onClick={() => handleNav('register')}
            className="group p-2.5 sm:p-3 rounded bg-[#181d24] hover:bg-[#222a36] border-2 border-[#1f3044] hover:border-[#00f0ff] transition-all flex flex-col items-center justify-center text-center shadow-[3px_3px_0_rgba(0,0,0,0.5)] active:translate-x-[1px] active:translate-y-[1px]"
          >
            <UserPlus className="w-5 h-5 text-[#00f0ff] group-hover:scale-110 transition-transform mb-1" />
            <span className="font-silkscreen text-[10px] sm:text-[11px] text-white group-hover:text-[#00f0ff] font-bold">
              REGISTER TEAM
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9px] text-[#9ad4ff]/80 mt-1">Form Lead &amp; Squad</span>
          </button>

          {/* Action 2: Team Login */}
          <button
            onClick={() => handleNav('login')}
            className="group p-2.5 sm:p-3 rounded bg-[#181d24] hover:bg-[#222a36] border-2 border-[#1f3044] hover:border-[#f4c151] transition-all flex flex-col items-center justify-center text-center shadow-[3px_3px_0_rgba(0,0,0,0.5)] active:translate-x-[1px] active:translate-y-[1px]"
          >
            <LogIn className="w-5 h-5 text-[#f4c151] group-hover:scale-110 transition-transform mb-1" />
            <span className="font-silkscreen text-[10px] sm:text-[11px] text-white group-hover:text-[#f4c151] font-bold">
              TEAM LOGIN
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9px] text-[#ffd17d]/80 mt-1">Submissions &amp; Pass</span>
          </button>

          {/* Action 3: Challenge Tracks */}
          <button
            onClick={() => handleNav('tracks')}
            className="group p-2.5 sm:p-3 rounded bg-[#181d24] hover:bg-[#222a36] border-2 border-[#1f3044] hover:border-[#a7d38a] transition-all flex flex-col items-center justify-center text-center shadow-[3px_3px_0_rgba(0,0,0,0.5)] active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Layers className="w-5 h-5 text-[#a7d38a] group-hover:scale-110 transition-transform mb-1" />
            <span className="font-silkscreen text-[10px] sm:text-[11px] text-white group-hover:text-[#a7d38a] font-bold">
              TRACK BOUNTIES
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9px] text-[#a7d38a]/80 mt-1">AI, Web3 &amp; Retro</span>
          </button>

          {/* Action 4: Schedule */}
          <button
            onClick={() => handleNav('timeline')}
            className="group p-2.5 sm:p-3 rounded bg-[#181d24] hover:bg-[#222a36] border-2 border-[#1f3044] hover:border-[#ff77e9] transition-all flex flex-col items-center justify-center text-center shadow-[3px_3px_0_rgba(0,0,0,0.5)] active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Calendar className="w-5 h-5 text-[#ff77e9] group-hover:scale-110 transition-transform mb-1" />
            <span className="font-silkscreen text-[10px] sm:text-[11px] text-white group-hover:text-[#ff77e9] font-bold">
              TIMELINE
            </span>
            <span className="font-silkscreen text-[8.5px] sm:text-[9px] text-[#ff77e9]/80 mt-1">30-Hour Schedule</span>
          </button>
        </div>
      </div>

      {/* 4. Challenge Highlights & Feature Spotlight Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
        {/* Track Spotlight Box */}
        <div className="bg-[#121417] border border-[#23272b] p-3 rounded space-y-1.5 shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <span className="font-silkscreen text-[9.5px] text-[#f4c151] flex items-center gap-1.5 uppercase font-bold">
              <Trophy className="w-3.5 h-3.5 text-[#f4c151]" /> FEATURED TRACKS
            </span>
            <button
              onClick={() => handleNav('tracks')}
              className="font-silkscreen text-[8.5px] text-[#7ec7ff] hover:text-[#00f0ff] hover:underline flex items-center gap-1"
            >
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <p className="font-silkscreen text-[9.5px] sm:text-[10px] text-gray-300 leading-relaxed">
            Choose from <strong className="text-[#00f0ff]">Web3 Bounties</strong>, <strong className="text-[#a7d38a]">GenAI Agents</strong>, <strong className="text-[#ff77e9]">Retro 8-Bit Games</strong>, or <strong className="text-[#f4c151]">Open Innovation</strong>.
          </p>
        </div>

        {/* Rules & Code of Conduct Spotlight Box */}
        <div className="bg-[#121417] border border-[#23272b] p-3 rounded space-y-1.5 shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <span className="font-silkscreen text-[9.5px] text-[#a7d38a] flex items-center gap-1.5 uppercase font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-[#a7d38a]" /> RULES &amp; ETHICS
            </span>
            <button
              onClick={() => handleNav('rules')}
              className="font-silkscreen text-[8.5px] text-[#7ec7ff] hover:text-[#00f0ff] hover:underline flex items-center gap-1"
            >
              READ RULES <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <p className="font-silkscreen text-[9.5px] sm:text-[10px] text-gray-300 leading-relaxed">
            All project code must be initiated within the 30-hour sprint window. Teams of 1–4 members permitted with original work.
          </p>
        </div>
      </div>
    </div>
  );
}