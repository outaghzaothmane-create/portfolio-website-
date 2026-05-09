export function Schema() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Othmane Outaghza",
        "url": "https://othmaneoutaghza.online/",
        "jobTitle": [
            "Technical SEO Consultant",
            "AI Automation Specialist",
            "GEO / AI Search Optimization Specialist",
            "SEO Consultant Morocco"
        ],
        "description": "Othmane Outaghza is a Morocco-based Technical SEO Consultant and AI Automation Specialist helping businesses improve search visibility, AI search discoverability, structured data, and SEO automation.",
        "knowsAbout": [
            "Technical SEO",
            "AI Search Optimization",
            "Generative Engine Optimization",
            "LLM Optimization",
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
        "name": "Othmane Outaghza - Technical SEO Consultant",
        "url": "https://othmaneoutaghza.online/",
        "description": "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist helping businesses improve organic search visibility, technical SEO performance, AI search discoverability, and SEO automation systems."
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

    const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Generative Engine Optimization?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generative Engine Optimization (GEO) is the process of optimizing content, structured data, and entity signals to ensure a brand is accurately cited and recommended by AI-driven search engines like ChatGPT, Perplexity, and Gemini."
                }
            },
            {
                "@type": "Question",
                "name": "How does AI Search Optimization work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI Search Optimization works by improving technical crawlability for AI bots, enriching semantic depth, establishing strong entity relationships through structured data, and creating citation-ready content that Large Language Models (LLMs) can easily extract."
                }
            },
            {
                "@type": "Question",
                "name": "What is LLM Optimization?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "LLM Optimization involves structuring website data and content so that Large Language Models can efficiently index, understand, and retrieve the information when generating answers for users in conversational search interfaces."
                }
            },
            {
                "@type": "Question",
                "name": "How can technical SEO improve AI search visibility?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Technical SEO ensures that AI crawlers can access and parse a website without encountering rendering issues, JavaScript blocks, or slow load times. Proper canonicalization, XML sitemaps, and robots.txt directives are foundational for AI search inclusion."
                }
            },
            {
                "@type": "Question",
                "name": "What technical SEO issues block AI crawlers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Common issues include aggressive firewall rules blocking AI user agents (like GPTBot), client-side only rendering without SSR, missing or invalid structured data, infinite crawl spaces, and poorly structured HTML semantic tags."
                }
            },
            {
                "@type": "Question",
                "name": "How can Make.com automate SEO workflows?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Make.com can connect various APIs (like Google Search Console, OpenAI, and CMS platforms) to automate tasks such as technical SEO monitoring, programmatic content generation, indexing requests, and automated reporting dashboards."
                }
            },
            {
                "@type": "Question",
                "name": "How can n8n be used for SEO automation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "n8n offers self-hosted, code-friendly workflow automation. It is ideal for complex SEO tasks like scraping competitor data, running automated site crawls, processing natural language for entity extraction, and automatically updating website schema."
                }
            },
            {
                "@type": "Question",
                "name": "What is AI Citation Engineering?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI Citation Engineering is the strategy of formatting high-value information—such as original research, statistics, and unique frameworks—into easily extractable structures (like tables and lists) so that AI models use them as direct citations."
                }
            },
            {
                "@type": "Question",
                "name": "What is programmatic SEO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Programmatic SEO is the automated creation of large-scale, high-quality landing pages targeting long-tail keywords. It uses structured datasets and dynamic templates to generate helpful content at scale without manual writing."
                }
            },
            {
                "@type": "Question",
                "name": "How does structured data help AI search engines?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Structured data (JSON-LD schema) provides explicit context about entities, relationships, and content types. It removes ambiguity, helping AI search engines definitively understand who an organization is, what services they offer, and how they connect to other entities."
                }
            },
            {
                "@type": "Question",
                "name": "How can Shopify SEO improve organic revenue?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Shopify SEO focuses on optimizing product architecture, collection pages, faceted navigation, and technical performance to drive higher-intent organic traffic directly to conversion points, thereby increasing overall store revenue."
                }
            },
            {
                "@type": "Question",
                "name": "Why should businesses optimize for ChatGPT, Perplexity, Gemini, and Claude?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As user search behavior shifts from traditional links to conversational answers, being cited by AI models builds authority, captures top-of-funnel queries, and ensures your brand remains visible in the next generation of search discovery."
                }
            }
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
            />
        </>
    );
}
