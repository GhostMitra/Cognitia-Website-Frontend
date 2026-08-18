import { useState, useEffect } from 'react';
import { CTAButton } from '../CTAButton';
import { CartridgeId } from '../../types';
import {
  Flame,
  Award,
  Users,
  Code,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface DashboardCartridgeProps {
  onNavigate: (id: CartridgeId) => void;
}

export function DashboardCartridge({ onNavigate }: DashboardCartridgeProps) {
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, mins: 44, secs: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between gap-3 sm:gap-4 select-none" id="cartridge-dashboard">
      {/* Top Banner Hero */}
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between pb-3 border-b-2 border-[#2b2e30] gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-pixel text-[12px] sm:text-[15px] text-[#f4c151] drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
              PIXEL HACKATHON 2026
            </span>
            <span className="bg-[#1e2f18] text-[#a7d38a] border border-[#2f4f24] font-silkscreen text-[9px] px-2 py-0.5 rounded-xs">
              LIVE EVENT &bull; 48H SPRINT
            </span>
          </div>
          <p className="font-silkscreen text-[9px] sm:text-[10px] text-[#9aa0c8] max-w-2xl leading-relaxed">
            Welcome to the ultimate retro-futuristic hackathon. Build 8-bit games, AI systems, Web3 dApps, and retro hardware tools.
          </p>
        </div>
      </div>

      {/* Countdown Timer Block & Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
        {/* Countdown Box */}
        <div className="p-3 rounded-lg bg-[#141618] border-2 border-[#2b2e30] flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase tracking-wider flex items-center gap-1">
              <Calendar className="h-3 w-3 text-[#f4c151]" /> SUBMISSION COUNTDOWN
            </span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#ef4444] animate-ping" />
          </div>
          <div className="grid grid-cols-4 gap-2 py-2.5 text-center">
            <div className="bg-[#1e2225] border-2 border-black p-2 rounded shadow-[inset_1px_1px_0_0_#101114]">
              <span className="font-pixel text-[14px] sm:text-[18px] text-[#7ec7ff] block leading-tight drop-shadow-[0_0_4px_rgba(126,199,255,0.4)]">{countdown.days}</span>
              <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#9ad4ff] font-bold">DAYS</span>
            </div>
            <div className="bg-[#1e2225] border-2 border-black p-2 rounded shadow-[inset_1px_1px_0_0_#101114]">
              <span className="font-pixel text-[14px] sm:text-[18px] text-[#7ec7ff] block leading-tight drop-shadow-[0_0_4px_rgba(126,199,255,0.4)]">{countdown.hours}</span>
              <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#9ad4ff] font-bold">HRS</span>
            </div>
            <div className="bg-[#1e2225] border-2 border-black p-2 rounded shadow-[inset_1px_1px_0_0_#101114]">
              <span className="font-pixel text-[14px] sm:text-[18px] text-[#7ec7ff] block leading-tight drop-shadow-[0_0_4px_rgba(126,199,255,0.4)]">{countdown.mins}</span>
              <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#9ad4ff] font-bold">MINS</span>
            </div>
            <div className="bg-[#1e2225] border-2 border-black p-2 rounded shadow-[inset_1px_1px_0_0_#101114]">
              <span className="font-pixel text-[14px] sm:text-[18px] text-[#7ec7ff] block leading-tight drop-shadow-[0_0_4px_rgba(126,199,255,0.4)]">{countdown.secs}</span>
              <span className="font-silkscreen text-[8px] sm:text-[9px] text-[#9ad4ff] font-bold">SECS</span>
            </div>
          </div>
          <span className="font-silkscreen text-[8px] text-[#7d8285] text-center">DEADLINE: SUNDAY 18:00 UTC</span>
        </div>

        {/* Prize Pool & Tracks Stat */}
        <div className="p-3 rounded-lg bg-[#141618] border-2 border-[#2b2e30] flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase tracking-wider flex items-center gap-1">
              <Award className="h-3 w-3 text-[#a7d38a]" /> TOTAL PRIZE POOL
            </span>
            <span className="font-silkscreen text-[8px] text-[#a7d38a]">5 TRACKS</span>
          </div>
          <div className="py-1">
            <span className="font-pixel text-[16px] sm:text-[22px] text-[#a7d38a] block tracking-wide">
              $50,000+
            </span>
            <span className="font-silkscreen text-[8px] text-[#7d8285]">
              Plus cloud credits, retro consoles &amp; developer grants
            </span>
          </div>
          <div className="flex gap-1 pt-1">
            <button
              onClick={() => onNavigate('prizes')}
              className="font-pixel text-[8px] text-[#cfe8ff] hover:text-[#f4c151] underline cursor-pointer"
            >
              [VIEW PRIZES &gt;]
            </button>
          </div>
        </div>

        {/* Hackers Registered & Community */}
        <div className="p-3 rounded-lg bg-[#141618] border-2 border-[#2b2e30] flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase tracking-wider flex items-center gap-1">
              <Users className="h-3 w-3 text-[#6fb3d9]" /> HACKER MATRIX
            </span>
            <span className="font-silkscreen text-[8px] text-[#6ee7b7]">ONLINE: 480</span>
          </div>
          <div className="py-1">
            <span className="font-pixel text-[16px] sm:text-[22px] text-[#cfe8ff] block">
              1,420 <span className="text-[10px] text-[#8ea7c2]">BUILDERS</span>
            </span>
            <span className="font-silkscreen text-[8px] text-[#7d8285]">
              312 Teams Formed &bull; 42 Countries Represented
            </span>
          </div>
          <div className="flex gap-1 pt-1">
            <button
              onClick={() => onNavigate('members')}
              className="font-pixel text-[8px] text-[#cfe8ff] hover:text-[#f4c151] underline cursor-pointer"
            >
              [TEAM DIRECTORY &gt;]
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Cartridge Launcher Grid */}
      <div className="p-3.5 rounded-lg bg-[#181a1b] border-2 border-[#2b2e30] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-silkscreen text-[9px] text-[#8f9396] uppercase tracking-wider flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-[#f2933d]" /> EXPLORE CARTRIDGES:
          </span>
          <span className="font-silkscreen text-[8px] text-[#a7d38a]">HOT-SWAP INSTANT</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <CTAButton
            id="btn-dash-tracks"
            variant="gold"
            soundType="coin"
            onClick={() => onNavigate('tracks')}
            icon={<Code className="h-3 w-3" />}
            className="text-[8px] sm:text-[9px] py-2.5 w-full"
          >
            TRACKS
          </CTAButton>
          <CTAButton
            id="btn-dash-rules"
            variant="silver"
            soundType="blip"
            onClick={() => onNavigate('rules')}
            icon={<CheckCircle2 className="h-3 w-3" />}
            className="text-[8px] sm:text-[9px] py-2.5 w-full"
          >
            RULES
          </CTAButton>
          <CTAButton
            id="btn-dash-timeline"
            variant="silver"
            soundType="blip"
            onClick={() => onNavigate('timeline')}
            icon={<Calendar className="h-3 w-3" />}
            className="text-[8px] sm:text-[9px] py-2.5 w-full"
          >
            SCHEDULE
          </CTAButton>
          <CTAButton
            id="btn-dash-prizes"
            variant="ruby"
            soundType="coin"
            onClick={() => onNavigate('prizes')}
            icon={<Award className="h-3 w-3" />}
            className="text-[8px] sm:text-[9px] py-2.5 w-full"
          >
            PRIZES
          </CTAButton>
        </div>
      </div>

      {/* Bottom Navigation Ribbon */}
      <div className="pt-2 border-t border-[#26282a] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-silkscreen text-[9px] text-[#8f9396]">QUICK LINKS:</span>
          <button
            id="btn-dash-sponsors"
            type="button"
            onClick={() => {
              sound.playCoin();
              onNavigate('sponsors');
            }}
            className="px-3 py-1.5 rounded bg-[#1e2f18] hover:bg-[#284221] border border-[#2f4f24]
                       font-pixel text-[8px] text-[#a7d38a] tracking-wider cursor-pointer active:translate-y-[1px]"
          >
            [SPONSORS]
          </button>
          <button
            id="btn-dash-faq"
            type="button"
            onClick={() => {
              sound.playBlip(750);
              onNavigate('faq');
            }}
            className="px-3 py-1.5 rounded bg-[#203a54] hover:bg-[#284a6b] border border-[#3b6e93]
                       font-pixel text-[8px] text-[#f4c151] tracking-wider cursor-pointer active:translate-y-[1px]"
          >
            [FAQ]
          </button>
          <button
            id="btn-dash-members"
            type="button"
            onClick={() => {
              sound.playBlip(800);
              onNavigate('members');
            }}
            className="px-3 py-1.5 rounded bg-[#2a243d] hover:bg-[#382f54] border border-[#48396e]
                       font-pixel text-[8px] text-[#c4b5fd] tracking-wider cursor-pointer active:translate-y-[1px]"
          >
            [MEMBERS]
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-[#f4c151]" />
          <span className="font-silkscreen text-[8px] text-[#7d8285]">
            8 ACTIVE SYSTEM CARTRIDGES
          </span>
        </div>
      </div>
    </div>
  );
}
