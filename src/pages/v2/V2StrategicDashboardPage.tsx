import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target, Globe, Landmark,
  ArrowUpRight, ArrowDownRight, Briefcase, Star,
  Zap, Award, BookOpen, Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Strategic KPIs ---
const kpis = {
  qatarization: { current: 42, target: 60, trend: +3.2 },
  workforceReadiness: { current: 64, target: 80, trend: +5.1 },
  successionCoverage: { current: 58, target: 75, trend: +2.8 },
  trainingCompletion: { current: 76, target: 90, trend: +4.2 },
  budgetROI: { multiplier: 2.3, trend: +0.2 },
  activeCDPs: 312,
  enrolledLearners: 534,
  competencyMilestones: 187,
};

const qatarBreakdown = [
  { dept: "Corporate Services", nationals: 62, total: 156, target: 55, pct: 40 },
  { dept: "Planning & Projects", nationals: 54, total: 124, target: 50, pct: 44 },
  { dept: "Finance", nationals: 35, total: 78, target: 50, pct: 45 },
  { dept: "HR & Admin", nationals: 48, total: 88, target: 55, pct: 55 },
  { dept: "IT & Digital", nationals: 28, total: 89, target: 45, pct: 31 },
  { dept: "Operations", nationals: 78, total: 312, target: 35, pct: 25 },
];

const successionPipeline = [
  { role: "Head of Projects", grade: "G10", devPrograms: 3, trainingComplete: 78, urgency: "Medium" },
  { role: "Director of Operations", grade: "G11", devPrograms: 1, trainingComplete: 45, urgency: "Critical" },
  { role: "CFO", grade: "G12", devPrograms: 2, trainingComplete: 62, urgency: "High" },
  { role: "CIO", grade: "G11", devPrograms: 2, trainingComplete: 71, urgency: "Medium" },
  { role: "Head of HR", grade: "G10", devPrograms: 4, trainingComplete: 85, urgency: "Low" },
];

const strategicInitiatives = [
  { name: "Digital Transformation Upskilling", progress: 67, enrolled: 124, budget: 450000, spent: 295000, status: "On Track" as const },
  { name: "Safety Leadership Program", progress: 82, enrolled: 89, budget: 220000, spent: 185000, status: "On Track" as const },
  { name: "Qatari Leaders Pipeline", progress: 34, enrolled: 45, budget: 380000, spent: 125000, status: "At Risk" as const },
  { name: "Customer Excellence Academy", progress: 51, enrolled: 67, budget: 180000, spent: 92000, status: "On Track" as const },
];

const capabilityGaps = [
  { capability: "Digital & Analytics", gap: 32, impact: "High", departments: 4 },
  { capability: "Project Management", gap: 18, impact: "Critical", departments: 3 },
  { capability: "Leadership & People", gap: 24, impact: "High", departments: 6 },
  { capability: "Risk & Compliance", gap: 28, impact: "Critical", departments: 5 },
  { capability: "Financial Acumen", gap: 15, impact: "Medium", departments: 2 },
];

