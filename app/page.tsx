import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Layers, Zap } from "lucide-react";

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
                        Navigate Your Career with <br className="hidden sm:inline" />
                        <span className="text-primary">Data-Driven Clarity.</span>
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Stop guessing. Start preparing. Discover hidden companies, prioritize the right skills, and get adaptive feedback to crack your dream role.
                    </p>
                    <div className="space-x-4">
                        <Button size="lg" asChild>
                            <Link href="/companies">Explore Companies</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/roadmap">View Roadmap</Link>
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
                                <h3 className="font-bold">Company Discovery (S4)</h3>
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
                                <h3 className="font-bold">Skill Prioritization (M1)</h3>
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
                                <h3 className="font-bold">Adaptive Guidance (H2)</h3>
                                <p className="text-sm text-muted-foreground">
                                    Failing mock interviews? Our system dynamically updates your learning path.
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
