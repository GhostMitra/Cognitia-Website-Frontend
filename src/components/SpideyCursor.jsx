import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export function SpideyCursor() {
  const { theme, THEMES } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickWebs, setClickWebs] = useState([]);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const moveTimerRef = useRef(null);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobileScreen();
    window.addEventListener('resize', checkMobileScreen);

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
      setIsMoving(true);

      // Add to trail
      setTrail(prev => [
        { x, y, id: Date.now() + Math.random() },
        ...prev.slice(0, 10)
      ]);

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a')
      );
      setIsHovered(Boolean(isInteractive));

      // Reset moving timer so trail disappears when stopped
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
      moveTimerRef.current = setTimeout(() => {
        setIsMoving(false);
        setTrail([]);
      }, 150);
    };

    const handleMouseDown = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const id = Date.now() + Math.random();

      // Spawn 8-directional click web splatter
      const lines = [];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        lines.push({
          x2: x + Math.cos(angle) * 35,
          y2: y + Math.sin(angle) * 35
        });
      }

      setClickWebs(prev => [...prev.slice(-3), { id, x, y, lines }]);

      setTimeout(() => {
        setClickWebs(prev => prev.filter(w => w.id !== id));
      }, 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('resize', checkMobileScreen);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    };
  }, []);

  // DO NOT RENDER CURSOR ON MOBILE PHONES (<768px)
  if (isMobileScreen) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      
      {/* 1. TRAIL LINES - DISAPPEARS WHEN STOPPED */}
      <svg className="w-full h-full absolute inset-0">
        {isMoving && trail.length > 1 && (
          <polyline
            points={trail.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="var(--color-secondary, #00f0ff)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 2"
            opacity="0.8"
          />
        )}

        {/* 2. ON CLICK WEB SPLATTER LINES */}
        {clickWebs.map(w => (
          <g key={w.id} className="animate-ping">
            {w.lines.map((l, idx) => (
              <line
                key={idx}
                x1={w.x}
                y1={w.y}
                x2={l.x2}
                y2={l.y2}
                stroke="var(--color-primary, #ff003c)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* 3. DYNAMIC THEME-CUSTOMIZED SPIDEY CURSOR */}
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ${
          isHovered ? 'scale-135' : 'scale-100'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        {/* Radial Web Target Reticle */}
        <div
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
            isHovered
              ? 'border-yellow-400 bg-red-600/30 scale-125 bio-glow rotate-45'
              : 'border-red-500 bg-slate-950/80'
          }`}
          style={{ borderColor: 'var(--color-primary, #ff003c)' }}
        >
          {/* Center Icon */}
          <span className="text-xs">{currentThemeObj.badge}</span>
        </div>

        {/* Crosshair Spoke Indicators on Hover */}
        {isHovered && (
          <div className="absolute inset-0 border border-dashed border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
        )}
      </div>

    </div>
  );
}
