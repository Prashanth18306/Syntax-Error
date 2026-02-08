
import { SkillNode, SKILL_ROADMAP } from "@/data/skills";

export interface InterviewFeedback {
    field: string;
    weakness: string;
    score: number;
}

export const analyzePerformance = (answers: string[]): string => {
    // Simple heuristic analysis for MVP
    const totalLength = answers.reduce((acc, curr) => acc + curr.length, 0);
    if (totalLength < 100) return "Technical Communication";
    if (answers.some(a => a.toLowerCase().includes("don't know") || a.toLowerCase().includes("not sure"))) return "Domain Depth";
    return "System Architecture";
};

export const updateRoadmapWithFeedback = (weakness: string): void => {
    // In a real app, this would update a database. 
    // For MVP, we use localStorage flags that the Roadmap page listens to.
    localStorage.setItem("h2_triggered", "true");
    localStorage.setItem("h2_weakness", weakness);

    if (weakness === "Technical Communication") {
        localStorage.setItem("h2_target_skill", "soft-skills");
    }
};
