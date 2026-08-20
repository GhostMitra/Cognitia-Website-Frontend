import { useState } from 'react';
import { Trophy, Crown, Sparkles, IndianRupee, ShieldCheck, Gift, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PrizeCardData {
  id: string;
  rank: string;
  amount: string;
  rawAmount: number;
  title: string;
  category: 'podium' | 'track';
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  badge: string;
  tagline: string;
  perks: string[];
  isGrand?: boolean;
}

const PODIUM_PRIZES: PrizeCardData[] = [
  {
    id: 'rank-1',
    rank: '1ST PLACE GRAND CHAMPION',
    amount: '₹10,000',
    rawAmount: 10000,
    title: 'OVERALL HACKATHON WINNER',
    category: 'podium',
    color: '#f4c151',
    bgColor: '#1c170d',
    borderColor: '#7a5e1f',
    glowColor: 'rgba(244, 193, 81, 0.3)',
    badge: 'GOLD TROPHY',
    tagline: 'Highest overall jury score across technical execution, originality & demo presentation.',
    isGrand: true,
    perks: [
      '₹10,000 Cash Prize (Direct UPI / Wire)',
      'Cognitia Grand Champion Gold Trophy',
      'Official Certificate of Honor for Team',
      'Mentorship & Winner Hall of Fame Entry',
    ],
  },
  {
    id: 'rank-2',
    rank: '2ND PLACE RUNNER UP',
    amount: '₹5,000',
    rawAmount: 5000,
    title: 'SECOND PLACE WINNER',
    category: 'podium',
    color: '#38bdf8',
    bgColor: '#0f1720',
    borderColor: '#1d4ed8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    badge: 'SILVER MEDAL',
    tagline: 'Exceptional build quality, sleek architecture & strong problem impact.',
    perks: [
      '₹5,000 Cash Prize (Direct UPI / Wire)',
      'Cognitia Runner-Up Silver Trophy',
      'Official Certificate of Excellence',
      'Dev Swag Box & Hall of Fame Entry',
    ],
  },
  {
    id: 'rank-3',
    rank: '3RD PLACE PODIUM',
    amount: '₹3,000',
    rawAmount: 3000,
    title: 'THIRD PLACE WINNER',
    category: 'podium',
    color: '#f97316',
    bgColor: '#1a120b',
    borderColor: '#9a3412',
    glowColor: 'rgba(249, 115, 22, 0.2)',
    badge: 'BRONZE MEDAL',
    tagline: 'Outstanding technical implementation and creative solution design.',
    perks: [
      '₹3,000 Cash Prize (Direct UPI / Wire)',
      'Cognitia Podium Bronze Trophy',
      'Official Certificate of Achievement',
      'Dev Swag Pack & Hall of Fame Entry',
    ],
  },
];

const TRACK_BOUNTIES: PrizeCardData[] = [
  {
    id: 'track-1',
    rank: 'SPECIAL TRACK BOUNTY',
    amount: '₹1,000',
    rawAmount: 1000,
    title: 'BEST SOLUTION TRACK WINNER',
    category: 'track',
    color: '#a7d38a',
    bgColor: '#101a12',
    borderColor: '#2b542e',
    glowColor: 'rgba(167, 211, 138, 0.2)',
    badge: 'SOLUTION TRACK',
    tagline: 'Awarded to the team with the most innovative, impactful, and well-designed problem solution.',
    perks: [
      '₹1,000 Pure Cash Bounty (Direct UPI)',
      'Best Solution Track Certificate',
      'Cognitia Featured Project Showcase',
    ],
  },
  {
    id: 'track-2',
    rank: 'SPECIAL TRACK BOUNTY',
    amount: '₹1,000',
    rawAmount: 1000,
    title: 'BEST IMPLEMENTATION TRACK WINNER',
    category: 'track',
    color: '#c084fc',
    bgColor: '#171020',
    borderColor: '#581c87',
    glowColor: 'rgba(192, 132, 252, 0.2)',
    badge: 'DEV EXECUTION',
    tagline: 'Awarded to the team demonstrating the highest technical execution, clean codebase, and working demo.',
    perks: [
      '₹1,000 Pure Cash Bounty (Direct UPI)',
      'Best Technical Execution Certificate',
      'Cognitia Featured Project Showcase',
    ],
  },
];

export function PrizesCartridge() {
  const [selectedPrizeId, setSelectedPrizeId] = useState<string | null>('rank-1');

  const renderCard = (prize: PrizeCardData) => {
    const isSelected = selectedPrizeId === prize.id;
    const isGrand = prize.isGrand;

    return (
      <div
        key={prize.id}
        onClick={() => {
          sound.playBlip(850);
          setSelectedPrizeId(prize.id);
        }}
        style={{
          backgroundColor: prize.bgColor,
          borderColor: isSelected ? prize.color : prize.borderColor,
          boxShadow: isSelected ? `0 0 16px ${prize.glowColor}` : undefined,
        }}
        className={`p-3.5 sm:p-4 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all duration-200 group relative overflow-hidden h-full ${
          isSelected ? 'z-10 ring-1 ring-white/10' : 'hover:border-[#4b5563]'
        }`}
      >
        {/* Integrated Top Banner for Grand Champion */}
        {isGrand && (
          <div className="bg-[#f4c151] text-black font-pixel text-[9px] px-2.5 py-1 -mx-3.5 -mt-3.5 sm:-mx-4 sm:-mt-4 mb-2 flex items-center justify-between font-bold shadow-xs">
            <span className="flex items-center gap-1">
              <Crown className="h-3.5 w-3.5 text-black shrink-0" />
              GRAND CHAMPION PRIZE
            </span>
            <span className="font-silkscreen text-[8.5px] bg-black/20 text-black px-1.5 py-0.5 rounded">
              TOP RANK
            </span>
          </div>
        )}

        <div className="space-y-2">
          {/* Header Badge & Pin */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img
                src={isSelected ? '/red_pin.png' : '/white_pin.png'}
                alt="pointer pin"
                className={`w-3.5 h-3.5 object-contain pixelated transition-transform ${
                  isSelected ? 'scale-110' : 'opacity-60 group-hover:opacity-100'
                }`}
              />
              <span
                className="font-silkscreen text-[9px] px-2 py-0.5 rounded border uppercase tracking-wide"
                style={{
                  color: prize.color,
                  borderColor: prize.borderColor,
                  backgroundColor: '#0c1014',
                }}
              >
                {prize.badge}
              </span>
            </div>

            {isGrand ? (
              <Crown className="h-4 w-4" style={{ color: prize.color }} />
            ) : prize.category === 'podium' ? (
              <Trophy className="h-4 w-4" style={{ color: prize.color }} />
            ) : (
              <Sparkles className="h-4 w-4" style={{ color: prize.color }} />
            )}
          </div>

          {/* Amount & Title */}
          <div>
            <span className="font-pixel text-[9.5px] sm:text-[10px] text-[#9ca3af] uppercase tracking-wider block">
              {prize.rank}
            </span>
            <div className="flex items-baseline gap-1 my-0.5">
              <span
                className="font-pixel text-[24px] sm:text-[28px] tracking-wide font-bold"
                style={{ color: prize.color }}
              >
                {prize.amount}
              </span>
              <span className="font-silkscreen text-[10px] text-[#9ca3af]">CASH</span>
            </div>
            <span className="font-silkscreen font-bold text-[10px] sm:text-[11px] text-[#e2e8f0] block leading-tight">
              {prize.title}
            </span>
          </div>

          {/* Tagline */}
          <p className="font-silkscreen text-[10px] text-[#9ca3af] leading-relaxed">
            {prize.tagline}
          </p>

          {/* Perks Checklist */}
          <div className="pt-2 border-t border-white/10 space-y-1">
            <div className="font-pixel text-[9px] text-[#9ca3af] uppercase tracking-wider flex items-center gap-1">
              <img src="/red_pin.png" alt="pin" className="w-3 h-3 pixelated" />
              Included Perks &amp; Rewards:
            </div>
            {prize.perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-silkscreen text-[#d1d5db]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: prize.color }} />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Transfer Method */}
        <div className="mt-2.5 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-silkscreen">
          <span className="text-[#9ca3af] flex items-center gap-1">
            <IndianRupee className="h-3 w-3" style={{ color: prize.color }} />
            DIRECT UPI / WIRE
          </span>
          <span
            className="font-pixel text-[9px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
            style={{ color: prize.color }}
          >
            <span>DETAILS</span>
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full justify-between gap-2 select-none" id="cartridge-prizes">
      {/* Top Banner Header */}
      <div className="flex flex-col gap-1.5 pb-2 border-b border-[#2b2e30]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[12px] sm:text-[14px] text-[#f4c151] tracking-wide flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-[#f4c151]" />
                PRIZES &amp; CASH BOUNTIES
              </span>
              <span className="bg-[#262010] text-[#f4c151] border border-[#544622] font-silkscreen text-[8px] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Zap className="h-3 w-3 text-[#10b981]" />
                ₹20,000 TOTAL CASH POOL
              </span>
            </div>
            <p className="font-silkscreen text-[8.5px] sm:text-[9.5px] text-[#9ca3af] mt-0.5">
              Direct monetary awards disbursed in cash/UPI following technical jury score verification.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-[#12161a] border border-[#262c33] px-2.5 py-1 rounded-md text-[8px] font-silkscreen text-[#9ca3af]">
            <span className="flex items-center gap-1 text-[#f4c151]">
              <Crown className="h-3 w-3 text-[#f4c151]" />
              5 WINNER SLOTS
            </span>
            <span className="text-[#4b5563]">|</span>
            <span className="text-[#34d399] flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> 100% GUARANTEED
            </span>
          </div>
        </div>
      </div>

      {/* Main Prize Cards Section */}
      <div className="grow overflow-y-auto p-1.5 sm:p-2 space-y-3 no-scrollbar">
        {/* Podium Champions Grid (3 Columns) */}
        <div>
          <div className="font-pixel text-[10.5px] text-[#f4c151] mb-1.5 flex items-center gap-1.5">
            <Crown className="h-4 w-4 text-[#f4c151]" />
            <span>PODIUM CHAMPION PRIZES (₹18,000)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            {PODIUM_PRIZES.map((prize) => renderCard(prize))}
          </div>
        </div>

        {/* Special Track Bounties Grid (2 Columns) */}
        <div className="pt-2">
          <div className="font-pixel text-[10.5px] text-[#a7d38a] mb-1.5 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#a7d38a]" />
            <span>SPECIAL TRACK BOUNTIES (₹2,000)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            {TRACK_BOUNTIES.map((prize) => renderCard(prize))}
          </div>
        </div>
      </div>

      {/* Footer Support & Claim Ribbon */}
      <div className="pt-1.5 border-t border-[#262c33] flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] font-silkscreen text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <Gift className="h-3.5 w-3.5 text-[#f4c151]" />
          <span>ALL CASH PRIZES DISBURSED WITHIN 7 DAYS POST-CEREMONY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#34d399] font-pixel text-[9.5px] flex items-center gap-1">
            <img src="/red_pin.png" alt="pin" className="w-3 h-3 pixelated" />
            ₹20,000 TOTAL PURSE
          </span>
        </div>
      </div>
    </div>
  );
}


