import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

interface ToggleProps {
  title: string;
  enabled: boolean;
  onToggle: () => void;
}

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-[#007ACC]" : "bg-gray-400"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};

function ToggleRow({ title, enabled, onToggle }: ToggleProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-4"
      style={{ backgroundColor: "var(--card-color)" }}
    >
      <span className="text-sm font-medium text-white">{title}</span>
      <Toggle checked={enabled} onChange={onToggle} />
    </div>
  );
}

interface SecurityOption {
  key: string;
  title: string;
  defaultValue: boolean;
}

const securityOptions: SecurityOption[] = [
  {
    key: "sessionLogout",
    title: "Session Logout",
    defaultValue: true,
  },
  {
    key: "endToEndEncryption",
    title: "End to End Encryption",
    defaultValue: true,
  },
  {
    key: "location",
    title: "Location",
    defaultValue: true,
  },
  {
    key: "biometricLogin",
    title: "Biometric Login",
    defaultValue: true,
  },
  {
    key: "deviceIdentification",
    title: "Device Identification",
    defaultValue: true,
  },
  {
    key: "profileEncryption",
    title: "Profile Encryption",
    defaultValue: true,
  },
  {
    key: "autoUpdate",
    title: "Auto Update",
    defaultValue: true,
  },
];

export default function ProfileSecurity() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    securityOptions.forEach((option) => {
      const stored = localStorage.getItem(`profileSecurity_${option.key}`);
      initial[option.key] = stored ? stored === "true" : option.defaultValue;
    });
    return initial;
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`profileSecurity_${key}`, String(next[key]));
      return next;
    });
  };

  return (
    <div className="min-h-dvh flex flex-col text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10">
            Profile Security
          </h1>
        </div>

        {/* Security Options */}
        <div className="flex flex-col gap-2">
          {securityOptions.map((option) => (
            <ToggleRow
              key={option.key}
              title={option.title}
              enabled={settings[option.key]}
              onToggle={() => handleToggle(option.key)}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
