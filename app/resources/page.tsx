import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SEO & AI Search Resources | Othmane Outaghza",
    description: "Insights, guides, and workflows on Technical SEO, Generative Engine Optimization (GEO), and SEO Automation.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/resources",
    },
};

const articles = [
    {
        category: "Technical SEO",
        links: [
            { title: "JavaScript SEO for AI search", slug: "javascript-seo-for-ai-search" },
            { title: "Crawl budget optimization", slug: "crawl-budget-optimization" },
            { title: "Schema markup for consultants", slug: "schema-markup-for-consultants" },
            { title: "Core Web Vitals and SEO", slug: "core-web-vitals-and-seo" },
            { title: "Indexing issues and how to fix them", slug: "indexing-issues-and-how-to-fix-them" },
            { title: "Robots.txt and sitemap optimization", slug: "robots-txt-and-sitemap-optimization" },
            { title: "Technical SEO audit checklist", slug: "technical-seo-audit-checklist" },
        ]
    },
    {
        category: "GEO / AI Search",
        links: [
            { title: "What is Generative Engine Optimization?", slug: "what-is-generative-engine-optimization" },
            { title: "How to optimize for ChatGPT search", slug: "how-to-optimize-for-chatgpt-search" },
            { title: "How to optimize for Perplexity", slug: "how-to-optimize-for-perplexity" },
            { title: "AI citation engineering", slug: "ai-citation-engineering" },
            { title: "LLM indexing explained", slug: "llm-indexing-explained" },
            { title: "AI Search Optimization vs SEO", slug: "ai-search-optimization-vs-seo" },
            { title: "How structured data helps AI search", slug: "how-structured-data-helps-ai-search" },
        ]
    },
    {
        category: "Automation",
        links: [
            { title: "Make.com SEO automation workflows", slug: "make-com-seo-automation-workflows" },
            { title: "n8n SEO automation workflows", slug: "n8n-seo-automation-workflows" },
            { title: "Programmatic SEO workflows", slug: "programmatic-seo-workflows" },
            { title: "SEO reporting automation", slug: "seo-reporting-automation" },
            { title: "AI agents for SEO", slug: "ai-agents-for-seo" },
            { title: "Automated internal linking workflows", slug: "automated-internal-linking-workflows" },
            { title: "Automated schema generation workflows", slug: "automated-schema-generation-workflows" },
        ]
    }
];

export default function ResourcesPage() {
    return (
        <DashboardWrapper>
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <SectionWrapper>
                    <div className="max-w-4xl mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            SEO & AI Search Resources
                        </h1>
                        <p className="text-xl leading-relaxed text-muted-foreground">
                            Explore deep-dive technical guides, automation workflows, and strategies for dominating traditional search and the new era of Generative Engine Optimization (GEO).
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {articles.map((cluster, idx) => (
                            <div key={idx} className="space-y-6">
                                <h2 className="text-2xl font-bold border-b border-border pb-4">{cluster.category}</h2>
                                <ul className="space-y-4">
                                    {cluster.links.map((link, lidx) => (
                                        <li key={lidx}>
                                            <Link 
                                                href={`/resources/${link.slug}`}
                                                className="text-foreground hover:text-primary hover:underline transition-colors block"
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            </div>
            <Footer />
        </DashboardWrapper>
    );
}
