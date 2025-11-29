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
    metadataBase: new URL("https://othmane.seo"),
    title: "Othmane.SEO | Senior Automation Manager",
    description: "Driving $1.3M+ in Organic Revenue through Data & Automation.",
    keywords: ["SEO Manager", "Technical SEO", "Python Automation", "Ecommerce SEO", "Make.com Expert"],
    openGraph: {
        title: "Othmane.SEO | Senior Automation Manager",
        description: "Driving $1.3M+ in Organic Revenue through Data & Automation.",
        url: "https://othmane.seo",
        siteName: "Othmane.SEO",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Othmane Outaghza Portfolio Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Othmane.SEO | Senior Automation Manager",
        description: "Driving $1.3M+ in Organic Revenue through Data & Automation.",
        images: ["/og-image.jpg"],
    },
    alternates: {
        canonical: "https://othmane.seo",
    },
};

import { Header } from "@/components/layout/Header";
import { TerminalProvider } from "@/components/providers/terminal-context";

import { GlobalBackground } from "@/components/layout/GlobalBackground";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.className, "overflow-x-hidden")}>
                <Schema />
                <TerminalProvider>
                    <GlobalBackground />
                    <Header />
                    {children}
                </TerminalProvider>
            </body>
        </html>
    );
}
