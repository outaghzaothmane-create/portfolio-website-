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
            <header className="fixed top-3 sm:top-6 left-0 z-[999] flex w-full justify-center px-2 pointer-events-none">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                        "w-full max-w-[calc(100vw-1rem)] min-h-14 rounded-full pointer-events-auto transition-all duration-500 sm:w-fit",
                        "flex items-center justify-between gap-1 overflow-hidden px-1.5 sm:px-2 md:justify-center md:overflow-visible md:px-4",
                        "bg-white/20 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/50"
                    )}
                >
                    {/* Logo */}
                    <Link
                        href={localePrefix || "/"}
                        className={cn(
                            "flex min-h-11 shrink min-w-0 items-center gap-2 rounded-full px-2 py-2 transition-all sm:px-3",
                            "hover:bg-white/50"
                        )}
                    >
                        <span className={cn("truncate whitespace-nowrap text-sm font-bold sm:text-lg", "text-foreground")}>
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
                    <div className="flex shrink-0 items-center gap-1 pl-1 sm:gap-2 sm:pl-2">

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
                                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                                    aria-expanded={isOpen}
                                    aria-controls="mobile-navigation"
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
                                id="mobile-navigation"
                                className={cn(
                                    "w-full max-h-[92vh] overflow-y-auto border-b backdrop-blur-xl px-4 pt-20 pb-8",
                                    "bg-white/90 border-white/20 text-foreground"
                                )}
                            >
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <nav className="flex flex-col items-center gap-4">
                                    <div className="mb-1 flex justify-center">
                                        <LanguageSwitcher />
                                    </div>
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex min-h-12 w-full max-w-sm items-center justify-center rounded-xl px-4 text-center text-lg font-medium transition-colors sm:text-xl",
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
                                            "mt-2 min-h-12 w-full max-w-sm rounded-full px-6 text-base font-medium transition-all shadow-lg",
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
