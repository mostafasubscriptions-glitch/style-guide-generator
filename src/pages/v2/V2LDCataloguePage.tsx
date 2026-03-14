import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen, Settings, BarChart3, Building2, Brain, Search,
  Plus, Pencil, Trash2, ExternalLink, CheckCircle2, TrendingUp,
  Award, GraduationCap, DollarSign, Users, AlertTriangle,
  ToggleRight, Link2, Globe
} from "lucide-react";
import { certifications, trainings, providers, competencies } from "@/data/mockData";
import { cn } from "@/lib/utils";

const aiRules = [
  { id: 1, name: "Qatar Recommended Priority", description: "Boost confidence score by +15% for Qatar Recommended certifications", enabled: true, category: "Scoring" },
  { id: 2, name: "Budget Cap per Employee", description: "Cap AI recommendations to QAR 15,000 per employee per year", enabled: true, category: "Budget" },
  { id: 3, name: "Prerequisite Enforcement", description: "Only recommend certifications when prerequisites are met", enabled: true, category: "Eligibility" },
  { id: 4, name: "Manager Approval Required", description: "Require manager sign-off for courses exceeding QAR 2,000", enabled: false, category: "Approval" },
  { id: 5, name: "Gap Severity Weighting", description: "Prioritize Critical gaps over Moderate in recommendations", enabled: true, category: "Scoring" },
];

const roiMetrics = [
  { label: "Total Training Spend (YTD)", value: "QAR 245,000", change: "+12%", trend: "up" },
  { label: "Avg. Cost per Completion", value: "QAR 1,850", change: "-8%", trend: "down" },
  { label: "Completion Rate", value: "78%", change: "+5%", trend: "up" },
  { label: "ROI Score", value: "3.2x", change: "+0.4", trend: "up" },
];

const competencyMatrix = [
  { competency: "Project Management", mapped: 3, unmapped: 1, coverage: 75 },
  { competency: "Leadership", mapped: 2, unmapped: 2, coverage: 50 },
  { competency: "Risk Management", mapped: 2, unmapped: 0, coverage: 100 },
  { competency: "Strategic Planning", mapped: 1, unmapped: 1, coverage: 50 },
  { competency: "Financial Analysis", mapped: 1, unmapped: 1, coverage: 50 },
  { competency: "Change Management", mapped: 1, unmapped: 0, coverage: 100 },
  { competency: "Communication", mapped: 0, unmapped: 2, coverage: 0 },
  { competency: "Stakeholder Management", mapped: 1, unmapped: 1, coverage: 50 },
];

