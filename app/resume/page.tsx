
import { ResumeChecker } from "@/components/resume/resume-checker";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

export default function ResumePage() {
    return (
        <div className="container py-12 max-w-4xl space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-100 dark:bg-red-950 dark:border-red-900">Feature S3</Badge>
                        <Badge variant="outline" className="border-primary/20 text-primary">ATS Optimizer</Badge>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">AI Resume <span className="text-primary italic">Deep Scan</span></h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Identify why your resume is getting rejected. Our system simulates an <strong>Applicant Tracking System (ATS)</strong> to find formatting and keyword gaps.
                    </p>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3 text-xs text-blue-800 max-w-xs dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-blue-400">
                    <Info className="w-5 h-5 shrink-0" />
                    <p>
                        <strong>Privacy First:</strong> Your resume data is analyzed locally and never stored on our servers.
                    </p>
                </div>
            </div>

            <ResumeChecker />

            <section className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t">
                <div className="space-y-2">
                    <h3 className="font-bold">What is ATS?</h3>
                    <p className="text-sm text-muted-foreground">Applicant Tracking Systems are software used by 99% of Fortune 500 companies to filter resumes before a human sees them.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold">Keyword Mapping</h3>
                    <p className="text-sm text-muted-foreground">The scanner looks for domain-specific skills. If you're a Web Dev, it expects: React, Next.js, Node.js, and API design.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold">Action Verbs</h3>
                    <p className="text-sm text-muted-foreground">Start every bullet point with a strong action verb like "Developed", "Optimized", "Architected", or "Spearheaded".</p>
                </div>
            </section>
        </div>
    );
}
