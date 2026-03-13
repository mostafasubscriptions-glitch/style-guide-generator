import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, Filter, Award, BookOpen, Star, ArrowUpDown
} from "lucide-react";
import { certifications, trainings } from "@/data/mockData";
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
};

const CataloguePage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Certification" | "Course">("All");

  const items: CatalogueItem[] = [
    ...certifications.map((c) => ({
      id: c.id, type: "Certification" as const, code: c.code, title: c.title,
      provider: c.provider, level: c.level, cost: c.cost, duration: c.duration,
      competencyName: c.competencyName, isQatarRecommended: c.isQatarRecommended,
    })),
    ...trainings.map((t) => ({
      id: t.id + 100, type: "Course" as const, code: t.code, title: t.title,
      provider: t.provider, level: t.level, cost: t.cost, duration: t.duration,
      competencyName: t.competencyName, prepForCertCode: t.prepForCertCode,
      format: t.format,
    })),
  ];

  const filtered = items.filter((item) => {
    if (typeFilter !== "All" && item.type !== typeFilter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) &&
      !item.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Catalogue</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} items available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
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
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "hover:shadow-md transition-shadow cursor-pointer",
              item.type === "Certification" && "border-l-4 border-l-accent"
            )}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                  )}>
                    {item.type === "Certification"
                      ? <Award className="h-5 w-5 text-accent" />
                      : <BookOpen className="h-5 w-5 text-info" />
                    }
                  </div>
                  <div>
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
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground shrink-0">QAR {item.cost.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;
