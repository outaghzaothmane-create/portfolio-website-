"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart3, Layers, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Overview", href: "#overview", icon: LayoutDashboard },
    { name: "Performance", href: "#performance", icon: BarChart3 },
    { name: "Tech Stack", href: "#tech-stack", icon: Layers },
    { name: "Case Studies", href: "#projects", icon: Layers }, // Added Case Studies link
    { name: "Contact", href: "#contact", icon: Mail },
];

import { AuditModal } from "@/components/ui/audit-modal";

export function Header() {
    const [activeSection, setActiveSection] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showAudit, setShowAudit] = useState(false);

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
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
                            <span className="text-primary">Othmane</span>
                            <span className="text-muted-foreground">.SEO</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                                    activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            className="hidden md:flex text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/10"
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
                                    <Button className="mt-4 w-full" onClick={() => { setIsOpen(false); setShowAudit(true); }}>
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
