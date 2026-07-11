import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/common/Footer";
import { useInstallPrompt } from '../../../hooks/useInstallPrompt'

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    verificationStatus: string;
}

const menus = [
    {
        title: "Profile",
    },
    {
        title: "Notification",
    },

    {
        title: "Privacy",
    },
];

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    username,
    verificationStatus,
}: SidebarProps) {
    const navigate = useNavigate();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();

    const handleMenuClick = (title: string) => {
        if (title === 'Profile') {
            navigate('/profile');
            setSidebarOpen(false);
        } else if (title === 'Notification') {
            navigate('/notifications');
            setSidebarOpen(false);
        } else if (title === 'Privacy') {
            navigate('');
            setSidebarOpen(false);
        } else if (title === 'How to Use') {
            navigate('');
            setSidebarOpen(false);
        } else if (title === 'Settings') {
            navigate('/settings');
            setSidebarOpen(false);
        }
    };

    const handleLogout = () => {
        // Clear only the session data (userMobileNumber) so they are logged out
        // We keep userProfile, username, verificationStatus, etc. so their data persists when they log back in
        localStorage.removeItem('userMobileNumber');

        // Navigate to login page
        navigate('/login');
    };

    return (
        <>
            {/* backdrop */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${sidebarOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                style={{ backgroundColor: 'var(--background-color)' }}
            />
            {/* sidebar with details */}
            <div
                className={`fixed top-0 left-0 h-full w-full z-50 flex flex-col bg-black
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                    <div className="h-12 w-auto rounded-full flex items-center gap-5 p-3" style={{ backgroundColor: 'var(--button-color)' }}>
                        <button
                            onClick={() => {
                                navigate('/settings');
                                setSidebarOpen(false);
                            }}
                            className="p-0 bg-transparent border-none cursor-pointer"
                        >
                            <img src="/assets/icons/settings.png" alt="setting" className="w-8 h-9 rounded-full object-contain" />
                        </button>
                        <button
                            onClick={() => {
                                navigate('/promo');
                                setSidebarOpen(false);
                            }}
                            className="p-0 bg-transparent border-none cursor-pointer">
                            <img src="/assets/icons/ribbon.png" alt="ribbon" className="w-8 h-9 rounded-full object-contain" />
                        </button>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}>
                        <ChevronRight size={32} />
                    </button>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="flex flex-col px-6 py-4 gap-2">
                        <h2 className="text-lg font-bold uppercase">{username}</h2>
                        <p className="text-sm text-gray-400">
                            {verificationStatus.includes('*') ? (
                                <>
                                    {verificationStatus.replace('*', '')}
                                    <span className="text-red-500">*</span>
                                </>
                            ) : (
                                verificationStatus
                            )}
                        </p>
                    </div>
                    <div>
                        {menus.map((item) => (
                            <button
                                key={item.title}
                                onClick={() => handleMenuClick(item.title)}
                                className="w-full px-6 py-4 flex items-center hover:bg-[var(--hover-color)] transition gap-2"
                            >
                                <div className="flex items-center gap-10 flex-1">
                                    <span className="flex-1 text-left font-semibold text-[20px]">
                                        {item.title}
                                    </span>
                                </div>
                                <ChevronRight size={20} />
                            </button>
                        ))}
                    </div>

                        {isInstallable && !isInstalled && (
                            <button
                                onClick={promptInstall}
                                className="w-full px-6 py-4 text-[20px] font-semibold flex items-center hover:bg-[var(--hover-color)] transition gap-2"
                            >
                                Install
                            </button>
                        )}
                    <div className="flex flex-col px-7 py-4 gap-2">
                        <button
                            onClick={handleLogout}
                            className="h-[52px] px-6 text-white text-sm font-semibold uppercase shadow-lg hover:opacity-80 transition "
                            style={{ backgroundColor: 'var(--button-color)' }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
                <div className="px-5">
                    <Footer />
                </div>
            </div>
        </>
    );
}