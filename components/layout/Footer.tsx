"use client";

import Link from "next/link";
import { Download, MapPin, Clock, Linkedin, Mail, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OrbitSpace } from "@/components/ui/orbit-space";

export function Footer() {
    const [time, setTime] = useState<string>("");

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
        <footer className="w-full bg-gray-50 border-t border-gray-200 pt-16 pb-8 relative overflow-hidden">
            <OrbitSpace density="low" className="opacity-50" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
                    {/* Column 1: Identity */}
                    <div className="space-y-6">
                        <Link href="/" className="font-bold text-2xl block">
                            <span className="text-gray-900">Othmane</span>
                            <span className="text-gray-400">.SEO</span>
                        </Link>
                        <p className="text-gray-600 font-mono text-sm">
                            Engineered in Morocco
                            <span className="inline-block ml-2 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">MA</span>
                        </p>
                        <Button variant="outline" size="sm" className="gap-2 text-gray-600 border-gray-300 hover:bg-white hover:text-gray-900">
                            <Download className="h-4 w-4" />
                            Download Resume
                        </Button>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="space-y-6">
                        <h3 className="font-mono text-sm font-semibold text-gray-900 uppercase tracking-wider">Navigation</h3>
                        <nav className="flex flex-col gap-3">
                            <Link href="#overview" className="text-gray-600 hover:text-gray-900 font-mono text-sm transition-colors">Overview</Link>
                            <Link href="#projects" className="text-gray-600 hover:text-gray-900 font-mono text-sm transition-colors">Case Studies</Link>
                            <Link href="#tech-stack" className="text-gray-600 hover:text-gray-900 font-mono text-sm transition-colors">Tech Stack</Link>
                        </nav>
                    </div>

                    {/* Column 3: Live Status */}
                    <div className="space-y-6">
                        <h3 className="font-mono text-sm font-semibold text-gray-900 uppercase tracking-wider">System Status</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
                            <div className="flex items-center gap-3 text-sm font-mono text-gray-600">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                All Systems Operational
                            </div>
                            <div className="flex items-center gap-3 text-sm font-mono text-gray-600">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                Casablanca, MA
                            </div>
                            <div className="flex items-center gap-3 text-sm font-mono text-gray-600">
                                <Clock className="h-4 w-4 text-gray-400" />
                                {time || "Loading..."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Social & Copyright */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex items-center gap-6">
                        <a href="https://www.linkedin.com/in/othmaneoutaghza/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] hover:scale-110 transition-all">
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a href="mailto:outaghza.othmane@gmail.com" className="text-gray-400 hover:text-gray-900 hover:scale-110 transition-all">
                            <Mail className="h-6 w-6" />
                        </a>
                        <a href="https://github.com/outaghzaothmane-create" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black hover:scale-110 transition-all">
                            <Github className="h-6 w-6" />
                        </a>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">
                        © {new Date().getFullYear()} Othmane Outaghza. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
