"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

export function FAQ() {
    const { isTerminalMode } = useTerminal();

    const faqs = [
        {
            question: "Who is Othmane Outaghza?",
            answer: "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist based in Morocco. He helps businesses improve organic search visibility, technical SEO performance, and AI search presence."
        },
        {
            question: "What services does Othmane Outaghza offer?",
            answer: "He offers technical SEO audits, e-commerce SEO strategy, AI search optimization, structured data implementation, SEO automation, workflow automation, and technical architecture support."
        },
        {
            question: "What industries does Othmane specialize in?",
            answer: "Othmane specializes in e-commerce SEO, medical supply SEO, Shopify SEO, WordPress SEO, local SEO, and automation-driven SEO systems."
        },
        {
            question: "What results has Othmane achieved?",
            answer: "His portfolio highlights $1.3M+ in organic revenue impact, major organic traffic growth, improved keyword rankings, AI citations, and automated SEO workflows."
        },
        {
            question: "Where is Othmane Outaghza based?",
            answer: "Othmane Outaghza is based in Morocco and works with businesses internationally."
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
                                        isTerminalMode ? "text-green-500" : "text-muted-foreground"
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
