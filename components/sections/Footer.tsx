"use client";

import Link from "next/link";
import { Download, MapPin, Clock, Linkedin, Mail, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OrbitSpace } from "@/components/ui/orbit-space";
import { cn } from "@/lib/utils";
import { useTerminal } from "@/components/providers/terminal-context";
import { motion } from "framer-motion";

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
        <footer className="w-full py-10 flex justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "relative w-full max-w-5xl overflow-hidden",
                    "rounded-[2.5rem] border border-white/20 shadow-2xl",
                    "bg-white/80 backdrop-blur-xl",
                    "transition-colors duration-300",
                    isTerminalMode && "bg-black/80 border-green-900/50"
                )}
            >
                {/* Background Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <OrbitSpace density="low" />
                </div>

                <div className="relative z-10 p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                        {/* Column 1: Identity */}
                        <div className="space-y-6">
                            <Link href="/" className="group flex items-center gap-2 font-bold text-2xl">
                                <span className={cn("transition-colors", isTerminalMode ? "text-green-500" : "text-foreground")}>Othmane</span>
                                <span className={cn("transition-colors", isTerminalMode ? "text-green-700" : "text-muted-foreground/60")}>.SEO</span>
                            </Link>
                            <p className={cn("font-medium text-sm max-w-xs", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                Engineered in Morocco
                                <span className={cn("inline-block ml-2 text-xs px-1.5 py-0.5 rounded font-mono", isTerminalMode ? "bg-green-900/30 text-green-400" : "bg-secondary text-secondary-foreground")}>MA</span>
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "rounded-full gap-2 transition-all hover:shadow-md",
                                    isTerminalMode ? "border-green-800 text-green-500 hover:bg-green-900/20" : "border-border hover:border-primary/50 hover:text-primary"
                                )}
                            >
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    Download Resume
                                </a>
                            </Button>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="space-y-6">
                            <h3 className={cn("font-mono text-xs font-semibold uppercase tracking-wider", isTerminalMode ? "text-green-500" : "text-foreground/80")}>Navigation</h3>
                            <nav className="flex flex-col gap-3">
                                {[
                                    { name: "Overview", href: "#overview" },
                                    { name: "Case Studies", href: "#projects" },
                                    { name: "Tech Stack", href: "#tech-stack" },
                                    { name: "Services", href: "#services" }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "text-sm font-medium transition-colors w-fit",
                                            isTerminalMode ? "text-green-600 hover:text-green-400" : "text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Column 3: System Status */}
                        <div className="space-y-6">
                            <h3 className={cn("font-mono text-xs font-semibold uppercase tracking-wider", isTerminalMode ? "text-green-500" : "text-foreground/80")}>System Status</h3>
                            <div className={cn(
                                "rounded-2xl p-4 space-y-3 border backdrop-blur-sm",
                                isTerminalMode ? "bg-black/40 border-green-900/30" : "bg-secondary/50 border-white/40 shadow-sm"
                            )}>
                                <div className={cn("flex items-center gap-3 text-sm font-medium", isTerminalMode ? "text-green-400" : "text-foreground")}>
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    All Systems Operational
                                </div>
                                <div className={cn("flex items-center gap-3 text-sm", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                    <MapPin className="h-4 w-4 opacity-70" />
                                    Casablanca, MA
                                </div>
                                <div className={cn("flex items-center gap-3 text-sm font-mono", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                    <Clock className="h-4 w-4 opacity-70" />
                                    {time || "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className={cn(
                        "mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6",
                        isTerminalMode ? "border-green-900/30" : "border-border/30"
                    )}>
                        <div className="flex items-center gap-6">
                            {[
                                { icon: Linkedin, href: "https://www.linkedin.com/in/othmaneoutaghza/" },
                                { icon: Mail, href: "mailto:outaghza.othmane@gmail.com" },
                                { icon: Github, href: "https://github.com/outaghzaothmane-create" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "transition-all hover:scale-110",
                                        isTerminalMode ? "text-green-600 hover:text-green-400" : "text-muted-foreground hover:text-primary"
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
