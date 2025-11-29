"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, BarChart, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

const skillGroups = [
    {
        title: "SEO & Analytics",
        icon: BarChart,
        skills: ["GA4", "Google Search Console", "Screaming Frog", "Looker Studio", "Google Tag Manager"],
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "group-hover:border-blue-500/50",
        badgeBg: "bg-blue-500/5",
        badgeText: "text-blue-700 dark:text-blue-300"
    },
    {
        title: "Automation",
        icon: Settings,
        skills: ["Make.com", "n8n", "Brevo (Email Automation)"],
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/50",
        badgeBg: "bg-purple-500/5",
        badgeText: "text-purple-700 dark:text-purple-300"
    },
    {
        title: "Tech Stack",
        icon: Code2,
        skills: ["WordPress", "Shopify", "Python Basics", "HTML/CSS"],
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "group-hover:border-orange-500/50",
        badgeBg: "bg-orange-500/5",
        badgeText: "text-orange-700 dark:text-orange-300"
    },
];

export function Skills() {
    const { isTerminalMode } = useTerminal();

    return (
        <section id="tech-stack" className="w-full py-16 bg-transparent">
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Tech Ecosystem</h2>
                <p className="text-muted-foreground">The tools and technologies powering my workflows.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {skillGroups.map((group, index) => (
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
                            "h-full relative overflow-hidden transition-all duration-300 group rounded-3xl border",
                            isTerminalMode
                                ? "bg-black/60 backdrop-blur-md border-white/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                                : "bg-white/50 backdrop-blur-sm border-black/5 hover:shadow-xl",
                            isTerminalMode && group.title === "SEO & Analytics" && "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
                            isTerminalMode && group.title === "Automation" && "hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
                            isTerminalMode && group.title === "Tech Stack" && "hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]",
                            !isTerminalMode && group.border
                        )}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className={cn(
                                    "text-lg font-bold transition-colors",
                                    isTerminalMode ? "text-foreground" : "text-foreground/80"
                                )}>
                                    {group.title}
                                </CardTitle>
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                                    isTerminalMode ? "bg-white/5" : group.bg
                                )}>
                                    <group.icon className={cn(
                                        "h-6 w-6 transition-colors",
                                        isTerminalMode ? "text-white/80" : group.color
                                    )} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {group.skills.map((skill, i) => (
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
                                                    "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                                    isTerminalMode
                                                        ? "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                                                        : `${group.badgeBg} ${group.badgeText} border-transparent hover:bg-opacity-100`
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
                ))}
            </div>
        </section>
    );
}
