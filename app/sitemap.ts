import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';
import { getAllBlogPosts, getCategories, getTags, slugifyTag } from '@/lib/sanity';
import { supportedLanguages } from '@/lib/i18n';
import { absoluteUrl, alternateLanguages } from '@/lib/seo/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const categories = await getCategories();

    let sitemapUrls: MetadataRoute.Sitemap = [];

    for (const lang of supportedLanguages) {
        const posts = await getAllBlogPosts(lang);
        const tags = await getTags(lang);

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
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
            alternates: {
                languages: alternateLanguages({ en: `/projects/${study.id}`, fr: `/projects/${study.id}` }),
            },
        }));
        sitemapUrls.push(...projectUrls);

        const servicePages = [
            'blog'
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

        const blogUrls = posts.map((post) => ({
            url: absoluteUrl(`/${lang}/blog/${post.slug}`),
            lastModified: post.updatedAt || post.publishedAt ? new Date(post.updatedAt || post.publishedAt || Date.now()) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
            alternates: {
                languages: alternateLanguages({
                    en: `/blog/${lang === 'en' ? post.slug : post.translatedSlug || post.slug}`,
                    fr: `/blog/${lang === 'fr' ? post.slug : post.translatedSlug || post.slug}`,
                }),
            },
        }));
        sitemapUrls.push(...blogUrls);

        const categoryUrls = categories
            .filter((category) => category.slug)
            .map((category) => ({
                url: absoluteUrl(`/${lang}/blog/category/${category.slug}`),
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.75,
                alternates: {
                    languages: alternateLanguages({ en: `/blog/category/${category.slug}`, fr: `/blog/category/${category.slug}` }),
                },
            }));
        sitemapUrls.push(...categoryUrls);

        const tagUrls = tags.map((tag) => ({
            url: absoluteUrl(`/${lang}/blog/tag/${slugifyTag(tag)}`),
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.55,
            alternates: {
                languages: alternateLanguages({ en: `/blog/tag/${slugifyTag(tag)}`, fr: `/blog/tag/${slugifyTag(tag)}` }),
            },
        }));
        sitemapUrls.push(...tagUrls);
    }

    return sitemapUrls;
}
