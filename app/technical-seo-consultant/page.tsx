import { ServiceTemplate } from "@/components/layout/ServiceTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Technical SEO Consultant | Othmane Outaghza",
    description: "Technical SEO consultant specializing in crawlability, indexing, structured data, Core Web Vitals, JavaScript SEO, and technical SEO audits.",
    alternates: {
        canonical: "https://othmaneoutaghza.online/technical-seo-consultant",
    },
};

export default function TechnicalSEOConsultantPage() {
    return (
        <ServiceTemplate
            title="Technical SEO Consultant"
            description="Technical SEO consulting focusing on crawlability, indexability, JavaScript rendering, and site architecture."
            intro="A robust technical foundation is the prerequisite for organic growth. As a Technical SEO Consultant, I diagnose complex crawlability issues, optimize JavaScript rendering, and implement structured data to ensure search engines can understand and rank your content efficiently."
            process={[
                { title: "Technical Audit", desc: "Deep crawl of your website using advanced tools to identify blockers like rendering issues, infinite spaces, or indexing barriers." },
                { title: "Architecture Optimization", desc: "Restructuring your internal linking and URL hierarchy to distribute PageRank effectively and improve crawl budget." },
                { title: "Implementation & Monitoring", desc: "Working directly with your dev team to implement fixes, deploy schema markup, and monitor Google Search Console for real-time impact." }
            ]}
            benefits={[
                "Maximize crawl budget efficiency",
                "Resolve complex JavaScript (React/Next.js) rendering issues",
                "Perfect Core Web Vitals scores",
                "Advanced JSON-LD schema implementation",
                "Log file analysis for bot behavior insights"
            ]}
            faqs={[
                { q: "What technical SEO issues block AI crawlers?", a: "Common issues include aggressive firewall rules blocking AI user agents (like GPTBot), client-side only rendering without SSR, and missing structured data." },
                { q: "Why is JavaScript SEO important?", a: "If search engines cannot execute your JavaScript efficiently, they cannot see your content or links, leading to massive indexing delays and poor rankings." }
            ]}
            relatedLinks={[
                { title: "Technical SEO Consultant Morocco", href: "/technical-seo-consultant-morocco" },
                { title: "Shopify SEO Consultant", href: "/shopify-seo-consultant" },
                { title: "Technical SEO Automation", href: "/technical-seo-automation" }
            ]}
            url="https://othmaneoutaghza.online/technical-seo-consultant"
        />
    );
}
