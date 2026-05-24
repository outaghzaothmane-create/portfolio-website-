import { Metadata } from "next";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Projects } from "@/components/sections/Projects";
import { getDictionary, Locale, supportedLanguages } from "@/lib/i18n";
import { alternatesForPath } from "@/lib/seo/i18n";
import { siteUrl } from "@/sanity/env";

type ProjectsPageProps = {
    params: {
        lang: string;
    };
};

export async function generateStaticParams() {
    return supportedLanguages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
    const lang = params.lang as Locale;
    const isFr = lang === "fr";
    const title = isFr
        ? "Études de Cas & Projets SEO Technique | Othmane Outaghza"
        : "Technical SEO Case Studies & Projects | Othmane Outaghza";
    const description = isFr
        ? "Découvrez mes études de cas SEO technique, mes solutions d'automatisation IA et mes projets d'optimisation pour les moteurs de recherche au Maroc et à l'international."
        : "Explore my technical SEO case studies, AI automation systems, and organic search growth optimization projects in Morocco and worldwide.";

    return {
        title,
        description,
        alternates: alternatesForPath(lang, { en: "/projects", fr: "/projects" }),
        openGraph: {
            title,
            description,
            url: `${siteUrl}/${lang}/projects`,
            type: "website",
            locale: lang === "fr" ? "fr_FR" : "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const lang = params.lang;
    const dict = await getDictionary(lang as Locale);

    return (
        <DashboardWrapper>
            <main className="pt-28 sm:pt-32 pb-16 min-h-screen">
                <SectionWrapper>
                    <Projects dict={dict.caseStudies} lang={lang} />
                </SectionWrapper>
            </main>
            <Footer dict={dict.footer} lang={lang} />
        </DashboardWrapper>
    );
}
