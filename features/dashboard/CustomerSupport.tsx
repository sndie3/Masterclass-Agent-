import { ChevronLeft, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatWallpaper } from "../../hooks/useChatWallpaper";
import { chatWallpaperImages } from "../../utils/chatWallpaper";
type Message = {
    sender: "support" | "user";
    text: string;
    subtext?: string;
};
function CustomerSupport() {
    const navigate = useNavigate();
    const { chatWallpaper } = useChatWallpaper();
    const chatWallpaperUrl = chatWallpaperImages[chatWallpaper];

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "support",
            text: "Hi there! Ask me anything.",
            subtext: "I'm here to help.",
        },
    ]);

    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: message,
            },
        ]);

        setMessage("");
    };

    return (
        <div
            className={`relative h-dvh text-white flex flex-col ${chatWallpaperUrl ? "bg-black/30" : "bg-black"
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
            <div className="flex items-center mb-4 px-5 pt-4 pb-6 relative z-10">
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

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 font-bahnschrift">
                    <div className="space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === "user"
                                            ? "bg-blue-600 rounded-br-md"
                                            : "bg-[#1A1A1A] rounded-bl-md"
                                        }`}
                                >
                                    <p>{msg.text}</p>

                                    {msg.sender === "support" && (
                                        <p className="mt-1 text-xs text-gray-400">
                                            {msg.subtext}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div
                    className="shrink-0 flex items-center gap-2 p-3 border-t border-[#333]"
                    style={{ backgroundColor: "var(--button-color)" }}
                >
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 bg-[#111] rounded-full px-4 py-3 outline-none"
                    />

                    <button
                        onClick={sendMessage}
                        className="px-5 py-3"
                    >
                        <SendHorizonal />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerSupport;