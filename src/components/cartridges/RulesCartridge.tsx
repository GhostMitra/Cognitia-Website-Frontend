import { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Scale, Award, Terminal } from 'lucide-react';
import { sound } from '../../utils/audio';

const RULES = [
  {
    id: 'rule-1',
    title: 'ORIGINAL CODE & TIMEFRAME',
    status: 'MANDATORY',
    category: 'INTEGRITY',
    icon: CheckCircle2,
    color: '#a7d38a',
    description:
      'All project code, assets, and builds must be initiated within the 48-hour sprint window. Open source libraries and public AI models are permitted with explicit citation.',
    penalties: 'Disqualification from bounty categories if pre-existing codebases are submitted without declaration.',
  },
  {
    id: 'rule-2',
    title: 'TEAM COMPOSITION & LIMITS',
    status: 'ENFORCED',
    category: 'TEAMS',
    icon: Scale,
    color: '#f4c151',
    description:
      'Teams can consist of 1 to 4 members. Cross-disciplinary hackers (designers, sound engineers, smart contract developers, AI researchers) are strongly encouraged.',
    penalties: 'Maximum 4 participants per registered submission repository.',
  },
  {
    id: 'rule-3',
    title: 'OPEN SUBMISSION & DEMO VIDEO',
    status: 'MANDATORY',
    category: 'DELIVERABLE',
    icon: Terminal,
    color: '#6fb3d9',
    description:
      'Every submission must provide: 1) Public GitHub/GitLab repository with open-source license, 2) 2-minute raw demo video, 3) Live deployed demo link or binary ROM.',
    penalties: 'Incomplete submissions without working demo links will not be scored by the technical jury.',
  },
  {
    id: 'rule-4',
    title: 'AI ATTRIBUTION & TRANSPARENCY',
    status: 'REQUIRED',
    category: 'AI ETHICS',
    icon: AlertTriangle,
    color: '#f2933d',
    description:
      'Generative AI models (Gemini, Claude, GPT, Midjourney) may be leveraged for brainstorming, scaffolding, and asset generation, but your README must document prompting workflows.',
    penalties: 'Undisclosed raw AI dumps without custom architecture will receive zero technical merit points.',
  },
  {
    id: 'rule-5',
    title: 'CODE OF CONDUCT & FAIR PLAY',
    status: 'ZERO TOLERANCE',
    category: 'COMMUNITY',
    icon: ShieldAlert,
    color: '#c23b3b',
    description:
      'Harassment, offensive content, aggressive behavior, or sabotage in Discord, GitHub PRs, or team channels results in immediate expulsion and hardware badge revoking.',
    penalties: 'Immediate permanent ban from all future pixel community leagues and sponsor bounties.',
  },
];

const JUDGING_CRITERIA = [
  { label: 'TECHNICAL CRAFT', weight: '30%', desc: 'Architecture, polish, code quality, and performance.' },
  { label: 'RETRO INNOVATION', weight: '25%', desc: 'Unique aesthetic, chiptune design, or novel gameplay.' },
  { label: 'UTILITY & IMPACT', weight: '25%', desc: 'Solves a real friction, works cleanly, high usability.' },
  { label: 'POLISH & PRESENTATION', weight: '20%', desc: 'Working live demo, compelling 2-min demo video.' },
];

export function RulesCartridge() {
  const [selectedRule, setSelectedRule] = useState<number>(0);

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-rules">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#f4c151]">
              RULES &amp; REGULATIONS
            </span>
            <span className="bg-[#241818] text-[#f2933d] border border-[#422525] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              OFFICIAL PROTOCOL V2.6
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Strict standards governing fairness, original code, AI disclosure, and judging criteria.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Rules List, Right Detail & Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 grow overflow-hidden">
        {/* Left rules selector */}
        <div className="lg:col-span-5 flex flex-col gap-1.5 overflow-y-auto pr-1">
          {RULES.map((rule, idx) => {
            const isSelected = selectedRule === idx;
            const Icon = rule.icon;
            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => {
                  sound.playBlip(500 + idx * 80);
                  setSelectedRule(idx);
                }}
                className={`w-full text-left p-2 rounded-md border-2 transition-none cursor-pointer flex items-center justify-between
                           ${
                             isSelected
                               ? 'bg-[#1a2d42] border-[#f4c151] shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] translate-x-1'
                               : 'bg-[#141618] border-[#2b2e30] hover:bg-[#1b1e21]'
                           }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span style={{ color: rule.color }} className="shrink-0">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="truncate">
                    <span className="font-pixel text-[8px] text-[#cfe8ff] block truncate">
                      {rule.title}
                    </span>
                    <span className="font-silkscreen text-[7px] text-[#8f9396]">
                      {rule.category} &bull; {rule.status}
                    </span>
                  </div>
                </div>
                {isSelected && <span className="text-[#f4c151] font-pixel text-[9px]">&gt;</span>}
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 flex flex-col justify-between p-3 rounded-lg bg-[#141618] border-2 border-[#2b2e30] shadow-inner overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#2b2e30] pb-2">
              <span className="font-pixel text-[10px] text-[#f4c151]">
                {RULES[selectedRule].title}
              </span>
              <span
                style={{ color: RULES[selectedRule].color }}
                className="font-silkscreen text-[8px] px-2 py-0.5 rounded bg-[#1e2225] border border-[#33373a]"
              >
                {RULES[selectedRule].status}
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase block">
                REQUIREMENT:
              </span>
              <p className="font-silkscreen text-[9px] sm:text-[10px] text-[#d6e2eb] leading-relaxed">
                {RULES[selectedRule].description}
              </p>
            </div>

            <div className="p-2 rounded bg-[#1c1414] border border-[#442222] space-y-1">
              <span className="font-silkscreen text-[7px] text-[#ef4444] uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="h-2.5 w-2.5" /> ENFORCEMENT &amp; PENALTY:
              </span>
              <p className="font-silkscreen text-[8px] text-[#e0a2a2] leading-normal">
                {RULES[selectedRule].penalties}
              </p>
            </div>
          </div>

          {/* Judging Criteria Footer */}
          <div className="mt-3 pt-2 border-t border-[#2b2e30]">
            <span className="font-silkscreen text-[8px] text-[#8f9396] uppercase block mb-1.5 flex items-center gap-1">
              <Award className="h-3 w-3 text-[#f4c151]" /> OFFICIAL JUDGING RUBRIC:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {JUDGING_CRITERIA.map((crit, i) => (
                <div key={i} className="p-1.5 rounded bg-[#1b1f23] border border-[#2d343a] text-center">
                  <span className="font-pixel text-[9px] text-[#a7d38a] block">{crit.weight}</span>
                  <span className="font-silkscreen text-[7px] text-[#cfe8ff] block truncate">{crit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>ALL SUBMISSIONS DUE BY DEADLINE &bull; JURY VERDICT IS FINAL</span>
        <span className="text-[#a7d38a]">VERIFIED BY ETHICAL COMMITTEE</span>
      </div>
    </div>
  );
}
