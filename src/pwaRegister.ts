// PWA Service Worker Registration & Installation Helper

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners: Set<(canInstall: boolean) => void> = new Set();

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.error('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // Listen for installation prompt capability
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    notifyListeners(true);
    console.log('[PWA] beforeinstallprompt event captured');
  });

  // Listen for successful installation
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    notifyListeners(false);
    console.log('[PWA] App successfully installed!');
  });
}

export function subscribeInstallState(callback: (canInstall: boolean) => void): () => void {
  listeners.add(callback);
  // Send current state immediately
  callback(deferredPrompt !== null);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners(canInstall: boolean) {
  listeners.forEach((cb) => cb(canInstall));
}

export async function promptInstallApp(): Promise<boolean> {
  if (!deferredPrompt) {
    console.warn('[PWA] No deferred install prompt available');
    return false;
  }

  try {
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log('[PWA] User response to install prompt:', choiceResult.outcome);
    if (choiceResult.outcome === 'accepted') {
      deferredPrompt = null;
      notifyListeners(false);
      return true;
    }
  } catch (err) {
    console.error('[PWA] Error triggering install prompt:', err);
  }
  return false;
}
