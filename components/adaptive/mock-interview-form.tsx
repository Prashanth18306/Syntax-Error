"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, CheckCircle, ArrowRight, User, Bot, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "setup" | "questioning" | "analyzing" | "result";

interface Question {
    id: number;
    text: string;
}

export function MockInterviewForm() {
    const { toast } = useToast();
    const router = useRouter();

    // Form States
    const [step, setStep] = useState<Step>("setup");
    const [field, setField] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateQuestions = () => {
        setIsGenerating(true);
        // Simulate "AI" generating contextual questions
        setTimeout(() => {
            const contextQuestions: Question[] = [
                { id: 1, text: `Given your interest in ${field}, how would you handle a critical system failure during peak hours?` },
                { id: 2, text: `Based on the job description, what's your approach to optimizing efficiency vs cost?` },
                { id: 3, text: `Explain a complex concept from ${field} to a non-technical manager.` }
            ];
            setQuestions(contextQuestions);
            setIsGenerating(false);
            setStep("questioning");
        }, 1500);
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();

        const newAnswers = [...answers, currentAnswer];
        setAnswers(newAnswers);
        setCurrentAnswer("");

        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            submitInterview();
        }
    };

    const submitInterview = () => {
        setStep("analyzing");
        setTimeout(() => {
            const identifiedWeakness = "Technical Communication"; // In real AI, this would come from analysis

            // H2 Logic: Trigger update via engine
            localStorage.setItem("h2_triggered", "true");
            localStorage.setItem("h2_weakness", identifiedWeakness);

            setStep("result");

            toast({
                title: "Mock Interview Complete!",
                description: `Analysis ready. Identified gap: ${identifiedWeakness}. Roadmap updated.`,
                duration: 5000,
            });
        }, 3000);
    };

    return (
        <div className="w-full max-w-xl mx-auto min-h-[400px] flex flex-col">
            {/* Step 1: Initial Setup */}
            {step === "setup" && (
                <div className="space-y-6 animate-in fade-in transition-all duration-500">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            Setup Your Virtual Interview
                        </h2>
                        <p className="text-sm text-muted-foreground italic">Tell our engine about the role you're targeting.</p>
                    </div>
                    <div className="space-y-4 bg-muted/10 p-6 rounded-2xl border">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Your Field / Discipline</label>
                            <Input
                                placeholder="e.g. Mechanical Engineering, Frontend Dev"
                                value={field}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField(e.target.value)}
                                className="bg-background border-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Job Description / Key Skills</label>
                            <Textarea
                                placeholder="Paste job requirements or key skills you want to be tested on..."
                                className="bg-background min-h-[100px] border-primary/20"
                                value={jobDesc}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJobDesc(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full h-12 rounded-xl"
                            disabled={!field || !jobDesc || isGenerating}
                            onClick={generateQuestions}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating Contextual Questions...
                                </>
                            ) : (
                                <>Start Interview <ArrowRight className="w-4 h-4 ml-2" /></>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Questioning (Chat-like Interface) */}
            {step === "questioning" && (
                <div className="flex-1 flex flex-col space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                        <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
                        <div className="flex gap-1">
                            {questions.map((_, i) => (
                                <div key={i} className={cn("h-1.5 w-6 rounded-full", i <= currentQuestionIdx ? "bg-primary" : "bg-muted")} />
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 flex flex-col">
                        {/* Interviewer Bubble */}
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shrink-0">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="bg-background border border-primary/20 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] animate-in zoom-in duration-300">
                                <p className="text-sm md:text-base font-medium leading-relaxed">
                                    {questions[currentQuestionIdx].text}
                                </p>
                            </div>
                        </div>

                        {/* User Input Bubble */}
                        <form onSubmit={handleNext} className="mt-auto space-y-4">
                            <div className="flex items-end gap-3 flex-row-reverse">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <Textarea
                                        autoFocus
                                        placeholder="Speak your mind here..."
                                        className="bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary min-h-[120px] rounded-2xl rounded-tr-none px-4 py-3 text-sm md:text-base resize-none shadow-inner"
                                        value={currentAnswer}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentAnswer(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-xl text-md font-bold shadow-lg" disabled={!currentAnswer}>
                                {currentQuestionIdx === questions.length - 1 ? "Finish & Analyze" : "Next Question"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Step 3: Analyzing */}
            {step === "analyzing" && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in duration-1000">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <BrainCircuit className="w-24 h-24 text-primary relative animate-bounce" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Cracking the Context...</h2>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Our engine is analyzing your logic, technical accuracy, and overall explanation depth across {questions.length} domains.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-xs font-bold uppercase tracking-tighter">Running Adaptive Logic</span>
                    </div>
                </div>
            )}

            {/* Step 4: Result */}
            {step === "result" && (
                <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
                    <div className="bg-green-50 border border-green-200 dark:bg-green-900/10 p-6 rounded-3xl text-center space-y-4">
                        <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">Analysis Secured!</h2>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">Based on your performance, we've identified a key strategic weakness.</p>
                        </div>
                    </div>

                    <div className="bg-background border-2 border-primary/20 p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 bg-primary/10 rounded-bl-3xl">
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="font-extrabold text-lg flex items-center gap-2">
                            ⚠️ System Insight
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl dark:bg-red-900/10">
                                <p className="text-sm font-bold text-red-800 dark:text-red-400 uppercase tracking-widest text-[10px]">Identified Gap</p>
                                <p className="text-lg font-bold">Technical Communication</p>
                                <p className="text-xs mt-1 text-red-600 dark:text-red-300">
                                    You have strong technical intuition, but struggle to explain the "Value Proposition" to non-technical stakeholders.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-bold text-muted-foreground uppercase">Adaptive Response</p>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 border rounded-2xl dark:bg-zinc-900">
                                    <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-primary" />
                                    </div>
                                    <p className="text-xs flex-1 italic text-muted-foreground">
                                        "I've injected a new 'Soft Skills' module into your roadmap and moved it to Medium Priority."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full rounded-2xl h-12 text-md shadow-lg" onClick={() => router.push("/roadmap")}>
                            Go to Updated Roadmap
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
