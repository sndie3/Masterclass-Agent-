import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Footer from "../../components/common/Footer";

interface SubAccount {
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  birthdate: string;
  password: string;
  level: number;
  photo: string | null;
}

export default function AddLevel() {
  const navigate = useNavigate();

  const [userLevel] = useState<number>(() => {
    const saved = localStorage.getItem("userLevel");
    return saved ? parseInt(saved, 10) : 2;
  });

  const maxLevel = 5;
  const canCreate = userLevel < maxLevel;
  const childLevel = canCreate ? userLevel + 1 : 0;

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    birthdate: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
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
      setMessage("Could not access camera. Please allow camera permission.");
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
    if (!canCreate) {
      setMessage("Level 5 accounts cannot create sub-accounts.");
      return;
    }

    if (!form.firstName || !form.lastName || !form.mobileNumber || !form.password) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const newAccount: SubAccount = {
      ...form,
      level: childLevel,
      photo,
    };

    const existing: SubAccount[] = JSON.parse(localStorage.getItem("subAccounts") || "[]");
    existing.push(newAccount);
    localStorage.setItem("subAccounts", JSON.stringify(existing));

    setMessage(`Level ${childLevel} account created successfully.`);
    setForm({
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      birthdate: "",
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
          <h1 className="text-lg font-bold flex-1 text-center pr-10">
            Add Level
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-400 mb-4 space-y-2">
          <p>
            Make sure that all registration are true and correct. Any false information
            will forfeit your privilege and automatically terminate or block your
            account use and access. Privacy Policy and Terms of Use will apply.
          </p>
          <p>
            All earnings are fix. Some game earnings are based on total bet, and some
            are from net gross revenue.
          </p>
          <p>PLAY RESPONSIBLY.</p>
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
            placeholder="Middle Name"
            value={form.middleName}
            onChange={(e) => handleChange("middleName", e.target.value)}
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
          <input
            type="text"
            placeholder="Birthdate"
            value={form.birthdate}
            onChange={(e) => handleChange("birthdate", e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password 8 characters alphanumeric"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full py-3 px-4 bg-transparent border border-white/30 text-center text-sm text-white placeholder-gray-500 outline-none focus:border-white"
          />

          {/* Take Picture */}
          <button
            onClick={handleOpenCamera}
            className="w-full py-8 border border-white/30 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white transition relative overflow-hidden"
          >
            {photo ? (
              <img src={photo} alt="Captured" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={28} />
                <span className="text-sm">Take Picture</span>
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

          {/* Level + Activate */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 flex items-stretch border border-white">
              <div className="px-3 py-3 border-r border-white flex items-center">
                <span className="text-sm font-semibold">Level</span>
              </div>
              <div className="flex-1 flex items-center justify-between px-3 py-3">
                <span className="text-sm font-bold">{canCreate ? childLevel : "-"}</span>
                {canCreate && <ChevronRight size={16} />}
              </div>
            </div>

            <button
              onClick={handleActivate}
              className="flex-1 py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Activate
            </button>
          </div>

          {message && (
            <p className="text-sm text-center mt-2 text-gray-300">{message}</p>
          )}

          {!canCreate && (
            <p className="text-sm text-center text-red-400 mt-2">
              Level 5 accounts cannot create sub-accounts.
            </p>
          )}
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
