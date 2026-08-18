import { Calendar, Clock, Radio, Terminal } from 'lucide-react';

export function TimelineCartridge() {
  return (
    <div className="flex flex-col h-full justify-between items-center text-center gap-4 select-none p-3 sm:p-6" id="cartridge-timeline">
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-2 border-b-2 border-[#2b2e30]">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[12px] sm:text-[14px] text-[#7ec7ff]">
            EVENT SCHEDULE &amp; TIMELINE
          </span>
          <span className="bg-[#142338] text-[#7ec7ff] border border-[#1f4066] font-silkscreen text-[8px] sm:text-[9px] px-2 py-0.5 rounded-xs">
            STATUS: TBA
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-silkscreen text-[8px] text-[#7d8285]">
          <Clock className="h-3 w-3 text-[#f4c151]" />
          <span>30-HOUR SPRINT CALIBRATION</span>
        </div>
      </div>

      {/* Center TBA Card */}
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-lg bg-[#141618] border-[3px] border-black shadow-[inset_3px_3px_0_0_#2b2e30,inset_-3px_-3px_0_0_#0a0b0c,4px_4px_0_0_rgba(0,0,0,0.7)] flex flex-col items-center justify-center my-auto space-y-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1b2533] border-2 border-[#2f435e] flex items-center justify-center shadow-[0_0_16px_rgba(126,199,255,0.2)]">
          <Calendar className="h-7 w-7 sm:h-8 sm:w-8 text-[#7ec7ff] animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="font-silkscreen text-[10px] sm:text-[11px] text-[#7ec7ff] uppercase tracking-widest block">
            [ SPRINT ITINERARY ]
          </span>
          <h3 className="font-pixel text-[20px] sm:text-[26px] md:text-[28px] text-white tracking-wider">
            TO BE ANNOUNCED
          </h3>
          <p className="font-silkscreen text-[8.5px] sm:text-[10px] text-[#9bb7d4] max-w-md mx-auto leading-relaxed">
            The hour-by-hour keynote, hacking checkpoints, workshop broadcasts, and submission deadlines will be announced prior to the event.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 font-silkscreen text-[8px] sm:text-[9px] text-[#a7d38a] bg-[#1e2f18] border border-[#2f4f24] px-3 py-1 rounded-sm">
            <Radio className="h-3 w-3 animate-ping text-[#a7d38a]" />
            DATES &amp; SCHEDULE DROPPING SOON
          </span>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="w-full py-1.5 px-3 rounded bg-[#101214] border border-[#232629] flex items-center justify-between font-silkscreen text-[8px] text-[#7d8285]">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-[#7ec7ff]" />
          <span>CARTRIDGE: TIMELINE.ROM // SPRINT SYNC: PENDING</span>
        </div>
        <span className="text-[#7ec7ff]">TBA 2026</span>
      </div>
    </div>
  );
}
