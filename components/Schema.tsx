import type { Locale } from "@/lib/i18n";

export function Schema({ lang = "en" }: { lang?: Locale }) {
    const isFr = lang === "fr";
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://othmaneoutaghza.online/#person",
        "name": "Othmane Outaghza",
        "url": "https://othmaneoutaghza.online/",
        "jobTitle": isFr ? "Consultant SEO Technique" : "Technical SEO Consultant",
        "description": isFr
            ? "Othmane Outaghza est consultant SEO technique au Maroc, spécialisé en audit SEO technique, référencement IA, SEO e-commerce, Shopify SEO et automatisation SEO."
            : "Othmane Outaghza is a Morocco-based technical SEO consultant specializing in technical SEO audits, AI search optimization, ecommerce SEO, Shopify SEO, and SEO automation.",
        "knowsAbout": [
            isFr ? "SEO technique" : "Technical SEO",
            isFr ? "Optimisation SEO IA" : "AI Search Optimization",
            isFr ? "Référencement IA" : "Generative Engine Optimization",
            isFr ? "Optimisation pour les moteurs IA" : "LLM Optimization",
            "SEO Automation",
            "Make.com",
            "n8n",
            "Shopify SEO",
            "Programmatic SEO",
            "Structured Data",
            "Crawl Optimization",
            "Indexing",
            "JavaScript SEO"
        ],
        "sameAs": [
            "https://othmaneoutaghza.online/",
            "https://www.linkedin.com/in/othmaneoutaghza/",
            "https://github.com/outaghzaothmane-create"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Casablanca",
            "addressCountry": "MA"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Othmane Outaghza SEO & AI Automation Consulting",
        "url": "https://othmaneoutaghza.online/",
        "logo": "https://othmaneoutaghza.online/og-image.jpg",
        "founder": {
            "@type": "Person",
            "name": "Othmane Outaghza"
        },
        "description": "Technical SEO, AI search optimization, GEO, structured data, and SEO automation consulting for businesses."
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Othmane Outaghza",
        "url": "https://othmaneoutaghza.online/",
        "inLanguage": lang,
        "description": isFr
            ? "Portfolio et services d'Othmane Outaghza, consultant SEO technique et consultant référencement naturel au Maroc."
            : "Portfolio and services from Othmane Outaghza, a technical SEO consultant and SEO expert in Morocco."
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Othmane Outaghza SEO & AI Automation Consulting",
        "url": "https://othmaneoutaghza.online/",
        "image": "https://othmaneoutaghza.online/og-image.jpg",
        "description": "Technical SEO, AI search optimization, GEO, structured data, and SEO automation consulting for e-commerce and service businesses.",
        "areaServed": [
            {
                "@type": "Country",
                "name": "Morocco"
            },
            {
                "@type": "Place",
                "name": "Worldwide"
            }
        ],
        "founder": {
            "@type": "Person",
            "name": "Othmane Outaghza"
        },
        "serviceType": [
            "Technical SEO Consulting",
            "E-commerce SEO",
            "AI Search Optimization",
            "Generative Engine Optimization",
            "SEO Automation",
            "Structured Data Implementation"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
        </>
    );
}
