import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Othmane.SEO - Portfolio",
    description: "Senior SEO & Automation Manager Portfolio",
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
                <TerminalProvider>
                    <Header />
                    {children}
                </TerminalProvider>
            </body>
        </html>
    );
}
