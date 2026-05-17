import { getAllBlogPosts, getCategories } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

export const revalidate = 3600;

export async function GET() {
    const [enPosts, frPosts, categories] = await Promise.all([getAllBlogPosts("en"), getAllBlogPosts("fr"), getCategories()]);

    const lines = [
        "# Othmane Outaghza",
        "",
        "Technical SEO Consultant, AI Automation Specialist, and AI Search Optimization / GEO specialist.",
        "",
        "## Primary Pages",
        `${siteUrl}/en/`,
        `${siteUrl}/fr/`,
        `${siteUrl}/en/blog/`,
        `${siteUrl}/fr/blog/`,
        "",
        "## Topical Hubs",
        ...categories.filter((category) => category.slug).flatMap((category) => [
            `${siteUrl}/en/blog/category/${category.slug}/ - ${category.title}`,
            `${siteUrl}/fr/blog/category/${category.slug}/ - ${category.title}`,
        ]),
        "",
        "## Recent Articles",
        ...enPosts.slice(0, 10).map((post) => `${siteUrl}/en/blog/${post.slug}/ - ${post.title}`),
        ...frPosts.slice(0, 10).map((post) => `${siteUrl}/fr/blog/${post.slug}/ - ${post.title}`),
        "",
        "## Entity Topics",
        "Technical SEO",
        "AI Search Optimization",
        "Generative Engine Optimization",
        "LLM Optimization",
        "Shopify SEO",
        "Local SEO",
        "Programmatic SEO",
        "Structured Data",
        "Crawlability",
        "Indexing",
        "AI Citation Engineering",
    ];

    return new Response(lines.join("\n"), {
        headers: {
            "content-type": "text/plain; charset=utf-8",
        },
    });
}
