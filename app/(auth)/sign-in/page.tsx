import Link from 'next/link';
import { UserCheck, LogIn } from 'lucide-react';
import { signIn, continueAsGuest } from '@/app/actions/auth-actions';

type Props = {
  searchParams?: Promise<{ registered?: string; reset?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const isRegistered = resolvedParams?.registered === 'true';
  const isReset = resolvedParams?.reset === 'true';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-8">
      {/* Background decoration */}
      <div className="absolute top-0 -left-1/4 w-full h-[500px] bg-gradient-to-br from-blue-100/50 to-indigo-100/50 blur-3xl rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-full h-[500px] bg-gradient-to-tl from-emerald-100/50 to-teal-100/50 blur-3xl rounded-full" />
      
      <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl z-10 mx-4">
        {isRegistered && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold text-center leading-relaxed">
            Account created successfully! Please sign in with your credentials or continue as a Guest User.
          </div>
        )}

        {isReset && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold text-center leading-relaxed">
            Password updated successfully! Please sign in with your new password.
          </div>
        )}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Sign In</h1>
          <p className="text-slate-500 mt-1 text-sm">Skin Disease Detection &amp; Screening</p>
        </div>

        <form action={async (formData) => { "use server"; await signIn(formData); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
              <Link href="/forgot-password" className="text-xs text-medical-teal font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 px-4 bg-medical-slate hover:bg-slate-800 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-medical-slate focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/90 px-3 text-slate-400 font-semibold tracking-wider">or</span>
          </div>
        </div>

        <form action={continueAsGuest} className="w-full">
          <button 
            type="submit" 
            className="w-full py-3.5 px-4 bg-teal-50 hover:bg-teal-100 text-medical-teal border border-teal-200 font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5 text-medical-teal" />
            Guest User
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-medical-teal font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
