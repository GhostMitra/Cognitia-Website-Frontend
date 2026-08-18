import { useState } from 'react';
import { Calendar, Clock, MapPin, Flag, CheckCircle, Radio, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

const TIMELINE_EVENTS = [
  {
    phase: 'PHASE 1',
    date: 'DAY 1 - OCT 16',
    time: '14:00 UTC',
    title: 'REGISTRATION & HARDWARE CHECKIN',
    type: 'milestone',
    status: 'completed',
    desc: 'Hacker registration confirmation, team setup channels, and Discord badge claims.',
  },
  {
    phase: 'PHASE 2',
    date: 'DAY 1 - OCT 16',
    time: '17:00 UTC',
    title: 'OPENING CEREMONY & TRACK REVEAL',
    type: 'keynote',
    status: 'completed',
    desc: 'Keynote livestream, secret theme modifier announcement, and mentor pairing opens.',
  },
  {
    phase: 'PHASE 3',
    date: 'DAY 1 - OCT 16',
    time: '18:00 UTC',
    title: 'HACKING SPRINT CLOCK STARTS',
    type: 'milestone',
    status: 'completed',
    desc: '48-hour development sprint kicks off. Git repositories initialize across all 5 tracks.',
  },
  {
    phase: 'PHASE 4',
    date: 'DAY 2 - OCT 17',
    time: '10:00 UTC',
    title: 'CHIPTUNE & SHADER WORKSHOP',
    type: 'workshop',
    status: 'current',
    desc: 'Live masterclass on Web Audio synthesis, WebGL pixel shaders, and Gemini AI agent pipelines.',
  },
  {
    phase: 'PHASE 5',
    date: 'DAY 2 - OCT 17',
    time: '20:00 UTC',
    title: 'MID-SPRINT TELEMETRY CHECK',
    type: 'milestone',
    status: 'upcoming',
    desc: 'Optional mentor feedback hour, preview video testing, and live bug-triage booths.',
  },
  {
    phase: 'PHASE 6',
    date: 'DAY 3 - OCT 18',
    time: '16:00 UTC',
    title: 'SUBMISSION SOFT LOCK & DRAFTS',
    type: 'deadline',
    status: 'upcoming',
    desc: 'Submission forms open. Finalize video recordings and repository README documentation.',
  },
  {
    phase: 'PHASE 7',
    date: 'DAY 3 - OCT 18',
    time: '18:00 UTC',
    title: 'HACKING HARD DEADLINE',
    type: 'deadline',
    status: 'upcoming',
    desc: 'Repo commits freeze. Technical verification, anti-plagiarism scanning, and judging begin.',
  },
  {
    phase: 'PHASE 8',
    date: 'DAY 3 - OCT 18',
    time: '22:00 UTC',
    title: 'AWARDS GALA & DEMO STREAM',
    type: 'keynote',
    status: 'upcoming',
    desc: 'Live showcase of the Top 10 finalists and distribution of $50,000 in bounties.',
  },
];

export function TimelineCartridge() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all');

  const filteredEvents = TIMELINE_EVENTS.filter((e) => {
    if (filter === 'completed') return e.status === 'completed';
    if (filter === 'upcoming') return e.status === 'upcoming' || e.status === 'current';
    return true;
  });

  return (
    <div className="flex flex-col h-full justify-between gap-3 select-none" id="cartridge-timeline">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[12px] sm:text-[13px] text-[#f4c151]">
              EVENT TIMELINE &amp; SCHEDULE
            </span>
            <span className="bg-[#1b2633] text-[#6fb3d9] border border-[#273e54] font-silkscreen text-[8px] px-1.5 py-0.5 rounded-xs">
              48-HOUR SPRINT
            </span>
          </div>
          <p className="font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396]">
            All times standardized to UTC. Sync your clocks for live workshops and hard deadlines.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1">
          {(['all', 'completed', 'upcoming'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                sound.playBlip(650);
                setFilter(f);
              }}
              className={`font-pixel text-[7px] sm:text-[8px] px-2 py-1 rounded border uppercase cursor-pointer
                         ${
                           filter === f
                             ? 'bg-[#203a54] border-[#6fb3d9] text-[#f4c151]'
                             : 'bg-[#141618] border-[#2b2e30] text-[#7d8285] hover:bg-[#1f2225]'
                         }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 grow overflow-y-auto pr-1">
        {filteredEvents.map((item, idx) => {
          const isCurrent = item.status === 'current';
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border-2 flex flex-col justify-between transition-none
                         ${
                           isCurrent
                             ? 'bg-[#162738] border-[#f4c151] shadow-[2px_2px_0_0_rgba(0,0,0,0.5)]'
                             : isCompleted
                             ? 'bg-[#121618] border-[#23292d] opacity-80'
                             : 'bg-[#141618] border-[#2b2e30]'
                         }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {isCurrent ? (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4c151] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f4c151]" />
                      </span>
                    ) : isCompleted ? (
                      <CheckCircle className="h-3 w-3 text-[#a7d38a]" />
                    ) : (
                      <Clock className="h-3 w-3 text-[#7d8285]" />
                    )}
                    <span className="font-silkscreen text-[7px] text-[#8f9396]">{item.phase}</span>
                  </div>

                  <span
                    className={`font-silkscreen text-[7px] px-1.5 py-0.2 rounded border
                               ${
                                 isCurrent
                                   ? 'bg-[#2a2412] border-[#f4c151] text-[#f4c151]'
                                   : isCompleted
                                   ? 'bg-[#152316] border-[#29422a] text-[#a7d38a]'
                                   : 'bg-[#1e2225] border-[#33373a] text-[#8ea7c2]'
                               }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-pixel text-[9px] sm:text-[10px] text-[#cfe8ff] block">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-silkscreen text-[#f4c151] mt-0.5">
                    <span>{item.date}</span> &bull; <span>{item.time}</span>
                  </div>
                </div>

                <p className="font-silkscreen text-[8px] text-[#9aa0a6] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-1.5 mt-1.5 border-t border-[#23272a] flex justify-between items-center text-[7px] font-silkscreen text-[#7d8285]">
                <span>TYPE: {item.type.toUpperCase()}</span>
                <span>SYNC OK [200]</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#26282a] flex items-center justify-between text-[8px] font-silkscreen text-[#7d8285]">
        <span>CURRENT SYSTEM CLOCK: REAL-TIME SYNC &bull; UTC CALIBRATED</span>
        <span className="text-[#f4c151]">LIVE SPRINT ACTIVE</span>
      </div>
    </div>
  );
}
