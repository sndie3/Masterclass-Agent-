import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useModal } from "../../../context/ModalContext";
import Footer from "../../../components/common/Footer";
import CustomInput from "../../../components/ui/InputBox";
import Button from "../../../components/ui/Button";
import {
    linkPlayerAccount,
    deactivatePlayerLink,
    getLinkedPlayerAccount,
    type LinkPlayerResponse,
} from "../../../services/playerLinkService";

export default function LinkPlayerCard() {
    const navigate = useNavigate();
    const { showModal } = useModal();

    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [linkedAccount, setLinkedAccount] = useState<LinkPlayerResponse | null>(null);

    useEffect(() => {
        setLinkedAccount(getLinkedPlayerAccount());
    }, []);

    const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setMobileNumber(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const validateFields = (): boolean => {
        if (!mobileNumber || !password) {
            const title = !mobileNumber && !password
                ? "Missing Required Fields"
                : !mobileNumber
                    ? "Missing Mobile Number"
                    : "Missing Password";

            const message = !mobileNumber && !password
                ? "Please enter your mobile number and password to continue."
                : !mobileNumber
                    ? "Please enter your mobile number."
                    : "Please enter your password.";

            showModal("warning", title, message);
            return false;
        }

        if (mobileNumber.length < 10) {
            showModal("warning", "Invalid Mobile Number", "Please enter a valid mobile number.");
            return false;
        }

        if (!agree) {
            showModal("warning", "Agreement Required", "Please agree to Privacy Policy & Terms of Use.");
            return false;
        }

        return true;
    };

    const handleLinkNow = async () => {
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            const result = await linkPlayerAccount({
                mobileNumber,
                password,
            });

            if (result.success) {
                setLinkedAccount(result);
                setMobileNumber("");
                setPassword("");
                setAgree(false);
                showModal("success", "Account Linked", result.message);
            } else {
                showModal("error", "Link Failed", result.message);
            }
        } catch {
            showModal("error", "Link Failed", "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeactivateLink = async () => {
        setIsLoading(true);

        try {
            const result = await deactivatePlayerLink();

            if (result.success) {
                setLinkedAccount(null);
                setMobileNumber("");
                setPassword("");
                setAgree(false);
                showModal("success", "Link Deactivated", result.message);
            } else {
                showModal("error", "Deactivation Failed", result.message);
            }
        } catch {
            showModal("error", "Deactivation Failed", "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-dvh flex flex-col text-white relative overflow-hidden">
            <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#333] cursor-pointer hover:border-white transition-colors"
                        aria-label="Go back"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold tracking-wide">Link Player Account</h1>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="w-full max-w-[400px] space-y-4">
                        <CustomInput
                            type="tel"
                            inputMode="numeric"
                            maxLength={15}
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={handleMobileNumberChange}
                            numbersOnly
                            custom-style="placeholder:italic placeholder:tracking-[8px] py-4"
                        />

                        <CustomInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            custom-style="placeholder:italic placeholder:tracking-[8px] py-4"
                        />

                        <label className="flex items-center gap-3 cursor-pointer">
                            <div
                                onClick={() => setAgree(!agree)}
                                className="w-7 h-7 border border-[#333] flex items-center justify-center text-sm font-bold shrink-0"
                            >
                                {agree && "✕"}
                            </div>

                            <span className="text-xs">
                                I agree to MGame&apos;s{" "}
                                <span className="text-red-600">Privacy Policy</span>
                                {" "}&amp;{" "}
                                <span className="text-red-600">Terms of Use.</span>
                            </span>
                        </label>

                        {linkedAccount?.mobileNumber && (
                            <p className="text-xs text-center text-gray-400">
                                Linked account: {" "}
                                <span className="text-white font-medium">
                                    {linkedAccount.mobileNumber}
                                </span>
                            </p>
                        )}

                        <div className="flex flex-col items-center gap-3 pt-2">
                            <Button
                                variant="secondary"
                                widthSize="md"
                                onClick={handleLinkNow}
                                disabled={isLoading}
                                className="tracking-widest"
                            >
                                {isLoading ? "Linking..." : "Link Now"}
                            </Button>

                            <Button
                                variant="secondary"
                                widthSize="md"
                                onClick={handleDeactivateLink}
                                disabled={isLoading || !linkedAccount}
                                className="tracking-widest"
                            >
                                {isLoading ? "Processing..." : "Deactivate Link"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-4">
                <Footer />
            </div>
        </div>
    );
}
