import { defineField, defineType } from "sanity";

export const seo = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta title",
            type: "string",
            validation: (Rule) => Rule.max(60).warning("Keep titles under 60 characters."),
        }),
        defineField({
            name: "seoTitle",
            title: "SEO title",
            type: "string",
            validation: (Rule) => Rule.max(60).warning("Keep titles under 60 characters."),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.max(160).warning("Keep descriptions under 160 characters."),
        }),
        defineField({
            name: "seoDescription",
            title: "SEO description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.max(160).warning("Keep descriptions under 160 characters."),
        }),
        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
        }),
        defineField({
            name: "noIndex",
            title: "No index",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "focusKeyword",
            title: "Focus keyword",
            type: "string",
        }),
        defineField({
            name: "ogImage",
            title: "Social image",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),
    ],
});
