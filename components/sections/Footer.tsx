import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary/30 text-foreground py-8 border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* © notice */}
                <div className="text-center md:text-left">
                    <p className="text-sm font-medium">
                        © {new Date().getFullYear()} Othmane Outaghza.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        All rights reserved.
                    </p>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
                    <Link href="#overview" className="hover:text-primary transition-colors">
                        Overview
                    </Link>
                    <Link href="#experience" className="hover:text-primary transition-colors">
                        Experience
                    </Link>
                    <Link href="#skills" className="hover:text-primary transition-colors">
                        Skills
                    </Link>
                    <Link href="#projects" className="hover:text-primary transition-colors">
                        Projects
                    </Link>
                    <Link href="#contact" className="hover:text-primary transition-colors">
                        Contact
                    </Link>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors font-semibold text-primary/80"
                    >
                        Download Resume
                    </a>
                </nav>

                {/* Social icons */}
                <div className="flex gap-4">
                    <a
                        href="https://github.com/othmaneoutaghza"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href="https://linkedin.com/in/othmaneoutaghza"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                        href="mailto:contact@othmane.com"
                        aria-label="Email"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Mail className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
