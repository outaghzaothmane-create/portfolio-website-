import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const category = defineType({
    name: "category",
    title: "Categories",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "priorityTopic",
            title: "Priority topical authority cluster",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
});
