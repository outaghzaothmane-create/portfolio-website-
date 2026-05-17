"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/i18n";

export function LanguageSwitcher() {
    const pathname = usePathname();
    const isFr = pathname.startsWith('/fr');
    
    return (
        <div className="flex min-h-11 items-center gap-1 bg-black/5 rounded-full p-1 border border-black/5">
            <Link 
                href={getLocalizedPath(pathname, 'en')}
                aria-label="Switch to English"
                className={cn(
                    "flex min-h-9 min-w-9 items-center justify-center px-2 text-xs font-semibold rounded-full transition-all",
                    !isFr ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
            >
                EN
            </Link>
            <Link 
                href={getLocalizedPath(pathname, 'fr')}
                aria-label="Passer en français"
                className={cn(
                    "flex min-h-9 min-w-9 items-center justify-center px-2 text-xs font-semibold rounded-full transition-all",
                    isFr ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
            >
                FR
            </Link>
        </div>
    );
}
