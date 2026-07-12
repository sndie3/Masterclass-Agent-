import { useContext } from 'react';
import { ChatWallpaperContext } from '../context/ChatWallpaperContext.ts';

export function useChatWallpaper() {
  const context = useContext(ChatWallpaperContext);
  if (!context) {
    throw new Error('useChatWallpaper must be used within ChatWallpaperProvider');
  }
  return context;
}
