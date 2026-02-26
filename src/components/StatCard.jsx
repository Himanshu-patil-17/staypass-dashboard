import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorMap = {
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    bar: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-600",
    border: "border-indigo-100",
    glow: "hover:shadow-indigo-100",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    bar: "bg-blue-500",
    badge: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
    glow: "hover:shadow-blue-100",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
    glow: "hover:shadow-emerald-100",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    bar: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
    glow: "hover:shadow-amber-100",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600",
    bar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-600",
    border: "border-rose-100",
    glow: "hover:shadow-rose-100",
  },
};

const trendMap = {
  indigo: { value: "+8.1%", up: true },
  blue: { value: "+12.4%", up: true },
  emerald: { value: "+4.2%", up: true },
  amber: { value: "+2.1%", up: true },
  rose: { value: "+6.7%", up: true },
};

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return count;
}

const StatCard = ({ title, value, description, icon: Icon, color, max }) => {
  const c = colorMap[color] || colorMap.indigo;
  const trend = trendMap[color] || trendMap.indigo;
  const count = useCountUp(value);
  return (
    <div
      className={`
        relative bg-white rounded-2xl border border-slate-100
        p-5 flex flex-col gap-4
        shadow-sm hover:shadow-lg ${c.glow}
        transition-all duration-300 hover:-translate-y-1
        overflow-hidden group cursor-default
      `}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.icon} shrink-0`}>
          <Icon size={19} strokeWidth={2} />
        </div>

        {/* Trend badge */}
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
            ${trend.up
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-500"
            }`}
        >
          {trend.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {trend.value}
        </span>
      </div>

      {/* Value */}
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight leading-none font-mono">
          {count.toLocaleString()}
        </p>
      </div>

      {/* Title + Description */}
      <div>
        <p className="text-sm font-semibold text-slate-700 leading-tight">{title}</p>
        <p className="text-xs text-slate-400 mt-0.5 leading-snug">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;