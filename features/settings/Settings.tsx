import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";
import Button from "../../components/ui/Button";

const settingsOptions = [
  { label: "PROFILE SECURITY", route: "/profile-security" },
  { label: "CHAT SETTINGS", route: "/chat-settings" },
  { label: "DEACTIVATE ACCOUNT", route: "/deactivate-account" },
  { label: "LICENSES", route: "/licenses" },
  { label: "SYSTEM LICENSE", route: "/system-license" },
];

export default function Settings() {
  const navigate = useNavigate();

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
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10">Settings</h1>
        </div>

        {/* Settings Options */}
        <div className="flex flex-col gap-3">
          {settingsOptions.map((option) => (
            <Button 
              key={option.label}           
              onClick={() => handleNavigate(option.route)}
              variant="secondary"
              className="w-full">
              {option.label}
            </Button>
          ))}
        </div>
        {/* <button
          key={option.label}
          onClick={() => handleNavigate(option.route)}
          className="w-full py-4 text-center font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--card-color)" }}
        >
          {option.label}
        </button> */}
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
