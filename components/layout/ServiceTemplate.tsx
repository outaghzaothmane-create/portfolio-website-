"use client";;
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ServiceTemplateProps {
    title: string;
    description: string;
    intro: string;
    process: { title: string; desc: string }[];
    benefits: string[];
    faqs: { q: string; a: string }[];
    relatedLinks: { title: string; href: string }[];
    url: string;
}

export function ServiceTemplate({
    title,
    description,
    intro,
    process,
    benefits,
    faqs,
    relatedLinks,
    url,
}: ServiceTemplateProps) {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://othmaneoutaghza.online"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": title,
                "item": url
            }
        ]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": title,
        "description": description,
        "provider": {
            "@type": "Person",
            "name": "Othmane Outaghza"
        },
        "areaServed": "Worldwide"
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <DashboardWrapper>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="pt-32 pb-16 responsive-container">
                <SectionWrapper>
                    {/* Hero Section */}
                    <div className="max-w-4xl mb-16">
                        <h1 className="mb-6 text-[clamp(2rem,6vw,3.75rem)] font-bold leading-tight text-foreground">
                            {title}
                        </h1>
                        <p className={cn(
                            "text-xl leading-relaxed",
                            "text-muted-foreground"
                        )}>
                            {intro}
                        </p>
                    </div>

                    {/* Process Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-foreground mb-8">Our Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {process.map((step, idx) => (
                                <div key={idx} className="p-6 rounded-xl border border-border bg-card/50">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4",
                                        "bg-primary/10 text-primary"
                                    )}>
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className={"text-muted-foreground"}>
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-foreground mb-8">Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                                    <CheckCircle2 className={cn("w-6 h-6 shrink-0", "text-primary")} />
                                    <span className={"text-foreground"}>
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-border pb-6">
                                    <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                                    <p className={"text-muted-foreground"}>
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Links */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Explore More</h2>
                        <div className="flex flex-wrap gap-4">
                            {relatedLinks.map((link, idx) => (
                                <Link 
                                    key={idx} 
                                    href={link.href}
                                    className="inline-flex min-h-11 max-w-full items-center rounded-full border border-border px-4 py-2 transition-colors hover:bg-accent"
                                >
                                    <span className="min-w-0 break-words">{link.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={cn(
                        "p-8 md:p-12 rounded-2xl text-center",
                        "bg-primary/5 border border-primary/10"
                    )}>
                        <h2 className="text-3xl font-bold mb-4">Ready to accelerate your growth?</h2>
                        <p className={cn("text-lg mb-8 max-w-2xl mx-auto", "text-muted-foreground")}>
                            Let&apos;s discuss how we can implement advanced SEO and automation strategies for your business.
                        </p>
                        <Link 
                            href="https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Fractional+Head+of+SEO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-medium transition-transform hover:scale-105 sm:px-8 sm:py-4",
                                "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                        >
                            <span className="min-w-0 break-words">Get in Touch</span>
                            <ArrowRight className="h-5 w-5 shrink-0" />
                        </Link>
                    </div>

                </SectionWrapper>
            </div>
            <Footer />
        </DashboardWrapper>
    );
}
