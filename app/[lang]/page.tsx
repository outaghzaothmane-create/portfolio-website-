import dynamic from "next/dynamic";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Hero } from "@/components/sections/Hero";
import { KeyMetrics } from "@/components/sections/KeyMetrics";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getDictionary, Locale } from "@/lib/i18n";

// Lazy load below-the-fold sections for better initial load performance
const About = dynamic(() => import("@/components/sections/About").then(mod => ({ default: mod.About })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Methodology = dynamic(() => import("@/components/sections/Methodology").then(mod => ({ default: mod.Methodology })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => ({ default: mod.Experience })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => ({ default: mod.Projects })), {
    loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-xl" />,
});

const Services = dynamic(() => import("@/components/sections/Services").then(mod => ({ default: mod.Services })), {
    loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-xl" />,
});

const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => ({ default: mod.Skills })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => ({ default: mod.Testimonials })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => ({ default: mod.FAQ })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => ({ default: mod.Contact })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const AutomationStack = dynamic(() => import("@/components/sections/AutomationStack").then(mod => ({ default: mod.AutomationStack })), {
    loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-xl" />,
});

export default async function Home({ params }: { params: { lang: string } }) {
    const dict = await getDictionary(params.lang as Locale);
    return (
        <DashboardWrapper>
            <Hero dict={dict.hero} lang={params.lang} />

            <div className="w-full">
                <SectionWrapper delay={0.1}>
                    <About dict={dict.about} />
                </SectionWrapper>
            </div>

            <KeyMetrics dict={dict.keyMetrics} />

            <Methodology dict={dict.methodology} />

            <div className="responsive-container">
                <SectionWrapper delay={0.1}>
                    <Experience dict={dict.experience} />
                </SectionWrapper>
            </div>

            <Projects dict={dict.caseStudies} lang={params.lang} />

            <Services dict={dict.services} lang={params.lang} />

            <div className="responsive-container">
                <SectionWrapper delay={0.1}>
                    <Skills dict={dict.skills} />
                </SectionWrapper>
            </div>

            <AutomationStack dict={dict.automationStack} />

            <Testimonials dict={dict.testimonials} />

            <div className="w-full">
                <SectionWrapper delay={0.1}>
                    <FAQ dict={dict.faq} />
                </SectionWrapper>
            </div>

            <div className="responsive-container">
                <SectionWrapper delay={0.1}>
                    <Contact dict={dict.contact} auditModalDict={dict.auditModal} />
                </SectionWrapper>
            </div>

            <Footer dict={dict.footer} lang={params.lang} />
        </DashboardWrapper>
    );
}
