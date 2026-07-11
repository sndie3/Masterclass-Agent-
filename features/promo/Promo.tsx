import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Footer from "../../components/common/Footer";

const promos = [
  "Sign Up Bonus",
  "Player Cash-In Rebate",
  "Hourly Promo",
  "Discount Program",
  "Daily Raffle",
  "Weekly Raffle",
  "Monthly Raffle",
  "Event",
];

export default function Promo() {
  const navigate = useNavigate();

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
            Promo
          </h1>
        </div>

        {/* Promo List */}
        <div className="flex flex-col gap-3">
          {promos.map((promo) => (
            <button
              key={promo}
              className="w-full py-4 text-center font-semibold text-white transition hover:opacity-80"
              style={{ backgroundColor: "var(--card-color)" }}
              onClick={() => {}}
            >
              {promo}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4">
        <Footer />
      </div>
    </div>
  );
}
