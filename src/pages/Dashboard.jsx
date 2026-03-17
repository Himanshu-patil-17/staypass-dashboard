import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom"; // Add useLocation
import StatCard from "../components/StatCard";
import AnalyticsCharts from "../components/AnalyticsCharts";
import Logo from "../assets/StayPassLogo.svg"
import {
  Users,
  Download,
  School,
  CalendarPlus,
  Activity,
  UserMinus,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Check if we're on the main dashboard route (exactly '/dashboard')
  const isDashboardHome = location.pathname === '/dashboard';

  const statistics = [
    {
      id: 1,
      title: "Total Profiles",
      value: 216,
      description: "Users registered this month",
      icon: Users,
      color: "indigo",
    },
    {
      id: 2,
      title: "Total Hostels Opted",
      value: 5,
      description: "Total hostels opted till now",
      icon: School,
      color: "blue",
    },
    {
      id: 3,
      title: "Sessions Created",
      value: 10,
      description: "Sessions in last 30 days",
      icon: CalendarPlus,
      color: "emerald",
    },
    {
      id: 4,
      title: "Active Sessions",
      value: 10,
      description: "Currently running sessions",
      icon: Activity,
      color: "amber",
    },
    {
      id: 5,
      title: "Leave Requests",
      value: 218,
      description: "Students currently off-campus",
      icon: UserMinus,
      color: "rose",
    },
  ];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .dashboard-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-card-anim {
          opacity: 0;
          animation: fadeSlideUp 0.45s ease forwards;
        }
        .stat-card-anim:nth-child(1) { animation-delay: 0.05s; }
        .stat-card-anim:nth-child(2) { animation-delay: 0.12s; }
        .stat-card-anim:nth-child(3) { animation-delay: 0.19s; }
        .stat-card-anim:nth-child(4) { animation-delay: 0.26s; }
        .stat-card-anim:nth-child(5) { animation-delay: 0.33s; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .page-fade { animation: fadeIn 0.35s ease forwards; }

        .main-bg {
          background-color: #f5f6fa;
          background-image: radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .header-search:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
          background: #ffffff;
        }

        .section-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(99,102,241,0.05);
        }
      `}</style>

      <div className="dashboard-root flex min-h-screen main-bg">

        {/* ── Overlay ─────────────────────────────────────────────── */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px]"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-64
            transform transition-transform duration-300 ease-in-out
            bg-white shadow-2xl shadow-slate-300/40 border-r border-slate-100
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar />
        </aside>

        {/* ── Main column ─────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* ── Top Header ──────────────────────────────────────────── */}
          <header
            className="sticky top-0 z-30 flex items-center justify-between gap-4 px-5 py-3 bg-white/80 backdrop-blur-xl border-b border-slate-100"
            style={{ boxShadow: '0 1px 0 #e8eaf0, 0 2px 12px rgba(0,0,0,0.03)' }}
          >
            {/* Left: brand only */}
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  src={Logo}
                  alt="StayPass"
                  className="w-17 h-17"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <span className="text-[15.5px] font-bold text-slate-800 tracking-tight sm:block">
                  StayPass <span className="text-indigo-600 ml-1">Admin</span>
                </span>
              </div>
            </div>

            {/* Center: search (desktop only) */}
            <div className="hidden md:flex flex-1 max-w-sm relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search users, sessions..."
                className="header-search w-full pl-8 pr-4 py-[7px] text-[12.5px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 transition-all duration-200"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
            </div>

            {/* Right: live pill + bell + toggle */}
            <div className="flex items-center gap-2">

              {/* Live pill */}
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-[5px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase">Live</span>
              </div>

              {/* Sidebar toggle — visible on all screen sizes, sits right of bell */}
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150"
                aria-label="Toggle Sidebar"
              >
                {isSidebarOpen ? <X size={17} /> : <Menu size={17} />}
              </button>

            </div>
          </header>

          {/* ── Page content ────────────────────────────────────────── */}
          <main className="flex-1 px-5 py-6 md:px-8 md:py-8 space-y-6 overflow-y-auto page-fade">

            {/* Conditionally render either dashboard home OR nested routes */}
            {isDashboardHome ? (
              <>
                {/* ── Page title ──────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-[10.5px] font-bold text-indigo-500 uppercase tracking-[0.12em] mb-1">
                      <span className="w-4 h-px bg-indigo-300 rounded" />
                      Overview
                    </p>
                    <h2 className="text-[22px] font-bold text-slate-800 leading-tight tracking-tight">
                      Admin Dashboard
                    </h2>
                    <p className="text-[12.5px] text-slate-400 font-medium mt-1">{currentDate}</p>
                  </div>
                </div>

                {/* ── Stat cards ──────────────────────────────────────── */}
                <section>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {statistics.map((stat) => (
                      <div key={stat.id} className="stat-card-anim">
                        <StatCard
                          title={stat.title}
                          value={stat.value}
                          max={1000}
                          description={stat.description}
                          icon={stat.icon}
                          color={stat.color}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* ── Analytics card ──────────────────────────────────── */}
                <section className="section-card p-5 md:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Analytics Overview</h3>
                      <p className="text-[12px] text-slate-400 font-medium mt-0.5">Trends and activity metrics</p>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 tracking-wide">
                      Last 30 days
                    </span>
                  </div>
                  <AnalyticsCharts />
                </section>
              </>
            ) : (
              /* Render nested routes (Users, Profiles, LeaveRequests) here */
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;