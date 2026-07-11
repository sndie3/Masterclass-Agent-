import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

export default function DeactivateAccount() {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleDeactivate = () => {
    if (!reason.trim()) {
      setMessage("Please provide a reason for deactivation.");
      return;
    }

    localStorage.setItem("accountDeactivated", "true");
    localStorage.setItem("deactivationReason", reason.trim());
    localStorage.removeItem("userMobileNumber");
    localStorage.removeItem("userUsername");

    setMessage("Account deactivated.");
    setReason("");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-dvh flex flex-col text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10 uppercase">
            Deactivate Account
          </h1>
        </div>

        {/* Reason Input */}
        <textarea
          placeholder="REASON"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-32 p-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 placeholder:italic outline-none focus:border-white resize-none mb-4"
          style={{ backgroundColor: "var(--card-color)" }}
        />

        {/* Deactivate Button */}
        <button
          onClick={handleDeactivate}
          disabled={!reason.trim()}
          className={`w-full py-4 font-bold uppercase text-white transition ${
            reason.trim() ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
          }`}
          style={{ backgroundColor: "var(--card-color)" }}
        >
          Deactivate Now
        </button>

        {message && (
          <p className="text-sm text-center mt-4 text-gray-300">{message}</p>
        )}

        {/* Policies Link */}
        <div className="flex-1 flex items-end justify-center pb-6">
          <button
            onClick={() => navigate("/policies")}
            className="text-sm font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition"
          >
            Policies
          </button>
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
