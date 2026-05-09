"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

export function About() {
    const { isTerminalMode } = useTerminal();

    return (
        <section
            id="about"
            className="w-full py-24 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper>
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                            About Othmane Outaghza
                        </h2>
                        <p className={cn(
                            "text-lg sm:text-xl leading-relaxed",
                            isTerminalMode ? "text-green-500" : "text-muted-foreground"
                        )}>
                            Othmane Outaghza is a Morocco-based Technical SEO Consultant and AI Automation Specialist. 
                            He helps e-commerce and service businesses improve organic traffic, technical SEO performance, 
                            AI search visibility, and revenue through automation, structured data, and data-driven SEO systems.
                        </p>
                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
