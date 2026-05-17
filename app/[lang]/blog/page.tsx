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
import { alternatesForPath } from "@/lib/seo/i18n";
import { getBlogPosts, getCategories, getFeaturedPosts, getTags, isSanityConfigured, slugifyTag } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

export const revalidate = 3600;

import { getDictionary, Locale } from "@/lib/i18n";

type BlogPageProps = {
    searchParams?: {
        q?: string;
        page?: string;
    };
    params: {
        lang: string;
    };
};

export async function generateMetadata({ params }: Pick<BlogPageProps, "params">): Promise<Metadata> {
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const title = isFr
        ? "Blog SEO technique & référencement IA | Othmane Outaghza"
        : "Technical SEO & AI Search Blog | Othmane Outaghza";
    const description = isFr
        ? "Guides sur le consultant SEO technique, l'audit SEO technique, le consultant SEO Maroc, Shopify SEO, le référencement IA et l'optimisation pour les moteurs IA."
        : "Technical SEO, technical SEO audit, SEO consultant Morocco, Shopify SEO, AI search optimization, GEO, LLMO, and ecommerce SEO guides.";

    return {
        title,
        description,
        alternates: alternatesForPath(lang, { en: "/blog", fr: "/blog" }),
        openGraph: {
            title,
            description,
            url: `${siteUrl}/${lang}/blog`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function BlogPage({ searchParams, params }: BlogPageProps) {
    const query = searchParams?.q?.trim();
    const page = Math.max(1, Number(searchParams?.page || 1));
    const lang = params.lang;
    
    const [{ posts, total, totalPages }, featuredPosts, categories, tags, dict] = await Promise.all([
        getBlogPosts({ page, query, lang }),
        getFeaturedPosts(lang),
        getCategories(),
        getTags(lang),
        getDictionary(lang as Locale),
    ]);

    const safeDict = dict.blog || {
        title: "SEO & AI Search Blog",
        subtitle: "Technical SEO Systems for the AI Search Era",
        description: "Field notes, frameworks, and implementation playbooks for Google, AI Overviews, ChatGPT, Perplexity, Shopify SEO, Local SEO, and automation.",
        searchTitle: "Search the knowledge base",
        featuredTitle: "Featured Articles",
        technicalHub: "Technical SEO hub",
        recentPosts: "Recent Posts",
        searchResults: "Search results for",
        articles: "articles",
        noResultsTitle: "No results for",
        noResultsDesc: "Try a different keyword or clear the search.",
        comingSoonTitle: "Articles coming soon",
        comingSoonDesc: "In-depth guides on Technical SEO, AI Search, Shopify SEO, and automation are on their way. Check back shortly.",
        topicalHubs: "Topical Hubs",
        tagsTitle: "Tags"
    };

    return (
        <DashboardWrapper>
            <JsonLd
                data={collectionPageSchema({
                    name: "SEO & AI Search Blog",
                    description: "Technical SEO, AI Search Optimization, GEO, Shopify SEO, Local SEO, and automation articles.",
                    url: `${siteUrl}/${lang}/blog`,
                    lang: lang as Locale,
                })}
            />
            <main className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <SectionWrapper>
                    <header className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end mb-12">
                        <div className="max-w-4xl">
                            <Badge variant="outline" className="mb-5 border-primary/30 text-primary">
                                {safeDict.title}
                            </Badge>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                                {safeDict.subtitle}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
                                {safeDict.description}
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-background/70 p-4 sm:p-5">
                            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Sparkles className="h-4 w-4 text-primary" />
                                {safeDict.searchTitle}
                            </div>
                            <BlogSearch query={query} lang={lang} />
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
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{safeDict.featuredTitle}</h2>
                                <Link href={`/${lang}/blog/category/technical-seo`} className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">
                                    {safeDict.technicalHub}
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
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                                    {query ? `${safeDict.searchResults} "${query}"` : safeDict.recentPosts}
                                </h2>
                                <p className="text-sm text-muted-foreground">{total} {safeDict.articles}</p>
                            </div>

                            {posts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {posts.map((post) => (
                                        <BlogCard key={post._id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-border bg-background/70 p-6 sm:p-10 text-center">
                                    {query ? (
                                        <>
                                            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{safeDict.noResultsTitle} &ldquo;{query}&rdquo;</h2>
                                            <p className="text-muted-foreground">{safeDict.noResultsDesc}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{safeDict.comingSoonTitle}</h2>
                                            <p className="text-muted-foreground max-w-md mx-auto">
                                                {safeDict.comingSoonDesc}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            <Pagination page={page} totalPages={totalPages} params={{ q: query }} basePath={`/${lang}/blog`} />
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-lg border border-border bg-background/70 p-5">
                                <h2 className="text-sm font-semibold text-foreground mb-4">{safeDict.topicalHubs}</h2>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/${lang}/blog/category/${category.slug}`}
                                            className="block min-h-11 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg border border-border bg-background/70 p-5">
                                <h2 className="text-sm font-semibold text-foreground mb-4">{safeDict.tagsTitle}</h2>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Link key={tag} href={`/${lang}/blog/tag/${slugifyTag(tag)}`}>
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
            <Footer dict={dict.footer} lang={lang} />
        </DashboardWrapper>
    );
}
