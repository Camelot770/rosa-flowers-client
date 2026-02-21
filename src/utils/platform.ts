// Platform detection and cross-platform utilities for Telegram and Max Mini Apps

export type Platform = 'telegram' | 'max' | null;

export function getPlatform(): Platform {
  if ((window as any).Telegram?.WebApp?.initData) return 'telegram';
  if ((window as any).WebApp?.initData) return 'max';
  return null;
}

export function getWebApp() {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.initData) return tg;

  const max = (window as any).WebApp;
  if (max?.initData) return max;

  return null;
}

// Initialize the web app (call once on app startup)
export function initWebApp() {
  const tg = (window as any).Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#E91E63');
    return;
  }

  const max = (window as any).WebApp;
  if (max) {
    max.ready?.();
    max.expand?.();
  }
}

// Haptic feedback
export function hapticSuccess() {
  const wa = getWebApp();
  wa?.HapticFeedback?.notificationOccurred?.('success');
}

export function hapticLight() {
  const wa = getWebApp();
  wa?.HapticFeedback?.impactOccurred?.('light');
}

// Open external link
export function openLink(url: string) {
  const wa = getWebApp();
  if (wa?.openLink) {
    wa.openLink(url);
  } else {
    window.open(url, '_blank');
  }
}
