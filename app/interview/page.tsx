import { MockInterviewForm } from "@/components/adaptive/mock-interview-form";
import { Badge } from "@/components/ui/badge";

export default function InterviewPage() {
    return (
        <div className="container py-10 max-w-2xl space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Adaptive Mock Interview</h1>
                    <Badge variant="secondary">Beta</Badge>
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">100% Free</Badge>
                </div>
                <p className="text-muted-foreground">
                    Take a quick 2-question assessment. Our AI engine captures your weaknesses and <strong>automatically updates your roadmap in real-time.</strong>
                </p>
            </div>

            <div className="relative">
                {/* Background Decoration */}
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 blur" />
                <MockInterviewForm />
            </div>
        </div>
    );
}
