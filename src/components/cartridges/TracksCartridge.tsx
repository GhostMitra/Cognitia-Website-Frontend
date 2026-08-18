import { useState } from 'react';
import { Gamepad2, BrainCircuit, Blocks, Cpu, Sparkles, Flame, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

const TRACKS = [
  {
    id: 'retro-gaming',
    title: '8-BIT ARCADE & RETRO ENGINES',
    bounty: '$12,000',
    tag: 'ARCADE / CANVAS / WASM',
    icon: Gamepad2,
    color: '#a7d38a',
    description:
      'Craft original browser-based retro platformers, demoscene shaders, GameBoy ROM emulators, or web chiptune sequencers. Emphasis on 60FPS fluid physics and pixel fidelity.',
    requirements: [
      'HTML5 Canvas, WebGL, or WASM assembly',
      'Original pixel sprites & synthesized sound FX',
      'Gamepad & keyboard controller support',
      'Fast load-time (< 3MB complete asset bundle)',
    ],
  },
  {
    id: 'retro-ai',
    title: 'NEURAL PIXEL & RETRO AI AGENTS',
    bounty: '$14,000',
    tag: 'GENAI / GEMINI / CO-PILOTS',
    icon: BrainCircuit,
    color: '#f4c151',
    description:
      'Infuse intelligent agents, retro dungeon masters, dynamic NPC dialogue engines, or procedural pixel sprite synthesizers using modern LLMs and agentic pipelines.',
    requirements: [
      'Integrated Gemini/LLM structured output',
      'Real-time streaming agentic interaction',
      'Pixel art generation or retro text adventure logic',
      'Zero latency fallback & graceful error modes',
    ],
  },
  {
    id: 'web3-crypto',
    title: 'DECENTRALIZED CARTRIDGE MESH',
    bounty: '$10,000',
    tag: 'SOLANA / ETH / IPFS / DEPIN',
    icon: Blocks,
    color: '#6fb3d9',
    description:
      'Store immutable game ROMs on decentralized storage, mint verified cartridge high-scores on-chain, or create peer-to-peer multiplayer state machines.',
    requirements: [
      'On-chain score verification / proof-of-play',
      'IPFS/Arweave permanent cartridge hosting',
      'Non-intrusive wallet connection UX',
      'P2P WebRTC / WebSocket state replication',
    ],
  },
  {
    id: 'retro-hardware',
    title: 'HARDWARE HUD & PHYSICAL I/O',
    bounty: '$8,000',
    tag: 'WEB SERIAL / ARDUINO / MIDI',
    icon: Cpu,
    color: '#f2933d',
    description:
      'Bridge web applications with physical controllers, Web MIDI keyboards, Raspberry Pi microcontrollers, or real retro console hardware through WebSerial/WebUSB.',
    requirements: [
      'WebSerial, WebUSB, or Web MIDI API integration',
      'Physical peripheral feedback (LEDs, buzzers, buttons)',
      'Fallback on-screen virtual controller mode',
      'Open schematic or hardware wire documentation',
    ],
  },
  {
    id: 'creative-tools',
    title: 'CREATIVE RETRO TOOLING',
    bounty: '$6,000',
    tag: 'PIXEL EDITORS / CHIPTUNE DAWS',
    icon: Sparkles,
    color: '#c23b3b',
    description:
      'Build utilities for indie creators: in-browser pixel sprite editors, sound font synthesizers, tilemap generators, and retro shader testbenches.',
    requirements: [
      'Export to standard formats (PNG, WAV, MIDI, JSON)',
      'Undo/redo state stack & zoom canvas tools',
      'Palette constraint enforcement (C64, CGA, GameBoy)',
      'Intuitive keyboard shortcuts for rapid workflow',
    ],
  },
];

export function TracksCartridge() {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const track = TRACKS[selectedTrack];
  const Icon = track.icon;

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-tracks">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#a7d38a]">
              COMPETITION TRACKS
            </span>
            <span className="bg-[#1b2b18] text-[#a7d38a] border border-[#2b4426] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              5 BOUNTY DOMAINS
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Select your primary track to compete for dedicated bounties and sponsor bonuses.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 font-pixel text-[10px] text-[#f4c151]">
          <Flame className="h-3.5 w-3.5 text-[#f2933d]" /> $50K TOTAL
        </div>
      </div>

      {/* Main Track Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 grow overflow-hidden">
        {/* Left Track Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-1.5 overflow-y-auto pr-1">
          {TRACKS.map((t, idx) => {
            const isSelected = selectedTrack === idx;
            const TIcon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  sound.playBlip(600 + idx * 70);
                  setSelectedTrack(idx);
                }}
                className={`w-full text-left p-2 rounded-md border-2 transition-none cursor-pointer flex items-center justify-between
                           ${
                             isSelected
                               ? 'bg-[#152e23] border-[#a7d38a] shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] translate-x-1'
                               : 'bg-[#141618] border-[#2b2e30] hover:bg-[#1b1e21]'
                           }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span style={{ color: t.color }} className="shrink-0">
                    <TIcon className="h-4 w-4" />
                  </span>
                  <div className="truncate">
                    <span className="font-pixel text-[8px] text-[#cfe8ff] block truncate">
                      {t.title}
                    </span>
                    <span className="font-silkscreen text-[7px] text-[#8f9396]">
                      {t.tag}
                    </span>
                  </div>
                </div>
                <span className="font-pixel text-[9px] text-[#a7d38a] shrink-0 ml-1">
                  {t.bounty}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Track Inspector */}
        <div className="lg:col-span-7 flex flex-col justify-between p-3 rounded-lg bg-[#141618] border-2 border-[#2b2e30] shadow-inner overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-start justify-between border-b border-[#2b2e30] pb-2">
              <div className="flex items-center gap-2">
                <div
                  className="p-1.5 rounded border border-[#33373a] bg-[#1d2226]"
                  style={{ color: track.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-pixel text-[10px] text-[#cfe8ff] block">
                    {track.title}
                  </span>
                  <span className="font-silkscreen text-[7px] text-[#8f9396]">
                    {track.tag}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-pixel text-[12px] sm:text-[14px] text-[#a7d38a] block">
                  {track.bounty}
                </span>
                <span className="font-silkscreen text-[7px] text-[#7d8285]">TRACK BOUNTY</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase block">
                TRACK OVERVIEW:
              </span>
              <p className="font-silkscreen text-[9px] sm:text-[10px] text-[#d6e2eb] leading-relaxed">
                {track.description}
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="font-silkscreen text-[8px] text-[#f4c151] uppercase block">
                BENCHMARK DELIVERABLES &amp; REQUIREMENTS:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {track.requirements.map((req, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-1.5 rounded bg-[#1a1f24] border border-[#2c333a]"
                  >
                    <Check className="h-3 w-3 text-[#a7d38a] shrink-0" />
                    <span className="font-silkscreen text-[8px] text-[#cfe8ff]">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#2b2e30] flex items-center justify-between">
            <span className="font-silkscreen text-[8px] text-[#7d8285]">
              Cross-track submissions welcome &bull; Double-dip bonus eligibility
            </span>
            <span className="font-pixel text-[8px] text-[#f4c151]">
              [TRACK ID: {track.id.toUpperCase()}]
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>ALL TRACK PROJECTS MUST SUBMIT BEFORE THE FINAL SPRINT CLOCK EXPIRES</span>
        <span className="text-[#a7d38a]">5/5 TRACKS ACTIVE</span>
      </div>
    </div>
  );
}
