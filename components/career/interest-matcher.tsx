
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Brain, Rocket, Code, Settings, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Domain } from "@/data/companies";

const INTERESTS = [
    { id: "ai", label: "Building Intelligent Machines", icon: <Brain className="w-4 h-4" />, domain: "AI/ML" as Domain },
    { id: "web", label: "Creating Websites & Apps", icon: <Code className="w-4 h-4" />, domain: "Web Dev" as Domain },
    { id: "space", label: "Space Explorations & Rockets", icon: <Rocket className="w-4 h-4" />, domain: "Aerospace" as Domain },
    { id: "hardware", label: "Working with Chips & Circuits", icon: <Settings className="w-4 h-4" />, domain: "Embedded" as Domain },
    { id: "social", label: "Solving Human Problems", icon: <Heart className="w-4 h-4" />, domain: "Fintech" as Domain },
    { id: "design", label: "Graphic Design & UI/UX", icon: <Code className="w-4 h-4" />, domain: "Web Dev" as Domain },
];

export function InterestMatcher() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [result, setResult] = useState<Domain | null>(null);

    const toggleInterest = (id: string) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const findDomain = () => {
        // Simple logic: pick the first selected interest's domain
        if (selectedInterests.length > 0) {
            const firstInterest = INTERESTS.find(i => i.id === selectedInterests[0]);
            if (firstInterest) setResult(firstInterest.domain);
        }
    };

    return (
        <Card className="border-2 shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    Career Path Finder
                </CardTitle>
                <CardDescription>
                    Select the things you enjoy doing, and we'll match you with a career domain.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                {!result ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {INTERESTS.map((interest) => (
                                <div
                                    key={interest.id}
                                    onClick={() => toggleInterest(interest.id)}
                                    className={`
                                        flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                                        ${selectedInterests.includes(interest.id)
                                            ? "border-primary bg-primary/10"
                                            : "border-muted hover:border-primary/50 hover:bg-muted/50"}
                                    `}
                                >
                                    <div className={`p-2 rounded-lg ${selectedInterests.includes(interest.id) ? "bg-primary text-white" : "bg-muted"}`}>
                                        {interest.icon}
                                    </div>
                                    <span className="font-medium">{interest.label}</span>
                                </div>
                            ))}
                        </div>
                        <Button
                            className="w-full h-12 rounded-xl text-lg font-bold"
                            disabled={selectedInterests.length === 0}
                            onClick={findDomain}
                        >
                            Find My Career Path
                        </Button>
                    </div>
                ) : (
                    <div className="text-center space-y-6 animate-in zoom-in duration-500">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Your Ideal Domain is:</h3>
                            <div className="text-4xl font-extrabold text-primary tracking-tight">
                                {result}
                            </div>
                        </div>
                        <p className="text-muted-foreground">
                            Based on your interests, <span className="font-bold text-foreground">{result}</span> offers the best mix of challenge and fulfillment.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button asChild variant="outline" className="h-12 rounded-xl">
                                <Link href={`/companies?domain=${result}`}>View {result} Companies</Link>
                            </Button>
                            <Button asChild className="h-12 rounded-xl">
                                <Link href="/roadmap" className="flex items-center gap-2">
                                    Start Prep Roadmap <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                        <Button variant="link" onClick={() => { setResult(null); setSelectedInterests([]); }}>
                            Start Over
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
