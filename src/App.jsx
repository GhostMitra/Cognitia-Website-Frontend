import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SpideyTrackerFrame } from './components/SpideyTrackerFrame';
import { SpideyCursor } from './components/SpideyCursor';
import { SpideyLoadingScreen } from './components/SpideyLoadingScreen';

// 13 Page Imports
import { LandingPage } from './pages/LandingPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { PaymentPage } from './pages/PaymentPage';
import { RulesPage } from './pages/RulesPage';
import { TrackPage } from './pages/TrackPage';
import { TimelinePage } from './pages/TimelinePage';
import { SponsorPage } from './pages/SponsorPage';
import { MembersPage } from './pages/MembersPage';
import { PrizesPage } from './pages/PrizesPage';
import { FaqPage } from './pages/FaqPage';
import { MiniGamePage } from './pages/MiniGamePage';
import { SettingsPage } from './pages/SettingsPage';

function AppContent() {
  const { activePage } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'registration':
        return <RegistrationPage />;
      case 'submission':
        return <SubmissionPage />;
      case 'payment':
        return <PaymentPage />;
      case 'rules':
        return <RulesPage />;
      case 'track':
        return <TrackPage />;
      case 'timeline':
        return <TimelinePage />;
      case 'sponsor':
        return <SponsorPage />;
      case 'members':
        return <MembersPage />;
      case 'prizes':
        return <PrizesPage />;
      case 'faq':
        return <FaqPage />;
      case 'minigame':
        return <MiniGamePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <SpideyCursor />
      <SpideyTrackerFrame>
        {!loaded ? (
          <SpideyLoadingScreen onStart={() => setLoaded(true)} />
        ) : (
          renderPage()
        )}
      </SpideyTrackerFrame>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
