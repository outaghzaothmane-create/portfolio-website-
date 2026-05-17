export const supportedLanguages = ['en', 'fr'] as const;
export type Locale = (typeof supportedLanguages)[number];

export const defaultLanguage: Locale = 'en';

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

    const segments = pathname.split('/');
    
    // Remove empty first segment if starts with /
    if (segments[0] === '') segments.shift();

    // If the first segment is an existing language, replace it
    if (isValidLanguage(segments[0])) {
        segments[0] = targetLang;
        return `/${segments.join('/')}`;
    }

    // Otherwise, prepend the language
    return `/${targetLang}/${segments.join('/')}`;
}
