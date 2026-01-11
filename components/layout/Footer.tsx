"use client";

import Link from "next/link";
import { Download, MapPin, Clock, Linkedin, Mail, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { cn } from "@/lib/utils";
import { useTerminal } from "@/components/providers/terminal-context";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Footer() {
    const [time, setTime] = useState<string>("");
    const { isTerminalMode } = useTerminal();

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
        <footer className="w-full py-6 flex justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "relative w-full max-w-7xl overflow-hidden",
                    "rounded-[2.5rem] border transition-all duration-500",
                    isTerminalMode
                        ? "bg-black/70 backdrop-blur-xl border-green-900/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                        : "bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5"
                )}
            >
                {/* Background Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <OrbitSpace density="low" />
                </div>

                <div className="relative z-10 p-6 md:p-12 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        {/* Brand (Cols 1-4) */}
                        <div className="md:col-span-4 space-y-6 flex flex-col items-center md:items-start">
                            <Link href="/" className="group flex items-center gap-2 font-bold text-2xl">
                                <span className={cn("transition-colors", isTerminalMode ? "text-green-500" : "text-foreground")}>Othmane</span>
                                <span className={cn("transition-colors", isTerminalMode ? "text-green-700" : "text-muted-foreground/60")}>.SEO</span>
                            </Link>
                            <p className={cn("font-medium text-sm max-w-xs", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                Engineered in Morocco
                                <span className={cn(
                                    "inline-block ml-2 text-xs px-2 py-0.5 rounded-full font-mono transition-colors",
                                    isTerminalMode ? "bg-green-900/30 text-green-400 border border-green-800/50" : "bg-gray-100 text-gray-600 border border-gray-200"
                                )}>MA</span>
                            </p>
                            <MagneticButton
                                href="./resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "shadow-sm transition-colors",
                                    isTerminalMode
                                        ? "bg-green-900/20 text-green-500 border-green-500 hover:bg-green-500 hover:text-black transition-all"
                                        : "bg-black text-white hover:bg-black/90 border-transparent"
                                )}
                            >
                                <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium">
                                    <Download className="h-3 w-3" />
                                    Download Resume
                                </div>
                            </MagneticButton>
                        </div>

                        {/* Navigation (Cols 5-8) */}
                        <div className="md:col-span-4 space-y-6 flex flex-col items-center md:items-start">
                            <h3 className={cn("font-mono text-xs font-semibold uppercase tracking-wider", isTerminalMode ? "text-green-500" : "text-foreground/80")}>Navigation</h3>
                            <nav className="flex flex-col gap-3 items-center md:items-start">
                                {[
                                    { name: "Overview", href: "#overview" },
                                    { name: "Case Studies", href: "/#projects" },
                                    { name: "Tech Stack", href: "#tech-stack" },
                                    { name: "Services", href: "#services" }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "text-sm font-medium transition-colors w-fit",
                                            isTerminalMode
                                                ? "text-green-600 hover:text-green-400"
                                                : "text-muted-foreground hover:text-blue-600"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* System Status Widget (Cols 9-12) */}
                        <div className="md:col-span-4 space-y-6 flex flex-col items-center md:items-start">
                            <h3 className={cn("font-mono text-xs font-semibold uppercase tracking-wider", isTerminalMode ? "text-green-500" : "text-foreground/80")}>System Status</h3>
                            <div className={cn(
                                "rounded-2xl p-5 space-y-4 border backdrop-blur-sm transition-colors duration-300",
                                isTerminalMode
                                    ? "bg-green-900/10 border-green-900/30"
                                    : "bg-white/50 border-white/40 shadow-sm"
                            )}>
                                <div className={cn("flex items-center justify-center md:justify-start gap-3 text-sm font-medium", isTerminalMode ? "text-green-400" : "text-foreground")}>
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isTerminalMode ? "bg-green-400" : "bg-green-500")}></span>
                                        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", isTerminalMode ? "bg-green-500" : "bg-green-500")}></span>
                                    </span>
                                    All Systems Operational
                                </div>
                                <div className={cn("flex items-center justify-center md:justify-start gap-3 text-sm", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                    <MapPin className="h-4 w-4 opacity-70" />
                                    Casablanca, MA
                                </div>
                                <div className={cn("flex items-center justify-center md:justify-start gap-3 text-sm font-mono", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                    <Clock className="h-4 w-4 opacity-70" />
                                    {time || "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className={cn(
                        "mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6",
                        isTerminalMode ? "border-green-900/30" : "border-black/5"
                    )}>
                        <div className="flex items-center gap-6">
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
                                        "transition-all hover:scale-110",
                                        isTerminalMode
                                            ? "text-green-600 hover:text-green-400"
                                            : "text-muted-foreground hover:text-blue-600"
                                    )}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                        <p className={cn("text-xs font-medium", isTerminalMode ? "text-green-700" : "text-muted-foreground/60")}>
                            © {new Date().getFullYear()} Othmane Outaghza. All rights reserved.
                        </p>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
