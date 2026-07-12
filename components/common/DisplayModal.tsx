import {
    CircleAlert,
    CircleX,
    CircleCheckBig,
    CircleHelp,
} from "lucide-react";

interface DisplayModalProps {
    open: boolean;
    type?: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export default function DisplayModal({
    open,
    type = "info",
    title,
    message,
    confirmText = "OK",
    cancelText,
    onConfirm,
    onCancel,
}: DisplayModalProps) {
    if (!open) return null;

    const modalIcons = {
        warning: (
            <CircleAlert className="w-6 h-6 text-gray-300" strokeWidth={2.5} />
        ),
        error: (
            <CircleX className="w-6 h-6 text-red-500" strokeWidth={2.5} />
        ),
        success: (
            <CircleCheckBig className="w-6 h-6 text-green-500" strokeWidth={2.5} />
        ),
        info: (
            <CircleHelp className="w-6 h-6 text-blue-500" strokeWidth={2.5} />
        ),
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className="relative w-[90%] max-w-sm border-[0.5px] border-white bg-[#1d1d1d] p-6 shadow-xl"
            >
                <img
                    src="/assets/images/manoy.png"
                    alt=""
                    className="absolute -top-22 left-1/2 -translate-x-1/2 w-42 h-25"
                />

                <div className="flex w-full flex-col items-center">
                    <div className="absolute  left-10 top-3.5 -translate-x-1/2 rounded-full bg-[#1d1d1d] p-2">
                        {modalIcons[type]}
                    </div>

                    <h2 className="text-sm font-bold text-white">{title}</h2>

                    <p className="mt-3 text-center text-xs text-gray-300">
                        {message}
                    </p>
                </div>

                <div className="relative mt-6 flex justify-end gap-3">
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
                        className="absolute left-1/2 -translate-x-1/2  border-[0.5px] bg-[#1d1d1d] px-14 py-2 text-sm text-white hover:bg-gray-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}