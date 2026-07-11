import { ArrowLeft, SendHorizonal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import GameCard from "./components/GameCard";

function Support() {
    const games = [
        { imageSrc: "/assets/Hari-tari.png", title: "Hari Tari" },
        { imageSrc: "/assets/regnum.png", title: "Slots" },
        { imageSrc: "/assets/Hari-tari.png", title: "Baccarat" },
        { imageSrc: "/assets/regnum.png", title: "Poker" },
        { imageSrc: "/assets/Hari-tari.png", title: "Hari Tari" },
        { imageSrc: "/assets/regnum.png", title: "Slots" },
        { imageSrc: "/assets/Hari-tari.png", title: "Baccarat" },
        { imageSrc: "/assets/regnum.png", title: "Poker" },
    ];

    const route = useNavigate()
    const [activeTab, setActiveTab] = useState("affiliates");
    const [selectedGame, setSelectedGame] = useState<{
        imageSrc: string;
        title: string;
    } | null>(null);
    const tabs = [
        { id: "affiliates", label: "AFFILIATE" },
        { id: "players", label: "PLAYERS" },
    ];
    const [message, setMessage] = useState("");
    const [showGame, setShowGame] = useState(false);
    const [chatWallpaper, setChatWallpaper] = useState("");

    useEffect(() => {
        setChatWallpaper(localStorage.getItem('chatWallpaper') || '');
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col font-bahnschrift">
            <div className="rounded-t-[32px] px-3 pt-6 pb-2 relative z-30" style={{ backgroundColor: 'var(--background-color)' }}>
                <div className="flex items-center mb-5 justify-between">
                    <button
                        onClick={() => { route('/dashboard') }}
                        className="cursor-pointer h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-[24px] font-semibold ">Support</h1>
                    <div>
                        <img src="/assets/icons/invite.png" alt="icon" className="w-7 h-7" />
                    </div>
                </div>
            </div>
            {/* <button
                disabled={!selectedGame}
                onClick={() => setShowGame(!showGame)}
                className={`
        w-full py-3 flex justify-center relative z-30
        ${selectedGame
                        ? showGame
                            ? "bg-white text-black cursor-pointer"
                            : "bg-red-500 text-white cursor-pointer"
                        : "bg-[#1d1d1d] hover:bg-[#252525] cursor-not-allowed"
                    }
    `}
            >
                <p className="font-bold text-lg">GAME</p>
            </button> */}
            <div
                className={`
                absolute inset-0 pt-[110px]
                flex flex-col
                transition-transform duration-700 ease-in-out
                z-20
                ${showGame ? "translate-y-full" : "translate-y-0"}
                ${chatWallpaper ? "bg-black/60" : "bg-black"}
            `}
                style={chatWallpaper ? {
                    backgroundImage: `url(${chatWallpaper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                } : undefined}
            >
                <div className="grid grid-cols-2 gap-3 mt-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-semibold transition ${activeTab === tab.id
                                ? "bg-white text-black"
                                : "hover:opacity-80"
                                }`}
                            style={{
                                backgroundColor:
                                    activeTab === tab.id
                                        ? undefined
                                        : "var(--button-color)",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 mt-3 overflow-y-auto">
                    {activeTab === "affiliates" && (
                        <div className="space-y-2">
                            {/* looping for this part for displaying support */}
                            <div
                                className="w-full py-3 flex justify-between items-center rounded-full px-5"
                                style={{ backgroundColor: "var(--button-color)" }}
                            >
                                <div className="flex flex-col w-full">
                                    <p className="text-sm text-red-500">
                                        UID: <span className="text-white">Lv2-ROGER-000053-2026</span>
                                    </p>
                                    <div className="flex justify-between pt-2 text-sm text-gray-400 font-light">
                                        <p>Message ni boss... </p>
                                        <span>23 mins ago</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="w-full py-3 flex justify-between items-center rounded-full px-5"
                                style={{ backgroundColor: "var(--button-color)" }}
                            >
                                <div className="flex flex-col w-full">
                                    <p className="text-sm text-red-500">
                                        UID: <span className="text-white">Lv2-ROGER-000053-2026</span>
                                    </p>
                                    <div className="flex justify-between pt-2 text-sm text-gray-400 font-light">
                                        <p>Message ni boss... </p>
                                        <span>23 mins ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "players" && (
                        <div className="flex flex-col h-full "
                            style={{ backgroundColor: "var(--button-color)" }}>
                            {/* Support list */}
                            <div className="space-y-2 flex-1 overflow-y-auto">
                                <div
                                    className="w-full py-3 px-3 flex justify-between items-center"

                                >
                                    <p className="text-sm text-red-500">
                                        UID: <span className="text-white">Lv2-ROGER-000053-2026</span>
                                    </p>
                                    <button className="text-sm">[ CALL ]</button>
                                </div>

                                <div
                                    className="w-full py-3 px-3 flex justify-between items-center"
                                    style={{ backgroundColor: "var(--button-color)" }}
                                >
                                    <p className="text-sm text-red-500">
                                        UID: <span className="text-white">Lv2-ROGER-000053-2026</span>
                                    </p>
                                    <button className="text-sm">[ CALL ]</button>
                                </div>
                            </div>

                            {/* Chat input - always at bottom */}
                            <div
                                className="mt-auto flex items-center gap-2 p-3 border-t border-[#333]"
                                style={{ backgroundColor: "var(--button-color)" }}
                            >
                                <input
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
                    )}
                </div>
                {/* carousel auto run
                <div className="overflow-hidden w-full">
                    <div className="flex w-max animate-marquee">
                        {[...games, ...games, ...games].map((game, index) => (
                            <div
                                key={index}
                                className="mr-3 shrink-0"
                                onClick={() => {
                                    setSelectedGame(game);
                                    setShowGame(true);
                                }}
                            >
                                <GameCard
                                    imageSrc={game.imageSrc}
                                    title={game.title}
                                />
                            </div>
                        ))}
                    </div>
                </div> */}

            </div>
            {/* mao ning loopan paras duwa die, lamat sa tanan */}
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                {selectedGame && (
                    <img
                        src={selectedGame.imageSrc}
                        alt={selectedGame.title}
                        className="w-125"
                    />
                )}
            </div>
        </div>
    )
}

export default Support  