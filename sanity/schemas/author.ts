import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Authors",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            initialValue: "Technical SEO Consultant & AI Search Specialist",
        }),
        defineField({
            name: "image",
            title: "Headshot",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", title: "Alt text", type: "string" }],
        }),
        defineField({
            name: "bio",
            title: "Bio",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "sameAs",
            title: "SameAs links",
            type: "array",
            of: [{ type: "url" }],
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "image",
        },
    },
});
