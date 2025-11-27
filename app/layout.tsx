import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Schema } from "@/components/Schema";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Othmane Outaghza | Senior SEO & Automation Manager (Revenue Focused)",
    description: "Portfolio of Othmane Outaghza. Specialized in driving $1.3M+ organic revenue through Technical SEO, Python Automation, and Data Science.",
    keywords: ["SEO Manager", "Technical SEO", "Python Automation", "Ecommerce SEO", "Make.com Expert"],
    openGraph: {
        title: "Othmane Outaghza | Senior SEO & Automation Manager",
        description: "Driving $1.3M+ organic revenue through Technical SEO & Automation.",
        type: "website",
        url: "https://othmane.seo",
        // images: [{ url: "/og-image.jpg" }], // Placeholder for now
    },
    alternates: {
        canonical: "https://othmane.seo",
    },
};

import { Header } from "@/components/layout/Header";
import { TerminalProvider } from "@/components/providers/terminal-context";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <Schema />
                <TerminalProvider>
                    <Header />
                    {children}
                </TerminalProvider>
            </body>
        </html>
    );
}
