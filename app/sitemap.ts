import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://othmaneoutaghza.online';

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
        'resources'
    ];

    const serviceUrls = servicePages.map((page) => ({
        url: `${baseUrl}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
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
    ];
}
