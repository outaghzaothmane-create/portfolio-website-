"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Testimonials({ dict }: { dict?: any }) {
    const safeDict = dict || {
        title: "Client Feedback",
        verifiedClient: "Verified Client",
        items: [
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
            }
        ]
    };

    return (
        <section className="w-full py-14 sm:py-16 overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-12">
                    <Quote className={cn("h-8 w-8", "text-primary")} />
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{safeDict.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {safeDict.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <Card className={cn(
                                "h-full transition-all duration-500 relative overflow-hidden",
                                "rounded-2xl sm:rounded-[2rem] p-5 sm:p-8",
                                "bg-white/40 backdrop-blur-md border border-white/40 hover:shadow-xl shadow-sm"
                            )}>
                                <CardHeader className="p-0 pb-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <CheckCircle2 className={cn("h-4 w-4", "text-green-600")} />
                                            {safeDict.verifiedClient}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 p-0">
                                    <p className={cn(
                                        "text-base sm:text-lg leading-relaxed italic",
                                        "text-gray-700"
                                    )}>
                                        &ldquo;{item.quote}&rdquo;
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
