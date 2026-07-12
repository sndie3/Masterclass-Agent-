import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";
import { applyAppIcon, getSavedAppIcon } from "../../utils/appIcon";
import Button from "../../components/ui/Button";
import { useModal } from "../../context/ModalContext";

const icons = [
  { id: "/assets/app-icons/icon1.png", label: "Violet", alt: "MASTERCLASS LOGO VIOLET" },
  { id: "/assets/app-icons/icon2.png", label: "Blue", alt: "masterclass logo blue" },
  { id: "/assets/app-icons/icon3.png", label: "Yellow", alt: "masterclass logo yellow" },
];

const DEFAULT_ICON = "/masterclass-orig.png";
const STORAGE_KEY = "appIcon";

export default function AppIcon() {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState(() => {
    return getSavedAppIcon() || DEFAULT_ICON;
  });

  const {showModal} = useModal()
  const handleActivate = () => {
    localStorage.setItem(STORAGE_KEY, selectedIcon);
    applyAppIcon(selectedIcon);
    showModal(
        "success",
        "Icon Updated", 
        "App icon updated successfully."
      );
  };

  const handleDefault = () => {
    setSelectedIcon(DEFAULT_ICON);
    localStorage.setItem(STORAGE_KEY, DEFAULT_ICON);
    applyAppIcon(DEFAULT_ICON);
     showModal(
        "success",
        "App Icon Updated",
        "Your app icon has been changed successfully."
      );
  };

  return (
    <div className="min-h-dvh flex flex-col text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center relative mb-8">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full flex items-center justify-center absolute left-0"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold w-full text-center uppercase">
            App Icon
          </h1>
          <Button
            variant="opacitysecondary"
            onClick={handleDefault}
          >
            Default
          </Button>
        </div>

        {/* Icon Options */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {icons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => {
                setSelectedIcon(icon.id);
              }}
              className={`relative p-2 rounded-xl transition flex flex-col items-center ${selectedIcon === icon.id
                ? "ring-2 ring-white"
                : "opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={icon.id}
                alt={icon.alt}
                className="w-20 h-20 object-contain"
              />
              <span className="text-xs mt-2 text-gray-400">{icon.label}</span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="w-40 h-40 border border-white/20 flex items-center justify-center bg-black">
            <img
              src={selectedIcon}
              alt="Selected app icon preview"
              className="w-32 h-32 object-contain"
            />
          </div>
          <Button
            variant="opacitysecondary"
            onClick={handleActivate}
            className="w-full"
          >
            Activate
          </Button>
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
