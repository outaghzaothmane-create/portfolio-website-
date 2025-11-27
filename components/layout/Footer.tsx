"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2">
                    <Link href="/" className="font-bold text-2xl">
                        <span className="text-white">Othmane</span>
                        <span className="text-gray-400">.SEO</span>
                    </Link>
                    <p className="text-gray-400 text-sm">
                        Senior SEO & Automation Manager.
                    </p>
                </div>

                <div className="flex gap-8 text-sm text-gray-400">
                    <Link href="#overview" className="hover:text-white transition-colors">Overview</Link>
                    <Link href="#performance" className="hover:text-white transition-colors">Performance</Link>
                    <Link href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</Link>
                    <Link href="#projects" className="hover:text-white transition-colors">Case Studies</Link>
                </div>

                <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Othmane Outaghza. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
