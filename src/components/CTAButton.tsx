import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { sound } from '../utils/audio';

export interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'gold' | 'silver' | 'ruby';
  icon?: ReactNode;
  soundType?: 'click' | 'coin' | 'boot' | 'blip';
}

export function CTAButton({
  children,
  variant = 'gold',
  icon,
  soundType = 'coin',
  onClick,
  className = '',
  id,
  disabled,
  ...props
}: CTAButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundType === 'coin') sound.playCoin();
    else if (soundType === 'boot') sound.playBoot();
    else if (soundType === 'blip') sound.playBlip(620);
    else sound.playClick();

    if (onClick) onClick(e);
  };

  const variantStyles = {
    gold: `bg-gradient-to-b from-[var(--color-cta-from)] to-[var(--color-cta-to)] border-[var(--color-cta-border)] text-[var(--color-cta-text)] shadow-[4px_4px_0_0_#4a3410] active:shadow-[1px_1px_0_0_#4a3410]`,
    silver: `bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] border-[#334155] text-[#0f172a] shadow-[4px_4px_0_0_#1e293b] active:shadow-[1px_1px_0_0_#1e293b]`,
    ruby: `bg-gradient-to-b from-[#ef4444] to-[#b91c1c] border-[#450a0a] text-white shadow-[4px_4px_0_0_#450a0a] active:shadow-[1px_1px_0_0_#450a0a]`,
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      {...props}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-lg border-[3px]
                 px-3 sm:px-4 py-2 font-pixel text-[10px] sm:text-[11px] tracking-wider uppercase
                 transition-none duration-0 select-none cursor-pointer
                 active:translate-x-[3px] active:translate-y-[3px]
                 focus:outline-none focus:ring-2 focus:ring-amber-300
                 ${variantStyles[variant]}
                 ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
