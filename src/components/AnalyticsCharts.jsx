import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  ClipboardList,
} from "lucide-react";

// ── Static Data ──────────────────────────────────────────────────────────────
const monthlyDownloadsData = [
  { month: "Dec", downloads: 0 },
  { month: "Jan", downloads: 75 },
  { month: "Feb", downloads: 145 },
];

const leaveRequestsData = [
  { month: "Dec", requests: 12 },
  { month: "Jan", requests: 28 },
  { month: "Feb", requests: 41 },
];

// 3 roles: Students, Admins, Guards
const profilesByRoleData = [
  { name: "Students", value: 200, color: "#6366f1" },
  { name: "Admins", value: 4, color: "#f59e0b" },
  { name: "Guards", value: 6, color: "#10b981" },
];

const TOTAL_PROFILES = profilesByRoleData.reduce((sum, r) => sum + r.value, 0);

// ── Reusable Tooltip ──────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label, valueLabel, color }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      <p style={{ color }}>
        {valueLabel}: {Number(payload[0].value).toLocaleString()}
      </p>
    </div>
  );
};

// ── Chart Card Wrapper ────────────────────────────────────────────────────────
const ChartCard = ({ icon: Icon, iconColor, title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4">
    {/* Header */}
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${iconColor}18` }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <div>
        <p className="font-semibold text-slate-800 text-sm leading-tight">
          {title}
        </p>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

// ── Main Export ───────────────────────────────────────────────────────────────
const AnalyticsCharts = () => (
  <div className=" sm:p-6 min-h-screen flex flex-col gap-5">
    {/* 1. Monthly Downloads — full-width area/line chart */}
    <ChartCard
      icon={TrendingUp}
      iconColor="#6366f1"
      title="Monthly Downloads"
      subtitle="App installs over time"
    >
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={monthlyDownloadsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip
            content={<ChartTooltip valueLabel="Downloads" color="#6366f1" />}
          />
          <Area
            type="monotone"
            dataKey="downloads"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#dlGrad)"
            dot={{ fill: "#6366f1", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#6366f1" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>

    {/* 2. Bottom row — Leave Requests bar + Profiles pie */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Leave Requests — bar chart */}
      <ChartCard
        icon={ClipboardList}
        iconColor="#10b981"
        title="Leave Requests"
        subtitle="Total requests submitted per month"
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={leaveRequestsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip
              content={<ChartTooltip valueLabel="Requests" color="#10b981" />}
              cursor={{ fill: "#fef9f0" }}
            />
            <Bar dataKey="requests" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Profiles by Role — donut pie */}
      <ChartCard
        icon={PieIcon}
        iconColor="#6366f1"
        title="Profiles by Role"
        subtitle={`${TOTAL_PROFILES.toLocaleString()} total profiles`}
      >
        {/* Responsive: pie + legend side by side on sm+, stacked on xs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Donut chart */}
          <div className="w-36 h-36 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profilesByRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="85%"
                  dataKey="value"
                  strokeWidth={0}
                >
                  {profilesByRoleData.map((role) => (
                    <Cell key={role.name} fill={role.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-sm">
                        <p style={{ color: payload[0].payload.color }} className="font-semibold">
                          {payload[0].name}: {payload[0].value.toLocaleString()}
                        </p>
                      </div>
                    ) : null
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend — one row per role */}
          <div className="flex-1 w-full flex flex-col gap-2">
            {profilesByRoleData.map((role) => {
              const pct = ((role.value / TOTAL_PROFILES) * 100).toFixed(1);
              return (
                <div key={role.name} className="flex flex-col gap-0.5">
                  {/* Colour dot */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: role.color }}
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {role.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: role.color }}>
                      {pct}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: role.color,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {role.value.toLocaleString()} profiles
                  </span>
                </div>
              );
            })}

            {/* Divider + total */}
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-600">Total</span>
              <span className="text-xs font-bold text-slate-800">
                {TOTAL_PROFILES.toLocaleString()} profiles
              </span>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  </div>
);

export default AnalyticsCharts;