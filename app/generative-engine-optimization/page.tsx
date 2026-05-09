import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Generative Engine Optimization Consultant | Othmane Outaghza",
    description: "Generative Engine Optimization helps brands become discoverable in AI-generated answers through semantic SEO, entity optimization, structured data, and AI citation engineering.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/generative-engine-optimization",
    },
};

export default function GEOPage() {
    return (
        <ServiceTemplate
            title="Generative Engine Optimization"
            description="GEO strategy to ensure your content is heavily weighted and cited by generative AI answers."
            intro="Generative Engine Optimization (GEO) is the evolution of SEO. It's not about ranking ten blue links; it's about being the single synthesized answer. I help brands optimize their digital footprint to dominate AI overviews and generative responses."
            process={[
                { title: "Content Synthesis Preparation", desc: "Auditing existing content to ensure it answers multi-faceted queries directly and concisely, favoring AI extraction." },
                { title: "EEAT Enhancement", desc: "Injecting strong Experience, Expertise, Authoritativeness, and Trustworthiness signals into the content layer and schema." },
                { title: "Information Architecture", desc: "Designing site architecture that allows LLMs to rapidly build context about your core topics and proprietary data." }
            ]}
            benefits={[
                "Dominate Google's AI Overviews",
                "Increase brand visibility in generative UI experiences",
                "Build impenetrable topical authority",
                "Leverage your proprietary data for AI citations"
            ]}
            faqs={[
                { q: "What is Generative Engine Optimization?", a: "Generative Engine Optimization (GEO) is the process of optimizing content, structured data, and entity signals to ensure a brand is accurately cited and recommended by AI-driven search engines like ChatGPT, Perplexity, and Gemini." },
                { q: "How does structured data help AI search engines?", a: "Structured data (JSON-LD schema) provides explicit context about entities, relationships, and content types. It removes ambiguity, helping AI search engines definitively understand who an organization is, what services they offer, and how they connect to other entities." }
            ]}
            relatedLinks={[
                { title: "AI Search Optimization", href: "/ai-search-optimization" },
                { title: "LLM Optimization", href: "/llm-optimization" },
                { title: "Technical SEO Consultant", href: "/technical-seo-consultant" }
            ]}
            url="https://othmaneoutaghza.online/generative-engine-optimization"
        />
    );
}
