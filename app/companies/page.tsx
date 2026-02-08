"use client";

import { useState } from "react";
import { COMPANIES, CompanyType, Domain } from "@/data/companies";
import { CompanyCard } from "@/components/company/company-card";
import { MultiSelect } from "@/components/ui/multi-select"; // We'll implement a simple one or use native select
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompaniesPage() {
    const [search, setSearch] = useState("");
    const [selectedDomain, setSelectedDomain] = useState<Domain | "All">("All");
    const [selectedType, setSelectedType] = useState<CompanyType | "All">("All");

    const filteredCompanies = COMPANIES.filter((company) => {
        const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
            company.roles.some(r => r.toLowerCase().includes(search.toLowerCase()));

        const matchesDomain = selectedDomain === "All" || company.domain.includes(selectedDomain);
        const matchesType = selectedType === "All" || company.type === selectedType;

        return matchesSearch && matchesDomain && matchesType;
    });

    const domains: Domain[] = ["AI/ML", "Web Dev", "Embedded", "Cybersecurity", "Data Science"];
    const types: CompanyType[] = ["Startup", "MNC", "Govt", "Unicorn"];

    return (
        <div className="container py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Discover Companies (S4)</h1>
                    <p className="text-muted-foreground max-w-2xl mt-2">
                        Stop applying blindly. Find companies that actually hire for your skillset, from hidden startups to global giants.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-xl border">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or role (e.g. Firmware)..."
                        className="pl-9 bg-background"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 bg-background p-1 rounded-md border items-center overflow-x-auto">
                    <span className="text-xs font-medium px-2 text-muted-foreground">Type:</span>
                    <Badge
                        variant={selectedType === "All" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedType("All")}
                    >
                        All
                    </Badge>
                    {types.map(t => (
                        <Badge
                            key={t}
                            variant={selectedType === t ? "default" : "outline"}
                            className="cursor-pointer whitespace-nowrap"
                            onClick={() => setSelectedType(t)}
                        >
                            {t}
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2 bg-background p-1 rounded-md border items-center overflow-x-auto">
                    <span className="text-xs font-medium px-2 text-muted-foreground">Domain:</span>
                    <Badge
                        variant={selectedDomain === "All" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedDomain("All")}
                    >
                        All
                    </Badge>
                    {domains.map(d => (
                        <Badge
                            key={d}
                            variant={selectedDomain === d ? "default" : "outline"}
                            className="cursor-pointer whitespace-nowrap"
                            onClick={() => setSelectedDomain(d)}
                        >
                            {d}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>

            {filteredCompanies.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No companies found matching your criteria.</p>
                    <Button variant="link" onClick={() => { setSearch(""); setSelectedDomain("All"); setSelectedType("All") }}>Clear Filters</Button>
                </div>
            )}
        </div>
    );
}
