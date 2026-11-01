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
        // #region agent log
        fetch('http://127.0.0.1:7341/ingest/f4d26d0c-b4d0-4181-9d98-e47689b7b0b8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fe2b6'},body:JSON.stringify({sessionId:'1fe2b6',hypothesisId:'C',location:'middleware.ts:skip',message:'middleware skipped locale rewrite',data:{pathname,hasDot:pathname.includes('.')},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        return;
    }

    // Check if the pathname starts with a supported language
    const pathnameIsMissingLocale = supportedLanguages.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = defaultLanguage;
        // #region agent log
        fetch('http://127.0.0.1:7341/ingest/f4d26d0c-b4d0-4181-9d98-e47689b7b0b8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fe2b6'},body:JSON.stringify({sessionId:'1fe2b6',hypothesisId:'D',location:'middleware.ts:redirect',message:'locale missing, redirecting',data:{pathname,locale},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        
        // e.g. incoming request is /services
        // The new URL is now /en/services
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
