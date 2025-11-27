"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart3, Layers, Mail, Menu, Terminal, LineChart, ShoppingBag, MapPin, Download, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AuditModal } from "@/components/ui/audit-modal";
import { useTerminal } from "@/components/providers/terminal-context";
import { Switch } from "@/components/ui/switch";

const navItems = [
    { name: "Tech Stack", href: "#tech-stack", icon: Layers },
    { name: "Projects", href: "#projects", icon: LayoutDashboard },
    { name: "Services", href: "#services", icon: BarChart3 },
];

const caseStudies = [
    { title: "Health Supply 770", href: "/projects/health-supply-770", icon: LineChart },
    { title: "Fantasialife", href: "/projects/fantasialife", icon: ShoppingBag },
    { title: "Epoptique", href: "/projects/epoptique", icon: MapPin },
];

export function Header() {
    const [activeSection, setActiveSection] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showAudit, setShowAudit] = useState(false);
    const { isTerminalMode, toggleTerminalMode } = useTerminal();

    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-6 left-0 right-0 z-50 max-w-6xl mx-auto w-[95%] md:w-full"
            >
                <div className={cn(
                    "backdrop-blur-xl border shadow-2xl rounded-full px-8 py-4 flex items-center justify-between transition-all duration-300 relative",
                    isTerminalMode ? "bg-black/80 border-green-800" : "bg-white/90 border-white/20"
                )}>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
                            <span className={cn("text-primary", isTerminalMode && "text-green-500")}>Othmane</span>
                            <span className={cn("text-muted-foreground/60", isTerminalMode && "text-green-700")}>.SEO</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.slice(0, 3).map((item) => {
                            const isActive = activeSection === item.href.substring(1);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className={cn(
                                                "absolute inset-0 rounded-full -z-10",
                                                isTerminalMode ? "bg-green-900/30" : "bg-gray-100"
                                            )}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Case Studies Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="/#projects"
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full flex items-center gap-2",
                                    activeSection === "projects" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeSection === "projects" && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className={cn(
                                            "absolute inset-0 rounded-full -z-10",
                                            isTerminalMode ? "bg-green-900/30" : "bg-gray-100"
                                        )}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">Case Studies</span>
                            </Link>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-2 overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-1">
                                            {caseStudies.map((study) => (
                                                <Link
                                                    key={study.href}
                                                    href={study.href}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-50 rounded-lg transition-colors group"
                                                >
                                                    <div className="p-2 bg-gray-100 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">
                                                        <study.icon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="font-medium">{study.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Contact Link */}
                        {/* Contact Link */}
                        <a
                            href="https://calendly.com/outaghza-othmane/seo-meeting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                                activeSection === "contact" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {activeSection === "contact" && (
                                <motion.div
                                    layoutId="navbar-active"
                                    className={cn(
                                        "absolute inset-0 rounded-full -z-10",
                                        isTerminalMode ? "bg-green-900/30" : "bg-gray-100"
                                    )}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                Contact
                            </span>
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <span className={cn("text-xs font-medium", isTerminalMode ? "text-green-600" : "text-muted-foreground")}>
                                Dev Mode
                            </span>
                            <Switch
                                checked={isTerminalMode}
                                onCheckedChange={toggleTerminalMode}
                                className="data-[state=checked]:bg-green-500"
                            />
                        </div>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "hidden md:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                                "h-8 rounded-full px-3 text-xs", // size="sm"
                                "border shadow-sm", // variant="outline" base
                                isTerminalMode
                                    ? "border-green-800 hover:bg-green-900/20 text-green-500 bg-black/90"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700 bg-background"
                            )}
                        >
                            <Download className="h-4 w-4" />
                            {isTerminalMode ? "export_resume.json" : "Download CV"}
                        </a>

                        <Button
                            size="sm"
                            className="flex rounded-full font-medium animate-pulse-scale text-xs px-3 h-8 md:text-sm md:px-4 md:h-9"
                            onClick={() => setShowAudit(true)}
                        >
                            Get Free Audit
                        </Button>

                        {/* Mobile Nav */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                                                activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                    {/* Mobile Case Studies Links */}
                                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Case Studies</p>
                                        {caseStudies.map((study) => (
                                            <Link
                                                key={study.href}
                                                href={study.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <study.icon className="h-4 w-4" />
                                                {study.title}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-t border-b">
                                        <span className="font-medium">Dev Mode</span>
                                        <Switch
                                            checked={isTerminalMode}
                                            onCheckedChange={toggleTerminalMode}
                                        />
                                    </div>
                                    <Button className="mt-4 w-full rounded-full animate-pulse-scale" onClick={() => { setIsOpen(false); setShowAudit(true); }}>
                                        Get Free Audit
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.header>
            <AuditModal isOpen={showAudit} onClose={() => setShowAudit(false)} />
        </>
    );
}
