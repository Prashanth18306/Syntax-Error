"use client";

import { useState, useEffect } from "react";
import { SkillNode, SkillStatus, Resource } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, ExternalLink, BookOpen, AlertCircle, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillNodeProps {
    skill: SkillNode;
    status: SkillStatus;
    onToggleStatus: (id: string) => void;
}

export function SkillNodeCard({ skill, status, onToggleStatus }: SkillNodeProps) {
    const [viewedResources, setViewedResources] = useState<string[]>([]);
    const isLocked = status === "Locked";
    const isCompleted = status === "Completed";

    // Check if at least one resource has been clicked
    const canComplete = viewedResources.length > 0;

    const handleResourceClick = (url: string) => {
        if (!viewedResources.includes(url)) {
            setViewedResources(prev => [...prev, url]);
        }
    };

    const priorityColor = {
        "Critical": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400",
        "High": "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
        "Medium": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
        "Nice to Have": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400"
    };

    return (
        <Card className={cn(
            "relative p-5 transition-all duration-300 border-l-4",
            isLocked ? "opacity-60 bg-muted/30 border-l-gray-300 grayscale select-none" :
                isCompleted ? "bg-green-50/30 border-l-green-500 shadow-sm" : "border-l-primary shadow-md hover:shadow-lg"
        )}>
            {/* Header Area */}
            <div className="flex gap-4 items-start">
                <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-sm transition-transform group-hover:scale-110",
                    isLocked ? "bg-muted text-muted-foreground" : "bg-background"
                )}>
                    {isLocked ? <Lock className="w-5 h-5" /> : skill.icon}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h3 className="font-bold text-lg flex items-center gap-2 truncate">
                                {skill.title}
                                {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-50" />}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{skill.description}</p>
                        </div>
                        {!isLocked && (
                            <Badge className={priorityColor[skill.priority]} variant="outline">
                                {skill.priority}
                            </Badge>
                        )}
                    </div>

                    {!isLocked && (
                        <div className="mt-4 space-y-4">
                            {/* Study Resources Section */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <BookOpen className="w-3 h-3" /> Study Resources
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {skill.resources.map((res) => (
                                        <a
                                            key={res.url}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleResourceClick(res.url)}
                                            className={cn(
                                                "flex items-center justify-between p-2 rounded-lg border text-xs transition-colors",
                                                viewedResources.includes(res.url)
                                                    ? "bg-green-50 border-green-200 text-green-800"
                                                    : "bg-background hover:bg-primary/5 hover:border-primary/30"
                                            )}
                                        >
                                            <span className="truncate flex items-center gap-2">
                                                <Badge variant="outline" className="text-[9px] px-1 h-4">{res.type}</Badge>
                                                {res.title}
                                            </span>
                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* M3: Projects Section */}
                            {skill.projects && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <Rocket className="w-3 h-3" /> Hands-on Projects
                                    </p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {skill.projects.map((proj, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-100/50 dark:bg-zinc-800/50 rounded-xl border border-dashed text-xs">
                                                <span className="font-semibold text-foreground flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                    {proj.title}
                                                </span>
                                                <Badge variant="outline" className="text-[9px] uppercase px-1.5 h-4 bg-background">
                                                    {proj.difficulty}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Completion Action */}
                            <div className="flex items-center justify-between pt-2 border-t border-dashed">
                                {!canComplete && !isCompleted ? (
                                    <div className="flex items-center gap-2 text-[11px] text-amber-600 font-medium">
                                        <AlertCircle className="w-3 h-3" />
                                        Visit a resource to unlock completion
                                    </div>
                                ) : (
                                    <div className="text-[11px] text-green-600 font-medium flex items-center gap-1">
                                        {isCompleted ? "Goal achieved!" : "Resources studied!"}
                                    </div>
                                )}

                                <Button
                                    size="sm"
                                    disabled={!canComplete && !isCompleted}
                                    variant={isCompleted ? "outline" : "default"}
                                    onClick={() => onToggleStatus(skill.id)}
                                    className={cn(
                                        "h-8 text-xs font-semibold px-4",
                                        isCompleted ? "border-green-200 text-green-700 hover:bg-green-50" : ""
                                    )}
                                >
                                    {isCompleted ? "Incomplete?" : "Mark as Complete"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {isLocked && (
                        <div className="mt-2 text-[10px] text-muted-foreground italic flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            Requires: {skill.dependsOn?.join(", ")}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
