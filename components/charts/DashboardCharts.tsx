"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardCharts({ metrics }: { metrics: { severityDistribution: any[], totalScans: number } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-medical-teal" />
      </div>
    );
  }

  if (metrics.totalScans === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
         <p className="font-semibold text-sm">No analytics available yet.</p>
         <p className="text-xs mt-1">Run a scan to populate diagnostics!</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={metrics.severityDistribution}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {metrics.severityDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
             itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
         <p className="text-2xl font-black text-slate-800 leading-none">{metrics.totalScans}</p>
         <p className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-wider">Metrics</p>
      </div>
    </div>
  );
}
