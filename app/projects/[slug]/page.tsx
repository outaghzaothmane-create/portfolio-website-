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

// Generate static params for all case studies
export async function generateStaticParams() {
    return caseStudies.map((study) => ({
        slug: study.id,
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const studyIndex = caseStudies.findIndex((s) => s.id === params.slug);
    const study = caseStudies[studyIndex];

    if (!study) {
        notFound();
    }

    const nextProject = caseStudies[(studyIndex + 1) % caseStudies.length];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-40 pb-24">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="mb-8">
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-4">
                            <Link href="/#projects">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
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
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                                {study.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                {study.shortDescription}
                            </p>
                        </MotionDiv>
                    </div>

                    {/* Key Metrics Grid */}
                    <MotionDiv
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
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
                </section>

                {/* Content Section: Two Columns */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Left Column: Narrative */}
                        <div className="lg:col-span-2 space-y-16">
                            <SectionWrapper>
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold">The Challenge</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {study.challenge}
                                    </p>
                                </div>
                            </SectionWrapper>

                            <SectionWrapper delay={0.1}>
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold">The Solution</h2>
                                    <div className="space-y-4">
                                        {study.solution.map((paragraph, index) => (
                                            <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
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

                {/* Next Project */}
                {nextProject && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
                        <SectionWrapper>
                            <div className="border-t pt-16">
                                <p className="text-muted-foreground mb-4">Next Case Study</p>
                                <Link href={`/projects/${nextProject.id}`} className="group block">
                                    <h2 className="text-3xl md:text-5xl font-bold group-hover:text-primary transition-colors flex items-center gap-4">
                                        {nextProject.title}
                                        <ArrowRight className="h-8 w-8 md:h-12 md:w-12 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </h2>
                                    <p className="text-xl text-muted-foreground mt-4 group-hover:text-foreground transition-colors">
                                        {nextProject.shortDescription}
                                    </p>
                                </Link>
                            </div>
                        </SectionWrapper>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
