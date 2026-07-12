import { ArrowLeft, SendHorizonal } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function CustomerSupport() {

    const route = useNavigate()
    const [message, setMessage] = useState("");
    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col ">
            <div className="rounded-t-[32px] px-3 pt-3 pb-2 relative z-30 bg-black">
                <div className="flex items-center mb-5 justify-between font-bahnschrift">
                    <button
                        onClick={() => { route('/dashboard') }}
                        className="cursor-pointer h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-[24px] font-semibold ">Customer Support</h1>
                    <p />
                </div>
            </div>
            <div className="flex flex-col h-full bg-black">
                {/* Chat list */}
                <div className="flex-1 overflow-y-auto p-4 font-bahnschrift">
                    <div className="flex justify-start">
                        <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-[#1A1A1A] px-4 py-3 shadow-sm">
                            <p className="text-md leading-6 text-white">
                                Hi there! Ask me anything.
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                I'm here to help.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Chat input - always at bottom */}
                <div
                    className="mt-auto flex items-center gap-2 p-3 border-t border-[#333]"
                    style={{ backgroundColor: "var(--button-color)" }}
                >
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 bg-[#111] rounded-full px-4 py-3 outline-none"
                    />
                    <button className="px-5 py-3">
                        <SendHorizonal />
                    </button>
                </div>
            </div>


        </div>
    )
}

export default CustomerSupport  