import { LucideIcon, BarChart3, Globe, LineChart, Cpu, Search, LayoutTemplate } from "lucide-react";

export interface CaseStudyResult {
    label: string;
    value: string;
    icon: LucideIcon;
    description: string;
}

export interface CaseStudyImage {
    url: string;
    alt: string;
    caption?: string;
    title?: string;
    width?: number;
    height?: number;
    frAlt?: string;
    frCaption?: string;
    frTitle?: string;
}

export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    role: string;
    period: string;
    shortDescription: string;
    heroImage: string;
    challenge: string;
    solution: string[];
    solutionImages?: CaseStudyImage[];
    results: CaseStudyResult[];
    techStack: string[];
    color: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "health-supply-770",
        title: "Scaling HS770.com to $1.3M in Organic Revenue",
        client: "Health Supply 770",
        role: "Technical SEO Architect & AI Automation Lead",
        period: "Feb 2024 - Present (2 Years)",
        shortDescription: "Transformed a low-authority medical supply site into a dominant market player, orchestrating $1.3M in annual programmatic revenue and achieving 494 AI citations via Universal Commerce Protocol (UCP) implementation.",
        heroImage: "/health supply 770/overview.png",
        color: "from-blue-600 to-cyan-500",
        challenge: "When I inherited the HS770.com architecture, it faced existential technical threats: <strong>19,000+</strong> crawl errors, a non-existent Domain Rating of <strong>2.6</strong>, and a complete lack of visibility in next-generation search engines. With only <strong>198</strong> monthly visitors and a crumbling codebase (Health Score: 35/100), the platform required a ground-up engineering overhaul to survive the shift to AI-first discovery.",
        solution: [
            "<strong>Pillar 1: Technical Architecture Remediation</strong> — I engineered a systematic overhaul of the site's codebase, resolving over <strong>19,000+</strong> technical debt items. By optimizing the indexation logic and server response times, I elevated the Ahrefs Health Score from a critical <strong>35</strong> to an elite <strong>95/100</strong>, creating a high-performance foundation for scale.",
            "<strong>Pillar 2: AI-Native 'Vibe Coding' Workflow</strong> — Moving beyond manual fixes, I deployed autonomous agents using <strong>n8n (Self-Hosted)</strong> and <strong>Make.com</strong>. Leveraging an AI-native 'vibe coding' workflow, I architected self-healing audit workflows that continuously monitor and patch technical issues without human intervention, ensuring 99.9% crawl efficiency.",
            "<strong>Pillar 3: Authority & Revenue Engineering</strong> — To compel ranking improvements, I orchestrated a high-velocity link acquisition system, scaling referring domains from <strong>1,700</strong> to <strong>3,800+</strong>. This authority multiplier pushed high-intent keywords into the Top 3, directly driving <strong>$1.3M</strong> in annualized programmatic revenue.",
            "<strong>Pillar 4: Future-Proofing with UCP</strong> — Pioneered the integration of the <strong>Universal Commerce Protocol (UCP)</strong> to decentralize the product catalog. This protocol enables AI agents to directly query inventory states, bypassing traditional search crawler latency and positioning the brand as a first-mover in the autonomous commerce economy."
        ],
        solutionImages: [
            {
                url: "/images/health-supply-770/hs770-ahrefs-ai-citations-organic-growth.svg",
                title: "HS770 Ahrefs AI citations and organic growth overview",
                alt: "Ahrefs overview for HS770 showing 298 ChatGPT citations, 80 AI Overview citations, DR 30, 28K backlinks and 1.4K organic traffic",
                caption: "Ahrefs overview showing HS770's AI citation footprint, DR 30 authority profile, 28K backlinks, and 1.4K organic traffic.",
                frTitle: "Apercu Ahrefs des citations IA et de la croissance organique de HS770",
                frAlt: "Apercu Ahrefs de HS770 montrant 298 citations ChatGPT, 80 citations AI Overview, DR 30, 28K backlinks et 1,4K trafic organique",
                frCaption: "Apercu Ahrefs montrant les citations IA de HS770, un profil d'autorite DR 30, 28K backlinks et 1,4K trafic organique.",
                width: 1600,
                height: 900
            },
            {
                url: "/images/health-supply-770/hs770-ahrefs-baseline-dr-organic-traffic.svg",
                title: "HS770 Ahrefs baseline before technical SEO growth",
                alt: "Ahrefs baseline overview for HS770 showing DR 2.6, 1.7K referring domains and 198 organic traffic before the SEO growth program",
                caption: "Starting point in Ahrefs: DR 2.6, 1.7K referring domains, 1.1K keywords, and only 198 organic traffic.",
                frTitle: "Base de depart Ahrefs de HS770 avant la croissance SEO technique",
                frAlt: "Apercu Ahrefs de depart pour HS770 montrant DR 2,6, 1,7K domaines referents et 198 trafic organique avant le programme SEO",
                frCaption: "Point de depart dans Ahrefs : DR 2,6, 1,7K domaines referents, 1,1K mots-cles et seulement 198 trafic organique.",
                width: 1600,
                height: 900
            },
            {
                url: "/images/health-supply-770/hs770-google-search-console-21300-clicks-174m-impressions.svg",
                title: "HS770 Google Search Console clicks and impressions growth",
                alt: "Google Search Console performance for HS770 showing 21.3K clicks, 1.74M impressions, 1.2% CTR and 22.6 average position over 16 months",
                caption: "Google Search Console performance: 21.3K clicks, 1.74M impressions, 1.2% CTR, and 22.6 average position over 16 months.",
                frTitle: "Croissance des clics et impressions Google Search Console de HS770",
                frAlt: "Performance Google Search Console de HS770 montrant 21,3K clics, 1,74M impressions, 1,2% CTR et position moyenne 22,6 sur 16 mois",
                frCaption: "Performance Google Search Console : 21,3K clics, 1,74M impressions, 1,2% CTR et position moyenne 22,6 sur 16 mois.",
                width: 1600,
                height: 760
            },
            {
                url: "/images/health-supply-770/hs770-google-merchant-center-free-listings-clicks.svg",
                title: "HS770 Google Merchant Center free listings clicks",
                alt: "Google Merchant Center summary for HS770 showing 2.85K clicks from Google free listings with 768 product clicks and 2.08K online store clicks",
                caption: "Google Merchant Center summary: 2.85K free-listing clicks to the website, including 768 product clicks and 2.08K online store clicks.",
                frTitle: "Clics Google Merchant Center en fiches gratuites pour HS770",
                frAlt: "Resume Google Merchant Center de HS770 montrant 2,85K clics depuis les fiches gratuites Google avec 768 clics produits et 2,08K clics boutique en ligne",
                frCaption: "Resume Google Merchant Center : 2,85K clics gratuits vers le site, dont 768 clics produits et 2,08K clics boutique en ligne.",
                width: 1600,
                height: 900
            }
        ],
        results: [
            { label: "Annual Revenue", value: "$1.3M", icon: LineChart, description: "Scaled from $87k/year baseline to $1.3M annualized revenue via programmatic SEO." },
            { label: "AI Readiness", value: "494", icon: Cpu, description: "Secured 383 ChatGPT and 111 Perplexity citations via Generative Engine Optimization." },
            { label: "Technical Debt", value: "Resolved", icon: Cpu, description: "Eliminated 19,000+ crawl errors; elevated Health Score from 35/100 to 95/100." },
            { label: "Domain Authority", value: "DR 30", icon: Globe, description: "Skyrocketed authority metric by 11x (from 2.6 to 30) through strategic backlink engineering." },
            { label: "Organic Traffic", value: "+614%", icon: BarChart3, description: "Sustained traffic surge from <200 to 5,000+ monthly high-intent visitors." },
            { label: "Top 3 Rankings", value: "88", icon: Search, description: "Dominated SERPs with 88 keywords in Top 3 positions (up from 3)." }
        ],
        techStack: ["Universal Commerce Protocol (UCP)", "Generative Engine Optimization (GEO)", "n8n (Self-Hosted)", "Make.com", "LLM Optimization", "Ahrefs"]
    },
    {
        id: "fantasialife",
        title: "Shopify SEO & UX Architecture",
        client: "Fantasialife.com",
        role: "Shopify Developer & SEO",
        period: "Jan 2023 - 2024",
        shortDescription: "Rebuilt site architecture and UX to boost mobile conversion rates and organic visibility.",
        heroImage: "/images/case-study-2.png",
        color: "from-purple-600 to-pink-500",
        challenge: "The original site suffered from poor mobile performance and unstructured collections, leading to high bounce rates and low organic rankings.",
        solution: [
            "Customized the Shopify 'Liquid' theme code to improve Core Web Vitals and mobile responsiveness.",
            "Restructured the entire product taxonomy to align with high-intent search terms.",
            "Implemented comprehensive Schema.org structured data to capture Rich Snippets in Google."
        ],
        results: [
            { label: "Organic Traffic", value: "+80%", icon: Search, description: "Achieved within the first 3 months of launch." },
            { label: "Conv. Rate", value: "+2.5%", icon: LineChart, description: "Significant uplift in mobile user checkout completion." },
            { label: " UX Score", value: "98/100", icon: LayoutTemplate, description: "Passed all Core Web Vitals metrics on mobile." }
        ],
        techStack: ["Shopify", "Liquid", "JavaScript", "Schema.org", "SEMrush"]
    },
    {
        id: "epoptique",
        title: "Local SEO Domination",
        client: "Epoptique.ma",
        role: "SEO Specialist",
        period: "Jan 2022 - Present",
        shortDescription: "Captured local market share by ranking 54 keywords in the Top 3 positions via aggressive Local SEO.",
        heroImage: "/images/epoptique/epoptique-google-business-profile-views-searches-casablanca.svg",
        color: "from-green-600 to-emerald-500",
        challenge: "A local business with zero digital footprint was invisible to nearby customers searching for optical services.",
        solution: [
            "Launched a targeted Local SEO campaign focusing on Google Business Profile optimization.",
            "Executed a PR Backlink strategy to build local domain authority.",
            "Created location-specific content pages to capture 'near me' search intent."
        ],
        solutionImages: [
            {
                url: "/images/epoptique/epoptique-google-business-profile-views-searches-casablanca.svg",
                title: "Epoptique Google Business Profile visibility in Casablanca",
                alt: "Epoptique Google Business Profile performance showing 285k profile views and 152k searches in Casablanca",
                caption: "Google Business Profile visibility: 285k profile views and 152k searches for Epoptique Casablanca.",
                frTitle: "Visibilité Google Business Profile d'Epoptique à Casablanca",
                frAlt: "Performance Google Business Profile d'Epoptique avec 285k vues de profil et 152k recherches à Casablanca",
                frCaption: "Visibilité Google Business Profile : 285k vues du profil et 152k recherches pour Epoptique Casablanca.",
                width: 1600,
                height: 900
            },
            {
                url: "/images/epoptique/epoptique-google-business-profile-interactions-chart.svg",
                title: "Epoptique Google Business Profile interactions chart",
                alt: "Epoptique Google Business Profile chart showing 10,324 customer interactions from December 2025 to May 2026",
                caption: "Business Profile interactions reached 10,324, strengthening local SEO proof for Epoptique.",
                frTitle: "Graphique des interactions Google Business Profile d'Epoptique",
                frAlt: "Graphique Google Business Profile d'Epoptique montrant 10 324 interactions clients de décembre 2025 à mai 2026",
                frCaption: "Les interactions Google Business Profile atteignent 10 324, preuve de performance SEO local pour Epoptique.",
                width: 1600,
                height: 900
            },
            {
                url: "/images/epoptique/epoptique-google-business-profile-directions-chart.svg",
                title: "Epoptique direction requests from Google Business Profile",
                alt: "Epoptique Google Business Profile chart showing 2,371 direction requests from local search users",
                caption: "Direction requests reached 2,371 from Google Business Profile local search visibility.",
                frTitle: "Demandes d'itinéraire Google Business Profile pour Epoptique",
                frAlt: "Graphique Google Business Profile d'Epoptique montrant 2 371 demandes d'itinéraire depuis la recherche locale",
                frCaption: "Les demandes d'itinéraire atteignent 2 371 grâce à la visibilité locale du profil Google Business.",
                width: 1600,
                height: 900
            },
            {
                url: "/images/epoptique/epoptique-google-business-profile-calls-chart.svg",
                title: "Epoptique calls from Google Business Profile",
                alt: "Epoptique Google Business Profile chart showing 6,627 phone calls from local search visibility",
                caption: "Phone calls from Google Business Profile reached 6,627 during the measured period.",
                frTitle: "Appels depuis Google Business Profile pour Epoptique",
                frAlt: "Graphique Google Business Profile d'Epoptique montrant 6 627 appels téléphoniques générés par la recherche locale",
                frCaption: "Les appels depuis Google Business Profile atteignent 6 627 sur la période mesurée.",
                width: 1600,
                height: 900
            },
            {
                url: "/images/epoptique/epoptique-google-reviews-486-reviews-4-9-stars.svg",
                title: "Epoptique Google reviews rating",
                alt: "Epoptique Google reviews profile showing a 4.9 star rating from 486 reviews",
                caption: "Local trust signal: Epoptique holds a 4.9 rating from 486 Google reviews.",
                frTitle: "Avis Google d'Epoptique",
                frAlt: "Profil d'avis Google d'Epoptique affichant une note de 4,9 étoiles avec 486 avis",
                frCaption: "Signal de confiance locale : Epoptique affiche une note de 4,9 avec 486 avis Google.",
                width: 1600,
                height: 900
            }
        ],
        results: [
            { label: "Top 3 Rankings", value: "108", icon: Globe, description: "Keywords ranking in positions #1-3 (up from 6)." },
            { label: "Traffic", value: "+150%", icon: BarChart3, description: "Year-over-year growth in local organic visits." },
            { label: "Leads", value: "High", icon: Search, description: "Consistent stream of appointment bookings via website." }
        ],
        techStack: ["WordPress", "RankMath", "Google Maps API", "Ahrefs"]
    }
];
