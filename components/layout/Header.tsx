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
        <div className="text-[10px] uppercase font-semibold text-medical-slate/70 bg-medical-light px-2 py-1 rounded-full border border-medical-border hidden sm:block">
          Dr. N.G.P. iTech
        </div>
        {session?.isAuth && (
          <form action={signOut}>
            <button type="submit" className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center gap-1" title="Log Out">
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
