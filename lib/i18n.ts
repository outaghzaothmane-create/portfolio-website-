export const supportedLanguages = ['en', 'fr'] as const;
export type Locale = (typeof supportedLanguages)[number];

export const defaultLanguage: Locale = 'en';

const translatedBlogSlugs: Record<string, Record<Locale, string>> = {
    "seo-ecommerce-morocco-ai-search-product-pages": {
        en: "seo-ecommerce-morocco-ai-search-product-pages",
        fr: "seo-ecommerce-maroc",
    },
    "seo-ecommerce-maroc": {
        en: "seo-ecommerce-morocco-ai-search-product-pages",
        fr: "seo-ecommerce-maroc",
    },
};

export function isValidLanguage(lang: string): lang is Locale {
    return supportedLanguages.includes(lang as Locale);
}

const dictionaries = {
    en: () => import('@/messages/en.json').then((module) => module.default),
    fr: () => import('@/messages/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};

export function getLocalizedPath(pathname: string, targetLang: Locale) {
    if (!pathname) return `/${targetLang}`;

    const hasTrailingSlash = pathname.endsWith("/") && pathname !== "/";
    const segments = pathname.split("/").filter(Boolean);

    if (isValidLanguage(segments[0])) {
        segments[0] = targetLang;
    } else {
        segments.unshift(targetLang);
    }

    if (segments[1] === "blog" && segments[2] && translatedBlogSlugs[segments[2]]) {
        segments[2] = translatedBlogSlugs[segments[2]][targetLang];
    }

    const localizedPath = `/${segments.join("/")}`;
    return hasTrailingSlash ? `${localizedPath}/` : localizedPath;
}
