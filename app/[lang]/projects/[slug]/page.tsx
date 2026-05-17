import { caseStudies } from "@/data/case-studies";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MotionDiv } from "@/components/ui/motion-wrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Metadata } from "next";
import Image from "next/image";
import { getDictionary, supportedLanguages, type Locale } from "@/lib/i18n";
import { alternatesForPath } from "@/lib/seo/i18n";
import { siteUrl } from "@/sanity/env";

// Schema component for breadcrumbs and article data
function ProjectSchema({ study, slug, lang }: { study: typeof caseStudies[0]; slug: string; lang: Locale }) {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": lang === "fr" ? "Accueil" : "Home",
                "item": `${siteUrl}/${lang}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": lang === "fr" ? "Études de Cas" : "Projects",
                "item": `${siteUrl}/${lang}#projects`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": study.title,
                "item": `${siteUrl}/${lang}/projects/${slug}`
            }
        ]
    };

    const imageSchema = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": `${siteUrl}${study.heroImage}`,
        "name": `${study.title} - Case Study Overview`,
        "description": study.shortDescription,
        "width": 1200,
        "height": 600
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": study.title,
        "description": study.shortDescription,
        "image": {
            "@type": "ImageObject",
            "url": `${siteUrl}${study.heroImage}`,
            "width": 1200,
            "height": 600
        },
        "author": {
            "@type": "Person",
            "name": "Othmane Outaghza",
            "url": siteUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "Othmane.SEO",
            "url": siteUrl
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString()
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
        </>
    );
}

// Generate static params for all case studies
export async function generateStaticParams() {
    return supportedLanguages.flatMap((lang) => caseStudies.map((study) => ({
        slug: study.id,
        lang,
    })));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string; lang: string } }): Promise<Metadata> {
    const study = caseStudies.find((s) => s.id === params.slug);

    if (!study) {
        return {
            title: "Project Not Found | Othmane.SEO",
        };
    }

    return {
        title: `${study.title} | Othmane.SEO`,
        description: study.shortDescription,
        alternates: alternatesForPath(params.lang as Locale, { en: `/projects/${study.id}`, fr: `/projects/${study.id}` }),
        openGraph: {
            title: study.title,
            description: study.shortDescription,
            type: "article",
            url: `${siteUrl}/${params.lang}/projects/${study.id}`,
            images: [study.heroImage],
        },
        twitter: {
            card: "summary_large_image",
            title: study.title,
            description: study.shortDescription,
        },
    };
}

// Sanitize HTML - only allow safe tags for formatting
function sanitizeHtml(html: string): string {
    // Only allow <strong>, <em>, <br> tags - strip everything else
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
        .replace(/<(?!\/?(?:strong|em|br)\b)[^>]+>/gi, "");
}

