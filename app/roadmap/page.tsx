"use client";

import { useEffect, useState } from "react";
import { SKILL_ROADMAP } from "@/data/skills";
import { SkillNodeCard } from "@/components/roadmap/skill-node";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RoadmapPage() {
    // Persistence State
    const [completedSkills, setCompletedSkills] = useState<string[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("completedSkills");
        if (saved) setCompletedSkills(JSON.parse(saved));
        setIsClient(true);
    }, []);

    // Save to LocalStorage
    const toggleSkill = (id: string) => {
        const newCompleted = completedSkills.includes(id)
            ? completedSkills.filter(s => s !== id)
            : [...completedSkills, id];

        setCompletedSkills(newCompleted);
        localStorage.setItem("completedSkills", JSON.stringify(newCompleted));
    };

    // Logic to determine status based on dependencies
    const getStatus = (skillId: string, dependsOn?: string[]) => {
        if (completedSkills.includes(skillId)) return "Completed";
        if (!dependsOn || dependsOn.length === 0) return "Pending";

        const allPrereqsMet = dependsOn.every(id => completedSkills.includes(id));
        return allPrereqsMet ? "Pending" : "Locked";
    };

    if (!isClient) return null; // Prevent Hydration error

    const progress = Math.round((completedSkills.length / SKILL_ROADMAP.length) * 100);

    return (
        <div className="container py-8 max-w-3xl space-y-8">
            <div className="space-y-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Product Management Roadmap (M1)</h1>
                    <p className="text-muted-foreground">
                        Structured learning path. Master dependencies before moving forward.
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            {/* Skills Graph Visualization (Line-List Hybrid) */}
            <div className="space-y-6 relative">
                {/* Vertical Tracking Line */}
                <div className="absolute left-[38px] top-4 bottom-4 w-0.5 bg-border -z-20" />

                {SKILL_ROADMAP.map((skill) => (
                    <SkillNodeCard
                        key={skill.id}
                        skill={skill}
                        status={getStatus(skill.id, skill.dependsOn)}
                        onToggleStatus={toggleSkill}
                    />
                ))}
            </div>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Adaptive Tip</AlertTitle>
                <AlertDescription>
                    Complete "Data Analysis" to unlock "High Priority" items.
                </AlertDescription>
            </Alert>

        </div>
    );
}
