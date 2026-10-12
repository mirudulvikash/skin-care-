import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/session';

const authRoutes = ['/sign-in', '/sign-up', '/forgot-password'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  const session = await verifySession();

  // If user has no active session and is not on an auth route, redirect to sign-up
  if (!session?.isAuth && !isAuthRoute) {
    return NextResponse.redirect(new URL('/sign-up', req.nextUrl));
  }

  // If user is already authenticated and visits an auth route, redirect to dashboard
  if (isAuthRoute && session?.isAuth) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons).*)'],
};
