import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Award, BookOpen, Star, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogueItem } from "./types";

interface Props {
  items: CatalogueItem[];
}

type SortKey = "code" | "title" | "provider" | "level" | "cost" | "duration";

const TableView = ({ items }: Props) => {
  const navigate = useNavigate();


  const [sortKey, setSortKey] = useState<SortKey>("code");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...items].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === "cost") return (a.cost - b.cost) * dir;
    return (a[sortKey] ?? "").localeCompare(b[sortKey] ?? "") * dir;
  });

  const SortHeader = ({ label, keyName }: { label: string; keyName: SortKey }) => (
    <button
      onClick={() => handleSort(keyName)}
      className={cn(
        "flex items-center gap-1 text-xs font-medium hover:text-foreground transition-colors",
        sortKey === keyName ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-10" />
            <TableHead><SortHeader label="Code" keyName="code" /></TableHead>
            <TableHead><SortHeader label="Title" keyName="title" /></TableHead>
            <TableHead><SortHeader label="Provider" keyName="provider" /></TableHead>
            <TableHead><SortHeader label="Level" keyName="level" /></TableHead>
            <TableHead><SortHeader label="Duration" keyName="duration" /></TableHead>
            <TableHead>Competency</TableHead>
            <TableHead className="text-right"><SortHeader label="Cost" keyName="cost" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((item) => (
            <TableRow
              key={item.id}
              className={cn(
                "cursor-pointer hover:bg-muted/30",
                item.type === "Certification" && "border-l-4 border-l-accent"
              )}
              onClick={() => {
                navigate(`/catalogue/${item.type === "Certification" ? "cert" : "course"}/${item.type === "Certification" ? item.id : item.id - 100}`);
              }}
            >
              <TableCell>
                <div className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center",
                  item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                )}>
                  {item.type === "Certification"
                    ? <Award className="h-3.5 w-3.5 text-accent" />
                    : <BookOpen className="h-3.5 w-3.5 text-info" />
                  }
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs font-semibold text-muted-foreground">{item.code}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                  {item.isQatarRecommended && (
                    <Star className="h-3 w-3 text-accent fill-accent" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{item.provider}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{item.level}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{item.duration}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px]">{item.competencyName}</Badge>
              </TableCell>
              <TableCell className="text-right text-sm font-semibold text-foreground">QAR {item.cost.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
