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
        role: "SEO & Automation Manager",
        period: "Feb 2024 - Present",
        shortDescription: "Generated $1.3M+ in revenue by replacing manual SEO tasks with Python scripts and Make.com workflows.",
        heroImage: "/images/case-study-1.png",
        color: "from-blue-600 to-cyan-500",
        challenge: "The e-commerce brand was stuck at 700 clicks/month with unscalable manual processes. They needed a way to audit thousands of product pages and recover abandoned carts without hiring a massive team.",
        solution: [
            "Engineered an automated Technical SEO Audit system using Python and Make.com to monitor crawlability 24/7.",
            "Built behavior-triggered email flows in Brevo (Abandoned Cart, Re-engagement) that directly recovered lost revenue.",
            "Implemented programmatic SEO to scale landing page creation for long-tail medical keywords."
        ],
        results: [
            { label: "Revenue Generated", value: "$1.3M+", icon: LineChart, description: "Directly attributed to Organic Search & Email Automation." },
            { label: "Traffic Growth", value: "+7,000%", icon: BarChart3, description: "Scaled from 700 to 5,000+ qualified clicks per month." },
            { label: "Efficiency", value: "100%", icon: Cpu, description: "Automated 20+ hours of manual weekly work." }
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
