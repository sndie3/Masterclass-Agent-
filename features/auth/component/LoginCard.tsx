import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useModal } from "../../../context/ModalContext";

function LoginCard() {
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState(() => localStorage.getItem("cachedUsername") || "");
    const [password, setPassword] = useState("");

    const { showModal } = useModal();

    // Cache mobile number on change
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        localStorage.setItem("cachedUsername", value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Validate fields
        if (!username || !password) {
            let message;
            let title;

            if (!username && !password) {
                message = "Please enter your username and password.";
                title = "Missing Required Fields";
            } else if (!username) {
                message = "Please enter your username.";
                title = "Missing Username";
            } else {
                message = "Please enter your password.";
                title = "Missing Password";
            }

            showModal(
                "warning",
                title,
                message
            );

            return;
        }

        if (!agree) {
            showModal(
                "warning",
                "Agreement Required",
                "Please agree to Privacy Policy & Terms of Use"
            );

            return;
        }

        // Validate against registered mobile number
        const registeredUsername = localStorage.getItem('registeredUsername');
        if (registeredUsername && username !== registeredUsername) {
            alert('Username does not match registered account');
            return;
        }

        // Here you would typically authenticate with your backend
        console.log('Login attempt:', { username });

        // Store user mobile number to establish session
        localStorage.setItem('userUsername', username);

        // Store registered mobile number if not present (simulating successful login for new device)
        if (!registeredUsername) {
            localStorage.setItem('registeredUsername', username);
        }

        // Set a generic username if not registered
        if (!localStorage.getItem('username')) {
            localStorage.setItem('username', 'Player');
        }

        // Set default verification status if not already set
        // Navigate to dashboard
        navigate('/dashboard');
    };
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
                            onChange={handleUsernameChange}
                            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:border-white transition-colors"
                            style={{
                                fontFamily: '"Calibri Light", Calibri, sans-serif',
                                fontSize: "clamp(14px, 1.5vw, 18px)",
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            className="w-full bg-transparent border border-[#333] rounded px-4 py-3 md:py-4 text-center text-white placeholder:italic placeholder:tracking-[8px] outline-none focus:border-white transition-colors"
                            style={{
                                fontFamily: '"Calibri Light", Calibri, sans-serif',
                                fontSize: "clamp(14px, 1.5vw, 18px)",
                            }}
                        />
                    </div>

                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                        <div
                            onClick={() => setAgree(!agree)}
                            className="w-7 h-7 border border-[#333] flex items-center justify-center text-sm font-bold"
                        >
                            {agree && "✕"}
                        </div>

                        <span className="text-xs">I agree to Masterclass <span className="text-red-600">Privacy Policy</span>   &amp;<span className="text-red-600"> Terms of Use.</span> </span>
                    </label>
                    <button
                        onClick={handleLogin}
                        className="mx-auto mt-6 bg-[#222] hover:bg-[#333] transition-colors cursor-pointer px-16 py-2 text-lg font-bold"
                    >
                        LOGIN
                    </button>

                    <div className="flex justify-center mt-15 text-lg font-bold">
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