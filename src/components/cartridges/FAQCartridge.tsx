import { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Terminal,
  Sparkles,
  Search,
  X,
  Users,
  Cpu,
  UploadCloud,
  Trophy,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Headphones,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface FAQItem {
  id: number;
  category: 'GENERAL' | 'TEAMS' | 'TECHNICAL' | 'AI ETHICS' | 'SUBMISSION' | 'PRIZES' | 'HARDWARE';
  question: string;
  answer: string;
  highlights?: string[];
  actionLink?: { label: string; url: string; external?: boolean };
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    category: 'GENERAL',
    question: 'WHO CAN PARTICIPATE IN COGNITIA PIXEL HACKATHON?',
    answer:
      'Anyone! Students, indie developers, retro enthusiasts, AI researchers, and designers of all skill levels worldwide are welcome. Participation is 100% free and fully remote with global online tracks.',
    highlights: ['100% free', 'Fully remote', 'Global eligibility'],
  },
  {
    id: 2,
    category: 'GENERAL',
    question: 'IS THERE ANY REGISTRATION OR PARTICIPATION FEE?',
    answer:
      'Zero! Cognitia Pixel Hackathon is completely free for all hackers. All official workshops, API credits, mentor office hours, and prize entries come at no cost to participants.',
    highlights: ['Zero entry fee', 'Free API credits', 'Free workshops'],
  },
  {
    id: 3,
    category: 'TEAMS',
    question: 'DO I NEED A TEAM BEFORE REGISTERING?',
    answer:
      'No! You can register as an individual builder and use our in-app Hacker Matrix or official Discord #team-finder channel to form or join a team of 1 to 4 members before project submission.',
    highlights: ['Solo builders welcome', '1 to 4 members', 'Hacker Matrix matchmaking'],
  },
  {
    id: 4,
    category: 'TEAMS',
    question: 'CAN TEAM MEMBERS BE FROM DIFFERENT INSTITUTIONS OR COUNTRIES?',
    answer:
      'Yes! Cross-institutional and international teams are strongly encouraged. We celebrate diverse teams combining designers, engineers, AI researchers, and audio artists.',
    highlights: ['Cross-country allowed', 'Interdisciplinary teams encouraged'],
  },
  {
    id: 5,
    category: 'TECHNICAL',
    question: 'WHAT TOOLS, ENGINES, AND TECH STACKS ARE PERMITTED?',
    answer:
      'Any technology stack is permitted! From HTML5 Canvas/WebGL to Rust WASM, Pygame, Phaser, Unity WebGL, or custom Gemini AI pipelines. Pre-existing engines (like Godot/Phaser) are permitted as long as game code is created during the sprint window.',
    highlights: ['Any tech stack', 'Godot/Phaser/Unity allowed', 'HTML5/WebGL/WASM'],
  },
  {
    id: 6,
    category: 'TECHNICAL',
    question: 'WILL API KEYS AND COMPUTE CREDITS BE PROVIDED?',
    answer:
      'Yes! Registered teams will get access to Google Gemini API keys and partner cloud infrastructure credits via the Developer Console prior to the hacking sprint kick-off.',
    highlights: ['Gemini API access', 'Cloud credits provided'],
  },
  {
    id: 7,
    category: 'AI ETHICS',
    question: 'CAN WE USE AI CODE GENERATION & COPILOTS?',
    answer:
      'Yes. Generative AI tools (Gemini, Copilot, ChatGPT, Midjourney) are encouraged. However, we mandate transparent disclosure in your project README explaining how AI was integrated into your workflow.',
    highlights: ['Gemini/Copilot permitted', 'Mandatory README disclosure'],
  },
  {
    id: 8,
    category: 'SUBMISSION',
    question: 'WHAT ARE THE MANDATORY SUBMISSION DELIVERABLES?',
    answer:
      '1) A public GitHub/GitLab repository with open-source license, 2) A 2-minute raw demo video (YouTube/Loom link), and 3) A live working web deployment link or downloadable ROM binary.',
    highlights: ['Public Git repository', '2-min demo video', 'Live link or ROM'],
  },
  {
    id: 9,
    category: 'PRIZES',
    question: 'HOW ARE CASH BOUNTIES AND PRIZES DISTRIBUTED?',
    answer:
      'Cash prizes ($50,000 total pool) are distributed to winning team leads via direct bank wire transfer or USDC escrow within 7 business days following jury verification and ceremony announcement.',
    highlights: ['$50,000 prize pool', 'Direct bank wire or USDC', '7-day fast payout'],
  },
  {
    id: 10,
    category: 'HARDWARE',
    question: 'HOW DOES THE HARDWARE TRACK WORK REMOTELY?',
    answer:
      'If you do not possess physical hardware boards, you can submit a WebSerial/WebUSB simulation, emulator workspace, or virtual gamepad bridge. Hardware judges test on real hardware as well as browser bridges.',
    highlights: ['WebSerial/WebUSB emulators', 'Virtual gamepad bridges'],
  },
];

