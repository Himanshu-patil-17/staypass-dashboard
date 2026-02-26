import React from 'react';
import {
  LayoutDashboard,
  LogOut,
  Users,
  UserCircle2,
  CalendarClock,
  ChevronRight,
  School,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Profiles', icon: UserCircle2, path: '/dashboard/profiles' },
  { label: 'Hostels Opted', icon: School, path: '/dashboard/hostels' },
  {
    label: 'Leave Requests',
    icon: CalendarClock,
    path: '/dashboard/leaverequests',
    badge: 4,
  },
];

const NavButton = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
        border transition-all duration-200 text-left mb-1 cursor-pointer
        ${isActive
          ? 'bg-indigo-50 border-indigo-100 shadow-sm'
          : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'
        }
      `}
    >
      {/* Active left accent bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500" />
      )}

      {/* Icon */}
      <span className={`
        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
        ${isActive
          ? 'bg-indigo-600 shadow-md shadow-indigo-200'
          : 'bg-slate-100 group-hover:bg-slate-200'
        }
      `}>
        <Icon
          size={15}
          className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}
        />
      </span>

      {/* Label */}
      <span className={`
        flex-1 text-[13.5px] tracking-tight transition-colors duration-200
        ${isActive ? 'text-indigo-700 font-semibold' : 'text-slate-600 font-medium group-hover:text-slate-800'}
      `}>
        {item.label}
      </span>

      {/* Badge */}
      {item.badge && (
        <span className={`
          text-[10px] font-bold px-2 py-0.5 rounded-full tabular-nums
          ${isActive
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
            : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'
          }
        `}>
          {item.badge}
        </span>
      )}

      {/* Chevron */}
      {isActive
        ? <ChevronRight size={13} className="text-indigo-400 flex-shrink-0" />
        : <ChevronRight size={13} className="text-slate-300 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    </button>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .sp-sidebar * { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className="sp-sidebar flex flex-col h-dvh w-64 bg-white border-r border-slate-100">

        {/* ── Brand ──────────────────────────────────────────────── */}
        <div className="px-5 pt-7 pb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center">
              <img
                src="/src/assets/StayPassLogo.svg"
                alt="StayPass"
                className="w-20 h-20"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <div>
              <h1 className="text-[15px] font-bold mt-1 text-slate-800 leading-none tracking-tight">
                StayPass
              </h1>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 tracking-wide">
                Admin Console
              </p>
            </div>
          </div>
        </div>

        {/* ── Thin divider ───────────────────────────────────────── */}
        <div className="mx-5 h-px bg-slate-100" />

        {/* ── Nav ────────────────────────────────────────────────── */}
        <nav className="flex-1 px-3 pt-5 pb-3 overflow-y-auto">
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-400 px-3 mb-3">
            Menu
          </p>
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        {/* ── Divider ────────────────────────────────────────────── */}
        <div className="mx-5 h-px bg-slate-100" />

        {/* ── User + Logout ──────────────────────────────────────── */}
        <div className="px-3 py-4 space-y-2 shrink-0">

          {/* User card */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-100">
              <span className="text-white text-xs font-bold tracking-wider">SP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate leading-tight">
                Admin User
              </p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                admin@staypass.in
              </p>
            </div>
            {/* Online indicator */}
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 ring-2 ring-white" />
          </div>

          {/* Logout */}
          <button
            onClick={() => navigate('/')}
            className="
              group flex items-center justify-center gap-2 w-full px-4 py-2.5
              rounded-xl border border-slate-200 bg-white text-slate-500
              text-[13px] font-medium tracking-tight
              hover:border-red-200 hover:bg-red-50 hover:text-red-500
              transition-all duration-200
            "
          >
            <LogOut
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Sign Out
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;