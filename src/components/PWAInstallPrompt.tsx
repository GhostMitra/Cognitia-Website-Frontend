import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, CheckCircle, WifiOff, Monitor, Info, ArrowUpRight } from 'lucide-react';
import { subscribeInstallState, promptInstallApp } from '../pwaRegister';

export interface PWAInstallPromptProps {
  isBooting?: boolean;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ isBooting = false }) => {
  const [canInstall, setCanInstall] = useState(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cognitia_pwa_dismissed') === 'true';
    }
    return false;
  });
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeInstallState((installable) => {
      setCanInstall(installable);
    });

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check standalone mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true
    ) {
      setIsInstalled(true);
    }

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cognitia_pwa_dismissed', 'true');
    }
  };

  const handleInstallClick = async () => {
    if (canInstall) {
      const success = await promptInstallApp();
      if (success) {
        setIsInstalled(true);
        setShowModal(false);
      }
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) {
    if (isOffline) {
      return (
        <div className="fixed bottom-3 right-3 z-[9999] flex items-center gap-2 bg-[#ff4655]/90 text-white px-3 py-2 border-2 border-[#ff4655] font-['Silkscreen'] text-xs shadow-[4px_4px_0px_#000000] backdrop-blur-md animate-pulse">
          <WifiOff className="w-4 h-4 text-white" />
          <span>OFFLINE MODE ACTIVE</span>
        </div>
      );
    }
    return null;
  }

  // Suppress PWA widget during initial theme loading screen boot animation
  if (isBooting) {
    return null;
  }

  return (
    <>
      {/* Floating Retro PWA Installation Widget */}
      {!isDismissed && (
        <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-4 sm:bottom-4 z-[9999] max-w-sm w-[calc(100vw-24px)] sm:w-80 bg-[#1a1440]/95 text-white border-2 border-[#f4c151] p-3 shadow-[6px_6px_0px_#000000] backdrop-blur-md font-['VT323'] rounded-none relative transition-all duration-300 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#f4c151]/30 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-[#f4c151] font-['Silkscreen'] text-[11px] uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-[#00f0ff] animate-bounce shrink-0" />
              <span>COGNITIA PWA APP</span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-[#ff4655] transition-colors p-0.5 border border-transparent hover:border-[#ff4655] bg-black/40"
              title="Dismiss"
              aria-label="Close install prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex items-center gap-2.5">
            <img
              src="/icon-192x192.png"
              alt="Cognitia PWA Icon"
              className="w-10 h-10 border border-[#f4c151] bg-[#0b0726] p-0.5 object-contain shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-['Silkscreen'] text-xs text-[#00f0ff] leading-tight truncate">
                INSTALL TO HOME SCREEN
              </h4>
              <p className="text-xs text-gray-300 leading-tight mt-0.5">
                Fast offline access & standalone app frame on Phone & PC.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#f4c151] hover:bg-[#ffe58f] text-[#1a1440] font-['Silkscreen'] font-bold text-xs py-1.5 px-3 border border-[#ffffff] shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {canInstall ? 'INSTALL NOW' : 'HOW TO INSTALL'}
            </button>
            <button
              onClick={handleDismiss}
              className="bg-black/60 hover:bg-black/80 text-gray-300 hover:text-white font-['Silkscreen'] text-xs py-1.5 px-2.5 border border-gray-600 shadow-[2px_2px_0px_#000000]"
            >
              HIDE
            </button>
          </div>
        </div>
      )}

      {/* Retro PWA Installation Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 font-['VT323'] select-none">
          <div className="max-w-md w-full bg-[#1a1440] border-2 border-[#00f0ff] p-4 sm:p-5 shadow-[8px_8px_0px_#000000] text-white relative space-y-4">
            <div className="flex items-center justify-between border-b border-[#00f0ff]/40 pb-2">
              <div className="flex items-center gap-2 text-[#00f0ff] font-['Silkscreen'] text-xs uppercase">
                <Info className="w-4 h-4 text-[#f4c151]" />
                <span>PWA INSTALLATION GUIDE</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#ff4655] p-1 border border-gray-600 bg-black/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-black/50 p-3 border border-[#f4c151]/40 space-y-1">
                <h5 className="font-['Silkscreen'] text-xs text-[#f4c151] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#00f0ff]" /> ON MOBILE (ANDROID / iOS)
                </h5>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside pt-1">
                  <li><strong>iOS Safari:</strong> Tap <span className="text-[#00f0ff]">Share</span> (square arrow icon) ➔ select <span className="text-[#f4c151]">"Add to Home Screen"</span>.</li>
                  <li><strong>Android Chrome:</strong> Tap menu (three dots) ➔ select <span className="text-[#f4c151]">"Install App"</span> or <span className="text-[#f4c151]">"Add to Home screen"</span>.</li>
                </ul>
              </div>

              <div className="bg-black/50 p-3 border border-[#00f0ff]/40 space-y-1">
                <h5 className="font-['Silkscreen'] text-xs text-[#00f0ff] flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-[#f4c151]" /> ON DESKTOP PC (CHROME / EDGE)
                </h5>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside pt-1">
                  <li>Look for the <span className="text-[#f4c151]">Install icon</span> (➕ or 💻) in your browser address bar on the right.</li>
                  <li>Or click menu ➔ <span className="text-[#00f0ff]">Save &amp; Share</span> ➔ <span className="text-[#f4c151]">Install Cognitia 2k26</span>.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#f4c151] hover:bg-[#ffe58f] text-[#1a1440] font-['Silkscreen'] font-bold text-xs py-2 px-4 border border-white shadow-[3px_3px_0px_#000000]"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
