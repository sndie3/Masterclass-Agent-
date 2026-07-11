import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

if (typeof window !== "undefined") {
  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    globalDeferredPrompt = event as BeforeInstallPromptEvent;
  };

  const handleAppInstalled = () => {
    globalDeferredPrompt = null;
  };

  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.addEventListener("appinstalled", handleAppInstalled);
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    if (globalDeferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const prompt = deferredPrompt || globalDeferredPrompt;
    if (!prompt) {
      return false;
    }

    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    setDeferredPrompt(null);
    globalDeferredPrompt = null;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    return outcome === "accepted";
  }, [deferredPrompt]);

  return { isInstallable: !!(deferredPrompt || globalDeferredPrompt) && !isInstalled, isInstalled, promptInstall };
}
