"use client";

import Link from "next/link";
import { Download, MapPin, Clock, Linkedin, Mail, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Footer({ dict, lang = "en" }: { dict?: any, lang?: string }) {
    const [time, setTime] = useState<string>("");

    const safeDict = dict || {
        engineered: "Engineered in Morocco",
        downloadResume: "Download Resume",
        navigation: "Navigation",
        overview: "Overview",
        services: "Services",
        projects: "Projects",
        blog: "Blog",
        systemStatus: "System Status",
        operational: "Operational",
        loading: "Loading...",
        casablanca: "Casablanca, MA",
        rightsReserved: "Othmane Outaghza. All rights reserved."
    };

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZoneName: "short"
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "responsive-container relative overflow-hidden",
                    "rounded-2xl sm:rounded-[2.5rem] border transition-all duration-500",
                    "bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5"
                )}
            >
                {/* Background Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <OrbitSpace density="low" />
                </div>

                <div className="relative z-10 p-6 md:p-12 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 justify-items-center">
                        {/* Brand (Cols 1-4) */}
                        <div className="md:col-span-4 space-y-6 flex flex-col items-center">
                            <Link href={`/${lang}`} className="group flex min-h-11 items-center gap-2 font-bold text-2xl">
                                <span className={cn("transition-colors", "text-foreground")}>Othmane</span>
                                <span className={cn("transition-colors", "text-muted-foreground/60")}>.SEO</span>
                            </Link>
                            <p className={cn("font-medium text-sm max-w-xs text-center", "text-muted-foreground")}>
                                {safeDict.engineered}
                                <span className={cn(
                                    "inline-block ml-2 text-xs px-2 py-0.5 rounded-full font-mono transition-colors",
                                    "bg-gray-100 text-gray-600 border border-gray-200"
                                )}>MA</span>
                            </p>
                            <MagneticButton
                                href="/icons/CV othmane outaghza seo geo aio (1).pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "w-full sm:w-auto shadow-sm transition-colors",
                                    "bg-black text-white hover:bg-black/90 border-transparent"
                                )}
                            >
                                <div className="flex min-w-0 items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-medium">
                                    <Download className="h-3 w-3" />
                                    <span className="min-w-0 break-words">{safeDict.downloadResume}</span>
                                </div>
                            </MagneticButton>
                        </div>

                        {/* Navigation (Cols 5-8) */}
                        <div className="md:col-span-4 space-y-6 flex flex-col items-center">
                            <h3 className={cn("font-mono text-xs font-semibold uppercase", "text-foreground/80")}>{safeDict.navigation}</h3>
                            <nav className="flex flex-col gap-3 items-center">
                                {[
                                    { name: safeDict.overview, href: `/${lang}/#overview` },
                                    { name: safeDict.services, href: `/${lang}/#services` },
                                    { name: safeDict.projects, href: `/${lang}/#projects` },
                                    { name: safeDict.blog, href: `/${lang}/blog/` }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "inline-flex min-h-11 w-fit items-center px-2 text-sm font-medium transition-colors",
                                            "text-muted-foreground hover:text-blue-600"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* System Status Widget (Cols 9-12) */}
                        <div className="md:col-span-4 space-y-6 flex flex-col items-center">
                            <h3 className={cn("font-mono text-xs font-semibold uppercase", "text-foreground/80")}>{safeDict.systemStatus}</h3>
                            <div className={cn(
                                "rounded-2xl p-5 space-y-4 border backdrop-blur-sm transition-colors duration-300 w-full max-w-sm",
                                "bg-white/50 border-white/40 shadow-sm"
                            )}>
                                <div className={cn("flex items-center justify-center gap-3 text-sm font-medium", "text-foreground")}>
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", "bg-green-500")}></span>
                                        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", "bg-green-500")}></span>
                                    </span>
                                    {safeDict.operational}
                                </div>
                                <div className={cn("flex items-center justify-center gap-3 text-sm", "text-muted-foreground")}>
                                    <MapPin className="h-4 w-4 opacity-70" />
                                    <span className="break-words">{safeDict.casablanca}</span>
                                </div>
                                <div className={cn("flex items-center justify-center gap-3 text-sm font-mono", "text-muted-foreground")}>
                                    <Clock className="h-4 w-4 opacity-70" />
                                    {time || safeDict.loading}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className={cn(
                        "mt-12 pt-8 border-t flex flex-col items-center gap-6",
                        "border-black/5"
                    )}>
                        <div className="flex items-center justify-center gap-3">
                            {[
                                { icon: Linkedin, href: "https://www.linkedin.com/in/othmaneoutaghza/", label: "LinkedIn profile" },
                                { icon: Mail, href: "mailto:outaghza.othmane@gmail.com", label: "Send email" },
                                { icon: Github, href: "https://github.com/outaghzaothmane-create", label: "GitHub profile" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={cn(
                                        "flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-110",
                                        "text-muted-foreground hover:text-blue-600"
                                    )}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                        <p className={cn("text-xs font-medium", "text-muted-foreground/60")}>
                            © {new Date().getFullYear()} {safeDict.rightsReserved}
                        </p>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
