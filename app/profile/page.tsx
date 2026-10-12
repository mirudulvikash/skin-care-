import { User, LogOut, Activity, Calendar, Shield } from "lucide-react";
import { verifySession } from "@/lib/session";
import { signOut } from "@/app/actions/auth-actions";
import Link from "next/link";
import { getScanHistory } from "@/app/actions/scan-actions";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await verifySession();
  const isAuth = session?.isAuth ?? false;
  
  const user = session?.user || {
    name: "Demo Guest",
    email: "evaluation@viva.test",
  };

  const scans = await getScanHistory();
  const totalScans = scans.length;

  return (
    <div className="flex flex-col min-h-[80vh] p-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 -left-1/4 w-full h-[500px] bg-gradient-to-br from-blue-100/30 to-indigo-100/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-full h-[500px] bg-gradient-to-tl from-emerald-100/30 to-teal-100/30 blur-3xl rounded-full" />
      
      <div className="relative z-10 flex flex-col gap-6 mt-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
           <div className="w-24 h-24 bg-gradient-to-br from-medical-slate to-medical-teal rounded-full p-1 shadow-md mb-4 flex items-center justify-center">
             <div className="w-full h-full bg-white rounded-full flex justify-center items-center">
                <User className="w-10 h-10 text-medical-slate" />
             </div>
           </div>
           
           <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{user.name}</h2>
           <p className="text-slate-500 font-medium text-sm flex items-center gap-1 mt-1">
              <Shield className="w-3.5 h-3.5" />
              {user.email}
           </p>

           <div className="flex items-center gap-6 mt-8 w-full border-t border-slate-100 pt-6">
              <div className="flex-1 flex flex-col items-center">
                 <span className="text-3xl font-black text-medical-teal">{totalScans}</span>
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Total Scans</span>
              </div>
              <div className="flex-1 flex flex-col items-center border-l border-slate-100">
                 <span className="text-3xl font-black text-medical-slate">Pro</span>
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Account Tier</span>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             
             <Link href="/history" className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                   <Calendar className="w-4 h-4 text-blue-500" />
                 </div>
                 <span className="font-semibold text-slate-700 text-sm">Clinical History</span>
               </div>
               <Activity className="w-4 h-4 text-slate-300" />
             </Link>
             
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <form action={signOut} className="w-full">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-red-200 text-red-600 rounded-xl font-bold shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                Log Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
