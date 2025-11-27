"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experienceData = [
    {
        role: "SEO & Automation Manager",
        company: "Health Supply 770",
        period: "Feb 2024 - Present",
        impact: "Generated $1.3M revenue, Automating technical audits with Make.com",
        tags: ["Make.com", "Brevo", "Technical SEO"],
    },
    {
        role: "SEO Manager",
        company: "Tingis Web",
        period: "Jun 2023 - May 2024",
        impact: "Increased organic traffic by 80% in 3 months, Led PR backlink campaigns",
        tags: ["PR Strategy", "Organic Growth", "Team Lead"],
    },
    {
        role: "SEO Specialist",
        company: "Epoptique.ma",
        period: "Jan 2022 - Present",
        impact: "Long-term SEO strategy and optimization",
        tags: ["E-commerce", "Content Strategy"],
    },
];

export function Experience() {
    return (
        <section id="performance" className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Performance Report</h2>
                <Badge variant="outline" className="text-muted-foreground">Last 3 Years</Badge>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Experience History</CardTitle>
                </CardHeader>
                <CardContent className="p-0 md:p-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[150px] md:w-[200px]">Role</TableHead>
                                    <TableHead className="min-w-[120px] md:w-[200px] hidden md:table-cell">Company</TableHead>
                                    <TableHead className="min-w-[100px] md:w-[150px]">Period</TableHead>
                                    <TableHead className="min-w-[250px]">Impact & Key Metrics</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {experienceData.map((item) => (
                                    <TableRow key={item.company}>
                                        <TableCell className="font-medium">
                                            <div>{item.role}</div>
                                            <div className="md:hidden text-xs text-muted-foreground mt-1">{item.company}</div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{item.company}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{item.period}</TableCell>
                                        <TableCell>
                                            <div className="space-y-2">
                                                <p className="text-sm">{item.impact}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.tags.map((tag) => (
                                                        <Badge key={tag} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
