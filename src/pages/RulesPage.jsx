import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function RulesPage() {
  const rules = [
    { title: '1. ORIGINAL CODE MANDATE', desc: 'All project code must be developed exclusively during the 48-hour hackathon window.' },
    { title: '2. FAIR PLAY & INTEGRITY', desc: 'Plagiarism or copying existing repositories without explicit attribution will result in immediate disqualification.' },
    { title: '3. INCLUSIVITY & RESPECT', desc: 'Cognitia strictly enforces a Zero-Harassment Code of Conduct across all Discord & spatial channels.' },
    { title: '4. SUBMISSION DEADLINE', desc: 'Repositories, video demos, and deck slides must be submitted before Nov 14th 11:59PM EST.' }
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          📜 RULES & CODE OF CONDUCT
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          FAIR PLAY & MULTIVERSE COMMUNITY GUIDELINES
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full">
        {rules.map((r, idx) => (
          <div key={idx} className="comic-panel p-4 sm:p-5 space-y-2 bg-slate-950 border-3 border-yellow-400 w-full">
            <h3 className="text-xs sm:text-sm font-black bungee-font text-yellow-300">
              {r.title}
            </h3>
            <p className="text-xs mono-font text-slate-300 leading-relaxed">
              {r.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
