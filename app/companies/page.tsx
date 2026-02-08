"use client";

import { useState, useMemo } from "react";
import { COMPANIES, CompanyType, Domain } from "@/data/companies";
import { CompanyCard } from "@/components/company/company-card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Sparkles, Filter, Globe2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompaniesPage() {
    const [userField, setUserField] = useState("");
    const [search, setSearch] = useState("");
    const [selectedDomain, setSelectedDomain] = useState<Domain | "All">("All");
    const [selectedType, setSelectedType] = useState<CompanyType | "All">("All");
    const [showOnlyTrending, setShowOnlyTrending] = useState(false);

    // Simple pagination for 1000 items
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    const filteredCompanies = useMemo(() => {
        return COMPANIES.filter((company) => {
            const matchesUserField = userField === "" ||
                company.domain.some(d => d.toLowerCase().includes(userField.toLowerCase())) ||
                company.roles.some(r => r.toLowerCase().includes(userField.toLowerCase())) ||
                company.description.toLowerCase().includes(userField.toLowerCase());

            const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
                company.roles.some(r => r.toLowerCase().includes(search.toLowerCase()));

            const matchesDomain = selectedDomain === "All" || company.domain.includes(selectedDomain);
            const matchesType = selectedType === "All" || company.type === selectedType;
            const matchesTrending = !showOnlyTrending || company.isTrending;

            return matchesUserField && matchesSearch && matchesDomain && matchesType && matchesTrending;
        });
    }, [userField, search, selectedDomain, selectedType, showOnlyTrending]);

    const paginatedCompanies = filteredCompanies.slice(0, page * itemsPerPage);

    const domains: Domain[] = [
        "AI/ML", "Web Dev", "Embedded", "Robotics", "Aerospace",
        "Semiconductor", "Civil", "Mechanical", "Fintech", "Biotech",
        "Renewable Energy", "Data Science", "EV", "SpaceTech" as any, "AgriTech" as any
    ];
    const types: CompanyType[] = ["Startup", "MNC", "Govt", "Unicorn"];

    return (
        <div className="container py-8 space-y-8">
            {/* Massive Database Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8">
                <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <Globe2 className="w-5 h-5 animate-spin-slow" />
                        <span className="text-sm font-bold tracking-widest uppercase">Global Career Network</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Search {COMPANIES.length}+ Companies</h1>
                    <p className="text-muted-foreground max-w-2xl mt-2 text-lg">
                        The world's most comprehensive database for <span className="text-foreground font-semibold">Core, IT, and Frontier Science</span> careers.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium border">
                        <span className="text-primary font-bold">{filteredCompanies.length}</span> results found
                    </div>
                    <Button
                        variant={showOnlyTrending ? "default" : "outline"}
                        onClick={() => { setShowOnlyTrending(!showOnlyTrending); setPage(1); }}
                        className="flex items-center gap-2 rounded-full"
                    >
                        <TrendingUp className="w-4 h-4" />
                        {showOnlyTrending ? "Viewing Trending" : "Show Trending"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-8 sticky top-24 h-fit">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter By
                        </h3>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold px-1">Domain</label>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant={selectedDomain === "All" ? "default" : "outline"}
                                    className="cursor-pointer px-3 py-1"
                                    onClick={() => { setSelectedDomain("All"); setPage(1); }}
                                >All</Badge>
                                {domains.map(d => (
                                    <Badge
                                        key={d}
                                        variant={selectedDomain === d ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1"
                                        onClick={() => { setSelectedDomain(d); setPage(1); }}
                                    >{d}</Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <label className="text-xs font-semibold px-1">Company Type</label>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant={selectedType === "All" ? "default" : "outline"}
                                    className="cursor-pointer px-3 py-1"
                                    onClick={() => { setSelectedType("All"); setPage(1); }}
                                >All</Badge>
                                {types.map(t => (
                                    <Badge
                                        key={t}
                                        variant={selectedType === t ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1"
                                        onClick={() => { setSelectedType(t); setPage(1); }}
                                    >{t}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3">
                        <h4 className="text-sm font-bold flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" /> Personalized AI Filter
                        </h4>
                        <Input
                            placeholder="e.g. Design, Firmware, VLSI"
                            className="text-xs h-8 bg-background"
                            value={userField}
                            onChange={(e) => { setUserField(e.target.value); setPage(1); }}
                        />
                        <p className="text-[10px] text-muted-foreground">Finds roles across all indices matching your specific interest.</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search by company name, role, or technology..."
                            className="pl-12 h-14 text-lg bg-slate-50 border-2 focus:bg-background transition-all rounded-2xl"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {paginatedCompanies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>

                    {filteredCompanies.length > paginatedCompanies.length && (
                        <div className="flex justify-center pt-8">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setPage(p => p + 2)}
                                className="rounded-full px-12 hover:bg-primary hover:text-primary-foreground"
                            >
                                Load More Discoveries
                            </Button>
                        </div>
                    )}

                    {filteredCompanies.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed">
                            <h3 className="text-xl font-bold text-foreground">No matches found in our database</h3>
                            <p className="mt-1">Try broadening your search or resetting filters.</p>
                            <Button
                                variant="link"
                                onClick={() => { setSearch(""); setUserField(""); setSelectedDomain("All"); setSelectedType("All"); setShowOnlyTrending(false); }}
                                className="mt-4"
                            >
                                Clear all criteria
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
