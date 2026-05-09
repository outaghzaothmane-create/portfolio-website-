import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Technical SEO Consultant Morocco | Othmane Outaghza",
    description: "Technical SEO consultant in Morocco specializing in crawlability, indexing, structured data, Core Web Vitals, JavaScript SEO, and technical SEO audits.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/technical-seo-consultant-morocco",
    },
};

export default function TechnicalSEOConsultantMoroccoPage() {
    return (
        <ServiceTemplate
            title="Technical SEO Consultant Morocco"
            description="Technical SEO consulting for businesses in Morocco and globally, focusing on technical performance and organic revenue."
            intro="Based in Morocco, I provide world-class technical SEO consulting to local and international businesses. I help brands eliminate technical bottlenecks, optimize for international SEO (hreflang), and dominate their respective markets."
            process={[
                { title: "Market & Technical Audit", desc: "Assessing your site's technical health and how it competes within the Moroccan or global search landscape." },
                { title: "International SEO Setup", desc: "Implementing correct hreflang tags, localized schema, and geo-targeting strategies for multi-region sites." },
                { title: "Continuous Technical Growth", desc: "Providing ongoing technical support and automation workflows to maintain a flawless technical baseline." }
            ]}
            benefits={[
                "Local expertise with global technical standards",
                "International SEO and hreflang optimization",
                "Fast, localized site performance",
                "Bilingual/Multilingual site architecture optimization"
            ]}
            faqs={[
                { q: "Do you work with clients outside of Morocco?", a: "Yes, while based in Morocco, I work with clients globally across the US, UK, Europe, and MENA regions." },
                { q: "How do you handle multi-language technical SEO?", a: "I use robust hreflang implementation, clean URL structures, and targeted XML sitemaps to ensure search engines serve the right localized page." }
            ]}
            relatedLinks={[
                { title: "Technical SEO Consultant", href: "/technical-seo-consultant" },
                { title: "AI Search Optimization", href: "/ai-search-optimization" }
            ]}
            url="https://othmaneoutaghza.online/technical-seo-consultant-morocco"
        />
    );
}
