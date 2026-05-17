import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    title: "Posts",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "language",
            title: "Language",
            type: "string",
            options: {
                list: [
                    { title: "English", value: "en" },
                    { title: "French", value: "fr" }
                ],
                layout: "radio"
            },
            validation: (Rule) => Rule.required(),
            initialValue: "en"
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().max(72).warning("Shorter titles perform better in SERPs and AI snippets."),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Intro summary / answer",
            description: "Use a concise, entity-rich answer. This feeds meta descriptions and AI-search snippets.",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required().max(220),
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "updatedAt",
            title: "Updated at",
            type: "datetime",
        }),
        defineField({
            name: "featured",
            title: "Featured article",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "mainImage",
            title: "Featured image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }],
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: [{ type: "category" }] }],
            validation: (Rule) => Rule.min(1),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "array",
            of: [
                defineArrayMember({ type: "block" }),
                defineArrayMember({
                    type: "image",
                    options: { hotspot: true },
                    fields: [{ name: "alt", title: "Alt text", type: "string" }],
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "faqs",
            title: "FAQs",
            description: "Used for visible FAQ content and FAQ schema when appropriate.",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "relatedPosts",
            title: "Manual related posts",
            type: "array",
            of: [{ type: "reference", to: [{ type: "post" }] }],
        }),
        defineField({
            name: "translatedSlug",
            title: "Translated Slug",
            description: "Slug of the translated version of this post (e.g. for linking EN to FR version).",
            type: "string",
        }),
        defineField({
            name: "translation",
            title: "Translated post reference",
            description: "Optional reference to the equivalent post in the other language.",
            type: "reference",
            to: [{ type: "post" }],
            options: {
                filter: ({ document }) => ({
                    filter: "language != $language",
                    params: { language: document?.language },
                }),
            },
        }),
        defineField({
            name: "translationOf",
            title: "Translation Of",
            type: "reference",
            to: [{ type: "post" }],
            description: "Optional: connect this post to its translated version.",
        }),
        defineField({
            name: "seoTitle",
            title: "SEO title",
            description: "Localized search title for this exact language version.",
            type: "string",
            validation: (Rule) => Rule.max(60).warning("Keep titles under 60 characters."),
        }),
        defineField({
            name: "seoDescription",
            title: "SEO description",
            description: "Localized meta description for this exact language version.",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.max(160).warning("Keep descriptions under 160 characters."),
        }),
        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            description: "Optional. Leave empty to self-canonicalize to the localized blog URL.",
            type: "url",
        }),
        defineField({
            name: "focusKeyword",
            title: "Focus keyword",
            description: "Primary localized SEO target, e.g. technical SEO audit or audit SEO technique.",
            type: "string",
        }),
        defineField({
            name: "cta",
            title: "CTA",
            type: "object",
            fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                defineField({ name: "href", title: "URL", type: "url" }),
                defineField({ name: "label", title: "Button label", type: "string" }),
            ],
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        select: {
            title: "title",
            language: "language",
            publishedAt: "publishedAt",
            media: "mainImage",
        },
        prepare({ title, language, publishedAt, media }) {
            const langLabel = language === "fr" ? "FR" : "EN";
            const dateStr = publishedAt
                ? new Date(publishedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                : "Draft";
            return {
                title,
                subtitle: `${langLabel} — ${dateStr}`,
                media,
            };
        },
    },
});
