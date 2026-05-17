import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPostSummary } from "@/lib/sanity";

function formatDate(date?: string) {
    if (!date) {
        return "Draft";
    }

    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export function BlogCard({ post, priority = false }: { post: BlogPostSummary; priority?: boolean }) {
    const lang = post.language === "fr" ? "fr" : "en";

    return (
        <article className="group rounded-lg border border-border bg-background/70 overflow-hidden transition-all hover:border-primary/40 hover:-translate-y-1">
            <Link href={`/${lang}/blog/${post.slug}`} className="block min-h-11">
                {post.mainImage?.url ? (
                    <Image
                        src={post.mainImage.url}
                        alt={post.mainImage.alt || post.title}
                        width={post.mainImage.width || 1200}
                        height={post.mainImage.height || 675}
                        priority={priority}
                        className="h-48 w-full object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-primary/15 via-background to-foreground/10" />
                )}
                <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Clock3 className="h-4 w-4" />
                            {post.readingTime || 1} min read
                        </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold leading-tight text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                    {post.excerpt && (
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {post.excerpt}
                        </p>
                    )}
                    {post.categories?.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {post.categories.slice(0, 2).map((category) => (
                                <Badge key={category.slug || category.title} variant="secondary">
                                    {category.title}
                                </Badge>
                            ))}
                        </div>
                    ) : null}
                </div>
            </Link>
        </article>
    );
}
