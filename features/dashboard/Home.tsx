import { useState } from 'react'
import Sidebar from './components/Sidebar';
import { ChevronRight, CircleChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogsTable from '../../components/common/LogsTable'
import DashboardCard from './components/DashboardCard'
import DepositWithdraw from '../../components/common/DepositWithdraw';

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const [verificationStatus] = useState<string>(() => {
    const status = localStorage.getItem('verificationStatus');
    return status ? status.toUpperCase() : "Fully Verified";
  });
  const [username] = useState<string>(() => {
    return "Player";
  });

  const [showWithdrawSpecialty, setShowWithdrawSpecialty] = useState(false);
  const [showWithdrawStandard, setShowWithdrawStandard] = useState(false);
  const [showDepositSpecialty, setShowDepositSpecialty] = useState(false);
  const [showDepositStandard, setShowDepositStandard] = useState(false);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menus = [
    {
      icon: "/assets/icons/add-level.png",
      title: "Add Level",
      count: "3",
      route: "/add-level"
    },
    {
      icon: "/assets/icons/earnings.png",
      title: "Earnings",
      count: "3,247",
      route: "/earnings"

    },
    {
      icon: "/assets/icons/ribbon.png",
      title: "Promo",
      count: "12",
      route: "/promo"

    },
    {
      icon: "/assets/icons/register.png",
      title: "Register",
      route: "/register"
    },
    {
      icon: "/assets/icons/settings.png",
      title: "Settings",
      route: "/settings"
    },
    {
      icon: "/assets/icons/support.png",
      title: "Support",
      route: "/support"
    },
  ];

  const logs = [
    {
      uid: "PID-ROGER-000053-2026",
      gc: 101,
      ens: 0.5,
    },
    {
      uid: "PID-ROGER-000054-2026",
      gc: 2500,
      ens: 1.25,
    },
    {
      uid: "PID-ROGER-000055-2026",
      gc: 10000,
      ens: 10,
    },
    {
      uid: "PID-ROGER-000055-2026",
      gc: 10000,
      ens: 10,
    },
    {
      uid: "PID-ROGER-000055-2026",
      gc: 10000,
      ens: 10,
    },
    {
      uid: "PID-ROGER-000055-2026",
      gc: 10000,
      ens: 10,
    },

  ];


  return (
    <div className="relative min-h-screen text-white overflow-hidden ">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        username={username}
        verificationStatus={verificationStatus}
      />

      {/* Header */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button onClick={() => setSidebarOpen(true)} className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}>
              <img src="/assets/icons/burger.png" alt="Avatar" className="w-7 h-3 " />
            </button>

            <div>
              <h2 className="font-semibold uppercase tracking-wide">
                {username}
              </h2>
              <p className="text-sm text-gray-400">
                Level 2
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <span className="text-sm font-semibold flex justify-center cursor-pointer font-bahnschrift">
              <img src="/assets/icons/notification.png" alt="notification" className='w-8 object-contain' />
            </span>
          </div>

        </div>
      </div>
      <div className="overflow-y-auto h-[calc(95vh-120px)] px-5">
        <p className='py-5 text-gray-400 '>Earnings: </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 text-gray-400">
          {/* Speciality Earnings */}
          <DashboardCard title="Speciality" walletData={123456}>
            <button onClick={() => setShowWithdrawSpecialty(true)}>
              <CircleChevronLeft className='w-8 h-8' />
            </button>
          </DashboardCard>
          {/* Standard Earnings */}
          <DashboardCard title="Standard" walletData={123456}>
            <button onClick={() => setShowWithdrawStandard(true)}>
              <CircleChevronLeft className='w-8 h-8' />
            </button>
          </DashboardCard>
          {/* Online Players count */}
          <DashboardCard title="Online" walletData={1203} />
          {/* Offline Players count */}
          <DashboardCard title="Offline" walletData={500} />
        </div>
        <p className='py-5 text-gray-400 '>Wallet: </p>
        <div className="grid grid-cols-2 gap-4 text-gray-400">
          {/* Speciality Wallet */}
          <DashboardCard title="Speciality" walletData={123456}>
            <button onClick={() => setShowDepositSpecialty(true)}>
              <CircleChevronLeft className='w-8 h-8' />
            </button>
          </DashboardCard>
          {/* Standard Wallet */}
          <DashboardCard title="Standard" walletData={123456}>
            <button onClick={() => setShowDepositStandard(true)}>
              <CircleChevronLeft className='w-8 h-8' />
            </button>
          </DashboardCard>
        </div>
        <div className='flex justify-center py-4'>
          <LogsTable logs={logs} />
        </div>
      </div>
      {/* Bottom Navbar*/}
      <div
        className={` fixed bottom-0 left-0 right-0 z-30
        rounded-t-3xl
        bg-(--card-color)
        transition-all duration-500
        ${collapsed ? "h-14" : "h-[430px]"}`}
      >
        {/* Search */}
        <div className="border-b border-white/10 flex items-center px-4 h-14 justify-between">
          <button
            className="flex items-center gap-2 w-full text-left text-sm text-gray-500 cursor-pointer"
            onClick={() => navigate("/customer-support")}
          >
            <Search size={18} className="shrink-0" />
            <span>Tell me anything</span>
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <div
              className={`h-7 w-7 rounded-full ${collapsed ? "bg-blue-400" : "bg-gray-300"
                }`}
            />
          </button>

        </div>

        {/* Menu*/}
        <div
          className={`transition-all duration-500 ${collapsed
            ? "opacity-0 -translate-y-5 pointer-events-none"
            : "opacity-100 translate-y-0"
            }`}
        >
          {menus.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.route)}
              className=" cursor-pointer w-full px-6 py-4 flex items-center hover:bg-[var(--hover-color)] transition gap-2"
            >
              <div className="flex items-center gap-10 flex-1">
                <img src={item.icon} alt={item.title}
                  className={`object-contain w-8 h-8`} />

                <span className="flex-1 text-left font-semibold text-[20px]">
                  {item.title}
                </span>
              </div>

              {item.count && (
                <span className=" text-gray-400">{item.count}</span>
              )}

              <ChevronRight size={20} />
            </button>
          ))}
        </div>
        <DepositWithdraw
          open={showWithdrawSpecialty}
          type="Speciality"
          wallet={1000}
          onCancel={() => setShowWithdrawSpecialty(false)}
          buttonText="SUBMIT WITHDRAWAL"
          onConfirm={() => setShowWithdrawSpecialty(false)}
        />
        <DepositWithdraw
          open={showWithdrawStandard}
          type="Standard"
          wallet={1000}
          onCancel={() => setShowWithdrawStandard(false)}
          buttonText="SUBMIT WITHDRAWAL"
          onConfirm={() => setShowWithdrawStandard(false)}
        />
        <DepositWithdraw
          open={showDepositSpecialty}
          type="Speciality"
          wallet={1000}
          onCancel={() => setShowDepositSpecialty(false)}
          buttonText="SUBMIT REQUEST"
          onConfirm={() => setShowDepositSpecialty(false)}
        />
        <DepositWithdraw
          open={showDepositStandard}
          type="Standard"
          wallet={1000}
          onCancel={() => setShowDepositStandard(false)}
          buttonText="SUBMIT REQUEST"
          onConfirm={() => setShowDepositStandard(false)}
        />
      </div>
    </div>
  )
}

export default Home