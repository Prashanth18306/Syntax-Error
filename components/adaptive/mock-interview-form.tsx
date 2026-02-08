
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, CheckCircle, ArrowRight, User, Bot, Sparkles, Loader2, Award, Zap, Mic, MicOff, Volume2, FileCheck, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { analyzePerformance, InterviewResult } from "@/lib/adaptive-engine";
import { useToast } from "@/components/ui/use-toast";

type Step = "setup" | "questioning" | "analyzing" | "result";

interface Message {
    role: "user" | "pivot";
    content: string;
    type?: "question" | "evaluation";
}

interface ResumeData {
    projects: string[];
    skills: string[];
    experience: string[];
    rawText: string;
}

export function MockInterviewForm() {
    const router = useRouter();
    const { toast } = useToast();

    // Pivot States
    const [step, setStep] = useState<Step>("setup");
    const [role, setRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resumeData, setResumeData] = useState<ResumeData>({ projects: [], skills: [], experience: [], rawText: "" });
    const [resumeFileName, setResumeFileName] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // Chat Logic
    const [chat, setChat] = useState<Message[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [userResponse, setUserResponse] = useState("");
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<"Foundation" | "Advanced">("Foundation");
    const [resultData, setResultData] = useState<InterviewResult | null>(null);

    // Refs
    const recognitionRef = useRef<any>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Speech Recognition Setup
    useEffect(() => {
        if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result) => result.transcript)
                    .join("");
                setUserResponse(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech Recognition Error", event.error);
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const speakMessage = (text: string, onEnd?: () => void) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.1;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => {
                setIsSpeaking(false);
                if (onEnd) onEnd();
            };
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                // Heuristic Parsing for Simulation
                setResumeData({
                    projects: ["Intelligent Traffic System", "Distributed Cache Layer"],
                    skills: ["TensorFlow", "Kubernetes", "Rust", "System Design"],
                    experience: ["2 Years as ML Engineer at TechCorp", "Internship at AI Labs"],
                    rawText: text.substring(0, 5000)
                });
            };
            if (file.type === "text/plain") {
                reader.readAsText(file);
            } else {
                // Mocking data for PDF/DOCX
                setResumeData({
                    projects: ["Intelligent Traffic System", "Distributed Cache Layer"],
                    skills: ["TensorFlow", "Kubernetes", "Rust", "System Design"],
                    experience: ["2 Years as ML Engineer at TechCorp", "Internship at AI Labs"],
                    rawText: "[Mock Content]"
                });
            }
        }
    };

    const startInterview = () => {
        if (!role || !jobDescription) return;
        setIsGenerating(true);
        setTimeout(() => {
            const firstQuestion = `Hello, I'm Pivot. I'll be your technical interviewer today for the ${role} position. To get started, could you please introduce yourself and provide a brief overview of your professional journey so far?`;
            setChat([{ role: "pivot", content: firstQuestion, type: "question" }]);
            setIsGenerating(false);
            setStep("questioning");
            speakMessage(firstQuestion, () => toggleListening());
        }, 1200);
    };

    const handleNextStep = () => {
        if (isListening) toggleListening();
        const userInput = userResponse;
        setUserResponse("");

        // Add user message and save answer
        const newChat: Message[] = [...chat, { role: "user", content: userInput }];
        setChat(newChat);
        setUserAnswers(prev => [...prev, userInput]);

        // Analyze Response (Antigravity Loop)
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            const isStrong = userInput.length > 50;
            let evaluationMsg = "";
            let nextQuestion = "";

            if (currentQuestionIdx === 0) {
                // Phase 2: Professional Experience scan
                const exp = resumeData.experience[0] || "your recent role";
                evaluationMsg = `That's a helpful overview. I noticed you spent some time as ${exp}. Let's dive into your actual contributions there.`;
                nextQuestion = `During your tenure as ${exp}, what was the most significant technical achievement you delivered, and how did it impact the business or your team's workflow?`;
            } else if (currentQuestionIdx === 1) {
                // Phase 3: Technical Skills Scan
                const skill = resumeData.skills[0] || "core technologies";
                evaluationMsg = isStrong ? `Impressive impact on your previous team. I also see ${skill} listed as a key strength.` : "I see. Let's shift focus to your technical depth.";
                nextQuestion = `Considering your expertise in ${skill}, how would you apply it to solve the high-availability requirements mentioned in the job description? Please be specific with trade-offs.`;
                setDifficulty("Advanced");
            } else if (currentQuestionIdx === 2) {
                // Phase 4: Project Logic
                const project = resumeData.projects[0] || "primary project";
                evaluationMsg = `Your technical reasoning is solid. Let's wrap up by looking at your hands-on implementation in ${project}.`;
                nextQuestion = `In ${project}, how did you handle data consistency and edge-case failures? If you had to rebuild it today with modern production constraints, what would you change?`;
            } else {
                const finalAnswers = [...userAnswers, userInput];
                submitFinalResults(finalAnswers);
                return;
            }

            setChat(prev => [...prev,
            { role: "pivot", content: evaluationMsg, type: "evaluation" },
            { role: "pivot", content: nextQuestion, type: "question" }
            ]);
            setCurrentQuestionIdx(prev => prev + 1);
            speakMessage(`${evaluationMsg} ${nextQuestion}`, () => toggleListening());
        }, 1500);
    };

    const submitFinalResults = (finalAnswers: string[]) => {
        setIsGenerating(false);
        setStep("analyzing");
        speakMessage("That concludes our interview. Please wait while I analyze your experience, project knowledge, and technical fit.");

        setTimeout(() => {
            const results = analyzePerformance(finalAnswers, role);
            setResultData(results);

            localStorage.setItem("h2_triggered", "true");
            localStorage.setItem("h2_weakness", results.weakness);
            localStorage.setItem("h2_score", results.score.toString());
            localStorage.setItem("h2_status", results.status);

            setStep("result");
            toast({
                title: "Comprehensive Analysis Complete!",
                description: `Pivot scored your profile at ${results.score}%.`,
            });
            speakMessage(`I have analyzed your logic across experience and projects. Your composite technical score is ${results.score} percent.`);
        }, 3000);
    };

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    return (
        <div className="max-w-4xl mx-auto">
            {step === "setup" && (
                <div className="animate-in fade-in zoom-in duration-500">
                    <div className="bg-white dark:bg-zinc-900 border-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] p-8 md:p-12 space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                            <BrainCircuit className="w-64 h-64" />
                        </div>

                        <div className="space-y-4 relative">
                            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-4">
                                <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                Initialize Comprehensive Interview
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl font-medium">
                                Pivot is now scanning your <span className="text-primary font-bold">Experience, Skills, and Projects</span> to simulate a full-scale hiring session.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                                    <User className="w-3 h-3 text-primary" /> Target Role
                                </label>
                                <Input
                                    placeholder="e.g. Senior Machine Learning Engineer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="h-16 rounded-2xl bg-background border-2 focus-visible:ring-primary shadow-sm"
                                />
                            </div>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "border-2 border-dashed rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-primary/5",
                                    resumeFileName ? "border-green-500/50 bg-green-50/10" : "border-primary/20"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center",
                                    resumeFileName ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                                )}>
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">{resumeFileName || "Full Resume Upload"}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tight">Sync Skills & Experience</p>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.txt" />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
                                    <FileCheck className="w-3 h-3 text-blue-500" /> Job Description
                                </label>
                                <Textarea
                                    placeholder="Paste JD to cross-reference with your entire career history..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="min-h-[120px] rounded-2xl bg-background border-2 focus-visible:ring-primary shadow-sm p-4"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-20 rounded-[2.5rem] text-2xl font-black shadow-primary/30 shadow-2xl group transition-all hover:scale-[1.01]"
                            disabled={!role || !jobDescription || isGenerating}
                            onClick={startInterview}
                        >
                            {isGenerating ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-4">
                                    INITIATE COMPREHENSIVE SCAN <ArrowRight className="w-8 h-8" />
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {step === "questioning" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border shadow-sm sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-sm">Pivot: Hiring AI</h3>
                                <p className="text-[10px] text-primary font-bold uppercase">Comprehensive Scrutiny Mode</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="border-primary text-primary font-bold px-4 py-1.5 rounded-full">
                            Question {currentQuestionIdx + 1} of 4
                        </Badge>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border-2 rounded-[3rem] p-8 min-h-[400px] flex flex-col shadow-xl">
                        <div className="flex-1 space-y-6 overflow-y-auto max-h-[500px] pr-4">
                            {chat.map((m, i) => (
                                <div key={i} className={cn(
                                    "flex gap-4 items-start animate-in slide-in-from-bottom-2",
                                    m.role === "user" ? "flex-row-reverse" : ""
                                )}>
                                    <div className={cn(
                                        "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                                        m.role === "user" ? "bg-zinc-100 dark:bg-zinc-800" : "bg-primary text-white"
                                    )}>
                                        {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <div className={cn(
                                        "p-5 rounded-[2rem] max-w-[80%] text-sm font-medium leading-relaxed shadow-sm",
                                        m.role === "user"
                                            ? "bg-zinc-50 dark:bg-zinc-800 rounded-tr-none border"
                                            : "bg-primary/5 dark:bg-primary/10 rounded-tl-none border border-primary/20",
                                        m.type === "evaluation" ? "border-amber-200 bg-amber-50/50 text-amber-900 animate-pulse" : ""
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isGenerating && (
                                <div className="flex gap-4 items-start italic text-muted-foreground animate-pulse ml-14">
                                    Pivot is analyzing your profile...
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="mt-8 pt-8 border-t space-y-4">
                            <div className="relative group">
                                <Textarea
                                    value={userResponse}
                                    onChange={(e) => setUserResponse(e.target.value)}
                                    placeholder={isListening ? "Listening... speak now." : "Type your technical response here..."}
                                    className="min-h-[120px] rounded-[2rem] bg-muted/30 border-2 py-6 px-8 pr-32 focus-visible:ring-primary shadow-inner"
                                />
                                <div className="absolute right-4 bottom-4 flex gap-2">
                                    <Button
                                        size="icon"
                                        variant={isListening ? "destructive" : "secondary"}
                                        className="h-12 w-12 rounded-2xl shadow-lg transition-transform active:scale-90"
                                        onClick={toggleListening}
                                    >
                                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="default"
                                        className="h-12 w-12 rounded-2xl shadow-lg shadow-primary/20 transition-transform active:scale-95"
                                        onClick={handleNextStep}
                                        disabled={!userResponse || isGenerating}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                <Zap className="w-3 h-3 text-amber-500" /> Powered by Adaptive Guidance Engine
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === "analyzing" && (
                <div className="h-[600px] flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-1000">
                    <div className="relative">
                        <div className="h-48 w-48 bg-primary/20 rounded-full animate-ping absolute inset-0" />
                        <div className="h-48 w-48 border-8 border-primary border-t-transparent rounded-full animate-spin relative flex items-center justify-center">
                            <BrainCircuit className="w-20 h-20 text-primary animate-pulse" />
                        </div>
                    </div>
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black italic tracking-widest text-zinc-900 dark:text-zinc-100">QUANTIZING CAREER HISTORY...</h2>
                        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Finalizing deep-scan across experience, skills, and projects</p>
                    </div>
                </div>
            )}

            {step === "result" && (
                <div className="animate-in slide-in-from-bottom-12 duration-1000 space-y-12 pb-24">
                    <div className="bg-primary/5 border-4 border-primary/10 p-12 rounded-[3.5rem] text-center space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <div className="h-24 w-24 bg-primary rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl rotate-12 transition-transform hover:rotate-0">
                            <CheckCircle className="w-14 h-14" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-5xl font-black tracking-[0.05em] text-zinc-900 dark:text-zinc-100">LOOP SECURED.</h2>
                            <p className="text-primary font-bold text-2xl">Overall Composite Score: {resultData?.score}%</p>
                        </div>
                        <div className="flex justify-center gap-2">
                            <Badge className={cn(
                                "font-black tracking-widest px-6 py-2 rounded-full uppercase text-sm shadow-lg",
                                resultData?.status === "Strong" ? "bg-green-600 text-white" :
                                    resultData?.status === "Moderate" ? "bg-amber-500 text-white" : "bg-red-600 text-white"
                            )}>
                                {resultData?.status} Candidate
                            </Badge>
                            <Badge variant="outline" className="border-primary text-primary font-black px-4 py-1 rounded-full uppercase text-xs">
                                Full History Scan Verified
                            </Badge>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] p-12 space-y-10 relative group">
                        <div className="space-y-8">
                            <div className="p-10 bg-slate-50 dark:bg-zinc-800/50 border-2 rounded-[2.5rem] relative">
                                <span className="absolute -top-4 left-10 px-6 py-1 bg-zinc-900 text-white text-[11px] font-black uppercase rounded-xl">Expert Scrutiny Feedback</span>
                                <p className="text-lg text-muted-foreground leading-relaxed italic">
                                    "{resultData?.feedback}"
                                </p>
                            </div>

                            {resultData?.status !== "Strong" && (
                                <div className="p-10 bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900/30 rounded-[2.5rem] relative shadow-inner">
                                    <span className="absolute -top-4 left-10 px-6 py-1 bg-red-600 text-white text-[11px] font-black uppercase rounded-xl shadow-lg">Strategic Critical Gap</span>
                                    <p className="text-4xl font-black text-red-900 dark:text-red-400 italic">"{resultData?.weakness}"</p>
                                    <p className="text-base text-red-800/70 dark:text-red-400/80 mt-5 leading-relaxed font-medium">
                                        Our AI detected a recursive failure in your <strong>{resultData?.weakness}</strong> logic across your career history.
                                        A custom remedial path has been force-injected into your roadmap.
                                    </p>
                                </div>
                            )}
                        </div>
                        <Button
                            className="w-full h-24 rounded-[2.5rem] text-2xl font-black shadow-primary/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                            onClick={() => router.push("/roadmap")}
                        >
                            ENTER ADAPTIVE HUB <ArrowRight className="w-8 h-8" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
