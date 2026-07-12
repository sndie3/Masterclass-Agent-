import { useEffect } from "react";
import AppRoutes from "../routes/AppRoute"
import './App.css'
import '../styles/variable.css'
import { ModalProvider } from "../context/ModalContext"
import { ThemeProvider } from "../context/ThemeProvider"
import { ChatWallpaperProvider } from "../context/ChatWallpaperProvider"
import AutoInstallPrompt from "../components/common/AutoInstallPrompt"
import { applyAppIcon, getSavedAppIcon } from "../utils/appIcon"

// MAIN
function App() {
  useEffect(() => {
    applyAppIcon(getSavedAppIcon());
  }, []);

  return (
    <main className="h-dvh" style={{ backgroundColor: 'var(--background-color)' }}>
      <ThemeProvider>
        <ChatWallpaperProvider>
          <ModalProvider>
            <AutoInstallPrompt />
            <AppRoutes />
          </ModalProvider>
        </ChatWallpaperProvider>
      </ThemeProvider>
    </main>
  )
}

export default App
