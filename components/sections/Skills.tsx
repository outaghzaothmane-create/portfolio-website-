"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, BarChart, Code2 } from "lucide-react";

const skillGroups = [
    {
        title: "Google Ecosystem",
        icon: BarChart,
        skills: ["GA4", "Google Search Console", "Looker Studio", "Google Tag Manager"],
    },
    {
        title: "Automation",
        icon: Settings,
        skills: ["Make.com", "n8n", "Brevo (Email Automation)"],
    },
    {
        title: "Tech Stack",
        icon: Code2,
        skills: ["WordPress", "Shopify", "Python Basics", "HTML/CSS"],
    },
];

export function Skills() {
    return (
        <section id="tech-stack" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Tools Configuration</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {skillGroups.map((group) => (
                    <Card key={group.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {group.title}
                            </CardTitle>
                            <group.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {group.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-sm font-normal">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
