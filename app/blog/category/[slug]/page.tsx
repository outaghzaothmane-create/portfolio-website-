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
import { getBlogPosts, getCategories, getCategory } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

type PageProps = {
    params: { slug: string };
    searchParams?: { page?: string };
};

export const revalidate = 3600;

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.filter((category) => category.slug).map((category) => ({ slug: category.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const category = await getCategory(params.slug);

    if (!category) {
        return { title: "Category Not Found | Othmane Outaghza" };
    }

    const title = `${category.title} Articles | Othmane Outaghza`;
    const description = category.description || `Read ${category.title} articles on the Othmane Outaghza SEO and AI Search blog.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${siteUrl}/blog/category/${category.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteUrl}/blog/category/${category.slug}`,
            type: "website",
        },
    };
}

export default async function BlogCategoryPage({ params, searchParams }: PageProps) {
    const category = await getCategory(params.slug);

    if (!category) {
        notFound();
    }

    const page = Math.max(1, Number(searchParams?.page || 1));
    const { posts, total, totalPages } = await getBlogPosts({ page, category: params.slug });

    return (
        <DashboardWrapper>
            <JsonLd
                data={collectionPageSchema({
                    name: `${category.title} Articles`,
                    description: category.description || `Articles about ${category.title}.`,
                    url: `${siteUrl}/blog/category/${category.slug}`,
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
                        <p className="text-sm font-medium text-primary mb-4">Topical hub</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            {category.title}
                        </h1>
                        {category.description && (
                            <p className="text-xl leading-relaxed text-muted-foreground">{category.description}</p>
                        )}
                        <p className="mt-5 text-sm text-muted-foreground">{total} articles</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} basePath={`/blog/category/${params.slug}`} />
                </SectionWrapper>
            </main>
            <Footer />
        </DashboardWrapper>
    );
}