const V2LDCataloguePage = () => {
  const [activeTab, setActiveTab] = useState("catalog");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [rulesState, setRulesState] = useState(aiRules);

  const allItems = [
    ...certifications.map(c => ({ ...c, itemType: "Certification" as const })),
    ...trainings.map(t => ({ ...t, itemType: "Course" as const })),
  ];

  const filteredItems = allItems.filter(item =>
    !catalogSearch || item.title.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  const toggleRule = (id: number) => {
    setRulesState(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">L&D Administration</h1>
        <p className="text-xs text-muted-foreground">Curate the catalog, map competencies, configure AI, and track training ROI</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: BookOpen, label: "Catalog Items", value: allItems.length, color: "text-primary" },
          { icon: Building2, label: "Providers", value: providers.length, color: "text-info" },
          { icon: Brain, label: "AI Rules Active", value: rulesState.filter(r => r.enabled).length, color: "text-accent" },
          { icon: TrendingUp, label: "ROI Score", value: "3.2x", color: "text-success" },
        ].map(stat => (
          <Card key={stat.label} className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="catalog" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <BookOpen className="h-3.5 w-3.5" /> Learning Catalog
          </TabsTrigger>
          <TabsTrigger value="competencies" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Link2 className="h-3.5 w-3.5" /> Competency Mapping
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> AI Rules
          </TabsTrigger>
          <TabsTrigger value="roi" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <BarChart3 className="h-3.5 w-3.5" /> Training ROI
          </TabsTrigger>
          <TabsTrigger value="providers" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Globe className="h-3.5 w-3.5" /> Providers
          </TabsTrigger>
        </TabsList>

        {/* LEARNING CATALOG MANAGEMENT */}
        <TabsContent value="catalog" className="space-y-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search catalog items..." value={catalogSearch} onChange={(e) => setCatalogSearch(e.target.value)} className="pl-9" />
            </div>
            <Button size="sm" className="h-9 text-xs gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Add Item
            </Button>
          </div>
          <Card className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Code</TableHead>
                    <TableHead className="text-xs">Title</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Provider</TableHead>
                    <TableHead className="text-xs">Level</TableHead>
                    <TableHead className="text-xs text-right">Cost (QAR)</TableHead>
                    <TableHead className="text-xs text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map(item => (
                    <TableRow key={`${item.itemType}-${item.id}`}>
                      <TableCell className="text-xs font-mono text-muted-foreground">{item.code}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-[9px] h-5", item.itemType === "Certification" ? "border-accent/30 text-accent" : "border-info/30 text-info")}>
                          {item.itemType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.provider}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.level}</TableCell>
                      <TableCell className="text-xs text-right font-medium">{item.cost.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COMPETENCY MAPPING */}
        <TabsContent value="competencies" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Competency-to-Learning Mapping</p>
              </div>
              <p className="text-xs text-muted-foreground">Track how well your catalog covers each organizational competency. Target: 100% coverage.</p>
            </CardContent>
          </Card>
          {competencyMatrix.map(comp => (
            <Card key={comp.competency} className={cn(
              "backdrop-blur-sm bg-card/80",
              comp.coverage === 0 && "border-destructive/20",
              comp.coverage < 75 && comp.coverage > 0 && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{comp.competency}</p>
                  <Badge className={cn(
                    "text-[9px] h-5",
                    comp.coverage === 100 ? "bg-success/15 text-success" :
                    comp.coverage >= 50 ? "bg-warning/15 text-warning" :
                    "bg-destructive/15 text-destructive"
                  )}>{comp.coverage}% covered</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={comp.coverage} className="h-1.5" />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {comp.mapped} mapped · {comp.unmapped} unmapped
                  </p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">Map</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* AI RULES CONFIGURATION */}
        <TabsContent value="ai" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">AI Recommendation Engine Rules</p>
              </div>
              <p className="text-xs text-muted-foreground">Configure how Daleel AI generates learning and certification recommendations across the organization.</p>
            </CardContent>
          </Card>
          {rulesState.map(rule => (
            <Card key={rule.id} className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4 flex items-center gap-4">
                <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{rule.name}</p>
                    <Badge variant="outline" className="text-[9px] h-5">{rule.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 shrink-0">
                  <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 w-full">
            <Plus className="h-3 w-3" /> Add Custom Rule
          </Button>
        </TabsContent>

        {/* TRAINING ROI */}
        <TabsContent value="roi" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roiMetrics.map(metric => (
              <Card key={metric.label} className="backdrop-blur-sm bg-card/80">
                <CardContent className="p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                  <p className="text-lg font-bold text-foreground mt-1">{metric.value}</p>
                  <p className={cn(
                    "text-xs mt-1 flex items-center gap-1",
                    metric.trend === "up" ? "text-success" : "text-info"
                  )}>
                    <TrendingUp className={cn("h-3 w-3", metric.trend === "down" && "rotate-180")} />
                    {metric.change} vs last quarter
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Top Performing Programs (by ROI)</p>
              <div className="space-y-3">
                {[
                  { name: "PMP Certification Prep", completions: 12, roi: "4.1x", spend: 42000 },
                  { name: "Leadership Essentials", completions: 24, roi: "3.8x", spend: 19200 },
                  { name: "Risk Management Foundations", completions: 18, roi: "3.5x", spend: 10800 },
                ].map(prog => (
                  <div key={prog.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">{prog.name}</p>
                      <p className="text-[10px] text-muted-foreground">{prog.completions} completions · QAR {prog.spend.toLocaleString()} spent</p>
                    </div>
                    <Badge className="bg-success/15 text-success text-xs">{prog.roi} ROI</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROVIDERS */}
        <TabsContent value="providers" className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">External Training Providers</p>
            <Button size="sm" className="h-8 text-xs gap-1.5"><Plus className="h-3 w-3" /> Add Provider</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {providers.map(provider => {
              const providerItems = allItems.filter(i => i.provider === provider.name);
              return (
                <Card key={provider.id} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{provider.fullName}</p>
                        <p className="text-[10px] text-muted-foreground">{provider.name} · {provider.country}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                      <span>{providerItems.length} catalog items</span>
                      <span>{providerItems.filter(i => i.itemType === "Certification").length} certifications</span>
                      <span>{providerItems.filter(i => i.itemType === "Course").length} courses</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2LDCataloguePage;
