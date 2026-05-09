import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LLM Optimization Consultant | Othmane Outaghza",
    description: "LLM Optimization involves structuring website data and content so that Large Language Models can efficiently index, understand, and retrieve your information.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/llm-optimization",
    },
};

export default function LLMOptimizationPage() {
    return (
        <ServiceTemplate
            title="LLM Optimization"
            description="Optimize your data structures and content formats to be easily ingested and retrieved by Large Language Models."
            intro="Large Language Models (LLMs) parse information differently than traditional search engines. They require extreme clarity, explicit entity relationships, and logically structured data. My LLM Optimization services ensure your content is ready for retrieval-augmented generation (RAG) and conversational AI."
            process={[
                { title: "Data Structuring", desc: "Converting unstructured text into structured formats like JSON-LD, Markdown, and clean HTML tables that LLMs prefer." },
                { title: "Contextual Clarity", desc: "Rewriting ambiguous content into clear, definitive statements that models can easily map to their neural networks." },
                { title: "API & Feed Availability", desc: "Setting up clean RSS feeds, JSON endpoints, and `llms.txt` files to feed directly into model crawlers." }
            ]}
            benefits={[
                "Become a primary source for LLM training and retrieval",
                "Enhance brand representation in ChatGPT and Claude",
                "Reduce AI hallucinations regarding your brand",
                "Capitalize on zero-click search behaviors"
            ]}
            faqs={[
                { q: "What is LLM Optimization?", a: "LLM Optimization involves structuring website data and content so that Large Language Models can efficiently index, understand, and retrieve the information when generating answers for users in conversational search interfaces." },
                { q: "What is AI Citation Engineering?", a: "AI Citation Engineering is the strategy of formatting high-value information—such as original research, statistics, and unique frameworks—into easily extractable structures (like tables and lists) so that AI models use them as direct citations." }
            ]}
            relatedLinks={[
                { title: "AI Search Optimization", href: "/ai-search-optimization" },
                { title: "Generative Engine Optimization", href: "/generative-engine-optimization" }
            ]}
            url="https://othmaneoutaghza.online/llm-optimization"
        />
    );
}
