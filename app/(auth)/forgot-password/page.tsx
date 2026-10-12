import Link from 'next/link';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { resetPassword } from '@/app/actions/auth-actions';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-8">
      {/* Background decoration */}
      <div className="absolute top-0 -left-1/4 w-full h-[500px] bg-gradient-to-br from-blue-100/50 to-indigo-100/50 blur-3xl rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-full h-[500px] bg-gradient-to-tl from-emerald-100/50 to-teal-100/50 blur-3xl rounded-full" />
      
      <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl z-10 mx-4">
        <Link 
          href="/sign-in" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Sign In
        </Link>

        <div className="mb-6 text-center">
          <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-3 text-medical-teal">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Reset Password</h1>
          <p className="text-slate-500 mt-1 text-xs">Enter your registered email and choose a new password</p>
        </div>

        <form action={async (formData) => { "use server"; await resetPassword(formData); }} className="space-y-4">
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
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              required 
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              placeholder="Min. 8 characters"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 px-4 bg-medical-teal hover:bg-teal-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            Update Password
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Remember your password?{' '}
          <Link href="/sign-in" className="text-medical-teal font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