const CATEGORY_META: Record<
  string,
  { label: string; icon: typeof HelpCircle; color: string; bg: string; border: string }
> = {
  GENERAL: {
    label: 'GENERAL',
    icon: HelpCircle,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
  },
  TEAMS: {
    label: 'TEAMS',
    icon: Users,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
  },
  TECHNICAL: {
    label: 'TECHNICAL',
    icon: Cpu,
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.35)',
  },
  'AI ETHICS': {
    label: 'AI ETHICS',
    icon: Sparkles,
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.12)',
    border: 'rgba(192, 132, 252, 0.35)',
  },
  SUBMISSION: {
    label: 'SUBMISSION',
    icon: UploadCloud,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
    border: 'rgba(52, 211, 153, 0.35)',
  },
  PRIZES: {
    label: 'PRIZES',
    icon: Trophy,
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.12)',
    border: 'rgba(251, 191, 36, 0.35)',
  },
  HARDWARE: {
    label: 'HARDWARE',
    icon: Terminal,
    color: '#fb7185',
    bg: 'rgba(251, 113, 133, 0.12)',
    border: 'rgba(251, 113, 133, 0.35)',
  },
};

export function FAQCartridge() {
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, 'yes' | 'no'>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = ['ALL', 'GENERAL', 'TEAMS', 'TECHNICAL', 'AI ETHICS', 'SUBMISSION', 'PRIZES', 'HARDWARE'];

  // Filtered FAQ items based on category and search query
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.highlights?.some((h) => h.toLowerCase().includes(query))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: number) => {
    sound.playBlip(expandedIds.includes(id) ? 450 : 700);
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    sound.playBlip(750);
    if (expandedIds.length === filteredFaqs.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(filteredFaqs.map((f) => f.id));
    }
  };

  const handleVote = (id: number, vote: 'yes' | 'no') => {
    sound.playCoin();
    setHelpfulVotes((prev) => ({ ...prev, [id]: vote }));
  };

  const handleCopyLink = (id: number, questionText: string) => {
    sound.playBlip(880);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#faq-${id}`);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-2.5 select-none" id="cartridge-faq">
      {/* Top Banner Header */}
      <div className="flex flex-col gap-2 pb-2 border-b border-[#2b2e30]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[12px] sm:text-[14px] text-[#f4c151] tracking-wide flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#6fb3d9]" />
                KNOWLEDGE BASE & FAQ
              </span>
              <span className="bg-[#1f2937] text-[#38bdf8] border border-[#0284c7] font-silkscreen text-[8px] px-2 py-0.5 rounded-full shadow-xs">
                v2.4 LIVE
              </span>
            </div>
            <p className="font-silkscreen text-[8.5px] sm:text-[9.5px] text-[#9ca3af] mt-0.5">
              Comprehensive guidelines on eligibility, teams, tools, AI policies, deliverables & prizes.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-[#12161a] border border-[#262c33] px-2.5 py-1 rounded-md text-[8px] font-silkscreen text-[#9ca3af]">
            <span className="flex items-center gap-1 text-[#f4c151]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              {FAQ_ITEMS.length} MODULES
            </span>
            <span className="text-[#4b5563]">|</span>
            <span className="text-[#38bdf8]">24/7 SUPPORT</span>
          </div>
        </div>

        {/* Search Bar & Master Action Toggle */}
        <div className="flex items-center gap-2 mt-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6b7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, keywords (e.g. Gemini, teams, prizes)..."
              className="w-full bg-[#12161a] border border-[#2b323b] focus:border-[#38bdf8] focus:outline-hidden text-[11px] font-mono-retro text-[#e5e7eb] pl-8 pr-7 py-1.5 rounded-md transition-colors placeholder:text-[#6b7280]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#ffffff] p-0.5 rounded-sm"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleExpandAll}
            title={expandedIds.length === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
            className="flex items-center gap-1 bg-[#182029] hover:bg-[#202b38] border border-[#2b3847] text-[#6fb3d9] font-pixel text-[8px] px-2.5 py-2 rounded-md cursor-pointer transition-colors whitespace-nowrap shrink-0"
          >
            {expandedIds.length === filteredFaqs.length ? (
              <>
                <Minimize2 className="h-3 w-3" />
                <span className="hidden sm:inline">COLLAPSE ALL</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3 w-3" />
                <span className="hidden sm:inline">EXPAND ALL</span>
              </>
            )}
          </button>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5 no-scrollbar">
          {categories.map((cat) => {
            const count =
              cat === 'ALL'
                ? FAQ_ITEMS.length
                : FAQ_ITEMS.filter((f) => f.category === cat).length;
            const meta = CATEGORY_META[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sound.playBlip(650);
                  setActiveCategory(cat);
                }}
                style={{
                  borderColor: isActive ? meta?.color || '#38bdf8' : undefined,
                }}
                className={`font-pixel text-[7.5px] px-2 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap group ${
                  isActive
                    ? 'bg-[#1a2736] text-[#f4c151] font-bold shadow-xs'
                    : 'bg-[#12161a] border-[#252b33] text-[#9ca3af] hover:bg-[#1a2027] hover:text-[#d1d5db]'
                }`}
              >
                {/* 8-Bit Pixel Pin Pointer */}
                <img
                  src={isActive ? '/red_pin.png' : '/white_pin.png'}
                  alt="pin"
                  className={`w-3 h-3 object-contain pixelated pointer-events-none transition-transform duration-100 ${
                    isActive ? 'scale-110' : 'opacity-50 group-hover:opacity-100'
                  }`}
                />
                <span>{cat}</span>
                <span
                  className={`text-[7px] font-silkscreen px-1 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-[#2b3e54] text-[#ffffff]'
                      : 'bg-[#1e242b] text-[#6b7280]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main FAQ Accordion List */}
      <div className="space-y-2 grow overflow-y-auto pr-1">
        {filteredFaqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-[#2b3440] rounded-xl bg-[#11151a]">
            <HelpCircle className="h-10 w-10 text-[#6b7280] mb-2 animate-bounce" />
            <h4 className="font-pixel text-[11px] text-[#f4c151] mb-1">NO MATCHING QUESTIONS FOUND</h4>
            <p className="font-silkscreen text-[9px] text-[#9ca3af] max-w-md mb-4">
              We couldn't find any FAQs matching "{searchQuery}". Try refining your search query or reset filters.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="font-pixel text-[8px] bg-[#203a54] hover:bg-[#2a4d70] border border-[#6fb3d9] text-[#ffffff] px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <img src="/red_pin.png" alt="pin" className="w-3 h-3 pixelated" />
                <span>RESET FILTERS</span>
              </button>
            </div>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedIds.includes(faq.id);
            const meta = CATEGORY_META[faq.category];
            const CategoryIcon = meta?.icon || HelpCircle;
            const vote = helpfulVotes[faq.id];

            return (
              <div
                key={faq.id}
                id={`faq-${faq.id}`}
                style={{
                  borderLeftColor: meta?.color || '#38bdf8',
                  borderLeftWidth: '4px',
                }}
                className={`rounded-lg border border-[#242b35] transition-all overflow-hidden group/card ${
                  isExpanded
                    ? 'bg-[#151c24] shadow-md border-t-[#2d3a4b]'
                    : 'bg-[#11161c] hover:bg-[#151a22] hover:border-[#323c4a]'
                }`}
              >
                {/* Question Row Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left cursor-pointer gap-2 group/btn"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                    {/* 8-Bit Pixel Pin Pointer on Question Header */}
                    <img
                      src={isExpanded ? '/red_pin.png' : '/white_pin.png'}
                      alt="pointer pin"
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain pixelated shrink-0 transition-transform duration-150 ${
                        isExpanded
                          ? 'scale-110 filter drop-shadow-[0_0_4px_rgba(244,193,81,0.6)]'
                          : 'opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5'
                      }`}
                    />

                    {/* Category Tag */}
                    <span
                      style={{
                        backgroundColor: meta?.bg || 'rgba(56, 189, 248, 0.1)',
                        borderColor: meta?.border || '#38bdf8',
                        color: meta?.color || '#38bdf8',
                      }}
                      className="font-silkscreen text-[7.5px] px-2 py-0.5 rounded-xs border flex items-center gap-1 shrink-0"
                    >
                      <CategoryIcon className="h-3 w-3" />
                      <span>{faq.category}</span>
                    </span>

                    {/* Question text */}
                    <span
                      className={`font-pixel text-[8.5px] sm:text-[9.5px] leading-snug transition-colors ${
                        isExpanded ? 'text-[#f4c151]' : 'text-[#e2e8f0] group-hover/btn:text-[#6fb3d9]'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Indicator */}
                  <div
                    className={`p-1 rounded-md transition-transform duration-200 shrink-0 ${
                      isExpanded ? 'bg-[#203448] text-[#f4c151]' : 'bg-[#192028] text-[#9ca3af]'
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="px-3 sm:px-4 pb-3.5 pt-2 border-t border-[#1f2732] bg-[#0e1318]/90 text-[9px] sm:text-[10px] font-silkscreen text-[#d1d5db] leading-relaxed flex flex-col gap-3">
                    <p className="text-[#cbd5e1]">{faq.answer}</p>

                    {/* Highlighted tags */}
                    {faq.highlights && faq.highlights.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[7.5px] text-[#6b7280] uppercase tracking-wider font-mono flex items-center gap-1">
                          <img src="/red_pin.png" alt="pin" className="w-2.5 h-2.5 pixelated" />
                          Key Takeaways:
                        </span>
                        {faq.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="bg-[#172330] text-[#38bdf8] border border-[#25394f] text-[7.5px] px-2 py-0.5 rounded-full font-mono flex items-center gap-1"
                          >
                            <span className="text-[#f4c151]">►</span>
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Interactive Action Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1b232c] text-[8px]">
                      {/* Helpful Feedback */}
                      <div className="flex items-center gap-2 text-[#9ca3af]">
                        <span>Was this helpful?</span>
                        <button
                          type="button"
                          onClick={() => handleVote(faq.id, 'yes')}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer border transition-colors ${
                            vote === 'yes'
                              ? 'bg-[#143828] border-[#10b981] text-[#34d399]'
                              : 'bg-[#171d24] border-[#29323d] hover:bg-[#202832] text-[#9ca3af]'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>YES</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVote(faq.id, 'no')}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer border transition-colors ${
                            vote === 'no'
                              ? 'bg-[#3b1717] border-[#f43f5e] text-[#fb7185]'
                              : 'bg-[#171d24] border-[#29323d] hover:bg-[#202832] text-[#9ca3af]'
                          }`}
                        >
                          <ThumbsDown className="h-3 w-3" />
                          <span>NO</span>
                        </button>
                        {vote && (
                          <span className="text-[#34d399] font-pixel text-[7px] animate-fade-in flex items-center gap-1">
                            <img src="/red_pin.png" alt="pin" className="w-2.5 h-2.5 pixelated" />
                            THANKS FOR FEEDBACK!
                          </span>
                        )}
                      </div>

                      {/* Copy Link Button */}
                      <button
                        type="button"
                        onClick={() => handleCopyLink(faq.id, faq.question)}
                        className="flex items-center gap-1 bg-[#16202b] hover:bg-[#1e2c3b] border border-[#2b3c4f] text-[#6fb3d9] px-2 py-1 rounded cursor-pointer transition-colors"
                      >
                        {copiedId === faq.id ? (
                          <>
                            <Check className="h-3 w-3 text-[#34d399]" />
                            <span className="text-[#34d399]">LINK COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>COPY LINK</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Support Ribbon */}
      <div className="pt-2 border-t border-[#262c33] flex flex-col sm:flex-row items-center justify-between gap-2 text-[8.5px] font-silkscreen text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <Headphones className="h-3.5 w-3.5 text-[#38bdf8]" />
          <span>STILL HAVE QUESTIONS? VISIT DISCORD #HELP-DESK</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playCoin()}
            className="flex items-center gap-1.5 font-pixel text-[7.5px] bg-[#1d2d3d] hover:bg-[#283e54] text-[#f4c151] border border-[#38bdf8] px-2.5 py-1 rounded cursor-pointer transition-colors group/cta"
          >
            <img src="/red_pin.png" alt="pin" className="w-3 h-3 pixelated group-hover/cta:scale-110" />
            <span>JOIN DISCORD COMMUNITY</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

