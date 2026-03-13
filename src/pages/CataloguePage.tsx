import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, Award, BookOpen, Star, ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";
import { certifications, trainings, providers } from "@/data/mockData";
import { cn } from "@/lib/utils";

type CatalogueItem = {
  id: number;
  type: "Certification" | "Course";
  code: string;
  title: string;
  provider: string;
  level: string;
  cost: number;
  duration: string;
  competencyName: string;
  isQatarRecommended?: boolean;
  prepForCertCode?: string | null;
  format?: string;
  description?: string;
  skills: string[];
  prerequisites?: string[];
  examFormat?: string;
};

const CataloguePage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Certification" | "Course">("All");
  const [providerFilter, setProviderFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const items: CatalogueItem[] = [
    ...certifications.map((c) => ({
      id: c.id, type: "Certification" as const, code: c.code, title: c.title,
      provider: c.provider, level: c.level, cost: c.cost, duration: c.duration,
      competencyName: c.competencyName, isQatarRecommended: c.isQatarRecommended,
      description: c.description, skills: c.skills, prerequisites: c.prerequisites,
      examFormat: c.examFormat,
    })),
    ...trainings.map((t) => ({
      id: t.id + 100, type: "Course" as const, code: t.code, title: t.title,
      provider: t.provider, level: t.level, cost: t.cost, duration: t.duration,
      competencyName: t.competencyName, prepForCertCode: t.prepForCertCode,
      format: t.format, description: t.description, skills: t.skills,
    })),
  ];

  const allProviders = [...new Set(items.map(i => i.provider))];

  const filtered = items.filter((item) => {
    if (typeFilter !== "All" && item.type !== typeFilter) return false;
    if (providerFilter !== "All" && item.provider !== providerFilter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) &&
      !item.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getProviderInfo = (name: string) => providers.find(p => p.name === name);

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Catalogue</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} items available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(["All", "Certification", "Course"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                typeFilter === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {t === "All" ? "All" : t === "Certification" ? "Certifications" : "Courses"}
            </button>
          ))}
        </div>
        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card text-foreground"
        >
          <option value="All">All Providers</option>
          {allProviders.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          const providerInfo = getProviderInfo(item.provider);
          return (
            <Card
              key={item.id}
              className={cn(
                "transition-shadow",
                item.type === "Certification" && "border-l-4 border-l-accent"
              )}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                    )}>
                      {item.type === "Certification"
                        ? <Award className="h-5 w-5 text-accent" />
                        : <BookOpen className="h-5 w-5 text-info" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{item.code}</span>
                        <span className="text-sm text-foreground">{item.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.provider} · {item.level} · {item.duration}
                        {item.format && ` · ${item.format}`}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px]">{item.competencyName}</Badge>
                        {item.isQatarRecommended && (
                          <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px] gap-1">
                            <Star className="h-2.5 w-2.5" /> Qatar Recommended
                          </Badge>
                        )}
                        {item.prepForCertCode && (
                          <Badge variant="outline" className="text-[10px]">Prep for {item.prepForCertCode}</Badge>
                        )}
                      </div>

                      {/* Skills */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.skills.slice(0, isExpanded ? undefined : 3).map(s => (
                            <Badge key={s} variant="outline" className="text-[9px] px-1.5 py-0 text-primary border-primary/30">{s}</Badge>
                          ))}
                          {!isExpanded && item.skills.length > 3 && (
                            <span className="text-[9px] text-muted-foreground">+{item.skills.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-sm font-semibold text-foreground">QAR {item.cost.toLocaleString()}</p>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      {isExpanded ? "Less" : "Details"}
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                    {item.prerequisites && item.prerequisites.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1">Prerequisites</p>
                        <ul className="space-y-0.5">
                          {item.prerequisites.map((p, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {item.examFormat && (
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1">Exam Format</p>
                        <p className="text-xs text-muted-foreground">{item.examFormat}</p>
                      </div>
                    )}
                    {providerInfo && (
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                          <span className="text-[8px] font-bold text-muted-foreground">{providerInfo.name.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{providerInfo.fullName}</p>
                          <p className="text-[10px] text-muted-foreground">{providerInfo.country}</p>
                        </div>
                        {providerInfo.website && (
                          <a href={providerInfo.website} target="_blank" rel="noreferrer" className="ml-auto text-primary hover:underline">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CataloguePage;
