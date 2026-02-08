
import { InterestMatcher } from "@/components/career/interest-matcher";
import { Badge } from "@/components/ui/badge";

export default function CareerGuidePage() {
    return (
        <div className="container py-12 max-w-2xl space-y-10">
            <div className="space-y-4 text-center">
                <div className="flex justify-center gap-2">
                    <Badge variant="secondary" className="px-3 py-1">Feature S1</Badge>
                    <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20">Student First</Badge>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Discover Your <span className="text-primary underline decoration-primary/30">True Calling</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Not sure where to start? Tell us what excites you, and we'll map your interests to high-growth engineering domains.
                </p>
            </div>

            <div className="relative">
                {/* Visual Flair */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

                <InterestMatcher />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                <div className="p-6 bg-slate-50 rounded-2xl border dark:bg-zinc-900">
                    <h3 className="font-bold mb-2">Why this matters?</h3>
                    <p className="text-sm text-muted-foreground">
                        Most students default to generic roles. Choosing the right domain early can 5x your career satisfaction and ROI.
                    </p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border dark:bg-zinc-900">
                    <h3 className="font-bold mb-2">How it works</h3>
                    <p className="text-sm text-muted-foreground">
                        We analyze your curiosity patterns and match them against the 24+ industry domains in our database.
                    </p>
                </div>
            </div>
        </div>
    );
}
