"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, Calendar, TrendingUp } from "lucide-react";

const experienceData = [
    {
        role: "Technical SEO Architect & AI Automation Lead",
        company: "Health Supply 770",
        period: "Feb 2024 - Present",
        impact: "Generated $1.3M revenue, Automating technical audits with Make.com",
        achievements: [
            "Achieved 494 AI citations (383 ChatGPT, 111 Perplexity) via Generative Engine Optimization (GEO).",
            "Skyrocketed domain authority by 11x (DR 2.6 → 30) via programmatic link acquisition.",
            "Built self-healing n8n/Make.com automations via AI-assisted 'vibe coding' workflows."
        ],
        tags: ["Make.com", "Brevo", "Technical SEO", "UCP", "GEO"],
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "group-hover:border-green-500/50"
    },
    {
        role: "SEO Manager",
        company: "Tingis Web",
        period: "Jun 2023 - May 2024",
        impact: "Increased organic traffic by 80% in 3 months, Led PR backlink campaigns",
        achievements: [
            "Increased organic traffic by 80% in 3 months through targeted content optimization.",
            "Led PR backlink campaigns resulting in high-authority mentions."
        ],
        tags: ["PR Strategy", "Organic Growth", "Team Lead"],
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "group-hover:border-blue-500/50"
    },
    {
        role: "SEO Specialist",
        company: "Epoptique.ma",
        period: "Jan 2022 - Present",
        impact: "Long-term SEO strategy and optimization",
        achievements: [
            "Implemented long-term SEO strategy resulting in sustained organic growth.",
            "Optimized site architecture for better crawlability and user experience."
        ],
        tags: ["E-commerce", "Content Strategy"],
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/50"
    },
];

export function Experience() {
    return (
        <section id="experience" className="w-full py-16 bg-transparent">
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">SEO & Automation Results</h2>
                    <Badge variant="outline" className="text-muted-foreground">Last 3 Years</Badge>
                </div>
                <p className="text-muted-foreground">Track record of delivering measurable results.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {experienceData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="h-full"
                    >
                        <Card className={cn(
                            "h-full relative overflow-hidden transition-all duration-300 group rounded-3xl border",
                            "bg-white/50 backdrop-blur-sm border-black/5 hover:shadow-xl",
                            false
                        )}>
                            <CardHeader className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className={cn(
                                            "text-xl font-bold transition-colors",
                                            "text-foreground/80"
                                        )}>
                                            {item.role}
                                        </CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Briefcase className="h-3 w-3" />
                                            {item.company}
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className={cn(
                                        "text-xs font-normal",
                                        "bg-black/5 text-black/70"
                                    )}>
                                        {item.period}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className={cn(
                                    "p-4 rounded-2xl transition-colors",
                                    "bg-black/5"
                                )}>
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className={cn(
                                            "h-5 w-5 mt-0.5 shrink-0",
                                            item.color
                                        )} />
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium leading-relaxed">
                                                {item.impact}
                                            </p>
                                            {item.achievements && (
                                                <ul className="space-y-2">
                                                    {item.achievements.map((achievement, i) => (
                                                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                                            <span className={cn("mt-2 h-1.5 w-1.5 rounded-full shrink-0 opacity-70", item.color.replace('text-', 'bg-'))} />
                                                            <span className="leading-relaxed opacity-90">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {item.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className={cn(
                                                "text-xs border-0",
                                                "bg-black/5 text-muted-foreground"
                                            )}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
