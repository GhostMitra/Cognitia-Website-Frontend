import { useState, useEffect } from 'react';
import { ConsoleShell } from './components/ConsoleShell';
import { TopBar } from './components/TopBar';
import { ScreenViewport } from './components/ScreenViewport';
import { BottomBar } from './components/BottomBar';
import { Footer } from './components/Footer';
import { CartridgeDeckScreen } from './components/cartridges/CartridgeDeckScreen';
import { DashboardCartridge } from './components/cartridges/DashboardCartridge';
import { RulesCartridge } from './components/cartridges/RulesCartridge';
import { TracksCartridge } from './components/cartridges/TracksCartridge';
import { TimelineCartridge } from './components/cartridges/TimelineCartridge';
import { SponsorsCartridge } from './components/cartridges/SponsorsCartridge';
import { MembersCartridge } from './components/cartridges/MembersCartridge';
import { PrizesCartridge } from './components/cartridges/PrizesCartridge';
import { FAQCartridge } from './components/cartridges/FAQCartridge';
import { CartridgeId } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [currentCartridge, setCurrentCartridge] = useState<CartridgeId>('dashboard');
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);
  const [showScanlines] = useState<boolean>(true);
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, mins: 44, secs: 20 });

  // Live countdown timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectCartridge = (id: CartridgeId) => {
    if (id !== currentCartridge) {
      setCurrentCartridge(id);
    }
  };

  const handleResetBoot = () => {
    sound.playBoot();
    setCurrentCartridge('dashboard');
    setIsDeckOpen(false);
  };

  // Keyboard shortcut listener for hot-swapping cartridges
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'm' || e.key === 'M') {
        sound.toggleMute();
      } else if (e.key === 'Escape') {
        setIsDeckOpen(false);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setIsDeckOpen((prev) => !prev);
      } else if (e.key === '1') {
        handleSelectCartridge('dashboard');
        setIsDeckOpen(false);
      } else if (e.key === '2') {
        handleSelectCartridge('rules');
        setIsDeckOpen(false);
      } else if (e.key === '3') {
        handleSelectCartridge('tracks');
        setIsDeckOpen(false);
      } else if (e.key === '4') {
        handleSelectCartridge('timeline');
        setIsDeckOpen(false);
      } else if (e.key === '5') {
        handleSelectCartridge('sponsors');
        setIsDeckOpen(false);
      } else if (e.key === '6') {
        handleSelectCartridge('members');
        setIsDeckOpen(false);
      } else if (e.key === '7') {
        handleSelectCartridge('prizes');
        setIsDeckOpen(false);
      } else if (e.key === '8') {
        handleSelectCartridge('faq');
        setIsDeckOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const getStatusText = () => {
    if (isDeckOpen) return 'SELECTING ROM CARTRIDGE MODULE...';
    switch (currentCartridge) {
      case 'dashboard':
        return '';
      case 'rules':
        return 'RULES & ETHICS PROTOCOL';
      case 'tracks':
        return '5 BOUNTY TRACKS ACTIVE';
      case 'timeline':
        return 'UTC SPRINT SCHEDULE';
      case 'sponsors':
        return 'SPONSOR ALLIANCES';
      case 'members':
        return 'HACKER DIRECTORY [1,420]';
      case 'prizes':
        return '$50,000 BOUNTY POOL';
      case 'faq':
        return 'KNOWLEDGE BASE FAQ';
    }
  };

  const getCartridgeName = () => {
    switch (currentCartridge) {
      case 'dashboard': return 'DASHBOARD';
      case 'rules': return 'RULES & REGS';
      case 'tracks': return 'TRACKS';
      case 'timeline': return 'SCHEDULE';
      case 'sponsors': return 'SPONSORS';
      case 'members': return 'MEMBERS';
      case 'prizes': return 'PRIZES';
      case 'faq': return 'FAQ';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b132b] via-[#0d1b3e] to-[#040817] text-white flex flex-col items-center">
      {/* 
        SCREEN 1: Full-Viewport Fitted Pixel Console HUD
        - Fits 100% inside initial screen window
      */}
      <section className="w-full h-screen min-h-[580px] max-h-[100dvh] flex flex-col justify-center items-center p-2 sm:p-3 md:p-4 box-border">
        <ConsoleShell
          currentCartridge={currentCartridge}
          onSelectCartridge={(id) => {
            handleSelectCartridge(id);
            setIsDeckOpen(false);
          }}
          onOpenCartridgeMenu={() => setIsDeckOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-1 sm:gap-1.5 grow h-full min-h-0" id="pixel-console-app-root">
            {/* Top Bar HUD */}
            <TopBar
              currentCartridge={currentCartridge}
              onSelectCartridge={handleSelectCartridge}
              onResetBoot={handleResetBoot}
            />

            {/* Full-width Swappable Screen Viewport with Perched Corner Menu Button */}
            <div className="flex-1 min-w-0 min-h-0 flex flex-col h-full">
              <ScreenViewport
                scanlinesEnabled={showScanlines}
                activeCartridgeId={currentCartridge}
                cartridgeName={getCartridgeName()}
                isMenuOpen={isDeckOpen}
                onToggleMenu={() => setIsDeckOpen((prev) => !prev)}
              >
                {/* Content Area */}
                {isDeckOpen ? (
                  <CartridgeDeckScreen
                    currentCartridge={currentCartridge}
                    onSelectCartridge={(id) => {
                      handleSelectCartridge(id);
                      setIsDeckOpen(false);
                    }}
                    onCloseDeck={() => setIsDeckOpen(false)}
                  />
                ) : (
                  <>
                    {currentCartridge === 'dashboard' && (
                      <DashboardCartridge
                        onNavigate={(id) => {
                          handleSelectCartridge(id);
                          setIsDeckOpen(false);
                        }}
                      />
                    )}
                    {currentCartridge === 'rules' && <RulesCartridge />}
                    {currentCartridge === 'tracks' && <TracksCartridge />}
                    {currentCartridge === 'timeline' && <TimelineCartridge />}
                    {currentCartridge === 'sponsors' && <SponsorsCartridge />}
                    {currentCartridge === 'members' && <MembersCartridge />}
                    {currentCartridge === 'prizes' && <PrizesCartridge />}
                    {currentCartridge === 'faq' && <FAQCartridge />}
                  </>
                )}
              </ScreenViewport>
            </div>

            {/* Bottom Bar: Separate Individual Countdown Boxes & Audio Button */}
            <BottomBar
              statusText={getStatusText()}
              isCountdown={currentCartridge === 'dashboard' && !isDeckOpen}
              countdown={countdown}
            />
          </div>
        </ConsoleShell>
      </section>

      {/* 
        SCREEN 2: Real-World Marketing & Design System Footer
        - Visible upon scrolling down
      */}
      <footer className="w-full px-2 sm:px-4 md:px-6 pb-8 pt-4">
        <Footer />
      </footer>
    </div>
  );
}
