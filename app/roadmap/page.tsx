
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SKILL_ROADMAP } from "@/data/skills";
import { SkillNodeCard } from "@/components/roadmap/skill-node";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Info, Sparkles, Compass, Search, TrendingUp } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const ADAPTIVE_MAP: Record<string, string> = {
    "Technical Communication": "soft-skills",
    "System Design": "system-design",
    "Data Structures": "data-structures",
    "Machine Learning": "ai-fundamentals",
    "Programming foundations": "programming-101",
};

export default function RoadmapPage() {
    const { toast } = useToast();
    const [completedSkills, setCompletedSkills] = useState<string[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [adaptiveData, setAdaptiveData] = useState<{ triggered: boolean; weakness: string; score: string } | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("completedSkills");
        if (saved) setCompletedSkills(JSON.parse(saved));

        const triggered = localStorage.getItem("h2_triggered") === "true";
        if (triggered) {
            setAdaptiveData({
                triggered: true,
                weakness: localStorage.getItem("h2_weakness") || "General Technical Depth",
                score: localStorage.getItem("h2_score") || "0"
            });
        }
        setIsClient(true);
    }, []);

    const dismissAdaptive = () => {
        localStorage.removeItem("h2_triggered");
        localStorage.removeItem("h2_weakness");
        localStorage.removeItem("h2_score");
        localStorage.removeItem("h2_status");
        setAdaptiveData(null);
    };

    const toggleSkill = (id: string) => {
        const isCurrentlyCompleted = completedSkills.includes(id);
        const newCompleted = isCurrentlyCompleted
            ? completedSkills.filter(s => s !== id)
            : [...completedSkills, id];

        setCompletedSkills(newCompleted);
        localStorage.setItem("completedSkills", JSON.stringify(newCompleted));

        if (!isCurrentlyCompleted) {
            toast({
                title: "Skill Unlocked! 🎉",
                description: "You've successfully mastered this skill. Prerequisite checks updated.",
            });
        }
    };

    const getStatus = (skillId: string, dependsOn?: string[]) => {
        if (completedSkills.includes(skillId)) return "Completed";
        if (!dependsOn || dependsOn.length === 0) return "Pending";

        const allPrereqsMet = dependsOn.every(id => completedSkills.includes(id));
        return allPrereqsMet ? "Pending" : "Locked";
    };

    if (!isClient) return null;

    const progress = Math.round((completedSkills.length / SKILL_ROADMAP.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-transparent pb-12">
            <div className="container py-12 max-w-4xl space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-background p-8 rounded-3xl border shadow-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                            <GraduationCap className="w-5 h-5" />
                            <span className="text-sm font-bold tracking-widest uppercase">Learning Journey</span>
                            <Badge variant="outline" className="ml-2 text-[10px] bg-primary/5 text-primary border-primary/20">Free Access</Badge>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Engineering Mastery Roadmap</h1>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            A structured path to becoming a world-class engineer.
                            <span className="text-foreground font-semibold"> Study the resources to unlock completion.</span>
                        </p>
                        <div className="pt-2">
                            <Button asChild variant="secondary" size="sm" className="rounded-full flex items-center gap-2">
                                <Link href="/interview">
                                    <Sparkles className="w-4 h-4" /> Boost with AI Logic
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full md:w-64 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-primary" /> Progress
                            </span>
                            <span className="font-bold text-primary">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-3 rounded-full" />
                    </div>
                </div>

                {/* New Feature: Role Checklist (S2), Benchmarking (S5), Trends (H1) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 border-2 border-dashed bg-muted/30 rounded-[2rem]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                <Compass className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold">30-Day Launch Checklist</h3>
                        </div>
                        <ul className="space-y-3">
                            {["Setup Environment", "Learn Git Foundations", "Build First Project", "Update LinkedIn"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <div className="h-4 w-4 rounded border-2 border-primary/30" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Badge variant="outline" className="mt-4 text-[10px] uppercase">Feature S2</Badge>
                    </Card>

                    <Card className="p-6 border-2 border-dashed bg-muted/30 rounded-[2rem]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold">Benchmarking Tool</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Compare your current skill level against industry standards.</p>
                        <Button variant="outline" size="sm" className="w-full rounded-xl">Run Benchmark Scan</Button>
                        <Badge variant="outline" className="mt-4 text-[10px] uppercase">Feature S5</Badge>
                    </Card>

                    <Card className="p-6 border-2 border-primary/20 bg-primary/5 relative overflow-hidden rounded-[2rem]">
                        <div className="absolute top-0 right-0 p-2">
                            <TrendingUp className="w-8 h-8 text-primary opacity-20" />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="font-bold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" /> Market Trends
                            </h3>
                        </div>
                        <div className="space-y-3">
                            <div className="p-2 bg-background rounded-lg border text-[10px] flex justify-between items-center">
                                <span>Azure DevOps</span>
                                <Badge variant="secondary" className="text-[8px] bg-green-100 text-green-700">+40% Demand</Badge>
                            </div>
                            <div className="p-2 bg-background rounded-lg border text-[10px] flex justify-between items-center">
                                <span>Rust (Embedded)</span>
                                <Badge variant="secondary" className="text-[8px] bg-green-100 text-green-700">+25% Demand</Badge>
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-4 italic">Updated 2h ago via CareerOptima AI</p>
                        <Badge variant="outline" className="mt-2 text-[10px] uppercase">Feature H1</Badge>
                    </Card>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-sm text-blue-800 dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-blue-400">
                    <Info className="w-5 h-5 shrink-0" />
                    <p>
                        <strong>Note:</strong> You cannot mark a skill as complete until you have interacted with at least one
                        study resource. This ensures you've reviewed the material before moving forward.
                    </p>
                </div>

                {adaptiveData && (
                    <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 animate-in zoom-in duration-500 shadow-xl shadow-amber-900/5">
                        <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                            <Sparkles className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="space-y-1 text-center md:text-left flex-1">
                            <h3 className="text-lg font-bold text-amber-900">Adaptive Goal Injected! ⚡</h3>
                            <p className="text-sm text-amber-800/80 leading-relaxed">
                                Our AI analyzed your recent mock interview (Score: <span className="font-bold text-amber-900">{adaptiveData.score}%</span>) and detected a gap in <span className="font-bold underline decoration-amber-400">{adaptiveData.weakness}</span>.
                                We've customized your roadmap to prioritize technical depth in this area.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white border-amber-200 text-amber-700 hover:bg-amber-100 shrink-0 rounded-xl px-6 h-10 font-bold"
                            onClick={dismissAdaptive}
                        >
                            Dismiss Insight
                        </Button>
                    </div>
                )}

                {/* Roadmap List */}
                <div className="space-y-8 relative">
                    {/* Visual Connector Line */}
                    <div className="absolute left-[38px] top-6 bottom-6 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -z-10 hidden sm:block" />

                    {SKILL_ROADMAP.map((skill) => (
                        <SkillNodeCard
                            key={skill.id}
                            skill={skill}
                            status={getStatus(skill.id, skill.dependsOn)}
                            onToggleStatus={toggleSkill}
                            isAdaptiveHighlight={adaptiveData?.weakness ? ADAPTIVE_MAP[adaptiveData.weakness] === skill.id : false}
                        />
                    ))}
                </div>

                {progress === 100 && (
                    <div className="bg-green-100 border-2 border-green-500 p-8 rounded-3xl text-center space-y-4 dark:bg-green-900/20">
                        <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">Roadmap Complete! 🏆</h2>
                        <p className="text-green-700 dark:text-green-300">You have completed all prerequisite skills in this journey. You are ready for the industry!</p>
                    </div>
                )}
            </div>
            <Toaster />
        </div>
    );
}
