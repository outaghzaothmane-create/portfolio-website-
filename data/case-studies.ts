import { LucideIcon, BarChart3, Globe, LineChart, Cpu, Search, LayoutTemplate } from "lucide-react";

export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    role: string;
    period: string;
    shortDescription: string;
    heroImage: string; // Placeholder for now
    challenge: string;
    solution: string[];
    results: {
        label: string;
        value: string;
        icon: any; // Using 'any' for simplicity in data file, properly typed in component
        description: string;
    }[];
    techStack: string[];
    color: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "health-supply-770",
        title: "The $1.3M Automation Blueprint",
        client: "Health Supply 770",
        role: "Systems Architect",
        period: "Feb 2024 - Present",
        shortDescription: "Architected three autonomous systems that eliminated manual labor loops, reclaimed 20+ weekly hours of human capital, and orchestrated $1.3M+ in system-attributed revenue.",
        heroImage: "/images/case-study-1.png",
        color: "from-blue-600 to-cyan-500",
        challenge: "The brand encountered a critical infrastructure bottleneck: manual auditing of 5,000+ SKUs created a perpetual manual labor loop that caused silent revenue leakage and prevented the organization from scaling past a technical ceiling. The existing workflow consumed 20+ hours weekly in repetitive tasks, making growth economically unsustainable without proportional headcount expansion.",
        solution: [
            "System 1: Autonomous Technical Monitoring — Deployed a headless Python agent performing 24/7 site-wide health checks across crawlability, indexation status, and schema integrity. Engineered real-time alerting pipelines that eliminated manual auditing cycles and captured technical debt at the point of origin.",
            "System 2: Programmatic Growth Engine — Architected dynamic landing page infrastructure targeting medical long-tail keyword clusters at scale. Iterated on template-driven content generation to programmatically deploy 500+ optimized pages, transforming manual content production into an automated growth vector.",
            "System 3: Behavioral Revenue Pipeline — Orchestrated event-driven automation workflows via Make.com and Brevo to capture abandoned intent signals. Engineered behavioral triggers (cart abandonment, product view latency, re-engagement windows) that automatically deployed personalized email sequences, converting passive visitors into revenue-generating transactions."
        ],
        results: [
            { label: "System-Attributed Revenue", value: "$1.3M+", icon: LineChart, description: "Directly traceable to orchestrated automation systems and organic search infrastructure." },
            { label: "Traffic Growth", value: "+7,000%", icon: BarChart3, description: "Scaled from 700 to 5,000+ qualified clicks per month via programmatic expansion." },
            { label: "Human Capital Reclaimed", value: "20+ hrs/wk", icon: Cpu, description: "Operational re-allocation from manual labor loops to high-leverage strategic initiatives." }
        ],
        techStack: ["Make.com", "Python", "Brevo", "Next.js", "Google Search Console API"]
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
            { label: "Top 3 Rankings", value: "54", icon: Globe, description: "Keywords ranking in positions #1-3 (up from 6)." },
            { label: "Traffic", value: "+150%", icon: BarChart3, description: "Year-over-year growth in local organic visits." },
            { label: "Leads", value: "High", icon: Search, description: "Consistent stream of appointment bookings via website." }
        ],
        techStack: ["WordPress", "RankMath", "Google Maps API", "Ahrefs"]
    }
];
