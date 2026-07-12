import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

export type Platform = "android" | "ios" | "desktop" | "other";

export type InstallMethod = "native" | "ios-manual" | "desktop-manual";

export interface InstallResult {
  success: boolean;
  method: InstallMethod;
  message?: string;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
const INSTALL_PROMPT_UPDATED_EVENT = "install-prompt-updated";

function notifyInstallPromptUpdated() {
  window.dispatchEvent(new CustomEvent(INSTALL_PROMPT_UPDATED_EVENT));
}

if (typeof window !== "undefined") {
  const handleBeforeInstallPrompt = (event: Event) => {
    globalDeferredPrompt = event as BeforeInstallPromptEvent;
    notifyInstallPromptUpdated();
    window.dispatchEvent(new CustomEvent("install-prompt-available"));
  };

  const handleAppInstalled = () => {
    globalDeferredPrompt = null;
    notifyInstallPromptUpdated();
    window.dispatchEvent(new CustomEvent("app-installed"));
  };

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.addEventListener("appinstalled", handleAppInstalled);
}

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream) return "ios";
  if (/Win|Mac|Linux/i.test(ua) && !/Mobile|Tablet/i.test(ua)) return "desktop";
  return "other";
}

function checkIsInstalled(): boolean {
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) return true;
  return false;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const platform = detectPlatform();

  useEffect(() => {
    setIsInstalled(checkIsInstalled());

    const handleBeforeInstallPrompt = (event: Event) => {
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
      setIsInstalled(true);
      setIsInstalling(false);
    };

    const handleInstallPromptAvailable = () => {
      if (globalDeferredPrompt) {
        setDeferredPrompt(globalDeferredPrompt);
      }
    };

    const handleInstallPromptUpdated = () => {
      setDeferredPrompt(globalDeferredPrompt);
    };

    if (globalDeferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("install-prompt-available", handleInstallPromptAvailable);
    window.addEventListener(INSTALL_PROMPT_UPDATED_EVENT, handleInstallPromptUpdated);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("install-prompt-available", handleInstallPromptAvailable);
      window.removeEventListener(INSTALL_PROMPT_UPDATED_EVENT, handleInstallPromptUpdated);
    };
  }, []);

  const triggerInstall = useCallback(async (): Promise<InstallResult> => {
    if (isInstalled) {
      return { success: true, method: "native", message: "Already installed" };
    }

    setIsInstalling(true);

    try {
      if (platform === "ios") {
        setIsInstalling(false);
        return {
          success: false,
          method: "ios-manual",
          message: "Tap the Share button at the bottom of Safari, then scroll down and tap 'Add to Home Screen' to install the app.",
        };
      }

      const prompt = deferredPrompt || globalDeferredPrompt;
      if (prompt) {
        await prompt.prompt();
        const { outcome } = await prompt.userChoice;
        setDeferredPrompt(null);
        globalDeferredPrompt = null;
        notifyInstallPromptUpdated();
        setIsInstalling(false);
        if (outcome === "accepted") {
          setIsInstalled(true);
          return { success: true, method: "native" };
        }
        return { success: false, method: "native", message: "The Installation was cancelled." };
      }

      setIsInstalling(false);
      return {
        success: false,
        method: "desktop-manual",
        message: platform === "desktop"
          ? "Click the install icon in the address bar or go to browser menu > 'Install MASTERCLASS' or 'Add to Home Screen'."
          : "Open your browser menu and select 'Add to Home Screen' or 'Install App'.",
      };
    } catch {
      setIsInstalling(false);
      return {
        success: false,
        method: "native",
        message: "An error occurred during installation. Please try again.",
      };
    }
  }, [deferredPrompt, isInstalled, platform]);

  const canInstallNatively = !!(deferredPrompt || globalDeferredPrompt);
  const showInstallButton = !isInstalled;

  return {
    isInstallable: canInstallNatively && !isInstalled,
    isInstalled,
    isInstalling,
    platform,
    showInstallButton,
    triggerInstall,
  };
}
