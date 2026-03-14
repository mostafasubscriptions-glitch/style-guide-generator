import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogueItem } from "./types";

interface Props {
  items: CatalogueItem[];
}

const CompactListView = ({ items }: Props) => {
  const navigate = useNavigate();


  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-lg bg-card border border-border hover:shadow-sm transition-shadow cursor-pointer group",
            item.type === "Certification" && "border-l-4 border-l-accent"
          )}
          onClick={() => {
            navigate(`/catalogue/${item.type === "Certification" ? "cert" : "course"}/${item.type === "Certification" ? item.id : item.id - 100}`);
          }}
        >
          <div className={cn(
            "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
            item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
          )}>
            {item.type === "Certification"
              ? <Award className="h-4 w-4 text-accent" />
              : <BookOpen className="h-4 w-4 text-info" />
            }
          </div>

          <div className="flex-1 min-w-0 flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-muted-foreground w-20 shrink-0">{item.code}</span>
            <span className="text-sm font-medium text-foreground truncate">{item.title}</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">{item.competencyName}</Badge>
            {item.isQatarRecommended && (
              <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px] gap-1">
                <Star className="h-2.5 w-2.5" />
              </Badge>
            )}
          </div>

          <span className="text-xs text-muted-foreground hidden sm:block w-20 text-center">{item.provider}</span>
          <span className="text-xs text-muted-foreground hidden lg:block w-16 text-center">{item.level}</span>
          <span className="text-xs text-muted-foreground hidden lg:block w-16 text-center">{item.duration}</span>
          <span className="text-sm font-semibold text-foreground w-24 text-right">QAR {item.cost.toLocaleString()}</span>

          {(
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CompactListView;
