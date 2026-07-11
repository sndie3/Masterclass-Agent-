import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  notification: boolean;
}

interface SectionSettings {
  promo: NotificationSettings;
  support: NotificationSettings;
}

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none ${
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

export default function Notifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SectionSettings>({
    promo: { email: true, sms: false, notification: true },
    support: { email: true, sms: false, notification: true },
  });

  const toggle = (
    section: keyof SectionSettings,
    key: keyof NotificationSettings
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const renderRow = (
    section: keyof SectionSettings,
    key: keyof NotificationSettings,
    label: string
  ) => (
    <div className="flex items-center justify-between py-4 border-b border-white/10">
      <span className="text-sm font-medium">{label}</span>
      <Toggle
        checked={settings[section][key]}
        onChange={() => toggle(section, key)}
      />
    </div>
  );

  const renderSection = (
    section: keyof SectionSettings,
    title: string
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <div className="px-1">
        {renderRow(section, "email", "Email")}
        {renderRow(section, "sms", "SMS")}
        {renderRow(section, "notification", "Notification")}
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh flex flex-col text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col px-5 pt-4 pb-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10">
            Notifications
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mb-6">
          Choose which notifications you would like to receive.
        </p>

        {/* Sections */}
        {renderSection("promo", "Promo")}
        {renderSection("support", "Support")}
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
