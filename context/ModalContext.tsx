/* eslint-disable react-refresh/only-export-components */
import  {
    createContext,
    useContext,
    useState,
} from "react";
import type { ReactNode } from "react";
import DisplayModal from "../components/common/DisplayModal"

type ModalType = "success" | "error" | "warning" | "info";


interface ModalState {
    open: boolean;
    type: ModalType;
    title: string;
    message: string;
}

interface ModalContextType {
    showModal: (
        type: ModalType,
        title: string,
        message: string
    ) => void;

    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [modal, setModal] = useState<ModalState>({
        open: false,
        type: "info",
        title: "",
        message: "",
    });

    const showModal = (
        type: ModalType,
        title: string,
        message: string
    ) => {
        setModal({
            open: true,
            type,
            title,
            message,
        });
    };

    const closeModal = () => {
        setModal((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return (
        <ModalContext.Provider
            value={{
                showModal,
                closeModal,
            }}
        >
            {children}

            <DisplayModal
                open={modal.open}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onConfirm={closeModal}
            />
        </ModalContext.Provider>
    );
}
/**
 * Access the global modal.
 *
 * Example:
 *
 * const { showModal } = useModal();
 *
 * showModal(
 *   "warning | "error" | "success" | "info",
 *   "title of the modal",
 *   "message of modal"
 * );
 * ```
 *
 * Throws:
 *  Error if used outside of <ModalProvider>.
 */
export function useModal() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used inside ModalProvider");
    }

    return context;
}