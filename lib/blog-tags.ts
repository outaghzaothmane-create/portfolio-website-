export type BlogTagLocale = "en" | "fr";

export type BlogTagSlugSet = Record<BlogTagLocale, string>;

const blogTagSlugPairs: BlogTagSlugSet[] = [
    { en: "seo-e-commerce-morocco", fr: "seo-e-commerce-maroc" },
    { en: "ecommerce-seo-morocco", fr: "r-f-rencement-e-commerce-maroc" },
    { en: "product-page-seo", fr: "optimisation-fiche-produit-maroc" },
    { en: "shopify-seo-morocco", fr: "seo-shopify-maroc" },
    { en: "woocommerce-seo-morocco", fr: "seo-woocommerce-maroc" },
    { en: "ai-search-optimization-morocco", fr: "r-f-rencement-ia-maroc" },
    { en: "chatgpt-seo-morocco", fr: "chatgpt-seo-maroc" },
    { en: "geo-morocco", fr: "geo-maroc" },
];

const blogTagSlugTranslations = blogTagSlugPairs.reduce<Record<string, BlogTagSlugSet>>((translations, pair) => {
    translations[pair.en] = pair;
    translations[pair.fr] = pair;
    return translations;
}, {});

export function getBlogTagSlugSet(slug: string): BlogTagSlugSet {
    return blogTagSlugTranslations[slug] || { en: slug, fr: slug };
}

export function getLocalizedBlogTagSlug(slug: string, targetLang: BlogTagLocale) {
    return getBlogTagSlugSet(slug)[targetLang];
}

export function getBlogTagPathSet(slug: string) {
    const slugs = getBlogTagSlugSet(slug);

    return {
        en: `/blog/tag/${slugs.en}`,
        fr: `/blog/tag/${slugs.fr}`,
    };
}
