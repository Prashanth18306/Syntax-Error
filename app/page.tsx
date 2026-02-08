import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Layers, Zap, Brain, FileCheck, Compass } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <Link
                        href="/companies"
                        className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                        target="_blank"
                    >
                        Wait, I can work at Tesla? 🚀
                    </Link>
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        CareerOptima: <br className="hidden sm:inline" />
                        <span className="text-primary">Data-Driven Clarity.</span>
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Stop guessing. Start preparing. Discover hidden companies, prioritize the right skills, and get adaptive feedback — <span className="text-primary font-bold">all 100% free of cost.</span>
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button size="lg" asChild className="rounded-full px-8">
                            <Link href="/companies">Explore Companies</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                            <Link href="/roadmap">View Roadmap</Link>
                        </Button>
                        <Button size="lg" variant="secondary" asChild className="rounded-full px-8">
                            <Link href="/career-guide">Discover Career</Link>
                        </Button>
                        <Button size="lg" variant="ghost" asChild className="rounded-full px-8 underline">
                            <Link href="/resume">Scan Resume</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-primary text-primary hover:bg-primary/10">
                            <Link href="/interview">Try Mock Interview</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl" id="features">
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Globe className="h-12 w-12 text-primary" />
                            <div className="space-y-2">
                                <h3 className="font-bold">Company Discovery</h3>
                                <p className="text-sm text-muted-foreground">
                                    Find mapped roles in Startups, MNCs, and specialized industries like Aerospace & IoT.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Layers className="h-12 w-12 text-primary" />
                            <div className="space-y-2">
                                <h3 className="font-bold">Skill Prioritization</h3>
                                <p className="text-sm text-muted-foreground">
                                    Don't learn everything. Learn what matters. Structured roadmaps with dependency graphs.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Zap className="h-12 w-12 text-primary" />
                            <div className="space-y-2">
                                <h3 className="font-bold">Adaptive Guidance</h3>
                                <p className="text-sm text-muted-foreground">
                                    Failing mock interviews? Our system dynamically updates your learning path.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* New Features Added */}
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Brain className="h-12 w-12 text-blue-600" />
                            <div className="space-y-2">
                                <h3 className="font-bold">Career Path Finder</h3>
                                <p className="text-sm text-muted-foreground">
                                    Discover your ideal engineering domain based on your core interests and curiosity.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <FileCheck className="h-12 w-12 text-red-600" />
                            <div className="space-y-2">
                                <h3 className="font-bold">AI Resume Deep Scan</h3>
                                <p className="text-sm text-muted-foreground">
                                    Check your resume for ATS compatibility and get instant keyword recommendations.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <Compass className="h-12 w-12 text-green-600" />
                            <div className="space-y-2">
                                <h3 className="font-bold">Role Checklist</h3>
                                <p className="text-sm text-muted-foreground">
                                    Get a day-by-day checklist for your first 30 days of career preparation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto text-center md:max-w-[58rem]">
                    <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Careercompass replaces confusion with strategy.
                    </p>
                </div>
            </section>
        </div>
    );
}
