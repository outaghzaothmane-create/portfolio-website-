"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { GrowthChart } from "@/components/ui/growth-chart";
import { cn } from "@/lib/utils";

const healthSupplyData = [
    { year: "2022", value: 100000, milestone: "Started SEO" },
    { year: "2022 Q3", value: 150000, milestone: "First Major Client" },
    { year: "2023", value: 300000, milestone: "Expanded Team" },
    { year: "2023 Q3", value: 600000, milestone: "Core Web Vitals Fix" },
    { year: "2024", value: 900000, milestone: "Implemented Make.com Automation" },
    { year: "2024 Q2", value: 1300000, milestone: "$1.3M Revenue Goal" },
];

const fantasiaData = [
    { year: "Jan", value: 5000, milestone: "Audit Started" },
    { year: "Feb", value: 6500, milestone: "Fixed Crawl Errors" },
    { year: "Mar", value: 8000, milestone: "Content Strategy" },
    { year: "Apr", value: 12000, milestone: "Backlink Campaign" },
    { year: "May", value: 15000, milestone: "Traffic +80%" },
];

const epoptiqueData = [
    { year: "Q1", value: 2000, milestone: "Initial Audit" },
    { year: "Q2", value: 2800, milestone: "Tech Fixes" },
    { year: "Q3", value: 3500, milestone: "Content Plan" },
    { year: "Q4", value: 4200, milestone: "Authority Building" },
    { year: "Q1", value: 5000, milestone: "Traffic +150%" },
];

const projects = [
    {
        title: "The $1.3M Automation Blueprint",
        client: "Health Supply 770",
        description: "Automated technical audits and email marketing workflows using Make.com and Brevo. Implemented a scalable SEO architecture that drove massive organic revenue growth.",
        tags: ["Automation", "Revenue Growth", "Technical SEO"],
        metrics: [
            { label: "Revenue", value: "$1.3M+", icon: TrendingUp },
            { label: "Efficiency", value: "100%", icon: Zap },
        ],
        link: "/projects/health-supply-770",
    },
    {
        title: "Shopify SEO & UX Architecture",
        client: "Fantasialife.com",
        description: "Complete site architecture overhaul focusing on user experience and organic search visibility. Redesigned navigation and product structure for maximum crawlability.",
        tags: ["Shopify", "UX Design", "E-commerce SEO"],
        metrics: [
            { label: "Traffic", value: "+80%", icon: Users },
            { label: "Conv. Rate", value: "+2.5%", icon: TrendingUp },
        ],
        link: "/projects/fantasialife",
    },
    {
        title: "E-commerce SEO & Content Strategy",
        client: "Epoptique.ma",
        description: "Long-term SEO strategy and optimization. Implemented comprehensive content strategy and technical improvements for sustainable organic growth.",
        tags: ["E-commerce", "Content Strategy", "Technical SEO"],
        metrics: [
            { label: "Traffic", value: "+150%", icon: Users },
            { label: "Keywords", value: "500+", icon: TrendingUp },
        ],
        link: "/projects/epoptique",
    },
];

import { motion } from "framer-motion";
import { useTerminal } from "@/components/providers/terminal-context";

export function Projects() {
    const { isTerminalMode } = useTerminal();

    return (
        <section id="projects" className={cn(
            "w-full py-16 transition-colors duration-500 bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Case Studies</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="h-full"
                        >
                            <Card className={cn(
                                "flex flex-col h-full transition-all duration-500",
                                "rounded-[2rem] p-8",
                                isTerminalMode
                                    ? "bg-black/60 backdrop-blur-md border border-green-800 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                                    : "bg-white/40 backdrop-blur-md border border-white/40 hover:shadow-xl shadow-sm"
                            )}>
                                <CardHeader className="p-0 pb-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl font-bold leading-tight">
                                                {project.title}
                                            </CardTitle>
                                            <CardDescription className={cn(
                                                "font-medium",
                                                isTerminalMode ? "text-green-600" : "text-primary/80"
                                            )}>{project.client}</CardDescription>
                                        </div>
                                        {/* Removed ArrowUpRight icon */}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 flex-1 p-0">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>

                                    {project.client === "Health Supply 770" && (
                                        <GrowthChart
                                            chartId="hs770"
                                            data={healthSupplyData}
                                            dataKey="value"
                                            formatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
                                        />
                                    )}

                                    {project.client === "Fantasialife.com" && (
                                        <GrowthChart
                                            chartId="fantasia"
                                            data={fantasiaData}
                                            dataKey="value"
                                            formatter={(val) => `${(val / 1000).toFixed(0)}k`}
                                        />
                                    )}

                                    {project.client === "Epoptique.ma" && (
                                        <GrowthChart
                                            chartId="epoptique"
                                            data={epoptiqueData}
                                            dataKey="value"
                                            formatter={(val) => `${(val / 1000).toFixed(1)}k`}
                                        />
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        {project.metrics.map((metric) => (
                                            <div key={metric.label} className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    isTerminalMode ? "bg-green-900/20" : "bg-primary/5"
                                                )}>
                                                    <metric.icon className={cn(
                                                        "h-4 w-4",
                                                        isTerminalMode ? "text-green-500" : "text-primary"
                                                    )} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                                                    <p className="text-sm font-bold text-foreground">{metric.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className={cn(
                                                "text-xs font-normal",
                                                isTerminalMode ? "bg-green-900/20 text-green-400 hover:bg-green-900/30" : "bg-white/50 text-muted-foreground hover:bg-white/80"
                                            )}>
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>


                                </CardContent>
                                <CardFooter className="p-0 pt-4">
                                    <Link
                                        href={project.link}
                                        className={cn(
                                            "flex items-center justify-between w-full px-6 py-3 rounded-full text-sm font-semibold transition-all group",
                                            isTerminalMode
                                                ? "bg-green-900/20 text-green-500 hover:bg-green-900/30 border border-green-800/50"
                                                : "bg-white text-foreground hover:shadow-md border border-white/60 hover:border-blue-200"
                                        )}
                                    >
                                        Read Case Study
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
