import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLanguages, defaultLanguage } from './lib/i18n';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for API routes, Next.js internals, static files, and studio
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/studio') ||
        pathname === '/icon' ||
        pathname === '/icon/' ||
        pathname.includes('.') // matches files like /favicon.ico, /robots.txt, etc.
    ) {
        return;
    }

    // Check if the pathname starts with a supported language
    const pathnameIsMissingLocale = supportedLanguages.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = defaultLanguage;
        
        // e.g. incoming request is /services
        // The new URL is now /en/services/ (trailing slash matches trailingSlash: true,
        // so visitors and crawlers get one redirect instead of two)
        const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
        return NextResponse.redirect(
            new URL(`/${locale}${withSlash}`, request.url)
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
