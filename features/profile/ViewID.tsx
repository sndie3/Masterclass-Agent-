import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2 } from "lucide-react";
import Footer from "../../components/common/Footer";

const STORAGE_KEY = "selfieWithID";

export default function ViewID() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setPhoto(localStorage.getItem(STORAGE_KEY));
  }, []);

  const handleDelete = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPhoto(null);
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
            View ID
          </h1>
        </div>

        {/* Photo */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {photo ? (
            <div className="w-full max-w-sm aspect-[3/4] border border-white/20 overflow-hidden">
              <img
                src={photo}
                alt="Saved selfie with ID"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No selfie with ID on record.
            </p>
          )}

        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          {photo ? (
            <>
              <button
                onClick={() => navigate("/selfie-with-id")}
                className="w-full py-4 text-sm font-semibold uppercase transition hover:opacity-90"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                Retake
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-4 text-sm font-semibold uppercase transition hover:opacity-90 flex items-center justify-center gap-2 bg-red-600"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/selfie-with-id")}
              className="w-full py-4 text-sm font-semibold uppercase transition hover:opacity-90"
              style={{ backgroundColor: "var(--card-color)" }}
            >
              Take Selfie with ID
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
