import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Schema } from "@/components/Schema";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://othmaneoutaghza.online"),
    title: "Othmane Outaghza | Technical SEO Consultant & AI Automation Specialist",
    description: "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist helping businesses improve search visibility, AI search discoverability, structured data, and SEO automation.",
    keywords: ["Technical SEO Consultant", "AI Automation Specialist", "SEO Automation Consultant", "E-commerce SEO Consultant", "Technical SEO Expert Morocco", "GEO Consultant", "AI Search Optimization Specialist", "Shopify SEO Consultant", "WordPress SEO Consultant", "SEO Consultant for E-commerce Brands", "Structured Data Consultant", "Technical SEO Audit Consultant"],
    openGraph: {
        type: "website",
        title: "Othmane Outaghza | Technical SEO Consultant & AI Automation Specialist",
        description: "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist helping businesses improve search visibility, AI search discoverability, structured data, and SEO automation.",
        url: "https://othmaneoutaghza.online/",
        siteName: "Othmane Outaghza",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Othmane Outaghza Portfolio Preview",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Othmane Outaghza | Technical SEO Consultant & AI Automation Specialist",
        description: "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist helping businesses improve search visibility, AI search discoverability, structured data, and SEO automation.",
        images: ["/og-image.jpg"],
    },
    alternates: {
        canonical: "https://othmaneoutaghza.online/",
    },
    verification: {
        google: "vyNwAWSelppL3sI5KlalLT6dRlthpNc1oheFJJb55LI",
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
            <GoogleAnalytics gaId="G-KDZXFTJ690" />
            <Script id="clarity-script" strategy="afterInteractive">
                {\`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "wp050vrk30");
                \`}
            </Script>
        </html>
    );
}
