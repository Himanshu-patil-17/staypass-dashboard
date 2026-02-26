import React from "react";
import { UserMinus, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "December", short: "Dec", requests: 3 },
  { month: "January",  short: "Jan", requests: 100 },
  { month: "February", short: "Feb", requests: 47 },
];

const total = monthlyData.reduce((s, d) => s + d.requests, 0);

// Indigo / emerald / amber — matching the dashboard stat card palette
const BAR_COLORS = ["#6366f1", "#10b981", "#f59e0b"];

// ── Custom Tooltip ────────────────────────────────────────────────────────────

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#fff",
      border: "1px solid #e8eaf0",
      borderRadius: 12,
      padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </p>
      <p style={{ fontSize: 22, fontWeight: 800, color: payload[0].fill }}>{payload[0].value}</p>
      <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Leave Requests</p>
    </div>
  );
};

// ── Leave Requests Page ───────────────────────────────────────────────────────

const LeaveRequestsPage = () => {
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
        .lr-anim-1 { opacity:0; animation: fadeSlideUp 0.4s ease 0.04s forwards; }
        .lr-anim-2 { opacity:0; animation: fadeSlideUp 0.4s ease 0.12s forwards; }
        .lr-anim-3 { opacity:0; animation: fadeSlideUp 0.4s ease 0.20s forwards; }

        .section-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(99,102,241,0.05);
          transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .hero-card:hover {
          border-color: #c7d2fe;
          box-shadow: 0 4px 24px rgba(99,102,241,0.14);
          transform: translateY(-1px);
        }

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

        .month-pill {
          transition: background 0.15s ease, transform 0.15s ease;
          cursor: default;
        }
        .month-pill:hover { transform: translateY(-1px); }

        .bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }
      `}</style>

      <div className="space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── Page title ──────────────────────────────────────────── */}
        <div className="lr-anim-1">
          <p className="flex items-center gap-2 text-[10.5px] font-bold text-indigo-500 uppercase tracking-[0.12em] mb-1">
            <span className="w-4 h-px bg-indigo-300 rounded" />
            Management
          </p>
          <h2 className="text-[22px] font-bold text-slate-800 leading-tight tracking-tight">
            Leave Requests
          </h2>
          <p className="text-[12.5px] text-slate-400 font-medium mt-1">{currentDate}</p>
        </div>

        {/* ── Hero stat card ──────────────────────────────────────── */}
        <div className="lr-anim-2">
          <div className="section-card hero-card px-6 py-5 flex items-center gap-5 cursor-default max-w-xs">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <UserMinus size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[34px] font-bold text-slate-800 leading-none">{total}+</p>
              <p className="text-[12.5px] text-slate-400 font-medium mt-1">Total Leave Requests</p>
              <div className="flex items-center gap-1 mt-1.5">
                <TrendingUp size={11} className="text-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-600">Dec 2024 – Feb 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bar chart card ──────────────────────────────────────── */}
        <div className="chart-card p-5 md:p-6 lr-anim-3">

          {/* Card header — same pattern as Profiles / Hostels */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Monthly Leave Requests</h3>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">Total requests submitted per month</p>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 tracking-wide flex-shrink-0">
              Dec – Feb
            </span>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={monthlyData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              barSize={48}
            >
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="short"
                tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                dy={8}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                axisLine={false}
                tickLine={false}
                dx={-4}
                domain={[0, 80]}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(99,102,241,0.04)", radius: [6,6,0,0] }} />
              <Bar dataKey="requests" radius={[6, 6, 3, 3]}>
                {monthlyData.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Month breakdown — same style as Profiles/Hostels breakdown list */}
          <div className="mt-5 space-y-2.5">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex items-center justify-between gap-3 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-default">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BAR_COLORS[i] }} />
                  <span className="text-[13px] font-medium text-slate-600">{d.month}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bar-fill"
                      style={{ width: `${(d.requests / total) * 100}%`, background: BAR_COLORS[i] }}
                    />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 w-6 text-right">{d.requests}</span>
                </div>
              </div>
            ))}

            {/* Divider + total row */}
            <div className="h-px bg-slate-100 mx-2 mt-1" />
            <div className="flex items-center justify-between gap-3 px-2 py-1.5 rounded-lg cursor-default">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 flex-shrink-0" />
                <span className="text-[13px] font-bold text-slate-700">Total</span>
              </div>
              <span className="text-[13px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                {total}+
              </span>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default LeaveRequestsPage;