"use client";

import { motion } from "framer-motion";
import { TrendingUp, Workflow, Cpu, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "The \"Growth Retainer\"",
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
        title: "The \"Automation Systems\" Build",
        subtitle: "Eliminate Manual Work",
        icon: Workflow,
        color: "text-purple-500",
        glow: "group-hover:shadow-purple-500/20",
        target: "For: Teams drowning in manual data work",
        features: [
            "Building custom Make.com / n8n workflows",
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

export function Services() {
    const { isTerminalMode } = useTerminal();

    return (
        <section id="services" className="w-full py-12 md:py-24 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">Engagement Models</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Flexible engagement models tailored to your specific needs and growth stage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className={cn(
                                "h-full transition-all duration-300 relative overflow-hidden flex flex-col group",
                                isTerminalMode
                                    ? "bg-black/95 border-green-800 hover:border-green-700 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                                    : `bg-white border-gray-200 hover:shadow-xl ${service.glow}`
                            )}>
                                <CardHeader>
                                    <div className={cn(
                                        "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                                        isTerminalMode ? "bg-green-900/20" : "bg-gray-50 group-hover:bg-white"
                                    )}>
                                        <service.icon className={cn(
                                            "h-6 w-6 transition-all duration-300",
                                            isTerminalMode ? "text-green-500" : service.color,
                                            !isTerminalMode && "group-hover:scale-110 group-hover:drop-shadow-md"
                                        )} />
                                    </div>
                                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                                    <p className={cn(
                                        "text-sm font-medium",
                                        isTerminalMode ? "text-green-600" : "text-muted-foreground"
                                    )}>
                                        {service.subtitle}
                                    </p>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                        <Badge variant="outline" className={cn(
                                            "w-full justify-center py-1",
                                            isTerminalMode ? "border-green-800 text-green-400" : "bg-gray-50 text-gray-600 border-gray-200"
                                        )}>
                                            {service.target}
                                        </Badge>

                                        <ul className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <span className={cn(
                                                        "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                                                        isTerminalMode ? "bg-green-500" : service.color.replace("text-", "bg-")
                                                    )} />
                                                    <span className={isTerminalMode ? "text-green-400/80" : ""}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <p className={cn(
                                            "text-sm italic border-l-2 pl-3",
                                            isTerminalMode ? "text-green-500 border-green-800" : "text-gray-600 border-gray-200"
                                        )}>
                                            "{service.why}"
                                        </p>

                                        <a
                                            href={service.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                "flex items-center gap-2 text-sm font-semibold pt-4 border-t transition-colors",
                                                isTerminalMode
                                                    ? "text-green-500 border-green-900 hover:text-green-400"
                                                    : `${service.color} border-gray-100 hover:opacity-80`
                                            )}
                                        >
                                            Book Strategy Call <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
