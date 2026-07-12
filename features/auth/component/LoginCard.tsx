import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useModal } from "../../../context/ModalContext";
import CustomInput from "../../../components/ui/InputBox"
import Button from '../../../components/ui/Button';
function LoginCard() {
    const [agree, setAgree] = useState(true);
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
                message = "Please enter your username and password to continue.";
                title = "Username and Password Required";
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
                "Please read and agree to the Privacy Policy and Terms of Use to continue."
            );

            return;
        }

        // Validate against registered mobile number
        const registeredUsername = localStorage.getItem('registeredUsername');
        if (registeredUsername && username !== registeredUsername) {
            showModal(
                "warning",
                "Account Mismatch",
                "Username does not match registered account"
            );
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

                    <span className='flex justify-center'>
                        <img src="/masterclass logo white.png" alt="masterclass-logo" className='w-35 object-contain' />
                    </span>
                    <div className="pb-6">
                        <p
                            className="text-[#666] leading-relaxed text-justify"
                            style={{
                                fontFamily: '"Aptos Narrow", sans-serif',
                                fontSize: "clamp(12px, 1.5vw, 16px)",
                            }}
                        >
                            By continuing, I confirm that I am 21 years old or above and eligible to use MGame.ph. 
                            I am not a government official or employee, a member of the armed forces, 
                            a Gaming Employment License (GEL) holder, or listed in PAGCOR's National Database of Restricted Persons (NDRP). 
                            I understand that if I am found ineligible, my account, funds, and credits may be forfeited in accordance with applicable regulations.
                            I agree to play responsibly, avoid playing in public places, and accept MGame.ph's
                            {" "}
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
                        <CustomInput
                            type='text'
                            custom-style='placeholder:italic placeholder:tracking-[8px] py-4'
                            placeholder="Username"
                            onChange={handleUsernameChange}
                        />
                        <CustomInput
                            type='password'
                            onChange={handlePasswordChange}
                            custom-style='placeholder:italic placeholder:tracking-[8px] py-4'
                            placeholder="Password"
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
                    <Button
                        variant='secondary'
                        onClick={handleLogin}
                        className='mx-auto tracking-widest mt-5'>
                        Login
                    </Button>
                    <div className="flex justify-center mt-15 text-lg font-bold">
                        <button
                            className="cursor-pointer"
                            onClick={() => navigate("/reset")}
                        >
                            RESET
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginCard