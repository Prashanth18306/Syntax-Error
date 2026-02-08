
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, AlertCircle, CheckCircle2, XCircle, Info, Loader2 } from "lucide-react";

export function ResumeChecker() {
    const [resumeData, setResumeData] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const analyzeResume = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setScore(78); // Static score for MVP
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <Card className="border-2 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" />
                        AI Resume Scanner
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Paste your resume content here</label>
                        <Textarea
                            placeholder="Paste text from your PDF/Word resume..."
                            className="min-h-[250px] bg-muted/20 border-primary/20 focus-visible:ring-primary"
                            value={resumeData}
                            onChange={(e) => setResumeData(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-full h-12 rounded-xl text-lg font-bold shadow-lg"
                        disabled={!resumeData || isAnalyzing}
                        onClick={analyzeResume}
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Analyzing ATS Compatibility...
                            </>
                        ) : (
                            <>Scan My Resume</>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {score !== null && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-500">
                    <Card className="md:col-span-1 bg-primary text-primary-foreground shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Search className="w-24 h-24" />
                        </div>
                        <CardHeader className="pb-2">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">ATS Score</p>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <div className="text-7xl font-black mb-2">{score}%</div>
                            <Badge variant="secondary" className="bg-white/20 text-white border-none">Intermediate</Badge>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Critical Feedback</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-xl dark:bg-red-900/10">
                                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-red-900 dark:text-red-400">Missing Quantifiable Achievements</p>
                                    <p className="text-xs text-red-700 dark:text-red-300">Convert "Responsible for backend" to "Scaled backend to handle 10k+ concurrent users".</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl dark:bg-amber-900/10">
                                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-amber-900 dark:text-amber-400">Low Keyword Density</p>
                                    <p className="text-xs text-amber-700 dark:text-amber-300">You are missing: "Cloud Orchestration", "CI/CD Pipelines".</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-xl dark:bg-green-900/10">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-green-900 dark:text-green-400">Perfect Formatting</p>
                                    <p className="text-xs text-green-700 dark:text-green-300">Your resume follows the standard standard single-column layout preferred by ATS.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

