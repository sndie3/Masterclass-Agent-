import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera } from "lucide-react";
import Footer from "../../components/common/Footer";

const STORAGE_KEY = "selfieWithID";

export default function SelfieWithID() {
  const navigate = useNavigate();

  const [showCamera, setShowCamera] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);
  const [message, setMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasAutoOpenedCamera = useRef(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (cameraError && !hasAutoOpenedCamera.current && fileInputRef.current) {
      hasAutoOpenedCamera.current = true;
      fileInputRef.current.click();
    }
  }, [cameraError]);

  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(false);
    setMessage("");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(true);
      setShowCamera(false);
      setIsLoading(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "user" } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
        await video.play();
      }
      setShowCamera(true);
    } catch {
      setCameraError(true);
      setShowCamera(false);
      setMessage("Camera access failed. You can use your phone's camera below.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

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
    localStorage.setItem(STORAGE_KEY, imageData);
    stopCamera();
    navigate(-1);
  };

  const handleRetryCamera = () => {
    stopCamera();
    setCameraError(false);
    setMessage("");
    setShowCamera(true);
    startCamera();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        localStorage.setItem(STORAGE_KEY, result);
        navigate(-1);
      }
    };
    reader.readAsDataURL(file);
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
            Selfie with ID
          </h1>
        </div>

        {/* Instructions */}
        <p className="text-sm text-gray-400 text-center mb-6">
          Hold your ID beside your face. Make sure both your face and ID are clearly visible.
        </p>

        {/* Camera / Preview */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {showCamera && (
            <div className="w-full max-w-sm aspect-[3/4] bg-black border border-white/20 overflow-hidden relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              {isLoading && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                  <p className="text-sm text-gray-400 animate-pulse">Accessing camera...</p>
                </div>
              )}
            </div>
          )}

          {!showCamera && (
            <div className="w-full max-w-sm aspect-[3/4] bg-black border border-white/20 flex items-center justify-center px-4">
              <p className="text-sm text-gray-400 text-center">
                {cameraError
                  ? "Phone camera preview is not available. Use the button below to take a photo."
                  : "No camera access"}
              </p>
            </div>
          )}

          {message && (
            <p className="text-sm text-center text-gray-300 mt-4">{message}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 mt-6">
          {isLoading ? (
            <button
              disabled
              className="w-full py-4 text-sm font-semibold uppercase opacity-50 cursor-not-allowed"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Accessing Camera...
            </button>
          ) : showCamera ? (
            <button
              onClick={handleCapture}
              className="w-full py-4 text-sm font-semibold uppercase flex items-center justify-center gap-2"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              <Camera size={20} />
              Capture
            </button>
          ) : cameraError ? (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 text-sm font-semibold uppercase"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                Take Photo with Phone Camera
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={handleRetryCamera}
                className="w-full py-4 text-sm font-semibold uppercase"
                style={{ backgroundColor: "var(--button-color)" }}
              >
                Retry Live Camera
              </button>
            </>
          ) : (
            <button
              onClick={handleRetryCamera}
              className="w-full py-4 text-sm font-semibold uppercase"
              style={{ backgroundColor: "var(--button-color)" }}
            >
              Retry Camera
            </button>
          )}
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
