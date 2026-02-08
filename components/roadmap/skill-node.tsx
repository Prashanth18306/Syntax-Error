"use client";

import { useEffect, useState } from "react";
import { SKILL_ROADMAP, SkillNode, SkillStatus } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, PlayCircle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SkillNodeProps {
    skill: SkillNode;
    status: SkillStatus;
    onToggleStatus: (id: string) => void;
}

export function SkillNodeCard({ skill, status, onToggleStatus }: SkillNodeProps) {
    const isLocked = status === "Locked";
    const isCompleted = status === "Completed";

    const priorityColor = {
        "Critical": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        "High": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        "Medium": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        "Nice to Have": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    };

    return (
        <Card className={cn(
            "relative p-4 flex gap-4 transition-all duration-300 border-l-4",
            isLocked ? "opacity-60 bg-muted/50 border-l-gray-300" :
                isCompleted ? "bg-green-50/50 border-l-green-500 dark:bg-green-900/10" : "border-l-primary hover:shadow-md"
        )}>
            {/* Connector Line (Simplistic visualization) */}
            {skill.dependsOn && (
                <div className="absolute -top-8 left-8 w-0.5 h-8 bg-border -z-10" />
            )}

            <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center text-2xl shrink-0",
                isLocked ? "bg-muted text-muted-foreground" : "bg-background shadow-sm"
            )}>
                {isLocked ? <Lock className="w-5 h-5" /> : skill.icon}
            </div>

            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            {skill.title}
                            {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        </h3>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                    <Badge className={priorityColor[skill.priority]} variant="outline">
                        {skill.priority}
                    </Badge>
                </div>

                {!isLocked && (
                    <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-muted-foreground">
                            {skill.resources.length} Resource(s) Available
                        </div>
                        <Button
                            size="sm"
                            variant={isCompleted ? "outline" : "default"}
                            onClick={() => onToggleStatus(skill.id)}
                        >
                            {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
