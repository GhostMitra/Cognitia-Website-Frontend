import { useState } from 'react';
import { Trophy, Award, Crown, Sparkles, IndianRupee } from 'lucide-react';
import { sound } from '../../utils/audio';

const PODIUM_PRIZES = [
  {
    rank: '1ST PLACE GRAND CHAMPION',
    amount: '₹10,000',
    title: 'FIRST PLACE WINNER',
    color: '#f4c151',
    bgColor: '#262010',
    borderColor: '#544622',
    icon: Crown,
    badge: '1ST PRIZE',
    perks: ['₹10,000 Pure Cash Prize'],
  },
  {
    rank: '2ND PLACE RUNNER UP',
    amount: '₹6,000',
    title: 'SECOND PLACE WINNER',
    color: '#cfe8ff',
    bgColor: '#172029',
    borderColor: '#2e4152',
    icon: Trophy,
    badge: '2ND PRIZE',
    perks: ['₹6,000 Pure Cash Prize'],
  },
  {
    rank: '3RD PLACE PODIUM',
    amount: '₹4,000',
    title: 'THIRD PLACE WINNER',
    color: '#f2933d',
    bgColor: '#241a12',
    borderColor: '#4d3725',
    icon: Award,
    badge: '3RD PRIZE',
    perks: ['₹4,000 Pure Cash Prize'],
  },
];

const TRACK_BOUNTIES = [
  {
    title: 'BEST SOLUTION TRACK WINNER',
    amount: '₹1,000',
    desc: 'Awarded to the team with the most innovative, impactful, and well-designed problem solution.',
    badge: 'SPECIAL TRACK',
    color: '#a7d38a',
    bgColor: '#172418',
    borderColor: '#2b442b',
    perks: ['₹1,000 Pure Cash Prize'],
  },
  {
    title: 'BEST IMPLEMENTATION TRACK WINNER',
    amount: '₹1,000',
    desc: 'Awarded to the team demonstrating the highest technical execution, clean codebase, and working demo.',
    badge: 'SPECIAL TRACK',
    color: '#7ec7ff',
    bgColor: '#142338',
    borderColor: '#1f4066',
    perks: ['₹1,000 Pure Cash Prize'],
  },
];

export function PrizesCartridge() {
  const [activeTab, setActiveTab] = useState<'main' | 'tracks'>('main');

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-prizes">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#f4c151]">
              PRIZES &amp; CASH BOUNTIES
            </span>
            <span className="bg-[#262010] text-[#f4c151] border border-[#544622] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              ₹22,000 TOTAL CASH POOL
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Direct monetary awards for top overall winners and designated track champions.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playBlip(700);
              setActiveTab('main');
            }}
            className={`font-pixel text-[7.5px] sm:text-[8.5px] px-2.5 py-1 rounded border uppercase cursor-pointer transition-colors
                       ${
                         activeTab === 'main'
                           ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                           : 'bg-[#141618] border-[#2b2e30] text-[#7d8285] hover:text-white'
                       }`}
          >
            PODIUM PRIZES (₹20K)
          </button>
          <button
            onClick={() => {
              sound.playBlip(800);
              setActiveTab('tracks');
            }}
            className={`font-pixel text-[7.5px] sm:text-[8.5px] px-2.5 py-1 rounded border uppercase cursor-pointer transition-colors
                       ${
                         activeTab === 'tracks'
                           ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                           : 'bg-[#141618] border-[#2b2e30] text-[#7d8285] hover:text-white'
                       }`}
          >
            TRACK BOUNTIES (₹2K)
          </button>
        </div>
      </div>

      {/* Main Podium Prizes Tab */}
      {activeTab === 'main' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 grow overflow-y-auto pr-1 my-auto">
          {PODIUM_PRIZES.map((prize, idx) => {
            const Icon = prize.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-lg border-[2.5px] flex flex-col justify-between shadow-[inset_2px_2px_0_0_rgba(255,255,255,0.05),3px_3px_0_0_rgba(0,0,0,0.6)]"
                style={{
                  backgroundColor: prize.bgColor,
                  borderColor: prize.borderColor,
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-silkscreen text-[7.5px] px-2 py-0.5 rounded border"
                      style={{ color: prize.color, borderColor: prize.borderColor, backgroundColor: '#101214' }}
                    >
                      {prize.badge}
                    </span>
                    <Icon className="h-4 w-4" style={{ color: prize.color }} />
                  </div>

                  <div>
                    <span className="font-pixel text-[8px] text-[#8f9396] block">
                      {prize.rank}
                    </span>
                    <span
                      className="font-pixel text-[22px] sm:text-[26px] block tracking-wide my-1"
                      style={{ color: prize.color }}
                    >
                      {prize.amount}
                    </span>
                    <span className="font-silkscreen text-[8.5px] text-[#cfe8ff] block">
                      {prize.title}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-black/30">
                    <div className="flex items-center gap-1.5 text-[8.5px] font-silkscreen text-[#cfe8ff]">
                      <IndianRupee className="h-3 w-3 shrink-0" style={{ color: prize.color }} />
                      <span>{prize.perks[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-1.5 border-t border-black/20 text-right">
                  <span className="font-silkscreen text-[7px] text-[#7d8285]">
                    DIRECT CASH TRANSFER
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Track Bounties Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grow overflow-y-auto pr-1 my-auto max-w-4xl mx-auto w-full">
          {TRACK_BOUNTIES.map((track, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-lg border-[2.5px] flex flex-col justify-between shadow-[inset_2px_2px_0_0_rgba(255,255,255,0.05),3px_3px_0_0_rgba(0,0,0,0.6)]"
              style={{
                backgroundColor: track.bgColor,
                borderColor: track.borderColor,
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="font-silkscreen text-[7.5px] px-2 py-0.5 rounded border"
                    style={{ color: track.color, borderColor: track.borderColor, backgroundColor: '#101214' }}
                  >
                    {track.badge}
                  </span>
                  <Sparkles className="h-4 w-4" style={{ color: track.color }} />
                </div>

                <div>
                  <h4 className="font-pixel text-[11px] sm:text-[12px] text-white tracking-wide">
                    {track.title}
                  </h4>
                  <span
                    className="font-pixel text-[24px] sm:text-[28px] block tracking-wide my-1"
                    style={{ color: track.color }}
                  >
                    {track.amount}
                  </span>
                  <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#cfe8ff] leading-relaxed mt-1">
                    {track.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/30">
                  <div className="flex items-center gap-1.5 text-[8.5px] font-silkscreen text-[#cfe8ff]">
                    <IndianRupee className="h-3.5 w-3.5 shrink-0" style={{ color: track.color }} />
                    <span className="font-bold">{track.perks[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-1.5 border-t border-black/20 text-right">
                <span className="font-silkscreen text-[7px] text-[#7d8285]">
                  DIRECT CASH BOUNTY
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>ALL PRIZES DISBURSED IN INR CASH FOLLOWING PROJECT VERIFICATION</span>
        <span className="text-[#a7d38a]">₹22,000 PURSE TOTAL</span>
      </div>
    </div>
  );
}
