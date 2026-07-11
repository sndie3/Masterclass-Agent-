import AppRoutes from "../routes/AppRoute"
import './App.css'
import '../styles/variable.css'
import { ModalProvider } from "../context/ModalContext"
import { ThemeProvider } from "../context/ThemeProvider"
import AutoInstallPrompt from "../components/common/AutoInstallPrompt"

// MAIN
function App() {
  return (
    <main className="h-dvh ">
      <ThemeProvider>
        <ModalProvider>
          <AutoInstallPrompt />
          <AppRoutes />
        </ModalProvider>
      </ThemeProvider>    
    </main>
  )
}

export default App
