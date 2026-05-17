import { defaultLanguage, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/sanity/env";

export type LocalizedPathSet = Record<Locale, string>;

export function absoluteUrl(path = "") {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (normalizedPath === "/") {
        return siteUrl;
    }

    const hasFileExtension = /\.[a-z0-9]+$/i.test(normalizedPath);
    const trailingPath = normalizedPath.endsWith("/") || hasFileExtension ? normalizedPath : `${normalizedPath}/`;
    return `${siteUrl}${trailingPath}`;
}

export function localizePath(lang: Locale, path = "") {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return normalizedPath === "/" ? `/${lang}` : `/${lang}${normalizedPath}`;
}

export function localizedUrls(paths: LocalizedPathSet) {
    return {
        en: absoluteUrl(localizePath("en", paths.en)),
        fr: absoluteUrl(localizePath("fr", paths.fr)),
    };
}

export function alternateLanguages(paths: LocalizedPathSet) {
    const urls = localizedUrls(paths);

    return {
        en: urls.en,
        fr: urls.fr,
        "x-default": urls[defaultLanguage],
    };
}

export function alternatesForPath(lang: Locale, paths: LocalizedPathSet) {
    return {
        canonical: absoluteUrl(localizePath(lang, paths[lang])),
        languages: alternateLanguages(paths),
    };
}

export function sameSlugAlternates(lang: Locale, path = "") {
    return alternatesForPath(lang, { en: path, fr: path });
}

export function getTranslatedBlogPaths(slug: string, lang: Locale, translatedSlug?: string): LocalizedPathSet {
    const otherSlug = translatedSlug || slug;

    return {
        en: `/blog/${lang === "en" ? slug : otherSlug}`,
        fr: `/blog/${lang === "fr" ? slug : otherSlug}`,
    };
}
