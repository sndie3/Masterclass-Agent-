import { ChevronLeft, CircleChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LogsTable from "../../components/common/LogsTable";
import DashboardCard from "../dashboard/components/DashboardCard";
import { useState } from "react";
import EarningModal from "./components/EarningsModal";

function Earnings() {

    const navigate = useNavigate()
    const [showStandard, setShowStandard] = useState(false);
    const [showSpecialty, setShowSetSpecialty] = useState(false);


    const logs = [
        {
            uid: "PID-ROGER-000053-2026",
            gc: 101,
            ens: 0.5,
        },
        {
            uid: "PID-ROGER-000054-2026",
            gc: 2500,
            ens: 1.25,
        },
        {
            uid: "PID-ROGER-000055-2026",
            gc: 10000,
            ens: 10,
        },
        {
            uid: "PID-ROGER-000055-2026",
            gc: 10000,
            ens: 10,
        },
        {
            uid: "PID-ROGER-000055-2026",
            gc: 10000,
            ens: 10,
        },
        {
            uid: "PID-ROGER-000055-2026",
            gc: 10000,
            ens: 10,
        },

    ];
    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col ">
            <div className="flex items-center mb-4 px-5 pt-4 pb-6">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--button-color)" }}
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold flex-1 text-center pr-10">Earnings</h1>
            </div>
            <div className="flex-1 mt-3 overflow-y-auto px-3 ">
                <p className="flex text-justify text-gray-400 text-sm">
                    Earnings are real-time and cut-off transactions. You can withdraw anytime only to real-time earnings on the next day and cut-off transactions are withdrawable on the 16th and every 1st day of the month.
                </p>
                <br />
                <p className="text-gray-400 text-sm">PLAY RESPONSIBLY.</p>
                <br />
                <div className="flex justify-evenly">
                    <DashboardCard title="Specialty" walletData={123456}>
                        <button onClick={() => setShowSetSpecialty(true)}>
                            <CircleChevronLeft className='w-8 h-8' />
                        </button>
                    </DashboardCard>
                    <DashboardCard title="Standard" walletData={123456}>
                        <button onClick={() => setShowStandard(true)}>
                            <CircleChevronLeft className='w-8 h-8' />
                        </button>
                    </DashboardCard>
                </div>
                <p className="flex justify-center tracking-widest text-xl pt-8">LOGS</p>
                <div className='flex justify-center py-4'>
                    <LogsTable logs={logs} />
                </div>
            </div>
            <EarningModal
                open={showSpecialty}
                type="Speciality"
                wallet={1000}
                onCancel={() => setShowSetSpecialty(false)}
                buttonText="SUBMIT WITHDRAWAL"
                onConfirm={() => setShowSetSpecialty(false)}
            />
            <EarningModal
                open={showStandard}
                type="Standard"
                wallet={1000}
                onCancel={() => setShowStandard(false)}
                buttonText="SUBMIT WITHDRAWAL"
                onConfirm={() => setShowStandard(false)}

            />
        </div>
    )
}

export default Earnings  