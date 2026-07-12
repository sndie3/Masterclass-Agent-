import { createContext } from 'react';
import type { ChatWallpaper } from '../utils/chatWallpaper';

interface ChatWallpaperContextType {
  chatWallpaper: ChatWallpaper;
  setChatWallpaper: (wallpaper: ChatWallpaper) => void;
}

export const ChatWallpaperContext = createContext<ChatWallpaperContextType | undefined>(undefined);
