import Link from 'next/link';
import { signIn } from '@/app/actions/auth-actions';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 -left-1/4 w-full h-[500px] bg-gradient-to-br from-blue-100/50 to-indigo-100/50 blur-3xl rounded-full" />
      <div className="absolute -bottom-1/4 -right-1/4 w-full h-[500px] bg-gradient-to-tl from-emerald-100/50 to-teal-100/50 blur-3xl rounded-full" />
      
      <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl z-10 mx-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to DermaSense AI</p>
        </div>

        <form action={async (formData) => { "use server"; await signIn(formData); }} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
