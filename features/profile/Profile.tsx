import { ChevronLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Link player account" , link : ""},
    { label: "Selfie with ID" , link : ""},
    { label: "Share Referral Code", link : "/profile/share-referral" },
  ];

  return (
    <div className="min-h-dvh flex flex-col text-white px-5 py-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--button-color)" }}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-10">
          Profile
        </h1>
      </div>

      {/* User Info */}
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-wide">
          Roger Dela Cruz Nicon
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Lv2-ROGER-000053-2026
        </p>
      </div>

      {/* Menu Options */}
      <div className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.link)}
            className="w-full py-4 rounded-lg text-sm font-semibold text-center transition"
            style={{
              backgroundColor: "var(--card-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--hover-color)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--card-color)")
            }
          >
            {item.label}
          </button>
        ))}

        <div
          className="flex items-center justify-between px-4 py-4 rounded-lg"
          style={{ backgroundColor: "var(--card-color)" }}
        >
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400 font-semibold">Email:</span>
            <span>esatptceo@gmail.com</span>
          </div>
          <Pencil size={16} className="text-gray-400" />
        </div>

        <div
          className="flex items-center justify-between px-4 py-4 rounded-lg"
          style={{ backgroundColor: "var(--card-color)" }}
        >
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400 font-semibold">Contact:</span>
            <span>09195338125</span>
          </div>
          <Pencil size={16} className="text-gray-400" />
        </div>

        <button
          className="w-full py-4 rounded-lg text-sm font-semibold text-center transition"
          style={{ backgroundColor: "var(--card-color)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--hover-color)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--card-color)")
          }
          onClick={() => navigate("/theme")}
        >
          Theme
        </button>

        <button
          className="w-full py-4 rounded-lg text-sm font-semibold text-center transition"
          style={{ backgroundColor: "var(--card-color)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--hover-color)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--card-color)")
          }
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </button>
      </div>

    </div>
  );
}
