import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Search Guide & Methodology | Othmane Outaghza",
    description: "Learn the fundamentals of Generative Engine Optimization, LLM retrieval, and AI citation engineering to future-proof your digital presence.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/ai-search-guide",
    },
};

export default function AISearchGuidePage() {
    return (
        <ServiceTemplate
            title="The Comprehensive AI Search Guide"
            description="A technical guide to mastering AI search optimization, GEO, and citation engineering."
            intro="As generative AI transforms how users find information, traditional SEO strategies are losing ground. This guide outlines the core methodologies required to optimize for AI engines. At the center is my proprietary 4-Layer AI Search Optimization Framework."
            process={[
                { title: "Layer 1: Technical Crawlability", desc: "Ensuring that AI bots (like GPTBot) can access, render, and understand your website's architecture without encountering blocks." },
                { title: "Layer 2: Structured Semantic Data", desc: "Implementing extensive JSON-LD schema to explicitly define your entities, expertise, and relationships to the knowledge graph." },
                { title: "Layer 3: Entity Authority", desc: "Building off-page signals, digital PR, and mentions that train the LLMs that you are the authoritative source in your niche." },
                { title: "Layer 4: AI Citation Readiness", desc: "Structuring on-page content with clear headings, data tables, and concise summaries that models prefer to extract as direct answers." }
            ]}
            benefits={[
                "Understand the paradigm shift from Search to Synthesis",
                "Learn how to structure data for LLMs",
                "Prepare your brand for ChatGPT Search and Google AI Overviews"
            ]}
            faqs={[
                { q: "What technical SEO issues block AI crawlers?", a: "Common issues include aggressive firewall rules blocking AI user agents (like GPTBot), client-side only rendering without SSR, missing or invalid structured data, infinite crawl spaces, and poorly structured HTML semantic tags." },
                { q: "What is Generative Engine Optimization?", a: "Generative Engine Optimization (GEO) is the process of optimizing content, structured data, and entity signals to ensure a brand is accurately cited and recommended by AI-driven search engines like ChatGPT, Perplexity, and Gemini." }
            ]}
            relatedLinks={[
                { title: "AI Search Optimization", href: "/ai-search-optimization" },
                { title: "Generative Engine Optimization", href: "/generative-engine-optimization" },
                { title: "Resources Hub", href: "/resources" }
            ]}
            url="https://othmaneoutaghza.online/ai-search-guide"
        />
    );
}
