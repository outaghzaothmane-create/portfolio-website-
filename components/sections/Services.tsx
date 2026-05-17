"use client";

import { motion } from "framer-motion";
import { TrendingUp, Workflow, Cpu, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "The \"Revenue Architecture\" Retainer",
        subtitle: "Fractional Head of SEO",
        icon: TrendingUp,
        color: "text-green-500",
        glow: "group-hover:shadow-green-500/20",
        target: "For: E-commerce brands doing $1M+ revenue",
        features: [
            "Full-stack SEO Strategy (On-page, Off-page, Content)",
            "Revenue forecasting & Data Analysis",
            "Managing writer/dev teams"
        ],
        why: "I don't just rank keywords; I manage the entire revenue pipeline.",
        link: "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Fractional+Head+of+SEO"
    },
    {
        title: "AI Agent & Workflow Deployment",
        subtitle: "Eliminate Manual Work",
        icon: Workflow,
        color: "text-purple-500",
        glow: "group-hover:shadow-purple-500/20",
        target: "For: Teams drowning in manual data work",
        features: [
            "Deploying autonomous MCP Agents and n8n pipelines",
            "Python scripting for scraping or indexing",
            "Auto-generating programmatic SEO pages"
        ],
        why: "Turn 20 hours of manual work into a 2-minute script.",
        link: "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Automation+Build"
    },
    {
        title: "Technical Architecture Sprint",
        subtitle: "Fix Traffic Drops",
        icon: Cpu,
        color: "text-blue-500",
        glow: "group-hover:shadow-blue-500/20",
        target: "For: Sites with traffic drops or Core Web Vitals issues",
        features: [
            "Deep Log File Analysis",
            "JavaScript rendering fixes (Next.js/React)",
            "Migration safety & Schema implementation"
        ],
        why: "A deep-dive audit to fix the technical debt hurting your rankings.",
        link: "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Tech+Audit"
    },
];

export function Services({ dict, lang = "en" }: { dict?: any; lang?: string }) {
    const safeDict = dict || {
        title: "Technical SEO & AI Automation Services",
        subtitle: "Flexible engagement models tailored to your specific needs and growth stage.",
        items: [
            {
                title: "The \"Revenue Architecture\" Retainer",
                subtitle: "Fractional Head of SEO",
                target: "For: E-commerce brands doing $1M+ revenue",
                features: [
                    "Full-stack SEO Strategy (On-page, Off-page, Content)",
                    "Revenue forecasting & Data Analysis",
                    "Managing writer/dev teams"
                ],
                why: "I don't just rank keywords; I manage the entire revenue pipeline.",
                bookButton: "Book Strategy Call"
            },
            {
                title: "AI Agent & Workflow Deployment",
                subtitle: "Eliminate Manual Work",
                target: "For: Teams drowning in manual data work",
                features: [
                    "Deploying autonomous MCP Agents and n8n pipelines",
                    "Python scripting for scraping or indexing",
                    "Auto-generating programmatic SEO pages"
                ],
                why: "Turn 20 hours of manual work into a 2-minute script.",
                bookButton: "Book Strategy Call"
            },
            {
                title: "Technical Architecture Sprint",
                subtitle: "Fix Traffic Drops",
                target: "For: Sites with traffic drops or Core Web Vitals issues",
                features: [
                    "Deep Log File Analysis",
                    "JavaScript rendering fixes (Next.js/React)",
                    "Migration safety & Schema implementation"
                ],
                why: "A deep-dive audit to fix the technical debt hurting your rankings.",
                bookButton: "Book Strategy Call"
            }
        ]
    };

    const icons = [TrendingUp, Workflow, Cpu];
    const colors = ["text-green-500", "text-purple-500", "text-blue-500"];
    const glows = ["group-hover:shadow-green-500/20", "group-hover:shadow-purple-500/20", "group-hover:shadow-blue-500/20"];
    const links = [
        "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Fractional+Head+of+SEO",
        "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Automation+Build",
        "https://calendly.com/outaghza-othmane/seo-meeting?notes=Interested+in+Tech+Audit"
    ];

    return (
        <section id="services" className={cn(
            "w-full py-16 transition-colors duration-500 bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">{safeDict.title}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                        {safeDict.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {safeDict.items.map((service: any, index: number) => {
                        const Icon = icons[index];
                        const color = colors[index];
                        const glow = glows[index];
                        const link = links[index];

                        return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="h-full"
                        >
                            <Card className={cn(
                                "h-full transition-all duration-500 relative overflow-hidden flex flex-col group",
                                "rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 lg:p-8",
                                `bg-white/40 backdrop-blur-md border border-white/40 hover:shadow-xl ${glow}`
                            )}>
                                <CardHeader className="p-0 pb-6">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                                        "bg-white shadow-sm"
                                    )}>
                                        <Icon className={cn(
                                            "h-7 w-7 transition-all duration-300",
                                            color,
                                            "group-hover:scale-110"
                                        )} />
                                    </div>
                                    <CardTitle className="text-xl sm:text-2xl font-bold leading-tight break-words">{service.title}</CardTitle>
                                    <p className={cn(
                                        "text-sm font-medium",
                                        "text-muted-foreground"
                                    )}>
                                        {service.subtitle}
                                    </p>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between space-y-8 p-0">
                                    <div className="space-y-6">
                                        <Badge variant="outline" className={cn(
                                            "w-full justify-center whitespace-normal py-2 text-center text-xs sm:text-sm font-normal leading-snug",
                                            "bg-white/50 text-gray-600 border-white/60"
                                        )}>
                                            {service.target}
                                        </Badge>

                                        <ul className="space-y-3">
                                            {service.features.map((feature: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                    <span className={cn(
                                                        "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                                                        color.replace("text-", "bg-")
                                                    )} />
                                                    <span className="min-w-0 break-words">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <p className={cn(
                                            "text-sm italic border-l-2 pl-4 py-1",
                                            "text-gray-600 border-gray-200"
                                        )}>
                                            &ldquo;{service.why}&rdquo;
                                        </p>

                                        <div className="flex flex-col gap-3">
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "flex min-h-11 items-center justify-between gap-3 w-full px-5 sm:px-6 py-3 rounded-full text-sm font-semibold transition-all",
                                                    "bg-white text-foreground hover:shadow-md border border-white/60"
                                                )}
                                            >
                                                {service.bookButton} <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )})}
                </div>
            </div>
        </section>
    );
}
