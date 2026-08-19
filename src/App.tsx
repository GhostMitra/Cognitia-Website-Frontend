import { useState, useEffect } from 'react';
import { ConsoleShell } from './components/ConsoleShell';
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
import { RegistrationCartridge } from './components/cartridges/RegistrationCartridge';
import { AdminCartridge } from './components/cartridges/AdminCartridge';
import { CartridgeId } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [currentCartridge, setCurrentCartridge] = useState<CartridgeId>('dashboard');
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);
  const [showScanlines] = useState<boolean>(true);
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, mins: 44, secs: 20 });

  // Initial path routing check (e.g., /admin, /register)
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('admin')) {
      setCurrentCartridge('admin');
    } else if (path.includes('register') || path.includes('submit')) {
      setCurrentCartridge('register');
    }
  }, []);

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
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

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
        handleSelectCartridge('register');
        setIsDeckOpen(false);
      } else if (e.key === '3') {
        handleSelectCartridge('rules');
        setIsDeckOpen(false);
      } else if (e.key === '4') {
        handleSelectCartridge('tracks');
        setIsDeckOpen(false);
      } else if (e.key === '5') {
        handleSelectCartridge('timeline');
        setIsDeckOpen(false);
      } else if (e.key === '6') {
        handleSelectCartridge('sponsors');
        setIsDeckOpen(false);
      } else if (e.key === '7') {
        handleSelectCartridge('members');
        setIsDeckOpen(false);
      } else if (e.key === '8') {
        handleSelectCartridge('prizes');
        setIsDeckOpen(false);
      } else if (e.key === '9') {
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
        return 'COGNITIA 2026 • 30-HOUR SPRINT • ₹22,000 CASH POOL';
      case 'register':
        return 'PARTICIPANT LEAD REGISTRATION & SUBMISSION PORTAL';
      case 'rules':
        return 'RULES & ETHICS PROTOCOL';
      case 'tracks':
        return 'CHALLENGE TRACKS [TO BE ANNOUNCED]';
      case 'timeline':
        return 'SPRINT SCHEDULE [TO BE ANNOUNCED]';
      case 'sponsors':
        return 'SPONSORS & PARTNERS [TO BE ANNOUNCED]';
      case 'members':
        return 'MEMBERS & JURY ROSTER [TO BE ANNOUNCED]';
      case 'prizes':
        return '₹22,000 TOTAL CASH PRIZE POOL';
      case 'faq':
        return 'KNOWLEDGE BASE FAQ';
      case 'admin':
        return 'RESTRICTED ADMIN CONSOLE [Cognitia2026Admin]';
    }
  };

  const getCartridgeName = () => {
    switch (currentCartridge) {
      case 'dashboard': return 'DASHBOARD';
      case 'register': return 'REGISTER & SUBMIT';
      case 'rules': return 'RULES & REGS';
      case 'tracks': return 'TRACKS';
      case 'timeline': return 'SCHEDULE';
      case 'sponsors': return 'SPONSORS';
      case 'members': return 'MEMBERS';
      case 'prizes': return 'PRIZES';
      case 'faq': return 'FAQ';
      case 'admin': return 'ADMIN PORTAL';
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
          <div className="flex flex-col gap-1 grow h-full min-h-0" id="pixel-console-app-root">
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
                    {currentCartridge === 'register' && <RegistrationCartridge />}
                    {currentCartridge === 'rules' && <RulesCartridge />}
                    {currentCartridge === 'tracks' && <TracksCartridge />}
                    {currentCartridge === 'timeline' && <TimelineCartridge />}
                    {currentCartridge === 'sponsors' && <SponsorsCartridge />}
                    {currentCartridge === 'members' && <MembersCartridge />}
                    {currentCartridge === 'prizes' && <PrizesCartridge />}
                    {currentCartridge === 'faq' && <FAQCartridge />}
                    {currentCartridge === 'admin' && <AdminCartridge />}
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

