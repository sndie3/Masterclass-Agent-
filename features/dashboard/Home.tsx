import { useState } from 'react'
import Sidebar from './components/Sidebar';
import { ChevronRight, CircleChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogsTable from '../../components/common/LogsTable'

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const [verificationStatus] = useState<string>(() => {
    const status = localStorage.getItem('verificationStatus');
    return status ? status.toUpperCase() : "Fully Verified";
  });
  const [username] = useState<string>(() => {
    return "Player";
  });
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
      route: ""

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
    <div className="relative min-h-screen text-white overflow-hidden">
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
            <button className="bg-[var(--button-color)] py-1 px-5 rounded-full text-sm">
              INSTALL
            </button>
          </div>

        </div>
      </div>
      <div className="overflow-y-auto h-[calc(95vh-120px)] px-5 pt-4">
        <p className='py-5 text-gray-400 '>Earnings: </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 text-gray-400">
          <div className='flex'>
            <div className='flex flex-col justify-center'>
              <p className='text-sm'>Speciality</p>
              <p className='py-2 text-2xl text-white'> {(5250201).toLocaleString()}</p>
            </div>
            <div className='flex place-items-center px-4'>
              <CircleChevronLeft className='w-8 h-8' />
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col justify-center'>
              <p className='text-sm'>Standard</p>
              <p className='py-2 text-2xl text-white'> {(5250201).toLocaleString()}</p>
            </div>
            <div className='flex place-items-center px-4'>
              <CircleChevronLeft className='w-8 h-8' />
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-sm'>Online</p>
            <p className='py-5 text-2xl text-white'> {(1000).toLocaleString()}</p>
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-sm'>Offline</p>
            <p className='py-5 text-2xl text-white'> {(5000).toLocaleString()}</p>
          </div>
        </div>
        <p className='py-5 text-gray-400 '>Wallet: </p>
        <div className="grid grid-cols-2 gap-4 text-gray-400">
          <div className='flex'>
            <div className='flex flex-col justify-center'>
              <p className='text-sm'>Speciality</p>
              <p className='py-2 text-2xl text-white'> {(5250201).toLocaleString()}</p>
            </div>
            <div className='flex place-items-center px-4'>
              <CircleChevronLeft className='w-8 h-8' />
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col justify-center'>
              <p className='text-sm'>Standard</p>
              <p className='py-2 text-2xl text-white'> {(5250201).toLocaleString()}</p>
            </div>
            <div className='flex place-items-center px-4'>
              <CircleChevronLeft className='w-8 h-8' />
            </div>
          </div>
        </div>
        <div className='flex justify-center py-4'>
          <LogsTable logs={logs} />
        </div>
      </div>
      {/* Bottom Navbar*/}
      <div
        className={` fixed bottom-0 left-0 right-0 z-30
        rounded-t-3xl
        bg-[var(--card-color)]
        transition-all duration-500
        ${collapsed ? "h-14" : "h-[430px]"}`}
      >
        {/* Search */}
        <div className="border-b border-white/10 flex items-center px-4 h-14">
          <Search size={18} className="text-gray-500" />

          <input
            placeholder="Tell me anything"
            className="flex-1 bg-transparent px-3 outline-none placeholder:text-gray-500"
          />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <div
              className={`h-6 w-6 rounded-full ${collapsed ? "bg-blue-400" : "bg-gray-300"
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
              className="w-full px-6 py-4 flex items-center hover:bg-[var(--hover-c olor)] transition gap-2"
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
      </div>
    </div>
  )
}

export default Home