import { useState } from "react";
import { Download, Info, Check, Loader2 } from "lucide-react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

export default function InstallButton() {
  const { isInstallable, isInstalled, isInstalling, triggerInstall, platform } = useInstallPrompt();
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <Check size={18} />
        <span>App installed</span>
      </div>
    );
  }

  const handleClick = async () => {
    setResultMessage(null);
    const result = await triggerInstall();
    if (result.message) {
      setResultMessage(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isInstallable ? (
        <button
          onClick={handleClick}
          disabled={isInstalling}
          className="w-full py-4 text-center font-semibold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--button-color)" }}
        >
          {isInstalling ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          Add to Home Screen
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-4 rounded-lg" style={{ backgroundColor: "var(--card-color)" }}>
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <Info size={18} className="shrink-0 mt-0.5" />
            <p>
              {platform === "ios"
                ? "Tap the Share button in Safari, then scroll down and tap 'Add to Home Screen' to install this app."
                : "Use your browser menu and select 'Install MASTERCLASS' or 'Add to Home Screen'."}
            </p>
          </div>
        </div>
      )}
      {resultMessage && (
        <p className="text-sm text-gray-300 px-1">{resultMessage}</p>
      )}
    </div>
  );
}
