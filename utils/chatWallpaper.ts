export type ChatWallpaper =
  | 'default'
  | '1' | '2' | '3';

export const chatWallpaperImages: Record<ChatWallpaper, string> = {
  default: '',
  '1': '/assets/chat-wallpapers/chat1.jpg',
  '2': '/assets/chat-wallpapers/chat2.jpg',
  '3': '/assets/chat-wallpapers/chat3.jpg',
};

export function applyChatWallpaper(
  wallpaper: ChatWallpaper,
  element: HTMLElement | null
) {
  if (!element) return;

  if (wallpaper === 'default') {
    element.style.backgroundImage = 'none';
    element.style.backgroundColor = '#0A0A0A';
  } else {
    const imageUrl = chatWallpaperImages[wallpaper];
    element.style.backgroundImage = `url("${imageUrl}")`;
    element.style.backgroundColor = 'transparent';
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
    element.style.backgroundRepeat = 'no-repeat';
  }
}
