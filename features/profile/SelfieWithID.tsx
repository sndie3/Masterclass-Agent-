import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera } from "lucide-react";
import Footer from "../../components/common/Footer";

const STORAGE_KEY = "selfieWithID";

export default function SelfieWithID() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setShowCamera(true);
    } catch {
      setMessage("Could not access camera. Please allow camera permission.");
      setShowCamera(false);
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
    setPhoto(null);
    setShowCamera(true);
    setMessage("");
    startCamera();
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
          Hold your ID next to your face and make sure both are clearly visible.
        </p>

        {/* Camera / Preview */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {isLoading && (
            <div className="w-full max-w-sm aspect-[3/4] bg-black border border-white/20 flex items-center justify-center">
              <p className="text-sm text-gray-400 animate-pulse">Accessing camera...</p>
            </div>
          )}

          {!isLoading && showCamera && (
            <div className="w-full max-w-sm aspect-[3/4] bg-black border border-white/20 overflow-hidden relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {!isLoading && !showCamera && photo && (
            <div className="w-full max-w-sm aspect-[3/4] border border-white/20 overflow-hidden">
              <img
                src={photo}
                alt="Captured selfie with ID"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {!isLoading && !showCamera && !photo && (
            <div className="w-full max-w-sm aspect-[3/4] bg-black border border-white/20 flex items-center justify-center">
              <p className="text-sm text-gray-400">No camera access</p>
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
              className="w-full py-4 text-sm font-semibold uppercase transition hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              <Camera size={20} />
              Capture
            </button>
          ) : (
            <button
              onClick={handleRetryCamera}
              className="w-full py-4 text-sm font-semibold uppercase transition hover:opacity-90"
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
