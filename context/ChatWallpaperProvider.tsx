import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ChatWallpaperContext } from './ChatWallpaperContext.ts';
import { chatWallpaperImages } from '../utils/chatWallpaper';
import type { ChatWallpaper } from '../utils/chatWallpaper';

const STORAGE_KEY = 'chatWallpaper';

function getInitialWallpaper(): ChatWallpaper {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved in chatWallpaperImages) {
    return saved as ChatWallpaper;
  }
  localStorage.removeItem(STORAGE_KEY);
  return 'default';
}

export function ChatWallpaperProvider({ children }: { children: ReactNode }) {
  const [chatWallpaper, setChatWallpaperState] = useState<ChatWallpaper>(() => getInitialWallpaper());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, chatWallpaper);
  }, [chatWallpaper]);

  const setChatWallpaper = (newWallpaper: ChatWallpaper) => {
    setChatWallpaperState(newWallpaper);
  };

  return (
    <ChatWallpaperContext.Provider value={{ chatWallpaper, setChatWallpaper }}>
      {children}
    </ChatWallpaperContext.Provider>
  );
}
