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

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isAuditOpen, setIsAuditOpen] = useState(false);

    const navItems = [
        { name: "Services", href: "/#services" },
        { name: "Case Studies", href: "/#projects" },
        { name: "Blog", href: "/blog/" },
    ];

    return (
        <>
            <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
            <header className="fixed top-6 left-0 w-full flex justify-center z-[999] pointer-events-none">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                        "w-fit max-w-[90vw] h-14 rounded-full pointer-events-auto transition-all duration-500",
                        "flex items-center justify-center gap-1 px-2 md:px-4",
                        "bg-white/20 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/50"
                    )}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-full transition-all",
                            "hover:bg-white/50"
                        )}
                    >
                        <span className={cn("font-bold text-lg", "text-foreground")}>
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
                                        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 block",
                                        "text-muted-foreground hover:text-foreground hover:bg-black/5"
                                    )}
                                >
                                    {item.name}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {hoveredItem === item.name && navDropdowns[item.name] && (
                                        <NavDropdown
                                            items={navDropdowns[item.name]}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pl-2">


                        <Button
                            onClick={() => setIsAuditOpen(true)}
                            className={cn(
                                "hidden md:flex rounded-full px-6 h-10 font-medium transition-all shadow-lg hover:shadow-xl",
                                "bg-black text-white hover:bg-black/80"
                            )}
                        >
                            Get Free Audit
                        </Button>

                        {/* Mobile Menu Trigger */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open navigation menu"
                                    className={cn(
                                        "md:hidden rounded-full w-10 h-10",
                                        "text-foreground hover:bg-black/5"
                                    )}
                                >
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="top"
                                className={cn(
                                    "w-full border-b backdrop-blur-xl pt-20 pb-10",
                                    "bg-white/90 border-white/20 text-foreground"
                                )}
                            >
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <nav className="flex flex-col items-center gap-6">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-2xl font-medium transition-colors",
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
                                            "mt-4 rounded-full px-8 h-12 text-lg font-medium transition-all shadow-lg",
                                            "bg-black text-white hover:bg-black/80"
                                        )}
                                    >
                                        <span className={cn(false)}>
                                            Get Free Audit
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
