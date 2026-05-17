"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TrendingUp, ShoppingBag, MapPin } from "lucide-react";

interface CaseStudiesDropdownProps {}

const caseStudies = [
    {
        title: "Health Supply 770",
        description: "$1.3M+ Revenue via Automation",
        href: "/projects/health-supply-770",
        icon: TrendingUp,
        color: "text-blue-500",
    },
    {
        title: "Fantasialife.com",
        description: "Shopify SEO Architecture",
        href: "/projects/fantasialife",
        icon: ShoppingBag,
        color: "text-purple-500",
    },
    {
        title: "Epoptique",
        description: "Local SEO Domination",
        href: "/projects/epoptique",
        icon: MapPin,
        color: "text-orange-500",
    },
];

export function CaseStudiesDropdown({}: CaseStudiesDropdownProps) {
    const lang = "en";
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 p-2 rounded-2xl border backdrop-blur-xl shadow-2xl z-50",
                "bg-white/80 border-white/20 shadow-black/10"
            )}
        >
            {/* Arrow */}
            <div className={cn(
                "absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-l border-t",
                "bg-white border-white/20"
            )} />
            <div className="relative z-10 flex flex-col gap-1">
                {caseStudies.map((study) => (
                    <Link
                        key={study.title}
                        href={`/${lang}${study.href}`}
                        className={cn(
                            "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                            "hover:bg-black/5"
                        )}
                    >
                        <div className={cn(
                            "p-2 rounded-lg transition-colors",
                            "bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-sm"
                        )}>
                            <study.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <div className={cn(
                                "text-sm font-semibold transition-colors",
                                "text-foreground"
                            )}>
                                {study.title}
                            </div>
                            <div className={cn(
                                "text-xs transition-colors",
                                "text-muted-foreground"
                            )}>
                                {study.description}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
