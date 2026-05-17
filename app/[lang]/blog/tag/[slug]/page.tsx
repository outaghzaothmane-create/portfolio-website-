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
import { getDictionary, type Locale } from "@/lib/i18n";
import { alternatesForPath } from "@/lib/seo/i18n";
import { siteUrl } from "@/sanity/env";

type PageProps = {
    params: { slug: string; lang: string };
    searchParams?: { page?: string };
};

export const revalidate = 3600;

async function getTagFromSlug(slug: string, lang: string) {
    const tags = await getTags(lang);
    return tags.find((tag) => slugifyTag(tag) === slug) || null;
}

export async function generateStaticParams() {
    const entries = await Promise.all((["en", "fr"] as const).map(async (lang) => {
        const tags = await getTags(lang);
        return tags.map((tag) => ({ slug: slugifyTag(tag), lang }));
    }));

    return entries.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const tag = await getTagFromSlug(params.slug, params.lang);

    if (!tag) {
        return { title: "Tag Not Found | Othmane Outaghza" };
    }

    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const title = isFr ? `Articles ${tag} | Othmane Outaghza` : `${tag} Articles | Othmane Outaghza`;
    const description = isFr
        ? `Articles sur ${tag}, le SEO technique, le référencement IA, le GEO et l'automatisation SEO.`
        : `Read ${tag} articles on technical SEO, AI Search, GEO, and SEO automation.`;

    return {
        title,
        description,
        alternates: alternatesForPath(lang, { en: `/blog/tag/${params.slug}`, fr: `/blog/tag/${params.slug}` }),
        openGraph: {
            title,
            description,
            url: `${siteUrl}/${lang}/blog/tag/${params.slug}`,
            type: "website",
        },
    };
}

export default async function BlogTagPage({ params, searchParams }: PageProps) {
    const lang = params.lang as Locale;
    const tag = await getTagFromSlug(params.slug, lang);

    if (!tag) {
        notFound();
    }

    const [dict, blogResult] = await Promise.all([
        getDictionary(lang),
        getBlogPosts({ page: Math.max(1, Number(searchParams?.page || 1)), tag, lang }),
    ]);
    const { posts, total, totalPages, page } = blogResult;

    return (
        <DashboardWrapper>
            <JsonLd
                data={collectionPageSchema({
                    name: `${tag} Articles`,
                    description: `Articles about ${tag}.`,
                    url: `${siteUrl}/${lang}/blog/tag/${params.slug}`,
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
                        <p className="text-sm font-medium text-primary mb-4">Tag</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            {tag}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
                            Focused articles and implementation notes tagged with {tag}.
                        </p>
                        <p className="mt-5 text-sm text-muted-foreground">{total} articles</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} basePath={`/${lang}/blog/tag/${params.slug}`} />
                </SectionWrapper>
            </main>
            <Footer dict={dict.footer} lang={lang} />
        </DashboardWrapper>
    );
}
