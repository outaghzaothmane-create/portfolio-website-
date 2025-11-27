import { DashboardWrapper } from "@/components/layout/DashboardWrapper";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function Home() {
    return (
        <DashboardWrapper>
            <SectionWrapper>
                <Hero />
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <Experience />
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <Skills />
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <Projects />
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <Contact />
            </SectionWrapper>
        </DashboardWrapper>
    );
}
