import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Hero } from "@/components/sections/Hero";
import { KeyMetrics } from "@/components/sections/KeyMetrics";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { AutomationStack } from "@/components/sections/AutomationStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";

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
