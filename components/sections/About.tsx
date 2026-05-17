"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export function About({ dict }: { dict?: any }) {
    const safeDict = dict || {
        title: "About Othmane Outaghza",
        description1: "Othmane Outaghza is a Morocco-based Technical SEO Consultant and AI Automation Specialist. He helps businesses improve organic search visibility, technical SEO performance, AI search discoverability, and revenue through automation, structured data, and data-driven SEO systems.",
        linkedin: "LinkedIn",
        github: "GitHub",
        expertiseTitle: "Core Expertise",
        expertise: [
            "Technical & eCommerce SEO (Shopify, WordPress)",
            "Generative Engine Optimization (GEO) & AI Search",
            "Advanced Structured Data & Entity SEO",
            "Python, Make.com & n8n SEO Automation",
            "Programmatic SEO Architecture"
        ],
        methodologyTitle: "Methodology",
        methodology: "I employ the 4-Layer AI Search Optimization Framework: ensuring technical crawlability, injecting rich structured semantic data, building authoritative entity signals, and structuring citation-ready content for Large Language Models (LLMs).",
        resultsTitle: "Proven Results",
        results: "Successfully driven over $1.3M+ in organic revenue impact for clients globally. Extensive experience navigating complex JavaScript rendering issues, crawl budget optimization, and executing automated workflows that scale SEO operations seamlessly.",
        viewCaseStudies: "View Case Studies"
    };

    return (
        <section
            id="about"
            className="w-full py-16 md:py-24 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <div className="space-y-10 md:space-y-12 max-w-4xl mx-auto">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 md:mb-6">
                                {safeDict.title}
                            </h2>
                            <p className={cn(
                                "text-base sm:text-lg md:text-xl leading-relaxed mb-6",
                                "text-muted-foreground"
                            )}>
                                {safeDict.description1}
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8">
                                <Link href="https://www.linkedin.com/in/othmaneoutaghza/" target="_blank" className="flex min-h-11 items-center justify-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium">
                                    <Linkedin className="w-5 h-5" />
                                    <span>{safeDict.linkedin}</span>
                                </Link>
                                <Link href="https://github.com/outaghzaothmane-create" target="_blank" className="flex min-h-11 items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors font-medium">
                                    <Github className="w-5 h-5" />
                                    <span>{safeDict.github}</span>
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{safeDict.expertiseTitle}</h3>
                                <ul className={cn(
                                    "space-y-2 list-disc list-outside pl-5",
                                    "text-muted-foreground"
                                )}>
                                    {safeDict.expertise.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{safeDict.methodologyTitle}</h3>
                                <p className={cn(
                                    "leading-relaxed",
                                    "text-muted-foreground"
                                )}>
                                    {safeDict.methodology}
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-foreground mb-3">{safeDict.resultsTitle}</h3>
                            <p className={cn(
                                "leading-relaxed mb-4",
                                "text-muted-foreground"
                            )}>
                                {safeDict.results}
                            </p>
                            <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-foreground font-semibold hover:underline">
                                {safeDict.viewCaseStudies} <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
