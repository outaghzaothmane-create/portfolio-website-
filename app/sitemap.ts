import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';
import { getAllBlogPosts, getCategories, getTags, slugifyTag } from '@/lib/sanity';
import { siteUrl } from '@/sanity/env';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteUrl;
    const [posts, categories, tags] = await Promise.all([
        getAllBlogPosts(),
        getCategories(),
        getTags(),
    ]);

    const projectUrls = caseStudies.map((study) => ({
        url: `${baseUrl}/projects/${study.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const servicePages = [
        'ai-search-guide',
        'ai-search-optimization',
        'generative-engine-optimization',
        'llm-optimization',
        'make-com-seo-automation',
        'n8n-seo-automation',
        'shopify-seo-consultant',
        'technical-seo-automation',
        'technical-seo-consultant',
        'technical-seo-consultant-morocco',
        'blog'
    ];

    const serviceUrls = servicePages.map((page) => ({
        url: `${baseUrl}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt ? new Date(post.updatedAt || post.publishedAt || Date.now()) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const categoryUrls = categories
        .filter((category) => category.slug)
        .map((category) => ({
            url: `${baseUrl}/blog/category/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.75,
        }));

    const tagUrls = tags.map((tag) => ({
        url: `${baseUrl}/blog/tag/${slugifyTag(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.55,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...serviceUrls,
        ...projectUrls,
        ...blogUrls,
        ...categoryUrls,
        ...tagUrls,
    ];
}
