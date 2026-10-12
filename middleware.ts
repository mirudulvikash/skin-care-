import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/session';

const protectedRoutes: string[] = [];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  const session = await verifySession();

  if (isProtectedRoute && !session?.isAuth) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (isAuthRoute && session?.isAuth) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
