import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera } from "lucide-react";
import Footer from "../../components/common/Footer";
import { useModal } from "../../context/ModalContext";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    password: "",
  });

  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { showModal } = useModal();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      showModal(
        "warning",
        "Camera Access Denied",
        "Could not access the camera. Please allow camera permission and try again."
      );
      setShowCamera(false);
    }
  };

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const handleOpenCamera = () => {
    setShowCamera(true);
    startCamera();
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    stopCamera();
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    setPhoto(imageData);
    handleCloseCamera();
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleActivate = () => {
    if (!form.firstName || !form.lastName || !form.mobileNumber || !form.password) {
      showModal(
        "warning",
        "Missing Required Fields",
        "Please fill in all required fields."
      );
      return;
    }

    if (!photo) {
      showModal(
        "warning",
        "Selfie with ID Required",
        "Please take a selfie with your ID before continuing."
      );
      return;
    }

    const newAccount = {
      ...form,
      photo,
    };

    const existing = JSON.parse(localStorage.getItem("registeredAccounts") || "[]");
    existing.push(newAccount);
    localStorage.setItem("registeredAccounts", JSON.stringify(existing));

    showModal(
      "success",
      "Registration Successful",
      "Your account has been registered successfully."
    ); 
    setForm({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      password: "",
    });
    setPhoto(null);
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
          <h1 className="text-lg font-bold flex-1 text-center pr-10">Register</h1>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-400 mb-4 text-justify">
          Make sure that all information are true and correct. Any false information
          will forfeit player privilege and automatically terminate or block player
          account use and access. Privacy Policy and Terms of Use will apply.
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.mobileNumber}
            onChange={(e) => handleChange("mobileNumber", e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />

          {/* Birthdate */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              maxLength={2}
              value={form.birthMonth}
              onChange={(e) => handleChange("birthMonth", e.target.value.replace(/\D/g, ""))}
              className="w-0 flex-1 min-w-0 py-3 px-1 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD"
              maxLength={2}
              value={form.birthDay}
              onChange={(e) => handleChange("birthDay", e.target.value.replace(/\D/g, ""))}
              className="w-0 flex-1 min-w-0 py-3 px-1 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              maxLength={4}
              value={form.birthYear}
              onChange={(e) => handleChange("birthYear", e.target.value.replace(/\D/g, ""))}
              className="w-0 flex-1 min-w-0 py-3 px-1 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
            />
          </div>

          <input
            type="password"
            placeholder="Password 8 characters alphanumeric"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />

          {/* Selfie with ID */}
          <button
            onClick={handleOpenCamera}
            className="w-full aspect-video border border-white/30 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white transition relative overflow-hidden"
          >
            {photo ? (
              <img src={photo} alt="Captured" className="w-full h-full object-contain" />
            ) : (
              <>
                <Camera size={28} />
                <span className="text-sm">Selfie with ID</span>
              </>
            )}
          </button>

          {/* Camera Modal */}
          {showCamera && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}>
              <div className="relative w-full max-w-sm bg-black border border-white/20 rounded-lg overflow-hidden flex flex-col">
                <div className="relative aspect-square bg-black flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="flex items-center justify-center gap-4 px-6 py-5">
                  <button
                    onClick={handleCapture}
                    className="flex-1 py-3 rounded-lg font-semibold text-white text-sm"
                    style={{ backgroundColor: "var(--card-color)" }}
                  >
                    Capture
                  </button>
                  <button
                    onClick={handleCloseCamera}
                    className="flex-1 py-3 rounded-lg font-semibold text-white text-sm bg-red-600 hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-2">
            <button
              onClick={handleActivate}
              className="w-48 py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Activate
            </button>
          </div>


        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
