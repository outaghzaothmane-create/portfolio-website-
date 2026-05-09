export function Schema() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Othmane Outaghza",
        "url": "https://othmaneoutaghza.online/",
        "jobTitle": "Technical SEO Consultant and AI Automation Specialist",
        "description": "Othmane Outaghza is a Morocco-based Technical SEO Consultant and AI Automation Specialist helping businesses grow organic revenue through technical SEO, GEO, automation, and structured data.",
        "knowsAbout": [
            "Technical SEO",
            "E-commerce SEO",
            "Generative Engine Optimization",
            "AI Search Optimization",
            "SEO Automation",
            "Structured Data",
            "WordPress SEO",
            "Shopify SEO",
            "Python SEO Automation",
            "Make.com Automation",
            "n8n Automation"
        ],
        "sameAs": [
            "https://othmaneoutaghza.online/"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Casablanca",
            "addressCountry": "MA"
        }
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Othmane Outaghza SEO & AI Automation Consulting",
        "url": "https://othmaneoutaghza.online/",
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
                "name": "Who is Othmane Outaghza?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist based in Morocco. He helps businesses improve organic search visibility, technical SEO performance, and AI search presence."
                }
            },
            {
                "@type": "Question",
                "name": "What services does Othmane Outaghza offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "He offers technical SEO audits, e-commerce SEO strategy, AI search optimization, structured data implementation, SEO automation, workflow automation, and technical architecture support."
                }
            },
            {
                "@type": "Question",
                "name": "What industries does Othmane specialize in?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Othmane specializes in e-commerce SEO, medical supply SEO, Shopify SEO, WordPress SEO, local SEO, and automation-driven SEO systems."
                }
            },
            {
                "@type": "Question",
                "name": "What results has Othmane achieved?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "His portfolio highlights $1.3M+ in organic revenue impact, major organic traffic growth, improved keyword rankings, AI citations, and automated SEO workflows."
                }
            },
            {
                "@type": "Question",
                "name": "Where is Othmane Outaghza based?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Othmane Outaghza is based in Morocco and works with businesses internationally."
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
            />
        </>
    );
}
