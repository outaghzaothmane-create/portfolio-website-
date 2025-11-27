"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuditModal } from "@/components/ui/audit-modal";

export function Contact() {
    const [showAudit, setShowAudit] = useState(false);

    return (
        <section id="contact" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Start a new property</h2>
            <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold">Ready to scale your organic revenue?</h3>
                        <p className="text-primary-foreground/90">
                            Let's audit your current setup and identify automation opportunities.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="secondary" size="lg" className="gap-2" asChild>
                            <Link href="mailto:outaghza.othmane@gmail.com">
                                <Mail className="h-4 w-4" />
                                Email Me
                            </Link>
                        </Button>
                        <Button variant="secondary" size="lg" className="gap-2" asChild>
                            <Link href="https://www.linkedin.com/in/othmaneoutaghza/" target="_blank">
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                            </Link>
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            className="gap-2 bg-white text-primary hover:bg-white/90"
                            onClick={() => setShowAudit(true)}
                        >
                            Audit My Site
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <AuditModal isOpen={showAudit} onClose={() => setShowAudit(false)} />
        </section>
    );
}
