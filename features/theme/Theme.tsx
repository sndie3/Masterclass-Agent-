import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { themeImages, applyTheme, type Theme } from "../../utils/theme";
import { ArrowLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

const themes: { id: Theme; image: string }[] = [
  { id: "2", image: themeImages["2"] },
  { id: "3", image: themeImages["3"] },
  { id: "4", image: themeImages["4"] },
  { id: "5", image: themeImages["5"] },
  { id: "6", image: themeImages["6"] },
  { id: "7", image: themeImages["7"] },
  { id: "8", image: themeImages["8"] },
  { id: "9", image: themeImages["9"] },
  { id: "10", image: themeImages["10"] },
  { id: "11", image: themeImages["11"] },
  { id: "12", image: themeImages["12"] },
  { id: "13", image: themeImages["13"] },
  { id: "14", image: themeImages["14"] },
  { id: "15", image: themeImages["15"] },
  { id: "16", image: themeImages["16"] },
];

const getThemeLabel = (index: number) => `Theme ${index + 1}`;

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

  // Apply selected theme to body instantly while on this page
  useEffect(() => {
    const previewThemeId = previewTheme ?? "1";
    applyTheme(previewThemeId);

    return () => {
      applyTheme(currentTheme);
    };
  }, [previewTheme, currentTheme]);

  const handleActivate = () => {
    if (previewTheme) {
      setTheme(previewTheme);
      navigate(-1);
    }
  };

  const handleDefault = () => {
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
    if (!touchStart) return;
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
      {/* Dark overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

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
                translateX = "-115%";
                scale = 0.75;
                zIndex = 0;
                opacity = 0.25;
              }
              if (offset === -1) {
                translateX = "-62%";
                scale = 0.88;
                zIndex = 5;
                opacity = 0.55;
              }
              if (offset === 0) {
                translateX = "0%";
                scale = 1;
                zIndex = 10;
                opacity = 1;
              }
              if (offset === 1) {
                translateX = "62%";
                scale = 0.88;
                zIndex = 5;
                opacity = 0.55;
              }
              if (offset === 2) {
                translateX = "115%";
                scale = 0.75;
                zIndex = 0;
                opacity = 0.25;
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
                  <img
                    src={theme.image}
                    alt={getThemeLabel(actualIdx)}
                    className={`w-full h-full object-cover rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 ${
                      isCenter ? "brightness-100" : "brightness-75"
                    }`}
                  />
                  {isCenter && (
                    <div className="absolute -bottom-10 left-0 right-0 text-center text-sm font-semibold tracking-widest uppercase">
                      {getThemeLabel(actualIdx)}
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
