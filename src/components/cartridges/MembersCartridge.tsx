import { useState } from 'react';
import { Users, UserPlus, Search, Shield, Award, Terminal, Filter } from 'lucide-react';
import { sound } from '../../utils/audio';

const MEMBERS = [
  {
    name: 'ALEX "VOXEL" CHEN',
    role: 'LEAD ARCHITECT / SHADER DEV',
    team: 'TEAM NULLPOINTER',
    track: '8-BIT ARCADE',
    handle: '@voxel_dev',
    avatar: '👾',
    status: 'LOOKING FOR AUDIO DEV',
    skills: ['WASM', 'WebGL', 'C++', 'Rust'],
    avatarBg: '#1f2e3d',
    badge: 'CORE HACKER',
  },
  {
    name: 'SARAH "SYNTH" JENSEN',
    role: 'CHIPTUNE & AUDIO ENGINEER',
    team: 'TEAM 8BITWAVE',
    track: 'CREATIVE RETRO',
    handle: '@sarah_synth',
    avatar: '🎹',
    status: 'TEAM COMPLETE (4/4)',
    skills: ['Web Audio', 'MIDI', 'Tone.js', 'SoundFont'],
    avatarBg: '#2f1f3d',
    badge: 'AUDIO JURY',
  },
  {
    name: 'MARCUS "NEURAL" REYES',
    role: 'AI RESEARCHER & AGENTIC DEV',
    team: 'CYBER-PROMPT',
    track: 'NEURAL PIXEL',
    handle: '@marcus_ai',
    avatar: '🤖',
    status: 'LOOKING FOR PIXEL ARTIST',
    skills: ['Gemini 2.5', 'Python', 'FastAPI', 'React'],
    avatarBg: '#3d2f1f',
    badge: 'MENTOR',
  },
  {
    name: 'ELENA "BYTE" VODANOVA',
    role: 'HARDWARE & EMBEDDED HACKER',
    team: 'FPGA REBELS',
    track: 'HARDWARE HUD',
    handle: '@elena_hw',
    avatar: '🕹️',
    status: 'SOLO BUILDING',
    skills: ['WebSerial', 'ESP32', 'Arduino', 'C'],
    avatarBg: '#1f3d29',
    badge: 'HARDWARE PRO',
  },
  {
    name: 'KAI "ONCHAIN" TANAKA',
    role: 'SMART CONTRACTS / DEPIN',
    team: 'IMMUTABLE ROMS',
    track: 'DECENTRALIZED MESH',
    handle: '@kai_sol',
    avatar: '📦',
    status: 'TEAM COMPLETE (3/3)',
    skills: ['Solana', 'IPFS', 'TypeScript', 'Ethers'],
    avatarBg: '#291f3d',
    badge: 'COMMUNITY',
  },
  {
    name: 'MAYA "SPRITE" PATEL',
    role: 'PIXEL ARTIST & UI DESIGNER',
    team: 'NEON NOSTALGIA',
    track: '8-BIT ARCADE',
    handle: '@maya_pixels',
    avatar: '🎨',
    status: 'OPEN FOR MENTORSHIP',
    skills: ['Aseprite', 'CSS Grid', 'Tailwind', 'Motion'],
    avatarBg: '#3d1f2b',
    badge: 'DESIGN JURY',
  },
];

export function MembersCartridge() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');

  const filteredMembers = MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterRole === 'ALL') return matchesSearch;
    if (filterRole === 'LOOKING') return matchesSearch && m.status.includes('LOOKING');
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-members">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b-2 border-[#2b2e30] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#6fb3d9]">
              HACKER DIRECTORY &amp; TEAMS
            </span>
            <span className="bg-[#16232e] text-[#6fb3d9] border border-[#273f54] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              1,420 REGISTERED
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Find teammates, browse profiles, and connect with cross-disciplinary builders.
          </p>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex items-center">
            <Search className="h-3 w-3 absolute left-2 text-[#7d8285]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH SKILL / NAME..."
              className="bg-[#141618] border border-[#33373a] rounded px-2 pl-7 py-1 text-[8px] font-silkscreen text-[#cfe8ff] placeholder-[#5d6368] focus:outline-none focus:border-[#6fb3d9] w-40 sm:w-48"
            />
          </div>
          <button
            onClick={() => {
              sound.playBlip(700);
              setFilterRole(filterRole === 'ALL' ? 'LOOKING' : 'ALL');
            }}
            className={`font-pixel text-[7px] sm:text-[8px] px-2 py-1 rounded border uppercase cursor-pointer
                       ${
                         filterRole === 'LOOKING'
                           ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                           : 'bg-[#141618] border-[#2b2e30] text-[#7d8285]'
                       }`}
          >
            {filterRole === 'LOOKING' ? 'RECRUITING' : 'ALL'}
          </button>
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grow overflow-y-auto pr-1">
        {filteredMembers.map((member, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-[#141618] border-2 border-[#2b2e30] flex flex-col justify-between hover:border-[#3a444e] transition-none"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-7 w-7 rounded border border-[#33373a] flex items-center justify-center text-sm"
                    style={{ backgroundColor: member.avatarBg }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <span className="font-pixel text-[8px] sm:text-[9px] text-[#cfe8ff] block truncate">
                      {member.name}
                    </span>
                    <span className="font-silkscreen text-[7px] text-[#7d8285]">
                      {member.handle}
                    </span>
                  </div>
                </div>
                <span className="font-silkscreen text-[7px] px-1 py-0.2 rounded bg-[#1e2327] border border-[#333b42] text-[#f4c151]">
                  {member.badge}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="font-silkscreen text-[8px] text-[#a7d38a] block">
                  {member.role}
                </span>
                <span className="font-silkscreen text-[7px] text-[#8f9396] block">
                  {member.team} &bull; {member.track}
                </span>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {member.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-silkscreen text-[6.5px] px-1 py-0.5 rounded bg-[#1b1f22] border border-[#2d343a] text-[#8ea7c2]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Status & Connect button */}
            <div className="pt-2 mt-2 border-t border-[#23272a] flex items-center justify-between">
              <span
                className={`font-silkscreen text-[7px] ${
                  member.status.includes('LOOKING') ? 'text-[#f2933d]' : 'text-[#6ee7b7]'
                }`}
              >
                &bull; {member.status}
              </span>
              <button
                type="button"
                onClick={() => sound.playBlip(900)}
                className="font-pixel text-[7px] text-[#6fb3d9] hover:text-[#f4c151] cursor-pointer"
              >
                [CONNECT &gt;]
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>TEAM FORMATION DEADLINE: 6 HOURS INTO SPRINT</span>
        <span className="text-[#a7d38a]">DISCORD / TEAM-FINDER LIVE</span>
      </div>
    </div>
  );
}
