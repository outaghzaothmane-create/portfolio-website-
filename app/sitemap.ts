import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://othmane.seo';

    const projectUrls = caseStudies.map((study) => ({
        url: `${baseUrl}/projects/${study.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...projectUrls,
    ];
}
