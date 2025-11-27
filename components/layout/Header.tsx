"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart3, Layers, Mail, Menu, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AuditModal } from "@/components/ui/audit-modal";
import { useTerminal } from "@/components/providers/terminal-context";
import { Switch } from "@/components/ui/switch";

const navItems = [
    { name: "Overview", href: "#overview", icon: LayoutDashboard },
    { name: "Performance", href: "#performance", icon: BarChart3 },
    { name: "Tech Stack", href: "#tech-stack", icon: Layers },
    { name: "Case Studies", href: "#projects", icon: Layers },
    { name: "Contact", href: "#contact", icon: Mail },
];

export function Header() {
    const [activeSection, setActiveSection] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showAudit, setShowAudit] = useState(false);
    const { isTerminalMode, toggleTerminalMode } = useTerminal();

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
            <header className="fixed top-6 left-0 right-0 z-50 max-w-5xl mx-auto w-[95%] md:w-full">
                <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
                            <span className="text-primary">Othmane</span>
                            <span className="text-muted-foreground/60">.SEO</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
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
                                            className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {/* Icon hidden on desktop for cleaner look as per "Command Center" usually text heavy or minimal icons, 
                                           but keeping icons if user wants them. User didn't explicitly say remove icons, but "Floating Command Center" usually implies clean.
                                           I'll keep them but maybe make them subtle or just text? 
                                           User said "Floating Island centered... Magnetic Pill...". 
                                           I'll keep the icons as they were in the original but maybe smaller? 
                                           Original had icons. I'll keep them. */}
                                        {/* <item.icon className="h-4 w-4" /> */}
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
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

                        <Button
                            size="sm"
                            className="hidden md:flex rounded-full font-medium"
                            onClick={() => setShowAudit(true)}
                        >
                            Audit My Site
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
                                    <div className="flex items-center justify-between py-4 border-t border-b">
                                        <span className="font-medium">Dev Mode</span>
                                        <Switch
                                            checked={isTerminalMode}
                                            onCheckedChange={toggleTerminalMode}
                                        />
                                    </div>
                                    <Button className="mt-4 w-full rounded-full" onClick={() => { setIsOpen(false); setShowAudit(true); }}>
                                        Audit My Site
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <AuditModal isOpen={showAudit} onClose={() => setShowAudit(false)} />
        </>
    );
}
