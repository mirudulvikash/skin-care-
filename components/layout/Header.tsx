import { HeartPulse, LogOut } from "lucide-react";
import { verifySession } from "@/lib/session";
import { signOut } from "@/app/actions/auth-actions";

export async function Header() {
  const session = await verifySession();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-medical-border shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <HeartPulse className="text-medical-teal w-6 h-6" />
        <h1 className="font-bold text-lg text-medical-slate tracking-tight">DermaSense AI</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-[10px] uppercase font-semibold text-medical-teal bg-medical-light px-2.5 py-1 rounded-full border border-medical-border">
          Skin Disease Detection
        </div>
      </div>
    </header>
  );
}
