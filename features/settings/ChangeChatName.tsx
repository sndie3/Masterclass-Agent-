import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

const STORAGE_KEY = "chatName";

function getStoredChatName(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;
  return localStorage.getItem("username") || "Player";
}

export default function ChangeChatName() {
  const navigate = useNavigate();
  const [currentChatName] = useState(() => getStoredChatName());
  const [newChatName, setNewChatName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const trimmed = newChatName.trim();
    if (!trimmed) {
      setMessage("Please enter a new chat name.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, trimmed);
    setMessage("Chat name updated successfully.");
    setNewChatName("");
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
          <h1 className="text-lg font-bold flex-1 text-center pr-10 uppercase">
            Change Chat Name
          </h1>
        </div>

        {/* Current Chat Name */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-sm italic tracking-[8px] text-gray-500 mb-2">
            Chat Name
          </p>
          <p className="text-2xl font-bold uppercase tracking-wide">
            {currentChatName}
          </p>
        </div>

        {/* New Chat Name Input */}
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="New Chat Name"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            className="w-full py-4 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 placeholder:italic tracking-[4px] outline-none focus:border-white"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-4 text-sm font-semibold uppercase transition hover:opacity-90"
            style={{ backgroundColor: "var(--card-color)" }}
          >
            Submit Change
          </button>

          {message && (
            <p className="text-sm text-center text-gray-300">{message}</p>
          )}
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
