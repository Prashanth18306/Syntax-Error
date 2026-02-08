"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, CheckCircle } from "lucide-react";

export function MockInterviewForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate AI Processing Delay
        setTimeout(() => {
            setLoading(false);

            // H2 Logic: Mock feedback triggering roadmap update
            const newSkills = ["pm-comm-1"]; // ID for "Technical Communication"

            // Add to High Priority Persistence
            // Add to High Priority Persistence - SIMULATION TRIGGER
            localStorage.setItem("h2_triggered", "true");

            toast({
                title: "Adaptive Feedback Generated",
                description: (
                    <div className="flex flex-col gap-2">
                        <span>⚠️ Weakness Detected: <strong>Stakeholder Communication</strong></span>
                        <span className="text-xs text-muted-foreground">The system has automatically prioritized "Technical Communication" in your roadmap.</span>
                    </div>
                ),
                duration: 8000,
            });

            // Navigate to roadmap to show the "change"
            setTimeout(() => router.push("/roadmap"), 2000);

        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg bg-card">
            <div className="space-y-2">
                <label className="text-sm font-medium">Q: Explain the trade-off between Speed vs Accuracy in your model.</label>
                <Input placeholder="Type your answer here..." className="bg-background" required />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Q: How would you explain 'Overfitting' to a CEO?</label>
                <Input placeholder="Type your answer here..." className="bg-background" required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                    <span className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 animate-pulse" /> Analyzing Response...
                    </span>
                ) : (
                    "Submit Answer"
                )}
            </Button>
        </form>
    );
}
