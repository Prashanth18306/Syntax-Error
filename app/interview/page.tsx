import { MockInterviewForm } from "@/components/adaptive/mock-interview-form";
import { Badge } from "@/components/ui/badge";

export default function InterviewPage() {
    return (
        <div className="container py-12 max-w-4xl space-y-10">
            <div className="space-y-4 text-center">
                <div className="flex flex-col items-center gap-2">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-tighter font-bold">
                        Platform Ready
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight">Adaptive Mock Interview</h1>
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">100% Free Access</Badge>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Experience a high-stakes simulation. Our AI engine detects your logical gaps and
                    <strong> automatically reconstructs your roadmap.</strong>
                </p>
            </div>

            <div className="relative z-10 bg-white dark:bg-zinc-950 rounded-3xl border shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
                <div className="p-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                <div className="p-8 md:p-12 flex-1 flex flex-col">
                    <MockInterviewForm />
                </div>
            </div>
        </div>
    );
}
