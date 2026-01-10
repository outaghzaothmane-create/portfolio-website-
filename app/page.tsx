import dynamic from "next/dynamic";
import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Hero } from "@/components/sections/Hero";
import { KeyMetrics } from "@/components/sections/KeyMetrics";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";

// Lazy load below-the-fold sections for better initial load performance
const AutomationStack = dynamic(() => import("@/components/sections/AutomationStack").then(mod => ({ default: mod.AutomationStack })), {
    loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-xl" />,
});

const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => ({ default: mod.Projects })), {
    loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-xl" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => ({ default: mod.Testimonials })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Services = dynamic(() => import("@/components/sections/Services").then(mod => ({ default: mod.Services })), {
    loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-xl" />,
});

const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => ({ default: mod.Experience })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => ({ default: mod.Skills })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => ({ default: mod.Contact })), {
    loading: () => <div className="h-64 animate-pulse bg-muted/20 rounded-xl" />,
});

export default function Home() {
    return (
        <DashboardWrapper>
            <Hero />

            <KeyMetrics />

            <AutomationStack />

            <Projects />

            <Testimonials />

            <Services />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper delay={0.1}>
                    <Experience />
                </SectionWrapper>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper delay={0.1}>
                    <Skills />
                </SectionWrapper>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionWrapper delay={0.1}>
                    <Contact />
                </SectionWrapper>
            </div>

            <Footer />


        </DashboardWrapper>
    );
}
