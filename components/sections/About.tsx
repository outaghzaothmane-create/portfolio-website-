"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export function About() {
    const { isTerminalMode } = useTerminal();

    return (
        <section
            id="about"
            className="w-full py-24 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <div className="space-y-12 max-w-4xl mx-auto">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                                About Othmane Outaghza
                            </h2>
                            <p className={cn(
                                "text-lg sm:text-xl leading-relaxed mb-6",
                                isTerminalMode ? "text-green-500" : "text-muted-foreground"
                            )}>
                                Othmane Outaghza is a Morocco-based Technical SEO Consultant and AI Automation Specialist. 
                                He helps businesses improve organic search visibility, technical SEO performance, 
                                AI search discoverability, and revenue through automation, structured data, and data-driven SEO systems.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <Link href="https://www.linkedin.com/in/othmaneoutaghza/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium">
                                    <Linkedin className="w-5 h-5" />
                                    <span>LinkedIn</span>
                                </Link>
                                <Link href="https://github.com/outaghzaothmane-create" target="_blank" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors font-medium">
                                    <Github className="w-5 h-5" />
                                    <span>GitHub</span>
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-foreground">Core Expertise</h3>
                                <ul className={cn(
                                    "space-y-2 list-disc list-inside",
                                    isTerminalMode ? "text-green-500" : "text-muted-foreground"
                                )}>
                                    <li>Technical & eCommerce SEO (Shopify, WordPress)</li>
                                    <li>Generative Engine Optimization (GEO) & AI Search</li>
                                    <li>Advanced Structured Data & Entity SEO</li>
                                    <li>Python, Make.com & n8n SEO Automation</li>
                                    <li>Programmatic SEO Architecture</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-foreground">Methodology</h3>
                                <p className={cn(
                                    "leading-relaxed",
                                    isTerminalMode ? "text-green-500" : "text-muted-foreground"
                                )}>
                                    I employ the <strong>4-Layer AI Search Optimization Framework</strong>: 
                                    ensuring technical crawlability, injecting rich structured semantic data, 
                                    building authoritative entity signals, and structuring citation-ready content for Large Language Models (LLMs).
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-foreground mb-3">Proven Results</h3>
                            <p className={cn(
                                "leading-relaxed mb-4",
                                isTerminalMode ? "text-green-500" : "text-muted-foreground"
                            )}>
                                Successfully driven over $1.3M+ in organic revenue impact for clients globally. 
                                Extensive experience navigating complex JavaScript rendering issues, crawl budget optimization, and executing automated workflows that scale SEO operations seamlessly.
                            </p>
                            <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground font-semibold hover:underline">
                                View Case Studies <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
