import { Metadata } from "next";
import Link from "next/link";
import { Settings2, Sparkles } from "lucide-react";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { Pagination } from "@/components/blog/Pagination";
import { JsonLd } from "@/components/JsonLd";
import { collectionPageSchema } from "@/lib/seo/jsonld";
import { getBlogPosts, getCategories, getFeaturedPosts, getTags, isSanityConfigured, slugifyTag } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "SEO & AI Search Blog | Othmane Outaghza",
    description: "Technical SEO, AI Search Optimization, GEO, Shopify SEO, Local SEO, and automation articles by Othmane Outaghza.",
    alternates: {
        canonical: `${siteUrl}/blog`,
    },
    openGraph: {
        title: "SEO & AI Search Blog | Othmane Outaghza",
        description: "High-authority technical SEO and AI Search insights for modern organic growth.",
        url: `${siteUrl}/blog`,
        type: "website",
    },
};

type BlogPageProps = {
    searchParams?: {
        q?: string;
        page?: string;
    };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const query = searchParams?.q?.trim();
    const page = Math.max(1, Number(searchParams?.page || 1));
    const [{ posts, total, totalPages }, featuredPosts, categories, tags] = await Promise.all([
        getBlogPosts({ page, query }),
        getFeaturedPosts(),
        getCategories(),
        getTags(),
    ]);

    return (
        <DashboardWrapper>
            <JsonLd
                data={collectionPageSchema({
                    name: "SEO & AI Search Blog",
                    description: "Technical SEO, AI Search Optimization, GEO, Shopify SEO, Local SEO, and automation articles.",
                    url: `${siteUrl}/blog`,
                })}
            />
            <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <SectionWrapper>
                    <header className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end mb-12">
                        <div className="max-w-4xl">
                            <Badge variant="outline" className="mb-5 border-primary/30 text-primary">
                                SEO + AI Search Blog
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                                Technical SEO Systems for the AI Search Era
                            </h1>
                            <p className="text-xl leading-relaxed text-muted-foreground">
                                Field notes, frameworks, and implementation playbooks for Google, AI Overviews, ChatGPT, Perplexity, Shopify SEO, Local SEO, and automation.
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-background/70 p-5">
                            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Sparkles className="h-4 w-4 text-primary" />
                                Search the knowledge base
                            </div>
                            <BlogSearch query={query} />
                        </div>
                    </header>

                    {!isSanityConfigured() && (
                        <div className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
                                <Settings2 className="h-4 w-4 text-primary" />
                                Sanity connection needed
                            </div>
                            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, <code>NEXT_PUBLIC_SANITY_DATASET</code>, and <code>NEXT_PUBLIC_SANITY_API_VERSION</code> in Vercel to load your real articles.
                        </div>
                    )}

                    {!query && featuredPosts.length > 0 && (
                        <section className="mb-14">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Articles</h2>
                                <Link href="/blog/category/technical-seo" className="text-sm font-medium text-primary hover:underline">
                                    Technical SEO hub
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {featuredPosts.slice(0, 3).map((post, index) => (
                                    <BlogCard key={post._id} post={post} priority={index === 0} />
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="grid gap-10 lg:grid-cols-[1fr_300px]">
                        <div>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                    {query ? `Search results for "${query}"` : "Recent Posts"}
                                </h2>
                                <p className="text-sm text-muted-foreground">{total} articles</p>
                            </div>

                            {posts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {posts.map((post) => (
                                        <BlogCard key={post._id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-border bg-background/70 p-10 text-center">
                                    {query ? (
                                        <>
                                            <h2 className="text-2xl font-bold text-foreground mb-3">No results for &ldquo;{query}&rdquo;</h2>
                                            <p className="text-muted-foreground">Try a different keyword or clear the search.</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold text-foreground mb-3">Articles coming soon</h2>
                                            <p className="text-muted-foreground max-w-md mx-auto">
                                                In-depth guides on Technical SEO, AI Search, Shopify SEO, and automation are on their way. Check back shortly.
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            <Pagination page={page} totalPages={totalPages} params={{ q: query }} />
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-lg border border-border bg-background/70 p-5">
                                <h2 className="text-sm font-semibold text-foreground mb-4">Topical Hubs</h2>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/blog/category/${category.slug}`}
                                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg border border-border bg-background/70 p-5">
                                <h2 className="text-sm font-semibold text-foreground mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}`}>
                                            <Badge variant="outline" className="hover:border-primary hover:text-primary transition-colors">
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </section>
                </SectionWrapper>
            </main>
            <Footer />
        </DashboardWrapper>
    );
}
