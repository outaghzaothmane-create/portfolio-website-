"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

export function FAQ() {
    const faqs = [
        {
            question: "What is Generative Engine Optimization?",
            answer: "Generative Engine Optimization (GEO) is the process of optimizing content, structured data, and entity signals to ensure a brand is accurately cited and recommended by AI-driven search engines like ChatGPT, Perplexity, and Gemini."
        },
        {
            question: "How does AI Search Optimization work?",
            answer: "AI Search Optimization works by improving technical crawlability for AI bots, enriching semantic depth, establishing strong entity relationships through structured data, and creating citation-ready content that Large Language Models (LLMs) can easily extract."
        },
        {
            question: "What is LLM Optimization?",
            answer: "LLM Optimization involves structuring website data and content so that Large Language Models can efficiently index, understand, and retrieve the information when generating answers for users in conversational search interfaces."
        },
        {
            question: "How can technical SEO improve AI search visibility?",
            answer: "Technical SEO ensures that AI crawlers can access and parse a website without encountering rendering issues, JavaScript blocks, or slow load times. Proper canonicalization, XML sitemaps, and robots.txt directives are foundational for AI search inclusion."
        },
        {
            question: "What technical SEO issues block AI crawlers?",
            answer: "Common issues include aggressive firewall rules blocking AI user agents (like GPTBot), client-side only rendering without SSR, missing or invalid structured data, infinite crawl spaces, and poorly structured HTML semantic tags."
        },
        {
            question: "How can Make.com automate SEO workflows?",
            answer: "Make.com can connect various APIs (like Google Search Console, OpenAI, and CMS platforms) to automate tasks such as technical SEO monitoring, programmatic content generation, indexing requests, and automated reporting dashboards."
        },
        {
            question: "How can n8n be used for SEO automation?",
            answer: "n8n offers self-hosted, code-friendly workflow automation. It is ideal for complex SEO tasks like scraping competitor data, running automated site crawls, processing natural language for entity extraction, and automatically updating website schema."
        },
        {
            question: "What is AI Citation Engineering?",
            answer: "AI Citation Engineering is the strategy of formatting high-value information—such as original research, statistics, and unique frameworks—into easily extractable structures (like tables and lists) so that AI models use them as direct citations."
        },
        {
            question: "What is programmatic SEO?",
            answer: "Programmatic SEO is the automated creation of large-scale, high-quality landing pages targeting long-tail keywords. It uses structured datasets and dynamic templates to generate helpful content at scale without manual writing."
        },
        {
            question: "How does structured data help AI search engines?",
            answer: "Structured data (JSON-LD schema) provides explicit context about entities, relationships, and content types. It removes ambiguity, helping AI search engines definitively understand who an organization is, what services they offer, and how they connect to other entities."
        },
        {
            question: "How can Shopify SEO improve organic revenue?",
            answer: "Shopify SEO focuses on optimizing product architecture, collection pages, faceted navigation, and technical performance to drive higher-intent organic traffic directly to conversion points, thereby increasing overall store revenue."
        },
        {
            question: "Why should businesses optimize for ChatGPT, Perplexity, Gemini, and Claude?",
            answer: "As user search behavior shifts from traditional links to conversational answers, being cited by AI models builds authority, captures top-of-funnel queries, and ensures your brand remains visible in the next generation of search discovery."
        }
    ];

    return (
        <section
            id="faq"
            className="w-full py-24 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <div className="space-y-12 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-8">
                            {faqs.map((faq, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        {faq.question}
                                    </h3>
                                    <p className={cn(
                                        "text-base leading-relaxed",
                                        "text-muted-foreground"
                                    )}>
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
