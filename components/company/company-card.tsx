import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/data/companies";
import { Building2, MapPin, Sparkles } from "lucide-react";

interface CompanyCardProps {
    company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="text-4xl bg-secondary/20 p-2 rounded-lg">{company.logo}</div>
                        <div>
                            <CardTitle className="text-xl">{company.name}</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {company.location}
                            </div>
                        </div>
                    </div>
                    {company.isHiddenGem && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Hidden Gem
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{company.type}</Badge>
                    {company.domain.map(d => (
                        <Badge key={d} variant="secondary">{d}</Badge>
                    ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {company.description}
                </p>
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground/80">Hiring For:</p>
                    <div className="flex flex-wrap gap-1">
                        {company.roles.map(role => (
                            <span key={role} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t bg-muted/50 mt-auto">
                <Button variant="ghost" className="w-full text-xs h-8" asChild>
                    <Link href={`#`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
