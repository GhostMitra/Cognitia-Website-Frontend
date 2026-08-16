import React from 'react';
import { Calendar, Clock, CheckCircle2, Flag, Rocket, Trophy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function TimelinePage() {
  const timelineSteps = [
    {
      date: 'OCT 15, 2026',
      title: 'REGISTRATION OPENS',
      desc: 'Multiverse Spider-Pass claims live. Form your teams and choose your bounty track.',
      status: 'COMPLETED'
    },
    {
      date: 'NOV 01, 2026',
      title: 'TEAM FORMATION & WORKSHOPS',
      desc: 'Netrunner mentorship workshops, AI model tutorials, and team matchmaking.',
      status: 'IN PROGRESS'
    },
    {
      date: 'NOV 12, 2026',
      title: 'HACKATHON KICK-OFF & KEYNOTE',
      desc: 'Live 48-hour coding sprint begins across all 8 Multiverse dimensions!',
      status: 'UPCOMING'
    },
    {
      date: 'NOV 13, 2026',
      title: 'MIDWAY DEMO CHECKPOINT',
      desc: 'Submit draft code architecture for early mentor feedback & bonus swag points.',
      status: 'UPCOMING'
    },
    {
      date: 'NOV 14, 2026',
      title: 'SUBMISSION DEADLINE',
      desc: 'Final project code, video demo, and repository submission deadline.',
      status: 'UPCOMING'
    },
    {
      date: 'NOV 15, 2026',
      title: 'GRAND FINALE & PRIZE CEREMONY',
      desc: 'Live pitch presentations and crowning of the $50,000+ Multiverse Champions!',
      status: 'UPCOMING'
    }
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🗓️ HACKATHON ROADMAP & TIMELINE
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          THE 6-PHASE JOURNEY TO MULTIVERSE GLORY
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 w-full">
        {timelineSteps.map((step, idx) => (
          <div key={idx} className="comic-panel p-3.5 sm:p-5 bg-slate-950 border-3 border-yellow-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-400 text-slate-950 font-black text-sm sm:text-base bungee-font flex items-center justify-center border-2 border-black shrink-0">
                #{idx + 1}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400">{step.date}</span>
                  <span className={`px-2 py-0.5 text-[9px] bungee-font rounded ${
                    step.status === 'COMPLETED' ? 'bg-emerald-400 text-slate-950' : step.status === 'IN PROGRESS' ? 'bg-yellow-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.status}
                  </span>
                </div>

                <h3 className="text-xs sm:text-base font-black bungee-font text-white">
                  {step.title}
                </h3>

                <p className="text-slate-300 text-xs mono-font leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
