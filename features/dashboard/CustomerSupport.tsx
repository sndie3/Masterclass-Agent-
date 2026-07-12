import { ChevronLeft, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatWallpaper } from "../../hooks/useChatWallpaper";
import { chatWallpaperImages } from "../../utils/chatWallpaper";

function CustomerSupport() {
  const navigate = useNavigate();
  const { chatWallpaper } = useChatWallpaper();
  const chatWallpaperUrl = chatWallpaperImages[chatWallpaper];

  const [message, setMessage] = useState("");

  return (
    <div
      className={`fixed inset-0 flex flex-col text-white ${
        chatWallpaperUrl ? "bg-black/30" : "bg-black"
      }`}
      style={
        chatWallpaperUrl
          ? {
              backgroundImage: `url(${chatWallpaperUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* Header */}
      <div className="flex items-center px-5 pt-4 pb-6 relative z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--button-color)" }}
        >
          <ChevronLeft size={24} />
        </button>

        <h1 className="text-xl font-bold flex-1 text-center pr-10">
          Customer Support
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 font-bahnschrift">
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-[#1A1A1A] px-4 py-3 shadow-sm">
            <p className="text-md leading-6 text-white">
              Hi there! Ask me anything.
            </p>

            <p className="mt-1 text-xs text-gray-500">
              I'm here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 border-t border-[#333]"
        style={{ backgroundColor: "var(--button-color)" }}
      >
        <input
          autoFocus
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-[#111] rounded-full px-4 py-3 outline-none"
        />

        <button className="px-5 py-3">
          <SendHorizonal />
        </button>
      </div>
    </div>
  );
}

export default CustomerSupport;