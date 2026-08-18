import { useState } from 'react';
import { Award, Zap, Shield, Sparkles, Building2, Terminal, ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';

const SPONSORS = [
  {
    tier: 'TITANIUM',
    color: '#f4c151',
    bgColor: '#242013',
    borderColor: '#4d4120',
    list: [
      {
        name: 'HYPER-CORE CLOUD',
        badge: 'TIER-1 CLUSTER',
        credits: '$25,000 CLOUD COMPUTE CREDITS',
        perk: 'Free GPU H100 cluster access, low-latency edge nodes & serverless WASM execution.',
      },
      {
        name: 'QUANTUM MATRIX LABS',
        badge: 'AI BOUNTY LEAD',
        credits: '$15,000 CASH BOUNTY POOL',
        perk: 'Direct API credits for multimodal Gemini 2.5, agent toolchains & automated fine-tuning.',
      },
    ],
  },
  {
    tier: 'GOLD PARTNERS',
    color: '#a7d38a',
    bgColor: '#172418',
    borderColor: '#2b442b',
    list: [
      {
        name: 'RETRO BYTE FOUNDATION',
        badge: 'ENGINE SPONSOR',
        credits: '$10,000 HARDWARE GRANTS',
        perk: 'Sponsoring custom FPGA development boards & open-source chiptune sound synthesis units.',
      },
      {
        name: 'NEXUS WEB3 NETWORK',
        badge: 'DEPIN PARTNER',
        credits: '$8,000 ON-CHAIN BOUNTY',
        perk: 'Gas-free developer RPC nodes, decentralized cartridge storage, and smart contract audit credits.',
      },
    ],
  },
  {
    tier: 'COMMUNITY & TOOLING',
    color: '#6fb3d9',
    bgColor: '#16232e',
    borderColor: '#273f54',
    list: [
      {
        name: 'PIXEL FORGE TOOLKIT',
        badge: 'CREATIVE SUITE',
        credits: 'PRO LICENSES FOR ALL',
        perk: 'Free 1-year licenses for sprite animation, palette mapping, and pixel art mastering tools.',
      },
      {
        name: 'BITWAVE AUDIO ENGINE',
        badge: 'CHIPTUNE API',
        credits: 'SAMPLE LIBRARIES',
        perk: 'Over 10,000 lossless 8-bit sound effects, authentic NES/GB synthesizer soundfonts.',
      },
    ],
  },
];

export function SponsorsCartridge() {
  const [activeTier, setActiveTier] = useState<number>(0);

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-sponsors">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#f4c151]">
              SPONSORS &amp; ALLIANCES
            </span>
            <span className="bg-[#242013] text-[#f4c151] border border-[#4d4120] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              POWERING PIXEL HUD
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Backed by visionary companies providing cloud compute, bounties, and developer tooling.
          </p>
        </div>
      </div>

      {/* Main Sponsor Deck */}
      <div className="space-y-3 grow overflow-y-auto pr-1">
        {SPONSORS.map((tierGroup, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className="font-pixel text-[9px] sm:text-[10px] tracking-wider"
                style={{ color: tierGroup.color }}
              >
                &bull; {tierGroup.tier} &bull;
              </span>
              <div className="h-[1px] grow bg-[#26292b]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tierGroup.list.map((sponsor, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-lg border-2 flex flex-col justify-between"
                  style={{
                    backgroundColor: tierGroup.bgColor,
                    borderColor: tierGroup.borderColor,
                  }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-pixel text-[10px] sm:text-[11px] text-[#cfe8ff] block">
                        {sponsor.name}
                      </span>
                      <span
                        className="font-silkscreen text-[7px] px-1.5 py-0.5 rounded border"
                        style={{
                          color: tierGroup.color,
                          borderColor: tierGroup.borderColor,
                          backgroundColor: '#101214',
                        }}
                      >
                        {sponsor.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[8px] font-pixel" style={{ color: tierGroup.color }}>
                      <Zap className="h-3 w-3" />
                      <span>{sponsor.credits}</span>
                    </div>

                    <p className="font-silkscreen text-[8px] text-[#9aa0a6] leading-relaxed">
                      {sponsor.perk}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#2a3036] flex items-center justify-between">
                    <span className="font-silkscreen text-[7px] text-[#7d8285]">
                      CLAIM VIA DEVELOPER DASHBOARD
                    </span>
                    <button
                      type="button"
                      onClick={() => sound.playCoin()}
                      className="font-pixel text-[7px] text-[#f4c151] hover:underline cursor-pointer"
                    >
                      [DEV ACCESS &gt;]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>WANT TO SPONSOR A SPECIAL BOUNTY? CONTACT: SPONSORS@PIXELHUD.DEV</span>
        <span className="text-[#a7d38a]">PERK CODES AVAILABLE IN DISCORD</span>
      </div>
    </div>
  );
}
