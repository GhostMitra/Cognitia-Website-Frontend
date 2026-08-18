import React, { useState, useEffect } from 'react';

const DEFAULT_BOOT_LINES = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'BOOTING CORE SERVICES [OK]',
  'LOADING BASE ASSETS: FRAME UI [OK]',
  'STARTING HUD EVENT BUS [OK]',
  'CALIBRATING 8-BIT RENDERER [OK]',
  'WARMING SPRITE & AUDIO CACHE...',
  'VALIDATING ROUTE & CARTRIDGE HANDLERS [OK]',
  'AUTHENTICATING HARDWARE BUS: READY [OK]',
];

export interface BootLogProps {
  key?: React.Key;
  lines?: string[];
  maxLines?: number;
  className?: string;
  onComplete?: () => void;
}

export function BootLog({
  lines = DEFAULT_BOOT_LINES,
  maxLines = 8,
  className = '',
  onComplete,
}: BootLogProps) {
  const [displayedCount, setDisplayedCount] = useState<number>(1);

  useEffect(() => {
    setDisplayedCount(1);
    const interval = setInterval(() => {
      setDisplayedCount((prev) => {
        if (prev < lines.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [lines, onComplete]);

  const visibleLines = lines.slice(0, displayedCount).slice(-maxLines);

  return (
    <div className={`select-none ${className}`} id="console-boot-log-container">
      <ul
        aria-live="polite"
        aria-label="Console Boot Diagnostic Log"
        className="space-y-1 font-mono-pixel text-[13px] sm:text-[15px] leading-tight text-[var(--color-console-text-dim)] tracking-wide"
      >
        {visibleLines.map((line, i) => {
          const isOk = line.includes('[OK]');
          const isPending = line.includes('...');
          const parts = line.split(/(\[OK\])/g);

          return (
            <li
              key={i}
              className="animate-boot-in flex items-center gap-1.5 flex-wrap font-mono"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="text-[#4b5054] select-none text-[11px] font-silkscreen">&gt;</span>
              <span>
                {parts.map((part, pIdx) => {
                  if (part === '[OK]') {
                    return (
                      <span
                        key={pIdx}
                        className="font-bold text-[var(--color-console-text-ok)] bg-[#1e2f18] px-1 py-0.2 rounded-xs border border-[#2f4f24]"
                      >
                        [OK]
                      </span>
                    );
                  }
                  return <span key={pIdx}>{part}</span>;
                })}
              </span>
              {isPending && i === visibleLines.length - 1 && (
                <span className="inline-block w-2 h-3.5 bg-[var(--color-console-text-dim)] animate-pulse ml-1" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
