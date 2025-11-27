"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";

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
        link: "#",
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
        link: "#",
    },
    {
        title: "WordPress Performance Optimization",
        client: "Mediaport.ma",
        description: "Speed optimization and core web vitals improvement for a high-traffic media site. Reduced load times and improved Google PageSpeed scores significantly.",
        tags: ["WordPress", "Performance", "Core Web Vitals"],
        metrics: [
            { label: "LCP", value: "0.8s", icon: Zap },
            { label: "CLS", value: "0.01", icon: Zap },
        ],
        link: "#",
    },
];

export function Projects() {
    return (
        <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Case Studies</h2>
                <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.linkedin.com/in/othmaneoutaghza/" target="_blank">View All Projects</Link>
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.title} className="flex flex-col group hover:shadow-lg transition-all duration-300 border-muted-foreground/20">
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
                ))}
            </div>
        </section>
    );
}
