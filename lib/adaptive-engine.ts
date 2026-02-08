
export interface InterviewResult {
    score: number;
    status: "Strong" | "Moderate" | "Weak";
    weakness: string;
    feedback: string;
}

export const analyzePerformance = (answers: string[], role: string): InterviewResult => {
    const totalLength = answers.reduce((acc, curr) => acc + curr.length, 0);
    const avgLength = totalLength / (answers.length || 1);

    // Check for negative keywords
    const gaps = answers.filter(a =>
        a.toLowerCase().includes("don't know") ||
        a.toLowerCase().includes("not sure") ||
        a.length < 20
    ).length;

    let score = gapScore(avgLength, gaps);
    let status: "Strong" | "Moderate" | "Weak" = "Moderate";
    let weakness = "Domain Depth";
    let feedback = "";

    if (score >= 80) {
        status = "Strong";
        weakness = "None Identified";
        feedback = `Excellent performance for a ${role} role. You showed deep technical expertise and clear communication.`;
    } else if (score >= 50) {
        status = "Moderate";
        weakness = gaps > 1 ? "Domain Depth" : "Technical Communication";
        feedback = `A solid start. You understand the core concepts but need more precision in explaining complex trade-offs.`;
    } else {
        status = "Weak";
        weakness = avgLength < 100 ? "Technical Communication" : "Domain Knowledge";
        feedback = `There are significant gaps in your preparation. Focus on mastering fundamental principles and practice articulating your thoughts aloud.`;
    }

    return { score, status, weakness, feedback };
};

const gapScore = (avgLen: number, gaps: number): number => {
    let base = Math.min(avgLen / 5, 60); // Max 60 from length
    let penalty = gaps * 15;
    let final = base + 40 - penalty; // Start with 40 points for effort
    return Math.max(0, Math.min(100, Math.round(final)));
};

export const updateRoadmapWithFeedback = (weakness: string, score: number): void => {
    localStorage.setItem("h2_triggered", "true");
    localStorage.setItem("h2_weakness", weakness);
    localStorage.setItem("h2_score", score.toString());

    if (weakness === "Technical Communication") {
        localStorage.setItem("h2_target_skill", "soft-skills");
    }
};
