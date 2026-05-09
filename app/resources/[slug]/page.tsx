import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const formattedTitle = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
        title: `${formattedTitle} | Othmane Outaghza`,
        description: `Read the comprehensive guide on ${formattedTitle}. Learn technical SEO, AI search optimization, and automation workflows.`,
        alternates: {
            canonical: `https://othmaneoutaghza.online/resources/${params.slug}`,
        },
    };
}

export async function generateStaticParams() {
    return [
        { slug: "javascript-seo-for-ai-search" },
        { slug: "crawl-budget-optimization" },
        { slug: "schema-markup-for-consultants" },
        { slug: "core-web-vitals-and-seo" },
        { slug: "indexing-issues-and-how-to-fix-them" },
        { slug: "robots-txt-and-sitemap-optimization" },
        { slug: "technical-seo-audit-checklist" },
        { slug: "what-is-generative-engine-optimization" },
        { slug: "how-to-optimize-for-chatgpt-search" },
        { slug: "how-to-optimize-for-perplexity" },
        { slug: "ai-citation-engineering" },
        { slug: "llm-indexing-explained" },
        { slug: "ai-search-optimization-vs-seo" },
        { slug: "how-structured-data-helps-ai-search" },
        { slug: "make-com-seo-automation-workflows" },
        { slug: "n8n-seo-automation-workflows" },
        { slug: "programmatic-seo-workflows" },
        { slug: "seo-reporting-automation" },
        { slug: "ai-agents-for-seo" },
        { slug: "automated-internal-linking-workflows" },
        { slug: "automated-schema-generation-workflows" }
    ];
}

export default function ArticleTemplate({ params }: { params: { slug: string } }) {
    const formattedTitle = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": formattedTitle,
        "author": {
            "@type": "Person",
            "name": "Othmane Outaghza",
            "url": "https://othmaneoutaghza.online"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Othmane Outaghza SEO Consulting"
        },
        "datePublished": new Date().toISOString().split('T')[0],
        "description": `Comprehensive guide on ${formattedTitle}.`
    };

    return (
        <DashboardWrapper>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
                <SectionWrapper>
                    {/* Header */}
                    <div className="mb-12 border-b border-border pb-8">
                        <div className="text-sm text-primary mb-4 font-mono">/resources/{params.slug}</div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                            {formattedTitle}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By Othmane Outaghza</span>
                            <span>•</span>
                            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Article Content Area */}
                    <article className="prose prose-invert lg:prose-lg max-w-none text-muted-foreground space-y-8">
                        <p className="lead text-xl text-foreground font-medium">
                            This is a placeholder template for the "{formattedTitle}" article. In a full production environment, this would fetch the rich markdown content for the specific slug.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Introduction to {formattedTitle}</h2>
                        <p>
                            As search engines evolve into generative engines, understanding how to optimize for both traditional crawlability and AI retrieval is critical. This article breaks down the methodologies needed.
                        </p>

                        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Core Concepts</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Technical health and proper semantic HTML.</li>
                            <li>Advanced JSON-LD Structured Data implementation.</li>
                            <li>Programmatic workflows to scale operations.</li>
                        </ul>

                        <div className="bg-muted/30 border border-border p-6 rounded-xl my-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">Key Takeaway</h3>
                            <p className="m-0">Always ensure your data is clean, unambiguous, and explicitly defined for Large Language Models.</p>
                        </div>

                    </article>

                    {/* FAQ Section */}
                    <div className="mt-20 border-t border-border pt-12">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Why is this topic important for modern SEO?</h3>
                                <p className="text-muted-foreground mt-2">Because traditional 10 blue links are being replaced by conversational AI answers. Adapting to this ensures you retain and grow organic visibility.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-20 bg-primary/10 border border-primary/20 p-8 rounded-2xl text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Need help implementing this?</h2>
                        <p className="text-muted-foreground mb-6">
                            I help businesses build automated SEO systems and optimize for AI Search. Let's discuss your project.
                        </p>
                        <Link 
                            href="https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Fractional+Head+of+SEO" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            Contact Me
                        </Link>
                    </div>

                    {/* Internal Links Navigation */}
                    <div className="mt-16 text-center">
                        <Link href="/resources" className="text-primary hover:underline inline-flex items-center gap-2">
                            ← Back to all resources
                        </Link>
                    </div>

                </SectionWrapper>
            </div>
            <Footer />
        </DashboardWrapper>
    );
}
