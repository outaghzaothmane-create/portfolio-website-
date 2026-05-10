import { getAllBlogPosts, getCategories } from "@/lib/sanity";
import { siteUrl } from "@/sanity/env";

export const revalidate = 3600;

export async function GET() {
    const [posts, categories] = await Promise.all([getAllBlogPosts(), getCategories()]);

    const lines = [
        "# Othmane Outaghza",
        "",
        "Technical SEO Consultant, AI Automation Specialist, and AI Search Optimization / GEO specialist.",
        "",
        "## Primary Pages",
        `${siteUrl}/`,
        `${siteUrl}/technical-seo-consultant/`,
        `${siteUrl}/ai-search-optimization/`,
        `${siteUrl}/generative-engine-optimization/`,
        `${siteUrl}/shopify-seo-consultant/`,
        `${siteUrl}/technical-seo-automation/`,
        `${siteUrl}/blog/`,
        "",
        "## Topical Hubs",
        ...categories.filter((category) => category.slug).map((category) => `${siteUrl}/blog/category/${category.slug}/ - ${category.title}`),
        "",
        "## Recent Articles",
        ...posts.slice(0, 20).map((post) => `${siteUrl}/blog/${post.slug}/ - ${post.title}`),
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
