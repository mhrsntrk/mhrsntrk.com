import { NextResponse } from 'next/server';

export function middleware(req) {
  const accept = req.headers.get('accept') || '';
  const { pathname } = req.nextUrl;

  if (!accept.includes('text/markdown')) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/api/home-markdown';
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    const slug = pathname.replace('/blog/', '');
    const url = req.nextUrl.clone();
    url.pathname = '/api/markdown/blog/' + slug;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/blog/:path*'],
};