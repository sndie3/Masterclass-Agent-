import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Earnings() {

    const route = useNavigate()
   
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
                    <div>
                        <img src="/assets/icons/invite.png" alt="icon" className="w-7 h-7" />
                    </div>
                </div>
            </div>

            <div className="flex-1 mt-3 overflow-y-auto px-3">
                <p className="flex text-justify text-gray-400 text-sm">
                    Earnings are real-time and cut-off transactions. You can withdraw anytime only to real-time earnings on the next day and cut-off transactions are withdrawable on the 16th and every 1st day of the month. 
                </p>
                <br/>
                <p className="text-gray-400 text-sm">PLAY RESPONSIBLY.</p>
                <br/>
            </div>

        </div>
    )
}

export default Earnings  