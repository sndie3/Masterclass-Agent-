import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

interface ToggleProps {
  title: string;
  subtitle: string;
  enabled: boolean;
  onToggle: () => void;
}

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-blue-600" : "bg-gray-300"
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

function ToggleRow({ title, subtitle, enabled, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4 mb-2" style={{ backgroundColor: "var(--card-color)" }}>
      <div className="flex flex-col pr-4">
        <span className="text-sm font-medium text-white">{title}</span>
        <span className="text-xs italic text-gray-400 mt-1">{subtitle}</span>
      </div>
      <div className="ml-4 shrink-0">
        <Toggle checked={enabled} onChange={onToggle} />
      </div>
    </div>
  );
}

export default function ChatSettings() {
  const navigate = useNavigate();

  const [showAdultContent, setShowAdultContent] = useState(() => {
    return localStorage.getItem("chatShowAdultContent") !== "false";
  });

  const [directShare, setDirectShare] = useState(() => {
    return localStorage.getItem("chatDirectShare") !== "false";
  });

  const handleToggleAdultContent = () => {
    const newValue = !showAdultContent;
    setShowAdultContent(newValue);
    localStorage.setItem("chatShowAdultContent", String(newValue));
  };

  const handleToggleDirectShare = () => {
    const newValue = !directShare;
    setDirectShare(newValue);
    localStorage.setItem("chatDirectShare", String(newValue));
  };

  const handleNavigate = (route: string) => {
    navigate(route);
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
          <h1 className="text-lg font-bold flex-1 text-center pr-10 uppercase">Chat Settings</h1>
        </div>

        {/* Main Options */}
        <div className="mb-6">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavigate("/chat-wallpaper")}
              className="w-full flex items-center justify-center py-4 text-sm font-medium uppercase hover:opacity-90 transition"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Chat Wallpaper
            </button>
            <button
              onClick={() => handleNavigate("/change-chat-name")}
              className="w-full flex items-center justify-center py-4 text-sm font-medium uppercase hover:opacity-90 transition"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Change Chat Name
            </button>
            <button
              onClick={() => handleNavigate("/app-icon")}
              className="w-full flex items-center justify-center py-4 text-sm font-medium uppercase hover:opacity-90 transition"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              App Icon
            </button>
          </div>
        </div>

        {/* Other Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-1">Other Settings</h3>
          <div className="px-1">
            <ToggleRow
              title="Show 21+ Content"
              subtitle="Do not hide media that contains content suitable only for adults."
              enabled={showAdultContent}
              onToggle={handleToggleAdultContent}
            />
            <ToggleRow
              title="Direct Share"
              subtitle="Show share application link."
              enabled={directShare}
              onToggle={handleToggleDirectShare}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
