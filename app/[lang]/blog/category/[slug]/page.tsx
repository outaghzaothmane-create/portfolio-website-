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
import { getDictionary, type Locale } from "@/lib/i18n";
import { alternatesForPath } from "@/lib/seo/i18n";
import { siteUrl } from "@/sanity/env";

type PageProps = {
    params: { slug: string; lang: string };
    searchParams?: { page?: string };
};

export const revalidate = 3600;

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories
        .filter((category) => category.slug)
        .flatMap((category) => (["en", "fr"] as const).map((lang) => ({ slug: category.slug!, lang })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const category = await getCategory(params.slug);

    if (!category) {
        return { title: "Category Not Found | Othmane Outaghza" };
    }

    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const title = isFr ? `Articles ${category.title} | Othmane Outaghza` : `${category.title} Articles | Othmane Outaghza`;
    const description = category.description || (isFr
        ? `Lisez les articles ${category.title} sur le SEO technique, le référencement IA et l'optimisation SEO.`
        : `Read ${category.title} articles on the Othmane Outaghza SEO and AI Search blog.`);

    return {
        title,
        description,
        robots: { index: false, follow: true },
        alternates: alternatesForPath(lang, { en: `/blog/category/${category.slug}`, fr: `/blog/category/${category.slug}` }),
        openGraph: {
            title,
            description,
            url: `${siteUrl}/${lang}/blog/category/${category.slug}`,
            type: "website",
        },
    };
}

export default async function BlogCategoryPage({ params, searchParams }: PageProps) {
    const category = await getCategory(params.slug);

    if (!category) {
        notFound();
    }

    const lang = params.lang as Locale;
    const [dict, blogResult] = await Promise.all([
        getDictionary(lang),
        getBlogPosts({ page: Math.max(1, Number(searchParams?.page || 1)), category: params.slug, lang }),
    ]);
    const { posts, total, totalPages, page } = blogResult;

    return (
        <DashboardWrapper>
            <JsonLd
                data={collectionPageSchema({
                    name: `${category.title} Articles`,
                    description: category.description || `Articles about ${category.title}.`,
                    url: `${siteUrl}/${lang}/blog/category/${category.slug}`,
                    lang,
                })}
            />
            <main className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <SectionWrapper>
                    <div className="mb-10">
                        <Link href={`/${lang}/blog`} className="inline-flex min-h-11 items-center text-sm text-primary hover:underline">
                            {lang === "fr" ? "Retour au blog" : "Back to blog"}
                        </Link>
                    </div>
                    <header className="max-w-4xl mb-12">
                        <p className="text-sm font-medium text-primary mb-4">{lang === "fr" ? "Hub thématique" : "Topical hub"}</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            {category.title}
                        </h1>
                        {category.description && (
                            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">{category.description}</p>
                        )}
                        <p className="mt-5 text-sm text-muted-foreground">{total} articles</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} basePath={`/${lang}/blog/category/${params.slug}`} />
                </SectionWrapper>
            </main>
            <Footer dict={dict.footer} lang={lang} />
        </DashboardWrapper>
    );
}
