import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Bot, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundFX } from '../audio/soundFX';

export function FaqPage() {
  const { theme, THEMES } = useTheme();
  const [openIdx, setOpenIdx] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'spidey-bot', text: 'Hey there hacker! I\'m Peter\'s AI Assistant. Ask me anything about Cognitia 2026!' }
  ]);

  const faqs = [
    { q: 'WHO CAN REGISTER FOR COGNITIA 2026?', a: 'Any student, developer, designer, or AI builder from around the multiverse! Registration is 100% free.' },
    { q: 'WHAT IS THE TEAM SIZE?', a: 'Teams can range from 1 to 4 members. You can also register solo and find teammates via our Hacker Directory!' },
    { q: 'CAN I SUBMIT PRE-EXISTING PROJECTS?', a: 'All code submitted must be written during the 48-hour hackathon window. Open-source libraries and APIs are permitted.' },
    { q: 'HOW ARE PROJECTS JUDGED?', a: 'Projects are evaluated on Technical Complexity (30%), Innovation (30%), Design Aesthetics (20%), and Presentation (20%).' }
  ];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    soundFX.buttonClick();

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      soundFX.spiderSense();
      setChatMessages(prev => [...prev, {
        sender: 'spidey-bot',
        text: `Spider-Sense Activated! Great question about "${userText}". All code must be submitted before Nov 14th 11:59PM EST!`
      }]);
    }, 600);
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 py-1 sm:py-2 select-none overflow-x-hidden">
      
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black bungee-font text-white">
          ❓ FAQ & ASK SPIDEY BOT AI
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mono-font">
          FREQUENTLY ASKED QUESTIONS & REAL-TIME SPIDEY AI ASSISTANT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
        
        {/* Accordion FAQs */}
        <div className="space-y-3 w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="comic-panel p-4 bg-slate-950 border-3 border-yellow-400 space-y-2 w-full">
                <button
                  onClick={() => {
                    soundFX.buttonClick();
                    setOpenIdx(isOpen ? null : idx);
                  }}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-black bungee-font text-yellow-300 pr-2">
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <p className="text-xs font-mono text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask Spidey Bot AI Drawer */}
        <div className="comic-panel p-4 bg-slate-950 border-3 border-cyan-400 space-y-3 w-full flex flex-col h-[380px]">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-black bungee-font text-cyan-400">ASK SPIDEY BOT AI</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 p-2 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-yellow-400 text-slate-950 text-right ml-6 font-bold' : 'bg-slate-950 text-cyan-300 mr-6 border border-slate-800'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Ask Spidey Bot anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white font-mono text-xs focus:border-cyan-400 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-400 text-slate-950 font-black text-xs bungee-font rounded-xl border-2 border-black flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
