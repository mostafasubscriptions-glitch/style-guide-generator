import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3, Users, Target, Shield, TrendingUp, Award,
  Brain, Download, ChevronRight, AlertTriangle, CheckCircle2,
  Globe, Star, Zap, Building2, Flag
} from "lucide-react";
import { cn } from "@/lib/utils";

const executiveKPIs = [
  { label: "Total Workforce", value: "1,247", icon: Users, color: "text-primary" },
  { label: "Qatarization Rate", value: "68%", target: "70%", icon: Flag, color: "text-accent" },
  { label: "Training Investment", value: "QAR 2.4M", icon: BarChart3, color: "text-info" },
  { label: "Succession Coverage", value: "74%", target: "85%", icon: Shield, color: "text-success" },
];

const qatarizationData = [
  { department: "Corporate Services", total: 180, qatari: 135, rate: 75, target: 70, status: "above" },
  { department: "Operations", total: 620, qatari: 390, rate: 63, target: 70, status: "below" },
  { department: "IT & Digital", total: 95, qatari: 62, rate: 65, target: 70, status: "below" },
  { department: "Planning & Projects", total: 145, qatari: 112, rate: 77, target: 70, status: "above" },
  { department: "Finance & Admin", total: 120, qatari: 96, rate: 80, target: 70, status: "above" },
  { department: "Safety & Quality", total: 87, qatari: 52, rate: 60, target: 70, status: "below" },
];

const successionReadiness = [
  { role: "CEO", pipeline: 2, avgReadiness: 82, timeToReady: "6 months", risk: "low" },
  { role: "COO", pipeline: 3, avgReadiness: 71, timeToReady: "12 months", risk: "low" },
  { role: "CFO", pipeline: 1, avgReadiness: 45, timeToReady: "24 months", risk: "high" },
  { role: "CTO", pipeline: 2, avgReadiness: 63, timeToReady: "18 months", risk: "medium" },
  { role: "VP Operations", pipeline: 4, avgReadiness: 76, timeToReady: "9 months", risk: "low" },
  { role: "VP HR", pipeline: 1, avgReadiness: 38, timeToReady: "30 months", risk: "critical" },
];

const skillHeatmap = [
  { skill: "Project Management", demand: 95, supply: 72, gap: 23, trend: "improving" },
  { skill: "Digital Transformation", demand: 88, supply: 41, gap: 47, trend: "widening" },
  { skill: "Data Analytics", demand: 82, supply: 35, gap: 47, trend: "widening" },
  { skill: "Leadership", demand: 78, supply: 65, gap: 13, trend: "improving" },
  { skill: "Risk Management", demand: 75, supply: 58, gap: 17, trend: "stable" },
  { skill: "Change Management", demand: 70, supply: 42, gap: 28, trend: "improving" },
  { skill: "Cybersecurity", demand: 65, supply: 28, gap: 37, trend: "widening" },
  { skill: "Financial Planning", demand: 60, supply: 55, gap: 5, trend: "stable" },
];

const boardReports = [
  { id: 1, title: "Q1 2026 Talent & Development Report", date: "2026-03-31", status: "draft", pages: 24 },
  { id: 2, title: "Qatarization Progress Report", date: "2026-03-15", status: "ready", pages: 12 },
  { id: 3, title: "Succession Pipeline Assessment", date: "2026-02-28", status: "published", pages: 18 },
  { id: 4, title: "Training ROI Annual Review", date: "2026-01-31", status: "published", pages: 32 },
];