export default async function ProjectPage({ params }: { params: { slug: string; lang: string } }) {
    const studyIndex = caseStudies.findIndex((s) => s.id === params.slug);
    const study = caseStudies[studyIndex];
    const lang = params.lang as Locale;
    const dict = await getDictionary(lang);

    if (!study) {
        notFound();
    }

    const nextProject = caseStudies[(studyIndex + 1) % caseStudies.length];

    return (
        <div className="min-h-screen bg-background">
            <ProjectSchema study={study} slug={params.slug} lang={lang} />
            <Header dict={dict} lang={lang} />

            <main className="pt-32 sm:pt-40 pb-20 sm:pb-24">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
                    <div className="mb-8">
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-4">
                            <Link href={`/${lang}#projects`}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> {lang === "fr" ? "Retour aux études de cas" : "Back to Projects"}
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-6 max-w-4xl">
                        <MotionDiv
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5">
                                {study.client}
                            </Badge>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                                {study.title}
                            </h1>
                            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                {study.shortDescription}
                            </p>
                        </MotionDiv>
                    </div>

                    {/* Key Metrics Grid */}
                    <MotionDiv
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-16"
                    >
                        {study.results.map((metric) => {
                            const Icon = metric.icon;
                            return (
                                <MotionDiv key={metric.label} variants={fadeInUp}>
                                    <MetricCard
                                        title={metric.label}
                                        value={metric.value}
                                        subtext={metric.description}
                                        icon={<Icon className="h-4 w-4 text-muted-foreground" />}
                                        trend="up" // Defaulting to up as these are success stories
                                    />
                                </MotionDiv>
                            );
                        })}
                    </MotionDiv>

                    {/* Hero Image Section Removed per user request */}
                </section>

                {/* Content Section: Two Columns */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

                        {/* Left Column: Narrative */}
                        <div className="lg:col-span-2 space-y-12 sm:space-y-16">
                            <SectionWrapper>
                                <div className="space-y-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold">The Challenge</h2>
                                    <p
                                        className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(study.challenge) }}
                                    />
                                </div>
                            </SectionWrapper>

                            <SectionWrapper delay={0.1}>
                                <div className="space-y-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold">The Solution</h2>
                                    <div className="space-y-8">
                                        {study.solution.map((paragraph, index) => {
                                            // Split on em-dash to separate title from content
                                            const parts = paragraph.split(" — ");
                                            const title = parts[0];
                                            const content = parts.slice(1).join(" — ");

                                            return (
                                                <div key={index} className="space-y-3">
                                                    <h3
                                                        className="text-xl font-semibold text-foreground"
                                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}
                                                    />
                                                    <p
                                                        className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {study.solutionImages && study.solutionImages.length > 0 && (
                                        <div className="mt-12 space-y-8">
                                            {study.solutionImages.map((img, idx) => (
                                                <figure key={idx} className="rounded-xl overflow-hidden border border-border bg-muted/10 p-2">
                                                    <Image 
                                                        src={img.url} 
                                                        alt={img.alt} 
                                                        width={1200} 
                                                        height={600} 
                                                        className="w-full h-auto rounded-lg shadow-sm"
                                                    />
                                                    {img.caption && (
                                                        <figcaption className="text-center text-sm text-muted-foreground mt-4 pb-2">
                                                            {img.caption}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </SectionWrapper>
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="relative">
                            <div className="sticky top-32 space-y-8">
                                <SectionWrapper delay={0.3}>
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                        <h3 className="font-bold text-lg mb-4">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {study.techStack.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="bg-white hover:bg-white border-gray-200">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </SectionWrapper>

                                <SectionWrapper delay={0.4}>
                                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                        <h3 className="font-bold text-lg mb-2">Role</h3>
                                        <p className="text-muted-foreground">{study.role}</p>
                                        <p className="text-sm text-muted-foreground mt-2">{study.period}</p>
                                    </div>
                                </SectionWrapper>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Projects */}
                {caseStudies.length > 1 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 mb-20 sm:mb-32">
                        <SectionWrapper>
                            <div className="border-t pt-16">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Other Case Studies</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {caseStudies
                                        .filter((project) => project.id !== params.slug)
                                        .slice(0, 2)
                                        .map((relatedProject) => (
                                            <Link
                                                key={relatedProject.id}
                                                href={`/${lang}/projects/${relatedProject.id}`}
                                                className="group block p-5 sm:p-6 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
                                            >
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                                                    {relatedProject.title}
                                                </h3>
                                                <p className="text-muted-foreground mb-4">{relatedProject.shortDescription}</p>
                                                <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Learn more <ArrowRight className="h-4 w-4" />
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </SectionWrapper>
                    </section>
                )}

                {/* Next Project */}
                {nextProject && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32">
                        <SectionWrapper>
                            <div className="border-t pt-16">
                                <p className="text-muted-foreground mb-4">Next Case Study</p>
                                <Link href={`/${lang}/projects/${nextProject.id}`} className="group block">
                                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold group-hover:text-primary transition-colors flex items-center gap-3 sm:gap-4">
                                        {nextProject.title}
                                        <ArrowRight className="h-8 w-8 md:h-12 md:w-12 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </h2>
                                    <p className="text-base sm:text-xl text-muted-foreground mt-4 group-hover:text-foreground transition-colors">
                                        {nextProject.shortDescription}
                                    </p>
                                </Link>
                            </div>
                        </SectionWrapper>
                    </section>
                )}
            </main>

            <Footer dict={dict.footer} lang={lang} />
        </div>
    );
}
