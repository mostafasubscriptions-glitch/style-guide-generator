import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Star, ArrowRight } from "lucide-react";
import { providers } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CatalogueItem } from "./types";

interface Props {
  items: CatalogueItem[];
}

const KanbanView = ({ items }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isV2 = location.pathname.startsWith("/v2");

  const grouped = items.reduce<Record<string, CatalogueItem[]>>((acc, item) => {
    if (!acc[item.provider]) acc[item.provider] = [];
    acc[item.provider].push(item);
    return acc;
  }, {});

  const providerNames = Object.keys(grouped).sort();

  const getProviderInfo = (name: string) => providers.find(p => p.name === name);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {providerNames.map((providerName) => {
        const providerInfo = getProviderInfo(providerName);
        const providerItems = grouped[providerName];
        return (
          <div key={providerName} className="min-w-[300px] max-w-[320px] shrink-0">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
                <span className="text-[9px] font-bold text-muted-foreground">{providerName.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{providerName}</p>
                {providerInfo && <p className="text-[10px] text-muted-foreground">{providerInfo.fullName}</p>}
              </div>
              <Badge variant="outline" className="ml-auto text-[10px]">{providerItems.length}</Badge>
            </div>

            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-2 pr-2">
                {providerItems.map((item) => (
                  <Card
                    key={item.id}
                    className={cn(
                      "transition-shadow hover:shadow-md cursor-pointer",
                      item.type === "Certification" && "border-l-4 border-l-accent"
                    )}
                    onClick={() => {
                      if (isV2) navigate(`/v2/catalogue/${item.type === "Certification" ? "cert" : "course"}/${item.type === "Certification" ? item.id : item.id - 100}`);
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <div className={cn(
                          "w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                          item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                        )}>
                          {item.type === "Certification"
                            ? <Award className="h-3.5 w-3.5 text-accent" />
                            : <BookOpen className="h-3.5 w-3.5 text-info" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-mono text-muted-foreground">{item.code}</p>
                          <p className="text-sm font-medium text-foreground leading-tight mt-0.5">{item.title}</p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-wrap">
                          <Badge variant="outline" className="text-[9px]">{item.level}</Badge>
                          <Badge variant="outline" className="text-[9px]">{item.duration}</Badge>
                          {item.isQatarRecommended && (
                            <Star className="h-3 w-3 text-accent fill-accent" />
                          )}
                        </div>
                        <span className="text-xs font-semibold text-foreground">QAR {item.cost.toLocaleString()}</span>
                      </div>

                      <div className="mt-2">
                        <Badge variant="outline" className="text-[9px] text-primary border-primary/30">{item.competencyName}</Badge>
                      </div>

                      {isV2 && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <button className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                            View Details <ArrowRight className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanView;
