import { ArrowLeft, CircleChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LogsTable from "../../components/common/LogsTable";
import DashboardCard from "../dashboard/components/DashboardCard";

function Earnings() {

    const route = useNavigate()
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
            <div className="rounded-t-[32px] px-3 pt-6 pb-2 relative z-30" style={{ backgroundColor: 'var(--background-color)' }}>
                <div className="flex items-center mb-5 justify-between font-bahnschrift">
                    <button
                        onClick={() => { route('/dashboard') }}
                        className="cursor-pointer h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-[24px] font-semibold ">Earnings</h1>
                    <p />
                </div>
            </div>

            <div className="flex-1 mt-3 overflow-y-auto px-3">
                <p className="flex text-justify text-gray-400 text-sm">
                    Earnings are real-time and cut-off transactions. You can withdraw anytime only to real-time earnings on the next day and cut-off transactions are withdrawable on the 16th and every 1st day of the month.
                </p>
                <br />
                <p className="text-gray-400 text-sm">PLAY RESPONSIBLY.</p>
                <br />

                <div className="flex justify-evenly">
                    <DashboardCard title="Specialty" walletData={123456}>
                        <CircleChevronLeft className='w-8 h-8' />
                    </DashboardCard>
                    <DashboardCard title="Standard" walletData={123456}>
                        <CircleChevronLeft className='w-8 h-8' />
                    </DashboardCard>
                </div>
                <p className="flex justify-center tracking-widest text-xl pt-8">LOGS</p>
                <div className='flex justify-center py-4'>
                    <LogsTable logs={logs} />
                </div>
            </div>


        </div>
    )
}

export default Earnings  