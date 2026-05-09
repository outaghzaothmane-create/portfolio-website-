import { LucideIcon, BarChart3, Globe, LineChart, Cpu, Search, LayoutTemplate } from "lucide-react";

export interface CaseStudyResult {
    label: string;
    value: string;
    icon: LucideIcon;
    description: string;
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
    solutionImages?: { url: string; alt: string; caption?: string }[];
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
                url: "/health supply 770/n8n-workflow.png",
                alt: "n8n PR Link Builder Workflow",
                caption: "The autonomous n8n HARO PR Link Builder pipeline featuring Gemini AI filtering."
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
        heroImage: "/images/case-study-3.png",
        color: "from-green-600 to-emerald-500",
        challenge: "A local business with zero digital footprint was invisible to nearby customers searching for optical services.",
        solution: [
            "Launched a targeted Local SEO campaign focusing on Google Business Profile optimization.",
            "Executed a PR Backlink strategy to build local domain authority.",
            "Created location-specific content pages to capture 'near me' search intent."
        ],
        results: [
            { label: "Top 3 Rankings", value: "108", icon: Globe, description: "Keywords ranking in positions #1-3 (up from 6)." },
            { label: "Traffic", value: "+150%", icon: BarChart3, description: "Year-over-year growth in local organic visits." },
            { label: "Leads", value: "High", icon: Search, description: "Consistent stream of appointment bookings via website." }
        ],
        techStack: ["WordPress", "RankMath", "Google Maps API", "Ahrefs"]
    }
];
