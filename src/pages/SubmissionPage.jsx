import React, { useState } from 'react';
import { Upload, Link, Github, Youtube, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';
import confetti from 'canvas-confetti';

export function SubmissionPage() {
  const { showAlert } = useTheme();
  const [subData, setSubData] = useState({
    title: 'Spider-Net AI Agent',
    repo: 'https://github.com/spidey/spider-net-agent',
    demo: 'https://youtu.be/spidey-demo',
    desc: 'Autonomous multi-agent system built for Night City 2077.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.victoryChime();
    try { confetti({ particleCount: 150, spread: 90 }); } catch (err) {}
    showAlert('PROJECT SUBMITTED', 'Your project has been logged in the Multiverse Registry!', 'success');
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          🚀 PROJECT SUBMISSION PORTAL
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          SUBMIT YOUR CODE REPOSITORY & DEMO VIDEO BEFORE DEADLINE
        </p>
      </div>

      <form onSubmit={handleSubmit} className="comic-panel p-4 sm:p-6 space-y-4 bg-slate-950 border-3 border-yellow-400 max-w-2xl mx-auto w-full">
        <div className="space-y-3 font-mono text-xs text-slate-200">
          <div>
            <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">PROJECT TITLE</label>
            <input
              type="text"
              required
              value={subData.title}
              onChange={(e) => setSubData({ ...subData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">GITHUB / REPOSITORY URL</label>
            <input
              type="url"
              required
              value={subData.repo}
              onChange={(e) => setSubData({ ...subData, repo: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">VIDEO DEMO URL (YOUTUBE / LOOM)</label>
            <input
              type="url"
              required
              value={subData.demo}
              onChange={(e) => setSubData({ ...subData, demo: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs bungee-font text-cyan-400 mb-1">PROJECT ARCHITECTURE DESCRIPTION</label>
            <textarea
              rows={3}
              required
              value={subData.desc}
              onChange={(e) => setSubData({ ...subData, desc: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-yellow-400 outline-none resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 theme-bg-primary hover:brightness-110 text-white font-black text-xs sm:text-base bungee-font rounded-xl comic-panel transition flex items-center justify-center space-x-2 bio-glow shadow-xl"
        >
          <span>🚀 TRANSMIT PROJECT TO JUDGES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
