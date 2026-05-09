import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Search Optimization Consultant | Othmane Outaghza",
    description: "Improve visibility in ChatGPT, Perplexity, Gemini, Claude, and Google AI search with AI Search Optimization, GEO, structured data, entity SEO, and citation-ready content.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/ai-search-optimization",
    },
};

export default function AISearchOptimizationPage() {
    return (
        <ServiceTemplate
            title="AI Search Optimization Consultant"
            description="Optimize your brand's presence in LLMs and AI-driven search engines through entity SEO, technical crawlability, and citation engineering."
            intro="The future of search is conversational and semantic. AI Search Optimization ensures your brand isn't just found, but explicitly recommended and accurately represented by AI models like ChatGPT, Perplexity, Gemini, and Claude. I bridge the complex gap between traditional technical SEO and advanced AI retrieval systems, ensuring your brand serves as the definitive entity in your niche."
            process={[
                { title: "AI Crawlability & llms.txt", desc: "Ensuring AI agents (GPTBot, ClaudeBot, PerplexityBot) can efficiently crawl and parse your site's content, implementing specialized llms.txt endpoints for clean data ingestion." },
                { title: "Semantic Entity Building", desc: "Using advanced JSON-LD structured data (Person, Organization, ProfessionalService) to clearly define your brand, services, and relationships, so AI models understand you as an authoritative entity." },
                { title: "Citation Engineering", desc: "Structuring content with unique frameworks, markdown tables, and concise answer blocks (EEAT optimized) that LLMs naturally prefer to use as citations." },
                { title: "Knowledge Graph Integration", desc: "Connecting your brand to external authority hubs (Wikidata, Google Knowledge Graph) to reinforce trust and entity recognition across all generative engines." }
            ]}
            benefits={[
                "Capture high-intent traffic from AI search engines (Perplexity, ChatGPT Search)",
                "Become the definitive cited source for complex industry questions",
                "Future-proof your organic strategy against traditional SERP volatility",
                "Enhance traditional Google SEO simultaneously through better semantic structure",
                "Control the brand narrative and accuracy within Large Language Models"
            ]}
            faqs={[
                { q: "How does AI Search Optimization work?", a: "AI Search Optimization works by improving technical crawlability specifically for AI bots, enriching semantic depth, establishing strong entity relationships through structured data, and creating citation-ready content that Large Language Models (LLMs) can easily extract and trust." },
                { q: "Why should businesses optimize for ChatGPT, Perplexity, Gemini, and Claude?", a: "As user search behavior shifts from traditional blue links to conversational answers, being cited by AI models builds authority, captures top-of-funnel queries, and ensures your brand remains visible in the next generation of search discovery. If an AI doesn't know you, it can't recommend you." },
                { q: "Is AI Search Optimization different from SEO?", a: "Yes and no. It builds upon foundational technical SEO but shifts the focus from keyword density and backlinks to semantic understanding, entity relationships, and formatting content specifically for machine ingestion (RAG - Retrieval-Augmented Generation)." }
            ]}
            relatedLinks={[
                { title: "Generative Engine Optimization", href: "/generative-engine-optimization" },
                { title: "LLM Optimization", href: "/llm-optimization" },
                { title: "AI Search Guide", href: "/ai-search-guide" }
            ]}
            url="https://othmaneoutaghza.online/ai-search-optimization"
        />
    );
}
