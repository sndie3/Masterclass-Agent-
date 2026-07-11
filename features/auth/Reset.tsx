import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

export default function Reset() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    if (!mobileNumber || mobileNumber.length !== 11) {
      setMessage("Please enter your 11 digit mobile number.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setMessage("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);
    setMessage(`OTP sent to your email: ${generated}`);
  };

  const handleSubmit = () => {
    if (!otp) {
      setMessage("Please enter the 6 digit OTP.");
      return;
    }
    if (otp !== generatedOtp) {
      setMessage("Invalid OTP. Please try again.");
      return;
    }

    localStorage.setItem("resetPassword", newPassword);
    setMessage("Password reset successfully.");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-dvh flex flex-col text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10">Reset</h1>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-400 mb-6 text-left leading-relaxed">
          Make sure that the number is correct and order and also a pin will be send to your email account for a 2 way verification process.
        </div>

        {/* Reset Form */}
        <div className="flex flex-col gap-3">
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Input your 11 digit number"
            maxLength={11}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />

          <div className="flex justify-center mt-2">
            <button
              onClick={handleReset}
              className="w-full py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* OTP Form */}
        <div className="flex flex-col gap-3 mt-10">
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Input your 6 digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />

          <div className="flex justify-center mt-2">
            <button
              onClick={handleSubmit}
              className="w-full py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Submit
            </button>
          </div>
        </div>

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
