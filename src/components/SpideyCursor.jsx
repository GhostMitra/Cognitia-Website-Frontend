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
          x2: x + Math.cos(angle) * 40,
          y2: y + Math.sin(angle) * 40
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
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      
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
            opacity="0.85"
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

      {/* 3. DYNAMIC WEB-SHOOTER GAUNTLET & NOZZLE CURSOR */}
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ${
          isHovered ? 'scale-125' : 'scale-100'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        {/* Authentic Web-Shooter SVG Gauntlet / Nozzle */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Gauntlet Metallic Base */}
            <rect x="20" y="32" width="24" height="26" rx="4" fill="#0d0f26" stroke="#000" strokeWidth="3" />
            
            {/* Dual Web Fluid Cartridges */}
            <rect x="12" y="34" width="7" height="20" rx="3" fill="var(--color-primary, #fcee09)" stroke="#000" strokeWidth="2" />
            <rect x="45" y="34" width="7" height="20" rx="3" fill="var(--color-primary, #fcee09)" stroke="#000" strokeWidth="2" />
            
            {/* Emitter Nozzle Trigger Bar */}
            <rect x="27" y="16" width="10" height="18" rx="2" fill="var(--color-secondary, #00f0ff)" stroke="#000" strokeWidth="2" />
            
            {/* Web Emitter Tip Pin */}
            <circle cx="32" cy="12" r="4" fill="#ffffff" stroke="#000" strokeWidth="2" />
            
            {/* Laser Target Crosshair Lines (Glows on Hover) */}
            <line x1="32" y1="2" x2="32" y2="8" stroke={isHovered ? '#ff003c' : 'var(--color-primary, #fcee09)'} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="32" y1="56" x2="32" y2="62" stroke={isHovered ? '#ff003c' : 'var(--color-primary, #fcee09)'} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="2" y1="32" x2="8" y2="32" stroke={isHovered ? '#ff003c' : 'var(--color-primary, #fcee09)'} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="32" x2="62" y2="32" stroke={isHovered ? '#ff003c' : 'var(--color-primary, #fcee09)'} strokeWidth="2.5" strokeLinecap="round" />

            {/* Target Reticle Lock Box on Hover */}
            {isHovered && (
              <rect x="10" y="10" width="44" height="44" rx="6" fill="none" stroke="#ff003c" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" style={{ transformOrigin: '32px 32px', animationDuration: '3s' }} />
            )}
          </svg>

          {/* Universe Badge Icon */}
          <span className="absolute text-[10px] bottom-1 font-bold pointer-events-none drop-shadow">
            {currentThemeObj.badge}
          </span>
        </div>
      </div>

    </div>
  );
}
