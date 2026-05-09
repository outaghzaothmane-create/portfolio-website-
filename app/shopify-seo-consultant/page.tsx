import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopify SEO Consultant | Technical SEO for eCommerce Growth",
    description: "Shopify SEO consultant helping eCommerce brands improve organic visibility, product indexing, structured data, collections, and revenue-focused technical SEO.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/shopify-seo-consultant",
    },
};

export default function ShopifySEOConsultantPage() {
    return (
        <ServiceTemplate
            title="Shopify SEO Consultant"
            description="Specialized Shopify SEO consulting to resolve faceted navigation issues, optimize collections, and scale eCommerce revenue."
            intro="Shopify is a powerful eCommerce platform, but out-of-the-box it comes with technical SEO flaws. As a Shopify SEO Consultant, I fix faceted navigation bloat, optimize collection hierarchies, and implement robust Product schema to drive high-converting organic traffic."
            process={[
                { title: "Crawl & Facet Control", desc: "Fixing Shopify's inherent duplicate content issues by controlling how search engines crawl your product tags and filters." },
                { title: "Collection Optimization", desc: "Structuring collection pages with proper hierarchy, internal linking, and semantic depth to capture category-level intent." },
                { title: "Advanced Product Schema", desc: "Deploying comprehensive JSON-LD product schemas including reviews, pricing, and availability to secure rich snippets." }
            ]}
            benefits={[
                "Solve Shopify URL parameter and duplicate content issues",
                "Increase average order value via targeted organic traffic",
                "Automate out-of-stock product handling",
                "Dominate product image search with optimized assets",
                "Enhance rich results with advanced schema markup"
            ]}
            faqs={[
                { q: "How can Shopify SEO improve organic revenue?", a: "Shopify SEO focuses on optimizing product architecture, collection pages, faceted navigation, and technical performance to drive higher-intent organic traffic directly to conversion points." },
                { q: "How do you fix Shopify duplicate content?", a: "I optimize the theme's liquid code to canonicalize correctly, block parameter URLs via robots.txt, and restructure collection/product paths." }
            ]}
            relatedLinks={[
                { title: "Technical SEO Consultant", href: "/technical-seo-consultant" },
                { title: "Technical SEO Automation", href: "/technical-seo-automation" }
            ]}
            url="https://othmaneoutaghza.online/shopify-seo-consultant"
        />
    );
}
