import React from "react";
import {
  Users,
  TrendingUp,
  UserCog,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const profilesOverTime = [
  { month: "Dec", total: 0 },
  { month: "Jan", total: 75 },
  { month: "Feb", total: 141 },
];

const profilesByRole = [
  { name: "Students", value: 206, color: "#6366f1" },
  { name: "Admins", value: 4, color: "#f59e0b" },
  { name: "Guards", value: 6, color: "#10b981" },
];

const roleStats = [
  { label: "Students", value: 206, icon: GraduationCap, color: "indigo", pct: "95.2%", pctNum: 95.2 },
  { label: "Admin", value: 4, icon: UserCog, color: "amber", pct: "1.9%", pctNum: 1.9 },
  { label: "Guards", value: 6, icon: ShieldCheck, color: "emerald", pct: "2.9%", pctNum: 2.9 },
];

const COLOR_MAP = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", icon: "bg-indigo-600", bar: "#6366f1", border: "border-indigo-100", hover: "hover:border-indigo-200 hover:shadow-indigo-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", icon: "bg-emerald-500", bar: "#10b981", border: "border-emerald-100", hover: "hover:border-emerald-200 hover:shadow-emerald-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", icon: "bg-amber-500", bar: "#f59e0b", border: "border-amber-100", hover: "hover:border-amber-200 hover:shadow-amber-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", icon: "bg-blue-500", bar: "#3b82f6", border: "border-blue-100", hover: "hover:border-blue-200 hover:shadow-blue-100" },
};

// ── Custom Tooltips ───────────────────────────────────────────────────────────

const LineTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#fff", border: "1px solid #e8eaf0",
      borderRadius: 12, padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: "#4f46e5" }}>{payload[0].value}</p>
      <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Total Profiles</p>
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#fff", border: "1px solid #e8eaf0",
      borderRadius: 12, padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{payload[0].name}</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: payload[0].payload.color }}>{payload[0].value}</p>
      <p style={{ fontSize: 11, color: "#94a3b8" }}>{((payload[0].value / 210) * 100).toFixed(1)}% of total</p>
    </div>
  );
};

