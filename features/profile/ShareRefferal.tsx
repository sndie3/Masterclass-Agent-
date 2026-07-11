import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button"
export default function ShareReferral() {
    const navigate = useNavigate();


    return (
        <div className="min-h-dvh flex flex-col text-white px-5 py-4 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/profile')}
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--button-color)" }}
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold flex-1 text-center pr-10">
                    Share Refferal Code
                </h1>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="text-md font-bold tracking-wide">
                        Roger Dela Cruz Nicon
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Lv2-ROGER-000053-2026
                    </p>
                </div>
                <div className="flex place-items-center">
                    <Button variant="secondary">
                        COPY QR
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 justify-between mt-10">
                <img
                    src="/assets/apps/telegram.png"
                    alt="telegram"
                    className="w-full max-w-20 mx-auto object-contain"
                />
                <img
                    src="/assets/apps/viber.png"
                    alt="viber"
                    className="w-full max-w-20 mx-auto object-contain"
                />
                <img
                    src="/assets/apps/whatsapp.png"
                    alt="whatsapp"
                    className="w-full max-w-20 mx-auto object-contain"
                />
            </div>
        </div>
    );
}
