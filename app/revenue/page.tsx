export default function RevenuePage() {
    return (
        <div className="container py-10 max-w-4xl space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Revenue Generation & Business Model</h1>
                <p className="text-muted-foreground">
                    Sustainable monetization strategies for Careercompass.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Model 1: B2C Premium */}
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">1. B2C Premium Subscription</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li><strong>Freemium Model:</strong> Basic roadmap and company list are free.</li>
                        <li><strong>Premium ($10/mo):</strong> Detailed interview feedback, unlimited mock interviews (H2), and advanced project templates.</li>
                        <li><strong>Upsell:</strong> Project review by industry mentors.</li>
                    </ul>
                </div>

                {/* Model 2: B2B University Partnerships */}
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">2. B2B University Licensing</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li><strong>Institutional Access:</strong> Bulk licenses for colleges to provide Careercompass to all final-year students.</li>
                        <li><strong>Placement Analytics Dashboard:</strong> Colleges get data on student readiness and skill gaps (M1) to organize targeted workshops.</li>
                    </ul>
                </div>

                {/* Model 3: Recruitment Pipeline */}
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">3. Corporate Recruitment Pipeline</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li><strong>Vetted Candidates:</strong> Companies (S4) pay to access top-tier candidates who have "Completed" verified roadmaps.</li>
                        <li><strong>Sponsored Challenges:</strong> Companies host hackathons or project challenges on the platform.</li>
                    </ul>
                </div>

                {/* Model 4: Affiliate */}
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">4. Affiliate & Course Marketplace</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li><strong>Curated Resources:</strong> Commission on recommending high-quality paid courses (Udacity, Coursera) linked in the Skill Roadmap (M1).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
