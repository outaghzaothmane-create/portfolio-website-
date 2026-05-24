import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { supportedLanguages } from "@/lib/i18n";
import { alternatesForPath } from "@/lib/seo/i18n";
import { cn } from "@/lib/utils";
import { Schema } from "@/components/Schema";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export async function generateMetadata(
    { params }: { params: { lang: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const lang = params.lang;
    const isFr = lang === 'fr';

    const title = isFr 
        ? "Othmane Outaghza | Consultant SEO Technique & Spécialiste Automatisation IA" 
        : "Othmane Outaghza | Technical SEO Consultant & AI Automation Specialist";
        
    const description = isFr
        ? "Othmane Outaghza est un consultant SEO technique et spécialiste de l'automatisation IA, aidant les entreprises à améliorer leur visibilité, leur référencement IA, et leurs données structurées."
        : "Othmane Outaghza is a Technical SEO Consultant and AI Automation Specialist helping businesses improve search visibility, AI search discoverability, structured data, and SEO automation.";
    const openGraphDescription = isFr
        ? "Améliorez votre visibilité SEO, votre référencement IA, vos données structurées et votre automatisation SEO avec Othmane Outaghza."
        : "Improve search visibility, AI search discoverability, structured data, and SEO automation with Othmane Outaghza.";
    const twitterDescription = isFr
        ? "Consultant SEO Technique et spécialiste automatisation IA aidant les entreprises à se développer avec le SEO, la recherche IA et les données structurées."
        : "Technical SEO Consultant and AI Automation Specialist helping businesses grow with SEO, AI search, and structured data.";

    return {
        metadataBase: new URL("https://othmaneoutaghza.online"),
        title,
        description,
        keywords: isFr
            ? ["consultant SEO technique", "consultant SEO Maroc", "expert SEO Maroc", "consultant référencement naturel", "audit SEO technique", "consultant SEO e-commerce", "consultant SEO Shopify", "optimisation SEO IA", "référencement IA", "consultant GEO SEO", "optimisation pour les moteurs IA"]
            : ["technical SEO consultant", "SEO consultant Morocco", "SEO expert Morocco", "ecommerce SEO consultant", "Shopify SEO consultant", "AI search optimization", "GEO consultant", "LLMO consultant", "technical SEO audit"],
        openGraph: {
            type: "website",
            title,
            description: openGraphDescription,
            url: `https://othmaneoutaghza.online/${lang}`,
            siteName: "Othmane Outaghza",
            images: [
                {
                    url: "/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: isFr ? "Othmane Outaghza - Consultant SEO Technique et spécialiste automatisation IA" : "Othmane Outaghza - Technical SEO Consultant and AI Automation Specialist",
                },
            ],
            locale: isFr ? "fr_FR" : "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: twitterDescription,
            images: ["/og-image.jpg"],
        },
        alternates: {
            ...alternatesForPath(isFr ? "fr" : "en", { en: "", fr: "" }),
        },
        verification: {
            google: "vyNwAWSelppL3sI5KlalLT6dRlthpNc1oheFJJb55LI",
        },
    };
}

export function generateStaticParams() {
    return supportedLanguages.map((lang) => ({ lang }));
}

import { Header } from "@/components/layout/Header";

import { GlobalBackground } from "@/components/layout/GlobalBackground";

import { getDictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcherProvider } from "@/context/LanguageSwitcherContext";

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
}>) {
    const dict = await getDictionary(params.lang as Locale);
    
    return (
        <html lang={params.lang} className="scroll-smooth">
            <body className={cn(inter.className, "overflow-x-hidden")}>
                <LanguageSwitcherProvider>
                    <Schema lang={params.lang as Locale} />
                    <GlobalBackground />
                    <Header dict={dict} lang={params.lang} />
                    {children}
                </LanguageSwitcherProvider>
            </body>
            <GoogleAnalytics gaId="G-WX3YNVD7KF" />
            <Script id="clarity-script" strategy="afterInteractive">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "wp050vrk30");
                `}
            </Script>
        </html>
    );
}
