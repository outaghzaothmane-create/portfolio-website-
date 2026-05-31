"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/i18n";
import { useLanguageSwitcher } from "@/context/LanguageSwitcherContext";

export function LanguageSwitcher() {
    const pathname = usePathname();
    const isFr = pathname.startsWith('/fr');
    const { customPaths } = useLanguageSwitcher();
    
    const enHref = customPaths?.en || getLocalizedPath(pathname, 'en');
    const frHref = customPaths?.fr || getLocalizedPath(pathname, 'fr');
    
    return (
        <div className="flex min-h-11 items-center gap-1 rounded-full border border-black/5 bg-black/5 p-1">
            <Link 
                href={enHref}
                aria-label="Switch to English"
                aria-current={!isFr ? "true" : undefined}
                className={cn(
                    "flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 text-xs font-semibold transition-all",
                    !isFr ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
            >
                EN
            </Link>
            <Link 
                href={frHref}
                aria-label="Passer en français"
                aria-current={isFr ? "true" : undefined}
                className={cn(
                    "flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 text-xs font-semibold transition-all",
                    isFr ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
            >
                FR
            </Link>
        </div>
    );
}
