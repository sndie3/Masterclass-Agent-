import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useChatWallpaper } from "../../hooks/useChatWallpaper";
import { chatWallpaperImages, applyChatWallpaper, type ChatWallpaper } from "../../utils/chatWallpaper";
import { ArrowLeft } from "lucide-react";
import Footer from "../../components/common/Footer";
import Button from "../../components/ui/Button";

type CarouselWallpaper = {
  id: ChatWallpaper;
  image: string;
  label: string;
};

const wallpapers: CarouselWallpaper[] = [
  { id: "1", image: chatWallpaperImages["1"], label: "Wallpaper 1" },
  { id: "2", image: chatWallpaperImages["2"], label: "Wallpaper 2" },
  { id: "3", image: chatWallpaperImages["3"], label: "Wallpaper 3" },
];

export default function ChatWallpaper() {
  const navigate = useNavigate();
  const { chatWallpaper: currentWallpaper, setChatWallpaper } = useChatWallpaper();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const idx = wallpapers.findIndex((w) => w.id === currentWallpaper);
    return idx >= 0 ? idx : 0;
  });

  const normalizedIndex =
    ((selectedIndex % wallpapers.length) + wallpapers.length) % wallpapers.length;
  const previewWallpaper = wallpapers[normalizedIndex]?.id;

  const previewRef = useRef<HTMLDivElement>(null);

  // Apply selected wallpaper to the preview container instantly while on this page
  useEffect(() => {
    const previewId = previewWallpaper ?? "default";
    applyChatWallpaper(previewId, previewRef.current);
  }, [previewWallpaper]);

  const handleActivate = () => {
    if (previewWallpaper) {
      setChatWallpaper(previewWallpaper);
      navigate(-1);
    }
  };

  const handleDefault = () => {
    setSelectedIndex(0);
    setChatWallpaper("default");
    navigate(-1);
  };

  // For touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goPrevious = useCallback(() => {
    setSelectedIndex((prev) => prev - 1);
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => prev + 1);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStart - touchEndX;

    if (diff > 50) {
      goNext();
    } else if (diff < -50) {
      goPrevious();
    }
    setTouchStart(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrevious();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrevious, goNext]);

  return (
    <div className="min-h-dvh text-white flex flex-col relative z-50">
      {/* Light overlay so the app background stays visible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center relative mb-6">
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 flex items-center justify-center absolute left-0"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-[20px] font-bold w-full text-center">Chat Wallpaper</h1>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-bold">
                Roger Dela Cruz Nicon
              </h2>
              <p className="text-[14px] text-gray-400 mt-0.5">
                Lv2-ROGER-000053-2026
              </p>
            </div>
            <Button variant="opacitysecondary" onClick={handleDefault}>
              Default
            </Button>
          </div>
        </div>

        {/* Chat Preview */}
        <div className="px-5 mb-4">
          <div
            ref={previewRef}
            className="w-full h-[200px] rounded-[24px] border border-white/10 overflow-hidden relative"
          >
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600" />
                <div className="bg-[#1E1E1E] px-3 py-2 rounded-lg rounded-tl-none text-xs max-w-[70%]">
                  Preview message
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="flex-1 relative w-full flex flex-col items-center justify-center min-h-[320px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-[55vh] max-h-[420px] flex items-center justify-center">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const absoluteIdx = selectedIndex + offset;
              const actualIdx =
                ((absoluteIdx % wallpapers.length) + wallpapers.length) % wallpapers.length;
              const wallpaper = wallpapers[actualIdx];
              const isCenter = offset === 0;

              let translateX = "0%";
              let scale = 1;
              let zIndex = 10;
              let opacity = 1;

              if (offset === -2) {
                translateX = "-112%";
                scale = 0.78;
                zIndex = 0;
                opacity = 0.35;
              }
              if (offset === -1) {
                translateX = "-60%";
                scale = 0.88;
                zIndex = 5;
                opacity = 0.65;
              }
              if (offset === 0) {
                translateX = "0%";
                scale = 1;
                zIndex = 10;
                opacity = 1;
              }
              if (offset === 1) {
                translateX = "60%";
                scale = 0.88;
                zIndex = 5;
                opacity = 0.65;
              }
              if (offset === 2) {
                translateX = "112%";
                scale = 0.78;
                zIndex = 0;
                opacity = 0.35;
              }

              return (
                <div
                  key={`${absoluteIdx}-${wallpaper.id}`}
                  onClick={() => setSelectedIndex(absoluteIdx)}
                  className="absolute w-[62%] h-[88%] cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    zIndex,
                    opacity,
                    transition:
                      "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 500ms ease, z-index 0ms",
                    willChange: "transform, opacity",
                  }}
                >
                  {wallpaper.image ? (
                    <img
                      src={wallpaper.image}
                      alt={wallpaper.label}
                      className={`w-full h-full object-cover rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 ${isCenter ? "brightness-100" : "brightness-90"
                        }`}
                    />
                  ) : (
                    <div
                      className={`w-full h-full rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 bg-[linear-gradient(180deg,#151515_0%,#090909_100%)] flex flex-col items-center justify-center px-6 text-center ${isCenter ? "brightness-100" : "brightness-90"
                        }`}
                    >
                      <p className="text-lg font-bold tracking-[0.25em] uppercase">
                        Default Wallpaper
                      </p>
                      <p className="mt-2 text-sm text-white/65">
                        Clean dark mode background
                      </p>
                    </div>
                  )}
                  {isCenter && (
                    <div className="absolute -bottom-10 left-0 right-0 text-center text-sm font-semibold tracking-widest uppercase">
                      {wallpaper.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-10 mb-4">
            {wallpapers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className="h-2 w-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    idx === normalizedIndex
                      ? "var(--secondary-color)"
                      : "transparent",
                  border:
                    idx === normalizedIndex
                      ? "none"
                      : "1px solid rgba(255,255,255,0.5)",
                  transform: idx === normalizedIndex ? "scale(1.25)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Activate Button */}
        <div className="px-5 pb-8 pt-4">
          <Button variant="opacitysecondary" className="w-full" onClick={handleActivate}>
            Activate
          </Button>
        </div>
      </div>

      <div className="px-5 py-4 relative z-10 bg-black/40 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  );
}
