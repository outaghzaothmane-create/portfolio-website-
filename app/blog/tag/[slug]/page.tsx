import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";
import { JsonLd } from "@/components/JsonLd";
import { collectionPageSchema } from "@/lib/seo/jsonld";
import { getBlogPosts, getTags, slugifyTag } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

type PageProps = {
    params: { slug: string };
    searchParams?: { page?: string };
};

export const revalidate = 3600;

async function getTagFromSlug(slug: string) {
    const tags = await getTags();
    return tags.find((tag) => slugifyTag(tag) === slug) || null;
}

export async function generateStaticParams() {
    const tags = await getTags();
    return tags.map((tag) => ({ slug: slugifyTag(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const tag = await getTagFromSlug(params.slug);

    if (!tag) {
        return { title: "Tag Not Found | Othmane Outaghza" };
    }

    const title = `${tag} Articles | Othmane Outaghza`;
    const description = `Read ${tag} articles on technical SEO, AI Search, GEO, and SEO automation.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${siteUrl}/blog/tag/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteUrl}/blog/tag/${params.slug}`,
            type: "website",
        },
    };
}

export default async function BlogTagPage({ params, searchParams }: PageProps) {
    const tag = await getTagFromSlug(params.slug);

    if (!tag) {
        notFound();
    }

    const page = Math.max(1, Number(searchParams?.page || 1));
    const { posts, total, totalPages } = await getBlogPosts({ page, tag });

    return (
        <DashboardWrapper>
            <JsonLd
                data={collectionPageSchema({
                    name: `${tag} Articles`,
                    description: `Articles about ${tag}.`,
                    url: `${siteUrl}/blog/tag/${params.slug}`,
                })}
            />
            <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <SectionWrapper>
                    <div className="mb-10">
                        <Link href="/blog" className="text-sm text-primary hover:underline">
                            Back to blog
                        </Link>
                    </div>
                    <header className="max-w-4xl mb-12">
                        <p className="text-sm font-medium text-primary mb-4">Tag</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            {tag}
                        </h1>
                        <p className="text-xl leading-relaxed text-muted-foreground">
                            Focused articles and implementation notes tagged with {tag}.
                        </p>
                        <p className="mt-5 text-sm text-muted-foreground">{total} articles</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} basePath={`/blog/tag/${params.slug}`} />
                </SectionWrapper>
            </main>
            <Footer />
        </DashboardWrapper>
    );
}
