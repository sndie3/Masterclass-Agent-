import { useEffect, useState } from "react";
import CustomInput from "../ui/InputBox";
import Button from "../ui/Button";

interface DepositWithdrawProps {
    open: boolean;
    type?: "Speciality" | "Standard";
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    wallet: number
    buttonText: string
}

export default function DepositWithdraw({
    open,
    type,
    wallet,
    buttonText,
    onCancel,
    onConfirm
}: DepositWithdrawProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => setAnimate(true));
        } else {
            setAnimate(false);
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className={`
          relative w-[90%] max-w-sm
          border-[0.5px] border-[#333]
          bg-black p-6 shadow-xl
          transition-all duration-500 ease-out
          ${animate
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                    }
        `}
            >
                <img
                    src="/assets/images/manoy.png"
                    alt=""
                    className="absolute -top-22 left-1/2 -translate-x-1/2 w-42 h-25"
                    onClick={onCancel}
                />

                <div className="flex w-full flex-col items-center">
                    <p className="mt-3 text-center text-lg text-gray-300">
                        {type}
                    </p>
                    <p className="my-3 text-center text-2xl text-gray-300 font-bold">
                        {(wallet).toLocaleString()}
                    </p>
                </div>

                <CustomInput type="tel" numbersOnly={true} decimal={true} placeholder="Input Amount" custom-style="placeholder:italic" />

                <div className="py-5">
                    <Button variant="secondary" className="w-full" onClick={onConfirm}>
                        {buttonText}
                    </Button>
                </div>
                {/* <div className="relative mt-6 flex justify-end gap-3">
                    {cancelText && (
                        <button
                            onClick={onCancel}
                            className="rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                        >
                            {cancelText}
                        </button>
                    )}

                    <button
                        onClick={onConfirm}
                        className="absolute left-1/2 -translate-x-1/2 border-[0.5px] bg-[#1d1d1d] px-14 py-2 text-sm text-white hover:bg-gray-700"
                    >
                        {confirmText}
                    </button>
                </div> */}
            </div>
        </div>
    );
}