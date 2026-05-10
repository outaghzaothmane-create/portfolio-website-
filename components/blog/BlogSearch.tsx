import { Search } from "lucide-react";

export function BlogSearch({ query = "" }: { query?: string }) {
    return (
        <form action="/blog" className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search SEO, AI Search, Shopify..."
                className="h-11 w-full rounded-lg border border-border bg-background/80 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
        </form>
    );
}
