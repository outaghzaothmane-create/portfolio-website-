import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";
import { JsonLd } from "@/components/JsonLd";
import { collectionPageSchema } from "@/lib/seo/jsonld";
import { getBlogPosts, getTags, slugifyTag } from "@/lib/sanity";
import { getDictionary, supportedLanguages, type Locale } from "@/lib/i18n";
import { SetLanguagePaths } from "@/context/LanguageSwitcherContext";
import { getBlogTagPathSet, getBlogTagSlugSet, getLocalizedBlogTagSlug } from "@/lib/blog-tags";
import { absoluteUrl, localizePath } from "@/lib/seo/i18n";

type PageProps = {
    params: { slug: string; lang: string };
    searchParams?: { page?: string };
};

export const revalidate = 3600;

type TagPaths = Partial<Record<Locale, string>>;

type TagPageInfo = {
    tag: string;
    canonicalSlug: string;
    paths: TagPaths;
    canonicalUrl: string;
};

async function getTagPageInfo(slug: string, lang: Locale): Promise<TagPageInfo | null> {
    const tags = await getTags(lang);
    const preferredSlug = getLocalizedBlogTagSlug(slug, lang);
    const tag = tags.find((item) => slugifyTag(item) === preferredSlug) || tags.find((item) => slugifyTag(item) === slug);

    if (!tag) {
        return null;
    }

    const canonicalSlug = slugifyTag(tag);
    const slugSet = getBlogTagSlugSet(canonicalSlug);
    const pathSet = getBlogTagPathSet(canonicalSlug);
    const tagEntries = await Promise.all(
        supportedLanguages.map(async (locale) => {
            const localeTags = locale === lang ? tags : await getTags(locale);
            return [locale, localeTags] as const;
        })
    );
    const paths = tagEntries.reduce<TagPaths>((acc, [locale, localeTags]) => {
        const localizedSlug = slugSet[locale];
        if (localeTags.some((item) => slugifyTag(item) === localizedSlug)) {
            acc[locale] = pathSet[locale];
        }
        return acc;
    }, {});

    const canonicalPath = paths[lang] || `/blog/tag/${canonicalSlug}`;
    paths[lang] = canonicalPath;

    return {
        tag,
        canonicalSlug,
        paths,
        canonicalUrl: absoluteUrl(localizePath(lang, canonicalPath)),
    };
}

function getTagAlternates(tagInfo: TagPageInfo) {
    const languages = supportedLanguages.reduce<Record<string, string>>((acc, locale) => {
        const path = tagInfo.paths[locale];
        if (path) {
            acc[locale] = absoluteUrl(localizePath(locale, path));
        }
        return acc;
    }, {});

    languages["x-default"] = tagInfo.paths.en
        ? absoluteUrl(localizePath("en", tagInfo.paths.en))
        : tagInfo.canonicalUrl;

    return {
        canonical: tagInfo.canonicalUrl,
        languages,
    };
}

export async function generateStaticParams() {
    const entries = await Promise.all((["en", "fr"] as const).map(async (lang) => {
        const tags = await getTags(lang);
        return tags.map((tag) => ({ slug: slugifyTag(tag), lang }));
    }));

    return entries.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Locale;
    const tagInfo = await getTagPageInfo(params.slug, lang);

    if (!tagInfo) {
        return { title: "Tag Not Found | Othmane Outaghza" };
    }

    const { tag } = tagInfo;
    const isFr = lang === "fr";
    const title = isFr ? `Articles ${tag} | Othmane Outaghza` : `${tag} Articles | Othmane Outaghza`;
    const description = isFr
        ? `Articles sur ${tag}, le SEO technique, le référencement IA, le GEO et l'automatisation SEO.`
        : `Read ${tag} articles on technical SEO, AI Search, GEO, and SEO automation.`;

    return {
        title,
        description,
        robots: { index: false, follow: true },
        alternates: getTagAlternates(tagInfo),
        openGraph: {
            title,
            description,
            url: tagInfo.canonicalUrl,
            type: "website",
        },
    };
}

export default async function BlogTagPage({ params, searchParams }: PageProps) {
    const lang = params.lang as Locale;
    const tagInfo = await getTagPageInfo(params.slug, lang);

    if (!tagInfo) {
        notFound();
    }

    if (params.slug !== tagInfo.canonicalSlug) {
        const pageParam = searchParams?.page ? `?page=${encodeURIComponent(searchParams.page)}` : "";
        permanentRedirect(`/${lang}/blog/tag/${tagInfo.canonicalSlug}/${pageParam}`);
    }

    const { tag } = tagInfo;
    const [dict, blogResult] = await Promise.all([
        getDictionary(lang),
        getBlogPosts({ page: Math.max(1, Number(searchParams?.page || 1)), tag, lang }),
    ]);
    const { posts, total, totalPages, page } = blogResult;

    return (
        <DashboardWrapper>
            <SetLanguagePaths
                paths={{
                    en: tagInfo.paths.en ? `/en${tagInfo.paths.en}/` : "/en/blog/",
                    fr: tagInfo.paths.fr ? `/fr${tagInfo.paths.fr}/` : "/fr/blog/",
                }}
            />
            <JsonLd
                data={collectionPageSchema({
                    name: `${tag} Articles`,
                    description: `Articles about ${tag}.`,
                    url: tagInfo.canonicalUrl,
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
                    <Pagination page={page} totalPages={totalPages} basePath={`/${lang}/blog/tag/${tagInfo.canonicalSlug}`} />
                </SectionWrapper>
            </main>
            <Footer dict={dict.footer} lang={lang} />
        </DashboardWrapper>
    );
}
