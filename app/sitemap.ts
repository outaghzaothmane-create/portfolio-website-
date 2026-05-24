import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';
import { getAllBlogPosts } from '@/lib/sanity';
import { supportedLanguages } from '@/lib/i18n';
import { absoluteUrl, alternateLanguages } from '@/lib/seo/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let sitemapUrls: MetadataRoute.Sitemap = [];

    for (const lang of supportedLanguages) {
        const posts = await getAllBlogPosts(lang);

        sitemapUrls.push({
            url: absoluteUrl(`/${lang}`),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: alternateLanguages({ en: '', fr: '' }),
            },
        });

        const projectUrls = caseStudies.map((study) => ({
            url: absoluteUrl(`/${lang}/projects/${study.id}`),
            lastModified: new Date("2026-05-22T00:00:00.000Z"),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
            alternates: {
                languages: alternateLanguages({ en: `/projects/${study.id}`, fr: `/projects/${study.id}` }),
            },
        }));
        sitemapUrls.push(...projectUrls);

        const servicePages = [
            'blog',
            'projects'
        ];

        const serviceUrls = servicePages.map((page) => ({
            url: absoluteUrl(`/${lang}/${page}`),
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
            alternates: {
                languages: alternateLanguages({ en: `/${page}`, fr: `/${page}` }),
            },
        }));
        sitemapUrls.push(...serviceUrls);

        const blogUrls = posts.map((post) => {
            const hasTranslation = Boolean(post.translatedSlug);
            const postDate = post.updatedAt || post.publishedAt;
            return {
                url: absoluteUrl(`/${lang}/blog/${post.slug}`),
                lastModified: postDate ? new Date(postDate) : new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
                ...(hasTranslation ? {
                    alternates: {
                        languages: alternateLanguages({
                            en: `/blog/${lang === 'en' ? post.slug : post.translatedSlug}`,
                            fr: `/blog/${lang === 'fr' ? post.slug : post.translatedSlug}`,
                        }),
                    },
                } : {}),
            };
        });
        sitemapUrls.push(...blogUrls);
    }

    return sitemapUrls;
}
