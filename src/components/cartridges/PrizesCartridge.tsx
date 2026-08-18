import { useState } from 'react';
import { Trophy, Award, Gift, Sparkles, Star, Zap, Crown, Flame } from 'lucide-react';
import { sound } from '../../utils/audio';

const PRIZES = [
  {
    rank: '1ST PLACE GRAND CHAMPION',
    amount: '$20,000',
    title: 'THE RETRO TITAN CUP',
    color: '#f4c151',
    bgColor: '#262010',
    borderColor: '#544622',
    icon: Crown,
    badge: 'OVERALL WINNER',
    perks: [
      'Cash Bounty wire transfer of $20,000 USD',
      'Custom Engraved Gold-Plated FPGA Retro Console',
      'Direct VC & Incubator Pitch Showcase Session',
      '$10,000 Cloud Compute Grants & Enterprise Licenses',
    ],
  },
  {
    rank: '2ND PLACE RUNNER UP',
    amount: '$10,000',
    title: 'SILVER SYNAPSE AWARD',
    color: '#cfe8ff',
    bgColor: '#172029',
    borderColor: '#2e4152',
    icon: Trophy,
    badge: '2ND PLACE',
    perks: [
      'Cash Bounty wire transfer of $10,000 USD',
      'Engraved Silver Arcade Joystick Controller',
      '$5,000 Cloud Compute Grants',
      'Direct Feature on Pixel Game Network frontpage',
    ],
  },
  {
    rank: '3RD PLACE PODIUM',
    amount: '$5,000',
    title: 'BRONZE BYTE TROPHY',
    color: '#f2933d',
    bgColor: '#241a12',
    borderColor: '#4d3725',
    icon: Award,
    badge: '3RD PLACE',
    perks: [
      'Cash Bounty wire transfer of $5,000 USD',
      'Retro Mechanical Keyboard Kit with Custom Keycaps',
      '$2,500 Cloud Compute Grants',
    ],
  },
];

const TRACK_PRIZES = [
  { track: '8-BIT ARCADE TRACK', prize: '$3,000', note: 'Top native WASM / Canvas game' },
  { track: 'NEURAL PIXEL TRACK', prize: '$3,000', note: 'Best multimodal AI agent loop' },
  { track: 'DECENTRALIZED MESH', prize: '$3,000', note: 'Best on-chain proof & IPFS storage' },
  { track: 'HARDWARE HUD TRACK', prize: '$3,000', note: 'Best physical WebSerial microcontroller' },
  { track: 'CREATIVE RETRO TOOL', prize: '$3,000', note: 'Best tool for indie pixel creators' },
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
              PRIZES &amp; BOUNTY POOL
            </span>
            <span className="bg-[#262010] text-[#f4c151] border border-[#544622] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              $50,000 TOTAL VALUE
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Transparent payout structure across overall podium winners and individual category tracks.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              sound.playBlip(700);
              setActiveTab('main');
            }}
            className={`font-pixel text-[7px] sm:text-[8px] px-2 py-1 rounded border uppercase cursor-pointer
                       ${
                         activeTab === 'main'
                           ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                           : 'bg-[#141618] border-[#2b2e30] text-[#7d8285]'
                       }`}
          >
            PODIUM
          </button>
          <button
            onClick={() => {
              sound.playBlip(800);
              setActiveTab('tracks');
            }}
            className={`font-pixel text-[7px] sm:text-[8px] px-2 py-1 rounded border uppercase cursor-pointer
                       ${
                         activeTab === 'tracks'
                           ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                           : 'bg-[#141618] border-[#2b2e30] text-[#7d8285]'
                       }`}
          >
            TRACK BOUNTIES
          </button>
        </div>
      </div>

      {/* Main Prize View */}
      {activeTab === 'main' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 grow overflow-y-auto pr-1">
          {PRIZES.map((prize, idx) => {
            const Icon = prize.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-lg border-2 flex flex-col justify-between"
                style={{
                  backgroundColor: prize.bgColor,
                  borderColor: prize.borderColor,
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-silkscreen text-[7px] px-1.5 py-0.5 rounded border" style={{ color: prize.color, borderColor: prize.borderColor, backgroundColor: '#101214' }}>
                      {prize.badge}
                    </span>
                    <Icon className="h-4 w-4" style={{ color: prize.color }} />
                  </div>

                  <div>
                    <span className="font-pixel text-[8px] text-[#8f9396] block">
                      {prize.rank}
                    </span>
                    <span className="font-pixel text-[18px] sm:text-[22px] block tracking-wide" style={{ color: prize.color }}>
                      {prize.amount}
                    </span>
                    <span className="font-silkscreen text-[8px] text-[#cfe8ff] block mt-0.5">
                      {prize.title}
                    </span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="font-silkscreen text-[7px] text-[#7d8285] uppercase block">
                      PACKAGE INCLUDES:
                    </span>
                    {prize.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1.5 text-[7.5px] font-silkscreen text-[#9aa0a6]">
                        <Star className="h-2.5 w-2.5 shrink-0 mt-0.5" style={{ color: prize.color }} />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-[#2a3036] flex items-center justify-between">
                  <span className="font-silkscreen text-[7px] text-[#7d8285]">
                    ESCROW GUARANTEED
                  </span>
                  <button
                    type="button"
                    onClick={() => sound.playCoin()}
                    className="font-pixel text-[7px] text-[#f4c151] hover:underline cursor-pointer"
                  >
                    [CLAIM RULES &gt;]
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2 grow overflow-y-auto pr-1">
          <div className="p-2 rounded bg-[#141618] border border-[#2b2e30]">
            <span className="font-silkscreen text-[8px] text-[#a7d38a] uppercase block mb-1">
              CATEGORY TRACK BOUNTIES ($15,000 TOTAL)
            </span>
            <p className="font-silkscreen text-[8px] text-[#8f9396]">
              Every track features a guaranteed $3,000 cash bounty awarded to the highest-scoring category submission. Teams can win both Podium + Category prizes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {TRACK_PRIZES.map((tp, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#141618] border-2 border-[#2b2e30] flex items-center justify-between">
                <div>
                  <span className="font-pixel text-[9px] text-[#cfe8ff] block">
                    {tp.track}
                  </span>
                  <span className="font-silkscreen text-[7.5px] text-[#7d8285]">
                    {tp.note}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-pixel text-[13px] text-[#a7d38a] block">
                    {tp.prize}
                  </span>
                  <span className="font-silkscreen text-[6.5px] text-[#6ee7b7]">CASH BOUNTY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>ALL CASH PRIZES DISTRIBUTED VIA ESCROW WITHIN 7 DAYS OF EVENT CONCLUSION</span>
        <span className="text-[#f4c151]">VERIFIED BOUNTY POOL</span>
      </div>
    </div>
  );
}
