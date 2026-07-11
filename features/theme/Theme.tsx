import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { themeImages, applyTheme, type Theme } from "../../utils/theme";
import { ArrowLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

type CarouselTheme = {
  id: Theme;
  image: string;
  label: string;
};

const themes: CarouselTheme[] = [
  { id: "2", image: themeImages["2"], label: "Theme 1" },
  { id: "3", image: themeImages["3"], label: "Theme 2" },
  { id: "4", image: themeImages["4"], label: "Theme 3" },
  { id: "5", image: themeImages["5"], label: "Theme 4" },
  { id: "6", image: themeImages["6"], label: "Theme 5" },
  { id: "7", image: themeImages["7"], label: "Theme 6" },
  { id: "8", image: themeImages["8"], label: "Theme 7" },
  { id: "9", image: themeImages["9"], label: "Theme 8" },
  { id: "10", image: themeImages["10"], label: "Theme 9" },
  { id: "11", image: themeImages["11"], label: "Theme 10" },
  { id: "12", image: themeImages["12"], label: "Theme 11" },
  { id: "13", image: themeImages["13"], label: "Theme 12" },
  { id: "14", image: themeImages["14"], label: "Theme 13" },
  { id: "15", image: themeImages["15"], label: "Theme 14" },
  { id: "16", image: themeImages["16"], label: "Theme 15" },
  { id: "17", image: themeImages["17"], label: "Theme 16" },
  { id: "18", image: themeImages["18"], label: "Theme 17" },
  { id: "19", image: themeImages["19"], label: "Theme 18" },
  { id: "20", image: themeImages["20"], label: "Theme 19" },
  { id: "21", image: themeImages["21"], label: "Theme 20" },
  { id: "22", image: themeImages["22"], label: "Theme 21" },
  { id: "23", image: themeImages["23"], label: "Theme 22" },
  { id: "24", image: themeImages["24"], label: "Theme 23" },
];

export default function Theme() {
  const navigate = useNavigate();
  const { theme: currentTheme, setTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const idx = themes.findIndex((t) => t.id === currentTheme);
    return idx >= 0 ? idx : 0;
  });

  const normalizedIndex =
    ((selectedIndex % themes.length) + themes.length) % themes.length;
  const previewTheme = themes[normalizedIndex]?.id;

  const savedThemeRef = useRef(currentTheme);
  useEffect(() => {
    savedThemeRef.current = currentTheme;
  }, [currentTheme]);

  // Apply selected theme to body instantly while on this page
  useEffect(() => {
    const previewThemeId = previewTheme ?? "1";
    applyTheme(previewThemeId);
  }, [previewTheme]);

  // Revert to the saved theme only when leaving the page
  useEffect(() => {
    return () => {
      applyTheme(savedThemeRef.current);
    };
  }, []);

  const handleActivate = () => {
    if (previewTheme) {
      setTheme(previewTheme);
      navigate(-1);
    }
  };

  const handleDefault = () => {
    setSelectedIndex(0);
    setTheme("1");
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
      {/* Light overlay so the theme background stays visible */}
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
            <h1 className="text-[20px] font-bold w-full text-center">Theme</h1>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-bold">
                Roger Dela Cruz{" "}
                <span className="border-b-2 border-red-600">Nicon</span>
              </h2>
              <p className="text-[14px] text-gray-400 mt-0.5">
                Lv2-ROGER-000053-2026
              </p>
            </div>
            <button
              onClick={handleDefault}
              className="px-6 py-2 rounded-lg bg-[#1E1E1E] text-white text-sm font-semibold border border-white/10"
            >
              Default
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="flex-1 relative w-full flex flex-col items-center justify-center min-h-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-[75vh] max-h-[600px] flex items-center justify-center">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const absoluteIdx = selectedIndex + offset;
              const actualIdx =
                ((absoluteIdx % themes.length) + themes.length) % themes.length;
              const theme = themes[actualIdx];
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
                  key={`${absoluteIdx}-${theme.id}`}
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
                  {theme.image ? (
                    <img
                      src={theme.image}
                      alt={theme.label}
                      className={`w-full h-full object-cover rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 ${
                        isCenter ? "brightness-100" : "brightness-90"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-full h-full rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 bg-[linear-gradient(180deg,#151515_0%,#090909_100%)] flex flex-col items-center justify-center px-6 text-center ${
                        isCenter ? "brightness-100" : "brightness-90"
                      }`}
                    >
                      <img
                        src="/masterclass-original.png"
                        alt="MASTERCLASS"
                        className="w-28 h-auto object-contain mb-5"
                      />
                      <p className="text-lg font-bold tracking-[0.25em] uppercase">
                        Default Theme
                      </p>
                      <p className="mt-2 text-sm text-white/65">
                        Clean dark mode background
                      </p>
                    </div>
                  )}
                  {isCenter && (
                    <div className="absolute -bottom-10 left-0 right-0 text-center text-sm font-semibold tracking-widest uppercase">
                      {theme.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-10 mb-4">
            {themes.map((_, idx) => (
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
          <button
            onClick={handleActivate}
            className="w-full h-[56px] rounded-lg text-white font-bold text-lg transition-all active:scale-95 bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-[#333]"
          >
            Activate
          </button>
        </div>
      </div>

      <div className="px-5 py-4 relative z-10 bg-black/40 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  );
}
