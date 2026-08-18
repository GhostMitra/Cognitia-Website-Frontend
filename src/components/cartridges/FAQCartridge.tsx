import { useState } from 'react';
import { HelpCircle, ChevronRight, MessageSquare, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

const FAQ_ITEMS = [
  {
    category: 'GENERAL',
    question: 'WHO CAN PARTICIPATE IN PIXEL HACKATHON?',
    answer:
      'Anyone! Students, indie developers, retro enthusiasts, AI researchers, and designers of all skill levels worldwide. Participation is 100% free and fully remote.',
  },
  {
    category: 'TEAMS',
    question: 'DO I NEED A TEAM BEFORE REGISTERING?',
    answer:
      'No! You can register as an individual builder and use our in-app Hacker Matrix or Discord #team-finder channel to form or join a team of 1 to 4 members.',
  },
  {
    category: 'TECHNICAL',
    question: 'WHAT TOOLS AND ENGINES ARE PERMITTED?',
    answer:
      'Any technology stack is allowed! From HTML5 Canvas/WebGL to Rust WASM, Pygame, Phaser, Unity WebGL, or custom Gemini AI pipelines. Pre-existing engines (like Godot/Phaser) are permitted as long as game code is built during the sprint.',
  },
  {
    category: 'AI ETHICS',
    question: 'CAN WE USE AI CODE GENERATION & COPILOTS?',
    answer:
      'Yes. Generative AI tools (Gemini, Copilot, ChatGPT, Midjourney) are permitted. We mandate full disclosure in your project README explaining how AI was integrated into your workflow.',
  },
  {
    category: 'SUBMISSION',
    question: 'WHAT ARE THE MANDATORY SUBMISSION DELIVERABLES?',
    answer:
      '1) A public GitHub/GitLab repository with open-source license, 2) A 2-minute raw demo video (YouTube/Loom), 3) A live working web deployment or downloadable ROM.',
  },
  {
    category: 'PRIZES',
    question: 'HOW ARE CASH BOUNTIES AND PRIZES DISTRIBUTED?',
    answer:
      'Cash prizes ($50,000 pool) are distributed to winning team leads via direct bank wire transfer or USDC escrow within 7 business days after the final awards ceremony.',
  },
  {
    category: 'HARDWARE',
    question: 'HOW DOES THE HARDWARE HUD TRACK WORK VIRTUALLY?',
    answer:
      'If you do not have physical hardware, you can submit a WebSerial/WebUSB simulation or use browser virtual gamepads. Hardware judges have emulators and serial bridges ready.',
  },
];

export function FAQCartridge() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'GENERAL', 'TEAMS', 'TECHNICAL', 'AI ETHICS', 'PRIZES'];

  const filteredFaqs = FAQ_ITEMS.filter((f) => {
    if (activeCategory === 'ALL') return true;
    return f.category === activeCategory;
  });

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-faq">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b-2 border-[#2b2e30] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#f4c151]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <span className="bg-[#242013] text-[#f4c151] border border-[#4d4120] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              KNOWLEDGE BASE
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            Answers to common questions regarding eligibility, teams, tools, AI policy, and judging.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playBlip(650);
                setActiveCategory(cat);
              }}
              className={`font-pixel text-[7px] px-1.5 py-1 rounded border uppercase whitespace-nowrap cursor-pointer
                         ${
                           activeCategory === cat
                             ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                             : 'bg-[#141618] border-[#2b2e30] text-[#7d8285] hover:bg-[#1b1e21]'
                         }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main FAQ Accordion List */}
      <div className="space-y-1.5 grow overflow-y-auto pr-1">
        {filteredFaqs.map((faq, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-lg border-2 transition-none overflow-hidden
                         ${
                           isExpanded
                             ? 'bg-[#16212b] border-[#6fb3d9]'
                             : 'bg-[#141618] border-[#2b2e30] hover:border-[#3a444e]'
                         }`}
            >
              <button
                type="button"
                onClick={() => {
                  sound.playBlip(isExpanded ? 450 : 700);
                  setExpandedIdx(isExpanded ? null : idx);
                }}
                className="w-full p-2.5 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-silkscreen text-[7px] px-1 py-0.2 rounded border
                               ${
                                 isExpanded
                                   ? 'bg-[#1f3a54] border-[#6fb3d9] text-[#f4c151]'
                                   : 'bg-[#1e2225] border-[#33373a] text-[#8ea7c2]'
                               }`}
                  >
                    {faq.category}
                  </span>
                  <span className="font-pixel text-[8px] sm:text-[9px] text-[#cfe8ff]">
                    {faq.question}
                  </span>
                </div>
                <ChevronRight
                  className={`h-3.5 w-3.5 text-[#f4c151] transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-[#263542] text-[8.5px] sm:text-[9.5px] font-silkscreen text-[#9aa0a6] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Support Info */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-3 w-3 text-[#6fb3d9]" />
          <span>STILL HAVE QUESTIONS? ASK IN #SUPPORT ON DISCORD</span>
        </div>
        <button
          type="button"
          onClick={() => sound.playCoin()}
          className="font-pixel text-[7.5px] text-[#f4c151] hover:underline cursor-pointer"
        >
          [JOIN DISCORD &gt;]
        </button>
      </div>
    </div>
  );
}
