import { useNavigate } from 'react-router-dom'

function LoginCard() {

    const navigate = useNavigate();
    return (

            <div className="min-h-[90dvh] text-white font-sans">
                <div className="flex min-h-[90dvh] flex-col w-full max-w-[1200px] mx-auto px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-16">
                    {/* Centered Login Section */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1
                            className="text-center font-bold mb-10"
                            style={{
                                fontFamily: "Bahnschrift, sans-serif",
                                fontSize: "clamp(18px, 3vw, 28px)",
                            }}
                        >
                            MASTERCLASS
                        </h1>
                        <div className="pb-6">
                            <p
                                className="text-[#666] leading-relaxed text-justify"
                                style={{
                                    fontFamily: '"Aptos Narrow", sans-serif',
                                    fontSize: "clamp(12px, 1.5vw, 16px)",
                                }}
                            >
                                This site is for 21 years and above only, not allowed to any
                                government official or employee connected with any government agency
                                or armed forces, not allowed to any Gaming Employment License (GEL)
                                holder, not allowed to any PAGCOR's National Database of Restricted
                                Persons (NDRP), also that your funds or credits in my account may be
                                forfeited if found ineligible, you are refrain from playing in
                                public, and I agree to MGAME's{" "}
                                <span className="text-red-600 font-semibold">
                                    Privacy Policy
                                </span>{" "}
                                and{" "}
                                <span className="text-red-600 font-semibold">
                                    Terms of Use.
                                </span>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:border-white transition-colors"
                                style={{
                                    fontFamily: '"Calibri Light", Calibri, sans-serif',
                                    fontSize: "clamp(14px, 1.5vw, 18px)",
                                }}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:border-white transition-colors"
                                style={{
                                    fontFamily: '"Calibri Light", Calibri, sans-serif',
                                    fontSize: "clamp(14px, 1.5vw, 18px)",
                                }}
                            />
                        </div>

                        <label className="flex items-center gap-2 mt-3 cursor-pointer">
                            <div
                                className="w-7 h-7 border border-[#333] flex items-center justify-center text-sm font-bold"
                            >
                                ✕
                            </div>

                            <span className="text-xs">I agree to MGame's <span className="text-red-600">Privacy Policy</span>   &amp;<span className="text-red-600"> Terms of Use.</span> </span>
                        </label>

                        <button

                            className="mx-auto mt-6 bg-[#222] hover:bg-[#333] transition-colors cursor-pointer px-16 py-2 text-lg font-bold"
                        >
                            LOGIN
                        </button>

                        <div className="flex justify-between mt-15 text-lg font-bold">
                            <button
                                className="cursor-pointer"
                                onClick={() => navigate("/register")}
                            >
                                REGISTER
                            </button>

                            <button
                                className="cursor-pointer"
                                onClick={() => navigate("/reset")}
                            >
                                RESET
                            </button>
                        </div>

                    </div>

                    {/* Disclaimer */}

                </div>
            </div>

    )
}

export default LoginCard