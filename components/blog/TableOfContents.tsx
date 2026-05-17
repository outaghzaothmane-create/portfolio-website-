import Link from "next/link";
import { slugifyTag } from "@/lib/sanity";

export type TocItem = {
    id: string;
    title: string;
    level: 2 | 3;
};

export function getTableOfContents(body?: any[]): TocItem[] {
    if (!body?.length) {
        return [];
    }

    return body
        .filter((block) => block._type === "block" && ["h2", "h3"].includes(block.style))
        .map((block) => {
            const title = block.children?.map((child: { text?: string }) => child.text || "").join(" ").trim();
            return title
                ? {
                    id: slugifyTag(title),
                    title,
                    level: block.style === "h3" ? 3 : 2,
                }
                : null;
        })
        .filter(Boolean) as TocItem[];
}

export function TableOfContents({ items }: { items: TocItem[] }) {
    if (!items.length) {
        return null;
    }

    return (
        <aside className="rounded-lg border border-border bg-background/70 p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Table of contents</h2>
            <nav className="space-y-2">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cnToc(item.level)}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

function cnToc(level: TocItem["level"]) {
    return [
        "block min-h-11 py-2 text-sm leading-relaxed text-muted-foreground hover:text-primary transition-colors",
        level === 3 ? "pl-4" : "",
    ].join(" ");
}
