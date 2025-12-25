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
        title: "Scaling HS770.com to $1.3M in Organic Revenue",
        client: "Health Supply 770",
        role: "Senior SEO & Automation Manager",
        period: "Feb 2024 - Present (2 Years)",
        shortDescription: "Transformed a low-authority medical supply site from near-zero visibility into a dominant market player, generating $1,318,486 in organic revenue through strategic SEO, technical excellence, and intelligent automation.",
        heroImage: "/health supply 770/overview.png",
        color: "from-blue-600 to-cyan-500",
        challenge: "When I first started working with HS770.com, the situation was challenging. The site was practically invisible in search results, stuck with a Domain Rating of just <strong>2.6</strong> and barely <strong>198</strong> monthly visitors trickling in organically. We had only <strong>1,100</strong> keywords indexed, which meant we were missing out on thousands of potential customers searching for medical supplies. The technical foundation was crumbling beneath us—over <strong>19,000</strong> crawl errors plagued the site, the Ahrefs Health Score was a disappointing <strong>35</strong> out of 100, and we had <strong>5,000+</strong> product pages with descriptions that weren't doing anyone any favors. The whole infrastructure needed a complete overhaul before we could even think about scaling.",
        solution: [
            "<strong>Pillar 1: Technical SEO & Site Health</strong> — First, we had to fix the foundation. I led a complete technical overhaul, systematically eliminating all <strong>19,000+</strong> crawl errors and warnings that were preventing search engines from properly indexing the site. We took the Ahrefs Health Score from a weak <strong>35</strong> all the way up to an excellent <strong>95</strong>. I also optimized Core Web Vitals across the board, which dramatically improved page load times and mobile responsiveness. The result? A clean, crawl-friendly architecture that search engines could finally trust and users could actually enjoy.",
            "<strong>Pillar 2: Content & Authority Building</strong> — With a solid technical foundation in place, we shifted focus to visibility and authority. I expanded our keyword footprint from <strong>1,100</strong> to over <strong>1,500</strong> indexed keywords by targeting high-intent medical supply searches. Through strategic outreach and content partnerships, we grew our backlink profile from <strong>1,700</strong> to over <strong>3,800</strong> referring domains. I also implemented a smart internal linking strategy that helped push <strong>54</strong> of our most valuable keywords into Google's Top 3 positions—putting us right where customers would see us first.",
            "<strong>Pillar 3: SEO Automation & Revenue Optimization</strong> — The final piece was turning all that traffic into revenue. I built custom automation workflows using Make.com to handle rank tracking and technical audits automatically, freeing up time for strategic work. We integrated Brevo for behavior-triggered email campaigns—things like abandoned cart recovery and product view follow-ups. These systems worked beautifully alongside our SEO efforts, capturing opportunities we would have otherwise missed and turning passive browsers into paying customers."
        ],
        results: [
            { label: "E-commerce Revenue", value: "$1.3M", icon: LineChart, description: "Scaled annual revenue from $87K/year ($7K/month baseline) to $1.32M/year—a 15x increase driven by SEO and automation." },
            { label: "Organic Traffic", value: "+614%", icon: BarChart3, description: "Monthly organic clicks surged from 700 to 5,000+ (65.2K total clicks over 16 months)." },
            { label: "Top 3 Rankings", value: "88 keywords", icon: Search, description: "Grew from just 3 to 88 keywords in Top 3 Google positions (2,833% increase)." },
            { label: "Domain Authority", value: "DR 30", icon: Globe, description: "Domain Rating increased from 2.6 to 30, enabling competitive rankings." },
            { label: "Site Health", value: "95%", icon: Cpu, description: "Elevated from 'Fair' rating of 35 to 'Excellent' 95/100 for optimal crawlability." },
            { label: "AI Search Ready", value: "494 citations", icon: Cpu, description: "383 ChatGPT citations + 111 Perplexity citations, future-proofing brand visibility." }
        ],
        techStack: ["Make.com", "Brevo", "Ahrefs", "Google Search Console API", "Core Web Vitals"]
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
