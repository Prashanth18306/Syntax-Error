
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, AlertCircle, CheckCircle2, XCircle, Upload, Loader2, Sparkles, Trophy, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
    score: number;
    status: string;
    missingSkills: string[];
    strengths: string[];
    improvements: { title: string; desc: string }[];
}

const COMMON_SKILLS = ["React", "Next.js", "TypeScript", "Node.js", "Python", "SQL", "Cloud", "AWS", "CI/CD", "Docker", "Kubernetes", "System Design", "Agile", "ML", "AI", "Distributed Systems", "REST API", "GraphQL"];

export function ResumeChecker() {
    const [resumeData, setResumeData] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                setResumeData(text.substring(0, 5000));
            };
            if (file.type === "text/plain") {
                reader.readAsText(file);
            } else {
                // If PDF/DOCX, we simulate extraction for demo purposes
                setResumeData(`[Simulated Extraction from ${file.name}]\n` + "Strong experience in Full Stack development, focusing on React and Node.js. Proficient in TypeScript and SQL databases. Basic knowledge of AWS Cloud.");
            }
        }
    };

    const analyzeResume = () => {
        if (!resumeData || !jobDescription) return;
        setIsAnalyzing(true);

        setTimeout(() => {
            // JD Keyword Extraction (Simple simulation)
            const jdKeywords = COMMON_SKILLS.filter(skill =>
                jobDescription.toLowerCase().includes(skill.toLowerCase())
            );

            // Match against Resume
            const foundSkills = jdKeywords.filter(skill =>
                resumeData.toLowerCase().includes(skill.toLowerCase())
            );
            const missingSkills = jdKeywords.filter(skill =>
                !resumeData.toLowerCase().includes(skill.toLowerCase())
            );

            // Scoring Logic
            const matchRate = jdKeywords.length > 0 ? (foundSkills.length / jdKeywords.length) * 100 : 50;
            const finalScore = Math.max(20, Math.min(Math.round(matchRate), 99));

            let status = "Low Match";
            if (finalScore > 85) status = "Perfect Fit";
            else if (finalScore > 65) status = "Strong Match";
            else if (finalScore > 40) status = "Moderate Match";

            setResults({
                score: finalScore,
                status,
                missingSkills: missingSkills.slice(0, 5),
                strengths: foundSkills.slice(0, 4),
                improvements: [
                    { title: "JD Alignment", desc: missingSkills.length > 0 ? `Your resume is missing '${missingSkills[0]}' which is a key JD requirement.` : "Your resume aligns well, but consider making bullet points more impact-heavy." },
                    { title: "Terminology Check", desc: "Ensure you use the exact terminology found in the JD for better ATS scoring." },
                    { title: "Quantified Wins", desc: "For every matched skill, ensure you have a corresponding metric or result." }
                ]
            });
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="space-y-8">
            <Card className="border-2 shadow-xl bg-background/50 backdrop-blur-sm overflow-hidden rounded-3xl">
                <div className="h-2 bg-gradient-to-r from-primary via-indigo-500 to-primary" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-black italic">
                        <Database className="w-8 h-8 text-primary" />
                        JD-Sync Analyze Engine
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Resume Upload Part */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all group",
                                fileName ? "border-green-500/50 bg-green-50/10" : "border-primary/20 hover:bg-primary/5"
                            )}
                        >
                            <div className={cn(
                                "h-16 w-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110",
                                fileName ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                            )}>
                                {fileName ? <CheckCircle2 className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                            </div>
                            <div className="text-center">
                                <p className="font-bold">{fileName || "Upload Resume"}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">Select your file from laptop</p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.docx,.txt"
                            />
                        </div>

                        {/* JD Input Part */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-1">Target Job Description</label>
                            <Textarea
                                placeholder="Paste the job description here to sync scoring..."
                                className="min-h-[160px] max-h-[160px] rounded-3xl bg-muted/20 border-primary/10 focus-visible:ring-primary text-xs p-4 leading-relaxed"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        className="w-full h-16 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 group overflow-hidden relative"
                        disabled={!resumeData || !jobDescription || isAnalyzing}
                        onClick={analyzeResume}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-90 group-hover:scale-105 transition-transform" />
                        <span className="relative z-10 flex items-center gap-3">
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    SYNCING RESUME WITH JD...
                                </>
                            ) : (
                                <>ANALYZE JOB FIT <Search className="w-6 h-6" /></>
                            )}
                        </span>
                    </Button>
                </CardContent>
            </Card>

            {results && !isAnalyzing && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in slide-in-from-bottom-8 duration-700">
                    <Card className="md:col-span-4 bg-zinc-950 text-white shadow-2xl border-none relative overflow-hidden flex flex-col items-center justify-center p-10 rounded-[2.5rem]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-transparent to-transparent" />
                        <Trophy className="w-16 h-16 text-indigo-400 mb-6 animate-bounce" />
                        <div className="text-8xl font-black italic tracking-tighter mb-2">{results.score}%</div>
                        <Badge variant="secondary" className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-1 rounded-full uppercase italic">
                            {results.status}
                        </Badge>
                        <p className="text-[10px] text-zinc-500 mt-6 font-bold uppercase tracking-[0.3em]">Job Fit Sync Score</p>
                    </Card>

                    <Card className="md:col-span-8 shadow-2xl rounded-[2.5rem] border-2 overflow-hidden">
                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Missing JD Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {results.missingSkills.length > 0 ? results.missingSkills.map((skill, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="bg-red-50 text-red-600 border-red-200 px-4 py-1.5 rounded-xl font-bold flex items-center gap-2 dark:bg-red-950 dark:border-red-900"
                                        >
                                            <XCircle className="w-3 h-3" /> {skill}
                                        </Badge>
                                    )) : (
                                        <p className="text-sm font-medium text-muted-foreground italic">Your resume covers all detected keywords in the JD!</p>
                                    )}
                                </div>
                                <p className="text-[10px] text-muted-foreground font-medium italic">These specific skills were found in the JD but not in your resume.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-green-600">Matched Strengths</h3>
                                    <ul className="space-y-3">
                                        {results.strengths.length > 0 ? results.strengths.map((s, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-950">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                {s}
                                            </li>
                                        )) : (
                                            <li className="text-xs text-muted-foreground">No significant JD matches detected.</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600">Optimization Plan</h3>
                                    <div className="space-y-3">
                                        {results.improvements.map((imp, i) => (
                                            <div key={i} className="flex gap-3">
                                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold text-indigo-900 dark:text-indigo-400">{imp.title}</p>
                                                    <p className="text-[10px] text-zinc-500 leading-tight">{imp.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
