import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function buildHref(page: number, params: Record<string, string | undefined>, basePath: string) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            search.set(key, value);
        }
    });
    if (page > 1) {
        search.set("page", String(page));
    }

    const query = search.toString();
    return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({
    page,
    totalPages,
    params = {},
    basePath = "/blog",
}: {
    page: number;
    totalPages: number;
    params?: Record<string, string | undefined>;
    basePath?: string;
}) {
    if (totalPages <= 1) {
        return null;
    }

    const previous = page > 1;
    const next = page < totalPages;

    return (
        <nav className="mt-12 flex items-center justify-between border-t border-border pt-6" aria-label="Blog pagination">
            <Link
                href={previous ? buildHref(page - 1, params, basePath) : "#"}
                className={cn("inline-flex items-center gap-2 text-sm font-medium", !previous && "pointer-events-none opacity-40")}
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Link>
            <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
            </span>
            <Link
                href={next ? buildHref(page + 1, params, basePath) : "#"}
                className={cn("inline-flex items-center gap-2 text-sm font-medium", !next && "pointer-events-none opacity-40")}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Link>
        </nav>
    );
}
