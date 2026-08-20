import React from 'react';

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const RetroInput: React.FC<RetroInputProps> = ({
  label,
  icon,
  required,
  placeholder = '',
  className = '',
  type = 'text',
  ...props
}) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block font-silkscreen text-[8px] sm:text-[9px] text-[#8f9396] mb-1 flex items-center gap-1">
          {icon}
          <span>{label}</span>
          {required && <span className="text-[#eb5147]">*</span>}
        </label>
      )}

      <div className="relative w-full bg-[#090b0d] border border-[#2b2e30] focus-within:border-[#00f0ff] focus-within:shadow-[0_0_8px_rgba(0,240,255,0.35)] rounded-xs flex items-center px-2.5 py-1 transition-all">
        {/* Native 8-Bit Terminal Input */}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent border-none text-[#cfe8ff] font-['VT323'] text-base tracking-wide focus:outline-none placeholder:text-[#cfe8ff]/35 placeholder:font-['VT323'] caret-[#00f0ff]"
          {...props}
        />
      </div>
    </div>
  );
};
