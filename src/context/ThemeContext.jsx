import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFX } from '../audio/soundFX';

const ThemeContext = createContext();

export const THEMES = [
  { id: 'earth-2077', name: 'Earth-2077', sub: 'Cyberpunk 2077', primaryColor: '#FCEE09', badge: '🌆' },
  { id: 'earth-141', name: 'Earth-141', sub: 'COD Modern Warfare', primaryColor: '#FF9900', badge: '🪖' },
  { id: 'earth-69', name: 'Earth-69', sub: 'GTA VI Vice City', primaryColor: '#FF007F', badge: '🌴' },
  { id: 'earth-1610', name: 'Earth-1610', sub: 'Miles Morales', primaryColor: '#FF003C', badge: '⚡' },
  { id: 'earth-616', name: 'Earth-616', sub: 'Classic Spidey', primaryColor: '#E62429', badge: '🔴' },
  { id: 'earth-65', name: 'Earth-65', sub: 'Spider-Gwen', primaryColor: '#FF007A', badge: '🌸' },
  { id: 'earth-928', name: 'Earth-928', sub: 'Spider-Man 2099', primaryColor: '#FF0055', badge: '🏙️' },
  { id: 'earth-90214', name: 'Earth-90214', sub: 'Spider-Noir', primaryColor: '#D4AF37', badge: '🕵️' },
];

export function ThemeProvider({ children }) {
  // PERSIST THEME PREFERENCE IN LOCALSTORAGE
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('cognitia_spidey_theme') || 'earth-2077';
  });

  const [audioMuted, setAudioMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [activePage, setActivePageState] = useState('landing');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [radarOpen, setRadarOpen] = useState(false);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, title: '', message: '', type: 'info' });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cognitia_spidey_theme', theme);
  }, [theme]);

  // Capture PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const installPwa = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          soundFX.victoryChime();
        }
        setDeferredPrompt(null);
      });
    } else {
      soundFX.buttonClick();
      showAlert('PWA APP INSTALLATION', 'To install Spidey Tracker App: Tap your browser settings menu (⋮ or Share) and select "Add to Home Screen"!', 'info');
    }
  };

  const triggerPageLoad = (callback) => {
    setIsPageLoading(true);
    soundFX.glitchZap();
    setTimeout(() => {
      if (callback) callback();
      setIsPageLoading(false);
    }, 600);
  };

  const setTheme = (newTheme) => {
    triggerPageLoad(() => {
      setThemeState(newTheme);
      localStorage.setItem('cognitia_spidey_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    });
  };

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  const toggleMute = () => {
    const newMuted = !audioMuted;
    setAudioMuted(newMuted);
    soundFX.setMuted(newMuted);
    if (!newMuted) soundFX.buttonClick();
  };

  const setVolume = (val) => {
    setVolumeState(val);
    soundFX.setVolume(val);
  };

  const toggleCrt = () => {
    setCrtEnabled(!crtEnabled);
    soundFX.buttonClick();
  };

  const setActivePage = (pageId) => {
    setRadarOpen(false);
    soundFX.buttonClick();
    triggerPageLoad(() => {
      setActivePageState(pageId);
    });
  };

  const showAlert = (title, message, type = 'info') => {
    soundFX.spiderSense();
    setAlertState({ open: true, title, message, type });
  };

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        THEMES,
        audioMuted,
        toggleMute,
        volume,
        setVolume,
        crtEnabled,
        toggleCrt,
        activePage,
        setActivePage,
        isPageLoading,
        radarOpen,
        setRadarOpen,
        trailerModalOpen,
        setTrailerModalOpen,
        alertState,
        showAlert,
        closeAlert,
        deferredPrompt,
        installPwa
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
