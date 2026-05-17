import { siteUrl } from "@/sanity/env";
import type { BlogPost } from "@/lib/sanity";
import type { Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo/i18n";

export function personSchema(lang: Locale = "en", post?: BlogPost) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: post?.author?.name || "Othmane Outaghza",
        jobTitle: post?.author?.role || (lang === "fr" ? "Consultant SEO Technique" : "Technical SEO Consultant"),
        url: siteUrl,
        sameAs: post?.author?.sameAs || [],
    };
}

export function websiteSchema(lang: Locale = "en") {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website-${lang}`,
        name: "Othmane Outaghza",
        url: siteUrl,
        inLanguage: lang,
    };
}

export function articleSchema(post: BlogPost, lang: Locale = "en") {
    const url = absoluteUrl(`/${lang}/blog/${post.slug}`);

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.seo?.seoDescription || post.seo?.metaDescription || post.excerpt,
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
        inLanguage: lang,
        articleSection: post.categories?.map((category) => category.title).filter(Boolean),
        keywords: [post.focusKeyword, post.seo?.focusKeyword, ...(post.tags || [])].filter(Boolean),
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
    lang = "en",
}: {
    name: string;
    description: string;
    url: string;
    lang?: Locale;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
        inLanguage: lang,
        isPartOf: {
            "@type": "WebSite",
            name: "Othmane Outaghza",
            url: siteUrl,
        },
    };
}
