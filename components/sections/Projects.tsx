"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTerminal } from "@/components/providers/terminal-context";

export function Projects() {
    const { isTerminalMode } = useTerminal();

    return (
        <section id="projects" className="w-full bg-slate-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Case Studies</h2>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="https://www.linkedin.com/in/othmaneoutaghza/" target="_blank">View All Projects</Link>
                    </Button>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-6 md:grid-cols-3"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={fadeInUp}
                            whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Card className={cn(
                                "flex flex-col group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 h-full",
                                isTerminalMode ? "bg-black/90 border-green-800" : "bg-white"
                            )}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                {project.title}
                                            </CardTitle>
                                            <CardDescription className="font-medium text-primary/80">{project.client}</CardDescription>
                                        </div>
                                        <div className="p-2 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 flex-1">
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

                                    <div className="grid grid-cols-2 gap-4 py-2">
                                        {project.metrics.map((metric) => (
                                            <div key={metric.label} className="flex items-center gap-2">
                                                <div className="p-1.5 bg-primary/10 rounded-md">
                                                    <metric.icon className="h-3.5 w-3.5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                                                    <p className="text-sm font-bold text-foreground">{metric.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-primary group-hover:translate-x-1 transition-transform" asChild>
                                        <Link href={project.link}>
                                            Read Case Study <ArrowUpRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
