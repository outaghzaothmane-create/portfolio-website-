import { MetadataRoute } from "next";
import { siteUrl } from "@/sanity/env";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/en", "/fr", "/en/blog", "/fr/blog"],
            },
            {
                userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"],
                allow: "/",
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    };
}
