import React from 'react';
import { BadgeTone } from '../types';
import { sound } from '../utils/audio';

interface IconBadgeProps {
  tone?: BadgeTone;
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export function IconBadge({
  tone = 'white',
  icon,
  ariaLabel,
  onClick,
  className = '',
  active = false,
  title,
  size = 'md',
  id,
}: IconBadgeProps) {
  const toneMap: Record<BadgeTone, string> = {
    orange: 'bg-[var(--color-badge-orange)] text-[#1c1c1c] border-[var(--color-shell-border-inner)]',
    white: 'bg-[var(--color-badge-white)] text-[#1c1c1c] border-[var(--color-shell-border-inner)]',
    red: 'bg-[var(--color-badge-red)] text-white border-[var(--color-shell-border-inner)]',
  };

  const sizeMap = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playClick();
    if (onClick) {
      onClick();
    }
  };

  if (onClick) {
    return (
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        title={title || ariaLabel}
        onClick={handleClick}
        className={`flex ${sizeMap[size]} items-center justify-center rounded-lg border-[3px]
                    ${toneMap[tone]}
                    ${active ? 'translate-x-[2px] translate-y-[2px] shadow-[1px_1px_0_0_rgba(0,0,0,0.4)]' : 'shadow-[3px_3px_0_0_rgba(0,0,0,0.35)]'}
                    active:shadow-[1px_1px_0_0_rgba(0,0,0,0.35)] active:translate-x-[2px] active:translate-y-[2px]
                    cursor-pointer transition-none select-none focus:outline-none focus:ring-2 focus:ring-[var(--color-cta-from)]
                    ${className}`}
      >
        {icon}
      </button>
    );
  }

  return (
    <div
      id={id}
      aria-label={ariaLabel}
      title={title || ariaLabel}
      className={`flex ${sizeMap[size]} items-center justify-center rounded-lg border-[3px]
                  ${toneMap[tone]} shadow-[3px_3px_0_0_rgba(0,0,0,0.35)]
                  select-none ${className}`}
    >
      {icon}
    </div>
  );
}
