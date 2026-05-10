import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, RefreshCcw } from "lucide-react";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/BlogCard";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { SocialShare } from "@/components/blog/SocialShare";
import { TableOfContents, getTableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema, personSchema } from "@/lib/seo/jsonld";
import { getAllBlogPosts, getBlogPost, slugifyTag } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

type PageProps = {
    params: {
        slug: string;
    };
};

export const revalidate = 3600;

function formatDate(date?: string) {
    if (!date) {
        return "Draft";
    }

    return new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export async function generateStaticParams(): Promise<Array<PageProps["params"]>> {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getBlogPost(params.slug);

    if (!post) {
        return {
            title: "Blog Post Not Found | Othmane Outaghza",
        };
    }

    const title = post.seo?.metaTitle || `${post.title} | Othmane Outaghza`;
    const description = post.seo?.metaDescription || post.excerpt || `Read ${post.title} by Othmane Outaghza.`;
    const canonical = post.seo?.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
    const image = post.seo?.ogImage?.url || post.mainImage?.url;

    return {
        title,
        description,
        alternates: {
            canonical,
        },
        robots: post.seo?.noIndex ? { index: false, follow: true } : undefined,
        openGraph: {
            type: "article",
            title,
            description,
            url: canonical,
            images: image ? [{ url: image }] : undefined,
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt || post.publishedAt,
            authors: post.author?.name ? [post.author.name] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    const toc = getTableOfContents(post.body);
    const faqJsonLd = faqSchema(post);

    return (
        <DashboardWrapper>
            <JsonLd data={personSchema(post)} />
            <JsonLd data={articleSchema(post)} />
            <JsonLd
                data={breadcrumbSchema([
                    { name: "Home", url: siteUrl },
                    { name: "Blog", url: `${siteUrl}/blog` },
                    { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
                ])}
            />
            <JsonLd data={faqJsonLd} />

            <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <SectionWrapper>
                    <div className="mb-10">
                        <Link href="/blog" className="text-sm text-primary hover:underline">
                            Back to blog
                        </Link>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
                        <article>
                            <header className="mb-10 border-b border-border pb-8">
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {post.categories?.map((category) => (
                                        <Link key={category.slug || category.title} href={`/blog/category/${category.slug}`}>
                                            <Badge variant="outline" className="hover:border-primary hover:text-primary transition-colors">
                                                {category.title}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                                    {post.title}
                                </h1>
                                {post.excerpt && (
                                    <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                                        {post.excerpt}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    {post.author?.name && <span>By {post.author.name}</span>}
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />
                                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                                    </span>
                                    {post.updatedAt && (
                                        <span className="inline-flex items-center gap-2">
                                            <RefreshCcw className="h-4 w-4" />
                                            Updated {formatDate(post.updatedAt)}
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-2">
                                        <Clock3 className="h-4 w-4" />
                                        {post.readingTime || 1} min read
                                    </span>
                                </div>
                            </header>

                            {post.mainImage?.url && (
                                <Image
                                    src={post.mainImage.url}
                                    alt={post.mainImage.alt || post.title}
                                    width={post.mainImage.width || 1200}
                                    height={post.mainImage.height || 675}
                                    priority
                                    className="mb-12 w-full rounded-lg border border-border object-cover"
                                    sizes="(min-width: 1024px) 896px, 100vw"
                                />
                            )}

                            <div className="prose prose-invert lg:prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
                                <PortableTextRenderer value={post.body} />
                            </div>

                            {post.faqs?.length ? (
                                <section className="mt-16 border-t border-border pt-10">
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {post.faqs.map((faq) => (
                                            <details key={faq.question} className="rounded-lg border border-border bg-background/70 p-5">
                                                <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                                                <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </section>
                            ) : null}

                            <section className="mt-16 rounded-lg border border-primary/20 bg-primary/5 p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-3">
                                    {post.cta?.title || "Need a technical SEO and AI Search system?"}
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    {post.cta?.description || "I help businesses build crawlable, structured, AI-readable SEO systems that compound across Google and answer engines."}
                                </p>
                                <Link
                                    href={post.cta?.href || "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+SEO+and+AI+Search"}
                                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    {post.cta?.label || "Book a strategy call"}
                                </Link>
                            </section>

                            {post.author && (
                                <section className="mt-12 rounded-lg border border-border bg-background/70 p-6">
                                    <div className="flex gap-5">
                                        {post.author.image?.url && (
                                            <Image
                                                src={post.author.image.url}
                                                alt={post.author.image.alt || post.author.name || ""}
                                                width={72}
                                                height={72}
                                                className="h-18 w-18 rounded-full object-cover"
                                            />
                                        )}
                                        <div>
                                            <h2 className="text-lg font-bold text-foreground">{post.author.name}</h2>
                                            {post.author.role && <p className="text-sm text-primary">{post.author.role}</p>}
                                            {post.author.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.author.bio}</p>}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {post.relatedPosts?.length ? (
                                <section className="mt-16">
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Related Posts</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {post.relatedPosts.slice(0, 3).map((related) => (
                                            <BlogCard key={related._id} post={related} />
                                        ))}
                                    </div>
                                </section>
                            ) : null}
                        </article>

                        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                            <TableOfContents items={toc} />
                            <div className="rounded-lg border border-border bg-background/70 p-5">
                                <SocialShare post={post} />
                            </div>
                            {post.tags?.length ? (
                                <div className="rounded-lg border border-border bg-background/70 p-5">
                                    <h2 className="text-sm font-semibold text-foreground mb-4">Topics</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}`}>
                                                <Badge variant="outline" className="hover:border-primary hover:text-primary transition-colors">
                                                    {tag}
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </aside>
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </DashboardWrapper>
    );
}
