"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, BarChart, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Skills({ dict }: { dict?: any }) {
    const safeDict = dict || {
        title: "Tech Stack",
        subtitle: "The tools and technologies powering my workflows.",
        items: [
            {
                title: "SEO & Analytics",
                skills: ["GA4", "Google Search Console", "Screaming Frog", "Looker Studio", "Google Tag Manager", "Universal Commerce Protocol (UCP)", "Generative Engine Optimization (GEO)", "LLM Optimization"],
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "group-hover:border-blue-500/50",
                badgeBg: "bg-blue-500/5",
                badgeText: "text-blue-700"
            },
            {
                title: "Automation",
                skills: ["Make.com", "n8n (Self-Hosted)", "Brevo (Email Automation)"],
                color: "text-purple-500",
                bg: "bg-purple-500/10",
                border: "group-hover:border-purple-500/50",
                badgeBg: "bg-purple-500/5",
                badgeText: "text-purple-700"
            },
            {
                title: "Tech Stack",
                skills: ["WordPress", "Shopify", "Python Basics", "HTML/CSS", "Model Context Protocol (MCP)"],
                color: "text-orange-500",
                bg: "bg-orange-500/10",
                border: "group-hover:border-orange-500/50",
                badgeBg: "bg-orange-500/5",
                badgeText: "text-orange-700"
            }
        ]
    };

    const icons = [BarChart, Settings, Code2];

    return (
        <section id="tech-stack" className="w-full py-16 bg-transparent">
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{safeDict.title}</h2>
                <p className="text-sm sm:text-base text-muted-foreground">{safeDict.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {safeDict.items.map((group: any, index: number) => {
                    const Icon = icons[index];
                    return (
                    <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="h-full"
                    >
                        <Card className={cn(
                            "h-full relative min-w-0 overflow-hidden transition-all duration-300 group rounded-2xl sm:rounded-3xl border",
                            "bg-white/50 backdrop-blur-sm border-black/5 hover:shadow-xl",
                            group.border
                        )}>
                            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
                                <CardTitle className={cn(
                                    "text-base sm:text-lg font-bold leading-tight transition-colors",
                                    "text-foreground/80"
                                )}>
                                    {group.title}
                                </CardTitle>
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                                    group.bg
                                )}>
                                    <Icon className={cn(
                                        "h-6 w-6 transition-colors",
                                        group.color
                                    )} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {group.skills.map((skill: string, i: number) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (index * 0.1) + (i * 0.05), type: "spring" }}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "max-w-full whitespace-normal break-words text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                                    `${group.badgeBg} ${group.badgeText} border-transparent hover:bg-opacity-100`
                                                )}
                                            >
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )})}
            </div>
        </section>
    );
}
