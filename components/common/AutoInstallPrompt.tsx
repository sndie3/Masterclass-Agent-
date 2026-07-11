import { useEffect } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

const AUTO_INSTALL_SESSION_KEY = "masterclass_auto_install_prompted";

function hasAutoPromptedThisSession() {
  try {
    return sessionStorage.getItem(AUTO_INSTALL_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markAutoPromptedThisSession() {
  try {
    sessionStorage.setItem(AUTO_INSTALL_SESSION_KEY, "true");
  } catch {
    // Ignore storage failures and continue without session persistence.
  }
}

export default function AutoInstallPrompt() {
  const { isInstallable, isInstalled, isInstalling, triggerInstall } = useInstallPrompt();

  useEffect(() => {
    if (!isInstallable || isInstalled || isInstalling || hasAutoPromptedThisSession()) {
      return;
    }

    let isActive = true;

    const handleUserGesture = async () => {
      if (!isActive) return;
      markAutoPromptedThisSession();
      await triggerInstall();
    };

    window.addEventListener("pointerdown", handleUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", handleUserGesture, { once: true });

    return () => {
      isActive = false;
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
    };
  }, [isInstallable, isInstalled, isInstalling, triggerInstall]);

  return null;
}
