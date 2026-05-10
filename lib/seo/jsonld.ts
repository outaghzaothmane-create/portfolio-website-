import { siteUrl } from "@/sanity/env";
import type { BlogPost } from "@/lib/sanity";

export function personSchema(post?: BlogPost) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: post?.author?.name || "Othmane Outaghza",
        jobTitle: post?.author?.role || "Technical SEO Consultant & AI Search Specialist",
        url: siteUrl,
        sameAs: post?.author?.sameAs || [],
    };
}

export function articleSchema(post: BlogPost) {
    const url = `${siteUrl}/blog/${post.slug}`;

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.mainImage?.url,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
            "@id": `${siteUrl}/#person`,
        },
        publisher: {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: "Othmane Outaghza SEO Consulting",
            url: siteUrl,
        },
        mainEntityOfPage: url,
        articleSection: post.categories?.map((category) => category.title).filter(Boolean),
        keywords: post.tags,
    };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function faqSchema(post: BlogPost) {
    if (!post.faqs?.length) {
        return null;
    }

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function collectionPageSchema({
    name,
    description,
    url,
}: {
    name: string;
    description: string;
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
        isPartOf: {
            "@type": "WebSite",
            name: "Othmane Outaghza",
            url: siteUrl,
        },
    };
}