const renderLegend = ({ payload }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: 8 }}>
    {payload.map((entry, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: entry.color, display: "inline-block" }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

// ── Profiles Page ─────────────────────────────────────────────────────────────

const ProfilesPage = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .p-anim-1 { opacity:0; animation: fadeSlideUp 0.4s ease 0.04s forwards; }
        .p-anim-2 { opacity:0; animation: fadeSlideUp 0.4s ease 0.10s forwards; }
        .p-anim-3 { opacity:0; animation: fadeSlideUp 0.4s ease 0.16s forwards; }
        .p-anim-4 { opacity:0; animation: fadeSlideUp 0.4s ease 0.22s forwards; }
        .p-anim-5 { opacity:0; animation: fadeSlideUp 0.4s ease 0.28s forwards; }

        .section-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(99,102,241,0.05);
          transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .section-card:hover {
          box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1px 4px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }

        /* Role stat cards — colored accent on hover */
        .role-card-indigo:hover  { border-color: #c7d2fe !important; box-shadow: 0 4px 20px rgba(99,102,241,0.12) !important; }
        .role-card-amber:hover   { border-color: #fde68a !important; box-shadow: 0 4px 20px rgba(245,158,11,0.12)  !important; }
        .role-card-emerald:hover { border-color: #a7f3d0 !important; box-shadow: 0 4px 20px rgba(16,185,129,0.12)  !important; }

        /* Hero total card */
        .hero-card:hover {
          border-color: #c7d2fe !important;
          box-shadow: 0 4px 24px rgba(99,102,241,0.14) !important;
          transform: translateY(-1px);
        }

        .role-bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }

        /* Chart cards — no lift, just glow */
        .chart-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(99,102,241,0.05);
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .chart-card:hover {
          box-shadow: 0 6px 28px rgba(99,102,241,0.10), 0 1px 4px rgba(0,0,0,0.05);
          border-color: #dde0f5;
        }

        /* Table row hover */
        .growth-row {
          transition: background 0.15s ease;
          cursor: default;
        }
        .growth-row:hover { background: #f8f9ff; }
        .growth-row:hover td:first-child { color: #4f46e5; }

        /* Pie breakdown list row hover */
        .pie-row {
          padding: 6px 8px;
          border-radius: 8px;
          transition: background 0.15s ease;
          cursor: default;
        }
        .pie-row:hover { background: #f8f9ff; }
      `}</style>

      <div className="space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── Page title ──────────────────────────────────────────── */}
        <div className="p-anim-1">
          <p className="flex items-center gap-2 text-[10.5px] font-bold text-indigo-500 uppercase tracking-[0.12em] mb-1">
            <span className="w-4 h-px bg-indigo-300 rounded" />
            Analytics
          </p>
          <h2 className="text-[22px] font-bold text-slate-800 leading-tight tracking-tight">
            Profiles Overview
          </h2>
          <p className="text-[12.5px] text-slate-400 font-medium mt-1">{currentDate}</p>
        </div>

        {/* ── Stat cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 p-anim-2">

          {/* Hero: total */}
          <div className="col-span-2 xl:col-span-1 hero-card section-card px-5 py-5 flex items-center gap-4 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[30px] font-bold text-slate-800 leading-none">216</p>
              <p className="text-[12px] text-slate-400 font-medium mt-1">Total Profiles</p>
              <div className="flex items-center gap-1 mt-1.5">
                <TrendingUp size={11} className="text-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-600">+12 this month</span>
              </div>
            </div>
          </div>

          {/* Role cards */}
          {roleStats.map((r) => {
            const C = COLOR_MAP[r.color];
            const IC = r.icon;
            return (
              <div
                key={r.label}
                className={`section-card role-card-${r.color} px-4 py-4 cursor-default`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-lg ${C.icon} flex items-center justify-center shadow-sm`}>
                    <IC size={14} className="text-white" />
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${C.bg} ${C.text} ${C.border}`}>
                    {r.pct}
                  </span>
                </div>
                <p className="text-[26px] font-bold text-slate-800 leading-none">{r.value}</p>
                <p className="text-[12px] text-slate-400 font-medium mt-1">{r.label}</p>
                <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full role-bar-fill"
                    style={{ width: `${r.pctNum}%`, background: C.bar }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Charts row ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Line chart */}
          <div className="lg:col-span-3 chart-card p-5 md:p-6 p-anim-3">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Profiles Created Over Time</h3>
                <p className="text-[12px] text-slate-400 font-medium mt-0.5">Cumulative growth since December</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 tracking-wide flex-shrink-0">
                Dec – Feb
              </span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={profilesOverTime} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                  axisLine={false} tickLine={false} dy={8}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  axisLine={false} tickLine={false} dx={-4}
                />
                <Tooltip content={<LineTooltip />} cursor={{ stroke: "#e0e7ff", strokeWidth: 2 }} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 5.5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="lg:col-span-2 chart-card p-5 md:p-6 p-anim-4 flex flex-col">
            <div className="mb-2">
              <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Profiles by Role</h3>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">Distribution across all roles</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={210}>
                <PieChart>
                  <Pie
                    data={profilesByRole}
                    cx="50%" cy="45%"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {profilesByRole.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend content={renderLegend} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown list */}
            <div className="mt-1 space-y-1">
              {profilesByRole.map((r) => (
                <div key={r.name} className="pie-row flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                    <span className="text-[12.5px] font-medium text-slate-600 truncate">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full role-bar-fill"
                        style={{ width: `${(r.value / 210) * 100}%`, background: r.color }}
                      />
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 w-6 text-right">{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Monthly growth table ────────────────────────────────── */}
        <div className="chart-card p-5 md:p-6 p-anim-5">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Monthly Growth</h3>
            <p className="text-[12px] text-slate-400 font-medium mt-0.5">New profiles added each month</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <thead>
                <tr className="border-b border-slate-100">
                  {["Month", "New Profiles", "Cumulative", "Growth"].map(h => (
                    <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest pb-3 pr-6 last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profilesOverTime.map((row, i) => {
                  const prev = i === 0 ? 0 : profilesOverTime[i - 1].total;
                  const added = row.total;
                  const isLast = i === profilesOverTime.length - 1;
                  return (
                    <tr key={row.month} className={`growth-row ${isLast ? "" : "border-b border-slate-50"}`}>
                      <td className="py-3 pr-6 text-[13px] font-semibold text-slate-700 transition-colors duration-150">{row.month}</td>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full role-bar-fill"
                              style={{ width: `${(added / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-[13px] font-semibold text-slate-600">{added}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-6 text-[13px] font-bold text-slate-800">{row.total}</td>
                      <td className="py-3">
                        <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${i === 0
                            ? "text-slate-400 bg-slate-50"
                            : "text-emerald-700 bg-emerald-50 border border-emerald-100"
                          }`}>
                          {i === 0 ? "—" : `+${added}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProfilesPage;