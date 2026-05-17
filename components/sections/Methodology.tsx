"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";
import { Search, Bot, Database, Workflow } from "lucide-react";

export function Methodology({ dict }: { dict?: any }) {
    const safeDict = dict || {
        title: "SEO + AI Search Methodology",
        subtitle: "Bridging the gap between traditional search algorithms and the new era of Generative Engine Optimization (GEO).",
        items: [
            {
                title: "How I Approach Technical SEO",
                content: "Technical SEO is the foundation of digital visibility. I approach it as an engineering problem—optimizing crawlability, resolving JavaScript rendering issues, improving Core Web Vitals, and ensuring search engines can efficiently index your highest-value pages without wasting crawl budget."
            },
            {
                title: "My AI Search Optimization Process",
                content: "To rank in AI systems like ChatGPT, Perplexity, and Gemini, traditional SEO is not enough. My process focuses on entity SEO, semantic depth, and AI citation engineering. I structure your content so Large Language Models (LLMs) can easily extract and cite your brand as the authoritative answer."
            },
            {
                title: "Data & Entity Architecture",
                content: "I implement advanced JSON-LD structured data (Schema markup) to explicitly define your organization's entities, relationships, and expertise. This removes ambiguity for both Google and AI retrieval systems, directly influencing your Knowledge Graph presence."
            },
            {
                title: "Technical SEO Automation Workflow",
                content: "Using tools like Python, Make.com, and n8n, I build automated SEO systems. From programmatic SEO generation to real-time indexing APIs and automated technical audits, I design workflows that scale your organic reach without proportional manual effort."
            }
        ]
    };

    const icons = [Search, Bot, Database, Workflow];

    return (
        <section
            id="methodology"
            className="w-full py-16 md:py-24 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <div className="space-y-10 md:space-y-12">
                        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                                {safeDict.title}
                            </h2>
                            <p className={cn(
                                "text-base sm:text-lg",
                                "text-muted-foreground"
                            )}>
                                {safeDict.subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {safeDict.items.map((section: any, index: number) => {
                                const Icon = icons[index];
                                return (
                                <div key={index} className="flex min-w-0 flex-col space-y-4">
                                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                        <div className={cn(
                                            "p-2.5 sm:p-3 rounded-lg inline-flex items-center justify-center shrink-0",
                                            "bg-primary/10 text-primary"
                                        )}>
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                                            {section.title}
                                        </h3>
                                    </div>
                                    <p className={cn(
                                        "text-sm sm:text-base leading-relaxed sm:pl-16",
                                        "text-muted-foreground"
                                    )}>
                                        {section.content}
                                    </p>
                                </div>
                            )})}
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
