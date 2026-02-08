import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/data/companies";
import { MapPin, Sparkles, CheckCircle2, ListChecks, TrendingUp, ExternalLink } from "lucide-react";

interface CompanyCardProps {
    company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 group border-border/50 relative overflow-hidden">
            {company.isTrending && (
                <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 flex items-center gap-1 rounded-bl-lg shadow-sm">
                        <TrendingUp className="w-3 h-3" />
                        TRENDING
                    </div>
                </div>
            )}

            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="text-4xl bg-secondary/20 p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
                            {company.logo}
                        </div>
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                {company.name}
                                {company.isHiring && (
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" title="Actively Hiring" />
                                )}
                            </CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground mt-0.5">
                                <MapPin className="w-3 h-3 mr-1" />
                                {company.location}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        {company.isHiddenGem && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Hidden Gem
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{company.type}</Badge>
                    {company.domain.map(d => (
                        <Badge key={d} variant="secondary" className="text-[10px] py-0">{d}</Badge>
                    ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                    {company.description}
                </p>

                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <p className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 uppercase tracking-tight">
                            Roles
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {company.roles.map(role => (
                                <span key={role} className="text-[11px] bg-muted px-2 py-0.5 rounded text-muted-foreground border border-border/50">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>

                    {company.requirements && (
                        <div className="space-y-1.5">
                            <p className="text-xs font-bold text-foreground/80 flex items-center gap-1.5 uppercase tracking-tight">
                                <ListChecks className="w-3 h-3" /> Required Skills
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {company.requirements.map(req => (
                                    <span key={req} className="text-[11px] text-primary/80 flex items-center gap-1">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-primary/50" />
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t bg-muted/30 mt-auto">
                <Button variant="ghost" className="w-full text-xs h-9 justify-between hover:bg-primary/5 hover:text-primary transition-all group-hover:px-4" asChild>
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <span className="flex items-center gap-2">
                            Explore Opportunities <ExternalLink className="w-3 h-3" />
                        </span>
                        {company.isTrending ? <TrendingUp className="w-3 h-3" /> : <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
