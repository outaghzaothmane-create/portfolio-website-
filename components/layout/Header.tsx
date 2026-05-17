"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavDropdown, navDropdowns } from "@/components/layout/NavDropdown";
import { AuditModal } from "@/components/features/AuditModal";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header({ dict, lang }: { dict?: any, lang?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isAuditOpen, setIsAuditOpen] = useState(false);

    const localePrefix = lang ? `/${lang}` : '';
    const safeDict = dict || { nav: { services: "Services", caseStudies: "Case Studies", blog: "Blog", getFreeAudit: "Get Free Audit" } };

    const navItems = [
        { name: safeDict.nav.services, href: `${localePrefix}/#services` },
        { name: safeDict.nav.caseStudies, href: `${localePrefix}/#projects`, dropdownKey: "caseStudies" },
        { name: safeDict.nav.blog, href: `${localePrefix}/blog/` },
    ];

    return (
        <>
            <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} dict={dict?.auditModal} />
            <header className="fixed top-3 sm:top-6 left-0 w-full flex justify-center z-[999] pointer-events-none px-2">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                        "w-fit max-w-full min-h-14 rounded-full pointer-events-auto transition-all duration-500",
                        "flex items-center justify-center gap-1 px-1.5 sm:px-2 md:px-4",
                        "bg-white/20 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/50"
                    )}
                >
                    {/* Logo */}
                    <Link
                        href={localePrefix || "/"}
                        className={cn(
                            "flex min-h-11 items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all",
                            "hover:bg-white/50"
                        )}
                    >
                        <span className={cn("font-bold text-base sm:text-lg whitespace-nowrap", "text-foreground")}>
                            Othmane<span className={"text-muted-foreground"}>.SEO</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredItem(null)}>
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => setHoveredItem(item.name)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                    "relative min-h-11 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center",
                                    "text-muted-foreground hover:text-foreground hover:bg-black/5"
                                    )}
                                >
                                    {item.name}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {hoveredItem === item.name && item.dropdownKey && navDropdowns[item.dropdownKey] && (
                                        <NavDropdown
                                            items={navDropdowns[item.dropdownKey]}
                                            lang={lang}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2">

                        <LanguageSwitcher />

                        <Button
                            onClick={() => setIsAuditOpen(true)}
                            className={cn(
                                "hidden md:flex rounded-full px-6 h-11 font-medium transition-all shadow-lg hover:shadow-xl",
                                "bg-black text-white hover:bg-black/80"
                            )}
                        >
                            {safeDict.nav.getFreeAudit}
                        </Button>

                        {/* Mobile Menu Trigger */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open navigation menu"
                                    className={cn(
                                        "md:hidden rounded-full w-11 h-11 shrink-0",
                                        "text-foreground hover:bg-black/5"
                                    )}
                                >
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="top"
                                className={cn(
                                    "w-full max-h-[92vh] overflow-y-auto border-b backdrop-blur-xl pt-20 pb-8",
                                    "bg-white/90 border-white/20 text-foreground"
                                )}
                            >
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <nav className="flex flex-col items-center gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex min-h-12 w-full max-w-xs items-center justify-center rounded-xl text-xl font-medium transition-colors",
                                                "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setIsAuditOpen(true);
                                        }}
                                        className={cn(
                                            "mt-2 min-h-12 rounded-full px-6 text-base font-medium transition-all shadow-lg",
                                            "bg-black text-white hover:bg-black/80"
                                        )}
                                    >
                                        <span className={cn(false)}>
                                            {safeDict.nav.getFreeAudit}
                                        </span>
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.div>
            </header>
        </>
    );
}
