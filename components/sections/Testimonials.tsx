"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTerminal } from "@/components/providers/terminal-context";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        quote: "Othmane didn't just fix our SEO; he built an automation engine that saved us 20+ hours a week. The $1.3M revenue growth speaks for itself.",
        author: "The Efficiency Expert",
        role: "CEO, Health Supply 770",
    },
    {
        quote: "Rarely do you find an SEO who can code Python and fix server logs. Othmane transformed our technical infrastructure in months.",
        author: "Technical Wizard",
        role: "Manager, Tingis Web",
    },
    {
        quote: "We went from invisible to ranking #1 for 50+ keywords. His local SEO strategy is aggressive and effective.",
        author: "Local Market Domination",
        role: "Owner, Epoptique",
    },
];

export function Testimonials() {
    const { isTerminalMode } = useTerminal();

    return (
        <section className="w-full py-12 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-12">
                    <Quote className={cn("h-8 w-8", isTerminalMode ? "text-green-500" : "text-primary")} />
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Client Feedback</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className={cn(
                                "h-full transition-all duration-300 relative overflow-hidden",
                                isTerminalMode
                                    ? "bg-black/95 border-green-800 hover:border-green-700 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                                    : "bg-white/50 backdrop-blur-sm border-gray-100 hover:shadow-lg hover:border-primary/20"
                            )}>
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <CheckCircle2 className={cn("h-4 w-4", isTerminalMode ? "text-green-500" : "text-green-600")} />
                                            Verified Client
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className={cn(
                                        "text-lg leading-relaxed italic",
                                        isTerminalMode ? "text-green-400" : "text-gray-700"
                                    )}>
                                        "{item.quote}"
                                    </p>
                                    <div>
                                        <p className="font-bold text-foreground">{item.author}</p>
                                        <p className="text-sm text-muted-foreground">{item.role}</p>
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