const TrendArrow = ({ value }: { value: number }) => (
  <span className={cn("inline-flex items-center gap-0.5 text-[10px] font-semibold",
    value >= 0 ? "text-success" : "text-destructive"
  )}>
    {value >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
    {Math.abs(value)}%
  </span>
);

const V2StrategicDashboardPage = () => {
  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Strategic Workforce Dashboard</h1>
        <p className="text-xs text-muted-foreground">
          Workforce planning, Qatarization progress, succession readiness & strategic capability alignment
        </p>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { icon: Globe, label: "Qatarization", value: `${kpis.qatarization.current}%`, target: `Target ${kpis.qatarization.target}%`, trend: kpis.qatarization.trend, color: "text-primary" },
          { icon: Target, label: "Workforce Readiness", value: `${kpis.workforceReadiness.current}%`, target: `Target ${kpis.workforceReadiness.target}%`, trend: kpis.workforceReadiness.trend, color: "text-info" },
          { icon: Briefcase, label: "Succession Coverage", value: `${kpis.successionCoverage.current}%`, target: `Target ${kpis.successionCoverage.target}%`, trend: kpis.successionCoverage.trend, color: "text-accent" },
          { icon: BookOpen, label: "Training Completion", value: `${kpis.trainingCompletion.current}%`, target: `Target ${kpis.trainingCompletion.target}%`, trend: kpis.trainingCompletion.trend, color: "text-success" },
          { icon: Zap, label: "L&D ROI", value: `${kpis.budgetROI.multiplier}x`, target: "Return on investment", trend: kpis.budgetROI.trend, color: "text-warning" },
        ].map(stat => (
          <Card key={stat.label} className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
                <TrendArrow value={stat.trend} />
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label} · {stat.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scorecards Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="backdrop-blur-sm bg-card/80 border-primary/15">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{kpis.enrolledLearners}</p>
              <p className="text-[10px] text-muted-foreground">Active Learners · {kpis.activeCDPs} CDPs in progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-accent/15">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{kpis.competencyMilestones}</p>
              <p className="text-[10px] text-muted-foreground">Competency Milestones · achieved this quarter</p>
            </div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-info/15">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
              <Award className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-[10px] text-muted-foreground">Certifications Earned · +34% YoY</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="qatarization" className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="qatarization" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Globe className="h-3.5 w-3.5" /> Qatarization
          </TabsTrigger>
          <TabsTrigger value="succession" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Briefcase className="h-3.5 w-3.5" /> Succession
          </TabsTrigger>
          <TabsTrigger value="initiatives" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Landmark className="h-3.5 w-3.5" /> Initiatives
          </TabsTrigger>
          <TabsTrigger value="capabilities" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> Capability Gaps
          </TabsTrigger>
        </TabsList>

        {/* QATARIZATION */}
        <TabsContent value="qatarization" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/10">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Qatarization by Department
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">
                Organization target: {kpis.qatarization.target}% · Current: {kpis.qatarization.current}%
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-2">
              {qatarBreakdown.map(dept => {
                const meetsTarget = dept.pct >= dept.target;
                return (
                  <div key={dept.dept} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-36 shrink-0">
                      <p className="text-xs font-semibold text-foreground">{dept.dept}</p>
                      <p className="text-[10px] text-muted-foreground">{dept.nationals} of {dept.total} nationals</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">Target {dept.target}%</span>
                        <span className={cn("text-[10px] font-semibold", meetsTarget ? "text-success" : "text-destructive")}>{dept.pct}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={dept.pct} className="h-2" />
                        <div
                          className="absolute top-0 h-2 w-0.5 bg-foreground/40 rounded"
                          style={{ left: `${dept.target}%` }}
                          title={`Target: ${dept.target}%`}
                        />
                      </div>
                    </div>
                    <Badge className={cn(
                      "text-[9px] h-5 shrink-0",
                      meetsTarget ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                    )}>
                      {meetsTarget ? "On Target" : `Gap ${dept.target - dept.pct}%`}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SUCCESSION */}
        <TabsContent value="succession" className="space-y-3">
          {successionPipeline.map(role => (
            <Card key={role.role} className={cn(
              "backdrop-blur-sm bg-card/80",
              role.urgency === "Critical" && "border-destructive/20",
              role.urgency === "High" && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{role.role}</p>
                    <p className="text-[10px] text-muted-foreground">{role.grade} · {role.devPrograms} development program{role.devPrograms !== 1 ? "s" : ""} active</p>
                  </div>
                  <Badge className={cn(
                    "text-[10px] h-5",
                    role.urgency === "Critical" ? "bg-destructive/15 text-destructive" :
                    role.urgency === "High" ? "bg-warning/15 text-warning" :
                    role.urgency === "Medium" ? "bg-info/15 text-info" :
                    "bg-success/15 text-success"
                  )}>{role.urgency}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Development Readiness</span>
                      <span className="text-[10px] font-medium text-foreground">{role.trainingComplete}%</span>
                    </div>
                    <Progress value={role.trainingComplete} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* INITIATIVES */}
        <TabsContent value="initiatives" className="space-y-3">
          {strategicInitiatives.map(init => (
            <Card key={init.name} className={cn(
              "backdrop-blur-sm bg-card/80",
              init.status === "At Risk" && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{init.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {init.enrolled} enrolled · {Math.round(init.spent / 1000)}K of {Math.round(init.budget / 1000)}K QAR
                    </p>
                  </div>
                  <Badge className={cn(
                    "text-[10px] h-5",
                    init.status === "On Track" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                  )}>{init.status}</Badge>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Progress</span>
                  <span className="text-[10px] font-medium text-foreground">{init.progress}%</span>
                </div>
                <Progress value={init.progress} className="h-1.5" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* CAPABILITY GAPS */}
        <TabsContent value="capabilities">
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Organization Capability Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-2">
              {capabilityGaps.sort((a, b) => b.gap - a.gap).map(cap => (
                <div key={cap.capability} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-40 shrink-0">
                    <p className="text-xs font-semibold text-foreground">{cap.capability}</p>
                    <p className="text-[10px] text-muted-foreground">Affects {cap.departments} departments</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">Gap severity</span>
                      <span className="text-[10px] font-medium text-foreground">{cap.gap}% gap</span>
                    </div>
                    <Progress value={cap.gap} className="h-2" />
                  </div>
                  <Badge className={cn(
                    "text-[9px] h-5 shrink-0",
                    cap.impact === "Critical" ? "bg-destructive/15 text-destructive" :
                    cap.impact === "High" ? "bg-warning/15 text-warning" :
                    "bg-info/15 text-info"
                  )}>{cap.impact}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Strategic Recommendations */}
          <Card className="backdrop-blur-sm bg-card/80 border-primary/15 mt-4">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Strategic AI Recommendations</p>
              </div>
              <div className="space-y-3">
                {[
                  { insight: "Accelerate Qatari Leaders Pipeline — IT & Digital and Operations are significantly below Qatarization targets. Recommend targeted scholarship and fast-track CDP programs.", severity: "urgent" },
                  { insight: "Director of Operations succession is critical with only 1 candidate at 45% readiness. Initiate executive mentorship program immediately.", severity: "urgent" },
                  { insight: "L&D investment shows 2.3x ROI — workforce readiness improved 5.1% this quarter. Recommend increasing Q3 budget allocation by 15%.", severity: "positive" },
                  { insight: "Digital & Analytics capability gap (32%) is the largest organizational risk. Consider partnering with HBKU for a dedicated digital skills academy.", severity: "high" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-1.5 shrink-0",
                      item.severity === "urgent" ? "bg-destructive" :
                      item.severity === "high" ? "bg-warning" :
                      "bg-success"
                    )} />
                    <p className="text-xs text-foreground leading-relaxed">{item.insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2StrategicDashboardPage;
