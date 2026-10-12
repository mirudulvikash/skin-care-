import { Activity, ShieldCheck, PieChart as PieChartIcon } from "lucide-react";
import Link from "next/link";
import { getDashboardAnalytics } from "@/app/actions/scan-actions";
import { DashboardCharts } from "@/components/charts/DashboardCharts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const metrics = await getDashboardAnalytics();

  return (
    <div className="flex flex-col min-h-[85vh] p-4 pb-24 space-y-6">
      {/* Header Widget */}
      <div className="bg-medical-slate text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-medical-teal" />
            <h2 className="font-bold text-sm tracking-wider uppercase">DermaSense AI</h2>
          </div>
          <p className="text-2xl font-extrabold mb-1">Dr. N.G.P. Tech</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Early detection screening platform mapping dermatoscopic anomalies in real-time.
          </p>
          
          <Link href="/scan" className="inline-flex items-center gap-2 bg-medical-teal text-white px-6 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform">
            <Activity className="w-4 h-4" />
            Perform New Scan
          </Link>
        </div>
        
        {/* Background Decor */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-medical-teal/20 rounded-full blur-3xl"></div>
      </div>

      {/* Analytics Core */}
      <div>
        <div className="flex items-center gap-2 mb-4 mt-2">
          <PieChartIcon className="w-5 h-5 text-medical-slate" />
          <h2 className="text-lg font-bold text-slate-800">Live Global Diagnostics</h2>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col pt-8">
           <DashboardCharts metrics={metrics} />
           
           <div className="mt-4 grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-4">
              <div className="flex flex-col">
                <span className="text-xl font-black text-medical-crimson">{metrics.severityDistribution.find(d => d.name === 'High')?.value || 0}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">High Risk</span>
              </div>
              <div className="flex flex-col border-x border-slate-100">
                <span className="text-xl font-black text-medical-amber">{metrics.severityDistribution.find(d => d.name === 'Moderate')?.value || 0}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Moderate</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-medical-emerald">{metrics.severityDistribution.find(d => d.name === 'Low')?.value || 0}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Low Risk</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
