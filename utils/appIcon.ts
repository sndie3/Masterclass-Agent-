const DEFAULT_ICON = '/favicon.svg';

export function applyAppIcon(iconPath: string | null): void {
  let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.type = iconPath?.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
  link.href = iconPath || DEFAULT_ICON;
}

export function getSavedAppIcon(): string | null {
  return localStorage.getItem('appIcon');
}
