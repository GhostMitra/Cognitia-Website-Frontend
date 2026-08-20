import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, Play, ShieldCheck, HelpCircle } from 'lucide-react';
import { subscribeInstallState, promptInstallApp } from '../pwaRegister';
import { sound } from '../utils/audio';

interface PWAConsoleScreenProps {
  onContinueToDashboard: () => void;
}

export const PWAConsoleScreen: React.FC<PWAConsoleScreenProps> = ({ onContinueToDashboard }) => {
  const [canInstall, setCanInstall] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  React.useEffect(() => {
    const unsub = subscribeInstallState((installable) => {
      setCanInstall(installable);
    });

    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true
    ) {
      setInstalled(true);
    }

    return () => unsub();
  }, []);

  const handleInstall = async () => {
    sound.playClick();
    if (canInstall) {
      const success = await promptInstallApp();
      if (success) {
        setInstalled(true);
        handleProceed();
        return;
      }
    } else {
      setShowGuideModal(true);
    }
  };

  const handleProceed = () => {
    sound.playCoin();
    if (rememberChoice && typeof window !== 'undefined') {
      localStorage.setItem('cognitia_pwa_prompt_dismissed', 'true');
    }
    onContinueToDashboard();
  };

  return (
    <div
      className="flex-1 w-full h-full min-h-[440px] flex flex-col justify-between p-3 sm:p-5 text-center select-none font-['VT323'] bg-[#0f1226] text-white relative overflow-hidden"
      id="pwa-console-screen"
    >
      {/* Top Retro Banner */}
      <div className="flex items-center justify-between border-b-2 border-[#f4c151] pb-2 text-[#f4c151] font-['Silkscreen'] text-xs uppercase tracking-wider shrink-0">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#00f0ff] animate-bounce" />
          <span>COGNITIA PWA APP // MODULE READY</span>
        </div>
        <span className="text-[9px] bg-[#2a2208] border border-[#f4c151] px-1.5 py-0.5 text-[#f4c151]">
          {canInstall ? 'READY' : 'STANDALONE'}
        </span>
      </div>

      {/* Main Center Area */}
      <div className="my-auto flex flex-col items-center space-y-4 max-w-lg mx-auto py-2">
        {/* Glowing App Icon Frame */}
        <div className="relative p-2.5 bg-black/60 border-2 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] transform hover:scale-105 transition-transform">
          <img
            src="/icon-192x192.png"
            alt="Cognitia App Icon"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain pixelated"
          />
        </div>

        {/* Header */}
        <div>
          <h2 className="font-['Press_Start_2P'] text-sm sm:text-lg text-[#00f0ff] tracking-wider drop-shadow-[2px_2px_0px_#000000]">
            INSTALL COGNITIA 2K26
          </h2>
          <p className="font-['Silkscreen'] text-xs sm:text-sm text-[#f4c151] mt-1 tracking-widest">
            ENHANCED STANDALONE RETRO CONSOLE
          </p>
        </div>

        {/* Feature List Box */}
        <div className="w-full bg-black/70 border border-current/40 p-3 text-left space-y-1.5 text-xs sm:text-sm shadow-[4px_4px_0px_#000000]">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-4 h-4 text-[#00f0ff] shrink-0" />
            <span>Instant Home Screen &amp; Dock Launching</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-4 h-4 text-[#00f0ff] shrink-0" />
            <span>Offline Shell &amp; Asset Cache Engine</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-4 h-4 text-[#00f0ff] shrink-0" />
            <span>Full-Screen Immersive Arcade Display</span>
          </div>
        </div>

        {/* Remember Preference Checkbox */}
        <label className="flex items-center gap-2 text-xs font-['Silkscreen'] text-gray-300 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={rememberChoice}
            onChange={(e) => setRememberChoice(e.target.checked)}
            className="w-4 h-4 accent-[#f4c151] cursor-pointer"
          />
          <span>REMEMBER MY PREFERENCE (DON'T ASK EVERY BOOT)</span>
        </label>
      </div>

      {/* Action Buttons Footer */}
      <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 border-t border-[#2a2f54] shrink-0">
        <button
          onClick={handleInstall}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#f4c151] hover:bg-[#ffe58f] text-[#1a1440] font-['Silkscreen'] font-bold text-xs sm:text-sm py-2.5 px-4 border-2 border-white shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-transform cursor-pointer"
        >
          <Download className="w-4 h-4" />
          {canInstall ? 'INSTALL PWA APP' : 'HOW TO INSTALL'}
        </button>

        <button
          onClick={handleProceed}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#00f0ff] hover:bg-[#80f8ff] text-[#0a1828] font-['Silkscreen'] font-bold text-xs sm:text-sm py-2.5 px-4 border-2 border-white shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-transform cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          ENTER DASHBOARD ▶
        </button>
      </div>

      {/* Retro Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 font-['VT323'] text-left">
          <div className="max-w-md w-full bg-[#1a1440] border-2 border-[#00f0ff] p-4 shadow-[8px_8px_0px_#000000] text-white space-y-3">
            <h4 className="font-['Silkscreen'] text-xs text-[#00f0ff] uppercase border-b border-[#00f0ff]/40 pb-2">
              INSTALLATION INSTRUCTIONS
            </h4>
            <div className="text-xs space-y-2 text-gray-200">
              <p><strong>iOS / Safari:</strong> Tap <span className="text-[#00f0ff]">Share</span> ➔ <span className="text-[#f4c151]">"Add to Home Screen"</span>.</p>
              <p><strong>Android / Chrome:</strong> Tap menu ➔ <span className="text-[#f4c151]">"Install App"</span>.</p>
              <p><strong>Desktop PC:</strong> Click the <span className="text-[#f4c151]">Install icon</span> in address bar or Menu ➔ Save &amp; Share ➔ Install.</p>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowGuideModal(false);
                  handleProceed();
                }}
                className="bg-[#f4c151] text-[#1a1440] font-['Silkscreen'] text-xs py-1.5 px-3 border border-white"
              >
                PROCEED TO DASHBOARD ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