const V2LeaderCataloguePage = () => {
  const [activeTab, setActiveTab] = useState("executive");

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Strategic Talent Intelligence</h1>
        <p className="text-xs text-muted-foreground">Executive dashboards, Qatarization tracking, succession readiness, and board-ready reports</p>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {executiveKPIs.map(kpi => (
          <Card key={kpi.label} className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                <kpi.icon className={cn("h-5 w-5", kpi.color)} />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{kpi.value}</p>
                <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                {kpi.target && <p className="text-[9px] text-muted-foreground">Target: {kpi.target}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="executive" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <BarChart3 className="h-3.5 w-3.5" /> Executive View
          </TabsTrigger>
          <TabsTrigger value="qatarization" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Flag className="h-3.5 w-3.5" /> Qatarization
          </TabsTrigger>
          <TabsTrigger value="succession" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Shield className="h-3.5 w-3.5" /> Succession
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Zap className="h-3.5 w-3.5" /> Skill Heatmap
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Download className="h-3.5 w-3.5" /> Board Reports
          </TabsTrigger>
        </TabsList>

        {/* EXECUTIVE DASHBOARD */}
        <TabsContent value="executive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Workforce Development Summary</p>
                <div className="space-y-3">
                  {[
                    { label: "Active CDPs", value: 342, total: 1247, color: "bg-primary" },
                    { label: "Training Enrolled", value: 186, total: 1247, color: "bg-info" },
                    { label: "Certifications Earned (YTD)", value: 89, total: 150, color: "bg-success" },
                    { label: "Goals Completed", value: 456, total: 780, color: "bg-accent" },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-foreground">{item.value}/{item.total}</span>
                      </div>
                      <Progress value={(item.value / item.total) * 100} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Department Readiness</p>
                <div className="space-y-3">
                  {[
                    { dept: "Planning & Projects", readiness: 78 },
                    { dept: "Corporate Services", readiness: 72 },
                    { dept: "Finance & Admin", readiness: 69 },
                    { dept: "IT & Digital", readiness: 61 },
                    { dept: "Operations", readiness: 55 },
                    { dept: "Safety & Quality", readiness: 48 },
                  ].map(dept => (
                    <div key={dept.dept}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{dept.dept}</span>
                        <span className={cn("font-semibold", dept.readiness >= 70 ? "text-success" : dept.readiness >= 55 ? "text-warning" : "text-destructive")}>{dept.readiness}%</span>
                      </div>
                      <Progress value={dept.readiness} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* QATARIZATION */}
        <TabsContent value="qatarization" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-accent/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="h-4 w-4 text-accent" />
                <p className="text-sm font-semibold text-foreground">Qatarization Progress by Department</p>
              </div>
              <p className="text-xs text-muted-foreground">Tracking national workforce development aligned with Qatar National Vision 2030. Organization target: 70%.</p>
            </CardContent>
          </Card>
          {qatarizationData.map(dept => (
            <Card key={dept.department} className={cn(
              "backdrop-blur-sm bg-card/80",
              dept.status === "below" && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{dept.department}</p>
                    <p className="text-[10px] text-muted-foreground">{dept.qatari} Qatari of {dept.total} employees</p>
                  </div>
                  <Badge className={cn(
                    "text-[9px] h-5",
                    dept.status === "above" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                  )}>
                    {dept.rate}% {dept.status === "above" ? "✓ Above" : "↓ Below"} target
                  </Badge>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div className={cn(
                    "h-full rounded-full transition-all",
                    dept.status === "above" ? "bg-success" : "bg-warning"
                  )} style={{ width: `${dept.rate}%` }} />
                  <div className="absolute top-0 h-full w-px bg-foreground/30" style={{ left: `${dept.target}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* SUCCESSION READINESS */}
        <TabsContent value="succession" className="space-y-3">
          {successionReadiness.map(role => (
            <Card key={role.role} className={cn(
              "backdrop-blur-sm bg-card/80",
              role.risk === "critical" && "border-destructive/20",
              role.risk === "high" && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      role.risk === "critical" ? "bg-destructive/10" :
                      role.risk === "high" ? "bg-warning/10" :
                      role.risk === "medium" ? "bg-info/10" : "bg-success/10"
                    )}>
                      <Shield className={cn(
                        "h-4 w-4",
                        role.risk === "critical" ? "text-destructive" :
                        role.risk === "high" ? "text-warning" :
                        role.risk === "medium" ? "text-info" : "text-success"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{role.role}</p>
                      <p className="text-[10px] text-muted-foreground">{role.pipeline} in pipeline · Avg readiness {role.avgReadiness}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={cn(
                      "text-[9px] h-5",
                      role.risk === "critical" ? "bg-destructive/15 text-destructive" :
                      role.risk === "high" ? "bg-warning/15 text-warning" :
                      role.risk === "medium" ? "bg-info/15 text-info" :
                      "bg-success/15 text-success"
                    )}>{role.risk} risk</Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">Ready in {role.timeToReady}</p>
                  </div>
                </div>
                <Progress value={role.avgReadiness} className="h-1.5" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* SKILL HEATMAP */}
        <TabsContent value="heatmap" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Organization-Wide Skill Demand vs. Supply</p>
              </div>
              <p className="text-xs text-muted-foreground">Identifying critical skill gaps across the workforce to inform L&D investment priorities.</p>
            </CardContent>
          </Card>
          {skillHeatmap.map(skill => (
            <Card key={skill.skill} className={cn(
              "backdrop-blur-sm bg-card/80",
              skill.gap >= 40 && "border-destructive/20",
              skill.gap >= 20 && skill.gap < 40 && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{skill.skill}</p>
                    <Badge className={cn(
                      "text-[9px] h-5",
                      skill.trend === "widening" ? "bg-destructive/15 text-destructive" :
                      skill.trend === "improving" ? "bg-success/15 text-success" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {skill.trend === "widening" ? "↑ Widening" : skill.trend === "improving" ? "↓ Improving" : "→ Stable"}
                    </Badge>
                  </div>
                  <p className={cn(
                    "text-xs font-bold",
                    skill.gap >= 40 ? "text-destructive" : skill.gap >= 20 ? "text-warning" : "text-success"
                  )}>Gap: {skill.gap}%</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">Demand: {skill.demand}%</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${skill.demand}%` }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">Supply: {skill.supply}%</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full",
                        skill.gap >= 40 ? "bg-destructive" : skill.gap >= 20 ? "bg-warning" : "bg-success"
                      )} style={{ width: `${skill.supply}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* BOARD REPORTS */}
        <TabsContent value="reports" className="space-y-3">
          {boardReports.map(report => (
            <Card key={report.id} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  report.status === "published" ? "bg-success/10" :
                  report.status === "ready" ? "bg-primary/10" : "bg-muted/50"
                )}>
                  <Download className={cn(
                    "h-5 w-5",
                    report.status === "published" ? "text-success" :
                    report.status === "ready" ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{report.title}</p>
                  <p className="text-[10px] text-muted-foreground">{report.date} · {report.pages} pages</p>
                </div>
                <Badge className={cn(
                  "text-[9px] h-5",
                  report.status === "published" ? "bg-success/15 text-success" :
                  report.status === "ready" ? "bg-primary/15 text-primary" :
                  "bg-muted text-muted-foreground"
                )}>{report.status}</Badge>
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-primary">
                  {report.status === "published" ? "Download" : report.status === "ready" ? "Review" : "Edit"}
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2LeaderCataloguePage;
