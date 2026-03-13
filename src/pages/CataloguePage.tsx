import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, LayoutGrid, List, Table2, Columns3 } from "lucide-react";
import { certifications, trainings } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { CatalogueItem } from "@/components/catalogue/types";
import CardGridView from "@/components/catalogue/CardGridView";
import CompactListView from "@/components/catalogue/CompactListView";
import TableView from "@/components/catalogue/TableView";
import KanbanView from "@/components/catalogue/KanbanView";

type ViewMode = "grid" | "list" | "table" | "kanban";

const viewOptions: { id: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { id: "grid", label: "Grid", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
  { id: "table", label: "Table", icon: Table2 },
  { id: "kanban", label: "Kanban", icon: Columns3 },
];

const CataloguePage = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Certification" | "Course">("All");
  const [providerFilter, setProviderFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Catalogue</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} items available</p>
        </div>

        {/* View Switcher */}
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {viewOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                viewMode === id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
              title={label}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
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

      {/* View Content */}
      {viewMode === "grid" && <CardGridView items={filtered} />}
      {viewMode === "list" && <CompactListView items={filtered} />}
      {viewMode === "table" && <TableView items={filtered} />}
      {viewMode === "kanban" && <KanbanView items={filtered} />}
    </div>
  );
};

export default CataloguePage;
