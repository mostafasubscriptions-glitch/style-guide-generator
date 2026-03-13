import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Star, ChevronDown, ChevronUp, ExternalLink, ArrowRight } from "lucide-react";
import { providers } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { CatalogueItem } from "./types";

interface Props {
  items: CatalogueItem[];
}

const CardGridView = ({ items }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isV2 = location.pathname.startsWith("/v2");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getProviderInfo = (name: string) => providers.find(p => p.name === name);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((item) => {
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
                  {isV2 && (
                    <button
                      onClick={() => navigate(`/v2/catalogue/${item.type === "Certification" ? "cert" : "course"}/${item.type === "Certification" ? item.id : item.id - 100}`)}
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      Full Page <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

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
  );
};

export default CardGridView;
