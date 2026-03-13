import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3, Users, GraduationCap, Award, TrendingUp, BookOpen,
  Target, AlertTriangle, CheckCircle2, PieChart, ArrowUpRight,
  Building2, Calendar, DollarSign, Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

const orgStats = {
  totalEmployees: 847,
  activeCDPs: 312,
  completionRate: 68,
  totalBudgetUsed: 1250000,
  totalBudget: 2000000,
  certificationsEarned: 89,
  coursesCompleted: 456,
  avgReadiness: 64,
};

const departmentData = [
  { name: "Planning & Projects", employees: 124, activeCDPs: 67, avgReadiness: 72, budget: 320000, spent: 215000 },
  { name: "Operations", employees: 312, activeCDPs: 98, avgReadiness: 58, budget: 650000, spent: 420000 },
  { name: "IT & Digital", employees: 89, activeCDPs: 45, avgReadiness: 76, budget: 280000, spent: 195000 },
  { name: "Corporate Services", employees: 156, activeCDPs: 52, avgReadiness: 61, budget: 400000, spent: 245000 },
  { name: "Finance", employees: 78, activeCDPs: 28, avgReadiness: 69, budget: 200000, spent: 112000 },
  { name: "HR & Admin", employees: 88, activeCDPs: 22, avgReadiness: 71, budget: 150000, spent: 63000 },
];

const topCertifications = [
  { name: "PMP", enrolled: 45, completed: 28, passRate: "89%" },
  { name: "Lean Six Sigma", enrolled: 32, completed: 22, passRate: "92%" },
  { name: "PRINCE2", enrolled: 28, completed: 20, passRate: "85%" },
  { name: "CBAP", enrolled: 15, completed: 8, passRate: "78%" },
  { name: "PSM II", enrolled: 12, completed: 9, passRate: "95%" },
];

const complianceGaps = [
  { area: "Mandatory Safety Training", compliant: 720, total: 847, deadline: "2026-06-30" },
  { area: "Anti-Harassment Certification", compliant: 690, total: 847, deadline: "2026-04-15" },
  { area: "Data Privacy Awareness", compliant: 580, total: 847, deadline: "2026-09-30" },
  { area: "First Aid Certification", compliant: 340, total: 450, deadline: "2026-12-31" },
];

const V2LDDashboardPage = () => {
  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">L&D Management</h1>
        <p className="text-xs text-muted-foreground">Organization-wide learning analytics, training management, and compliance tracking</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Users, label: "Active CDPs", value: orgStats.activeCDPs, sub: `of ${orgStats.totalEmployees}`, color: "text-primary" },
          { icon: CheckCircle2, label: "Completion Rate", value: `${orgStats.completionRate}%`, sub: "org average", color: "text-success" },
          { icon: Award, label: "Certs Earned", value: orgStats.certificationsEarned, sub: "this year", color: "text-accent" },
          { icon: DollarSign, label: "Budget Used", value: `${Math.round(orgStats.totalBudgetUsed / 1000)}K`, sub: `of ${orgStats.totalBudget / 1000}K QAR`, color: "text-warning" },
        ].map(stat => (
          <Card key={stat.label} className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={cn("h-5 w-5", stat.color)} />
                <ArrowUpRight className="h-3.5 w-3.5 text-success" />
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label} · {stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="departments" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Building2 className="h-3.5 w-3.5" /> Departments
          </TabsTrigger>
          <TabsTrigger value="programs" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <GraduationCap className="h-3.5 w-3.5" /> Programs
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <AlertTriangle className="h-3.5 w-3.5" /> Compliance
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> AI Insights
          </TabsTrigger>
        </TabsList>

        {/* DEPARTMENTS */}
        <TabsContent value="departments" className="space-y-3">
          {departmentData.map(dept => (
            <Card key={dept.name} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{dept.name}</p>
                    <p className="text-[10px] text-muted-foreground">{dept.employees} employees · {dept.activeCDPs} active CDPs</p>
                  </div>
                  <Badge className={cn(
                    "text-[10px] h-5",
                    dept.avgReadiness >= 70 ? "bg-success/15 text-success" :
                    dept.avgReadiness >= 60 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
                  )}>{dept.avgReadiness}% ready</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Readiness</p>
                      <span className="text-[10px] font-medium text-foreground">{dept.avgReadiness}%</span>
                    </div>
                    <Progress value={dept.avgReadiness} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Budget</p>
                      <span className="text-[10px] font-medium text-foreground">{Math.round(dept.spent / dept.budget * 100)}%</span>
                    </div>
                    <Progress value={Math.round(dept.spent / dept.budget * 100)} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* PROGRAMS */}
        <TabsContent value="programs">
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-3 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-primary" /> Top Certification Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="space-y-2">
                {topCertifications.map((cert, i) => (
                  <div key={cert.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent">#{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{cert.name}</p>
                      <p className="text-[10px] text-muted-foreground">{cert.enrolled} enrolled · {cert.completed} completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-success">{cert.passRate}</p>
                      <p className="text-[9px] text-muted-foreground">pass rate</p>
                    </div>
                    <div className="w-24">
                      <Progress value={Math.round(cert.completed / cert.enrolled * 100)} className="h-1.5" />
                      <p className="text-[9px] text-muted-foreground mt-1 text-right">
                        {Math.round(cert.completed / cert.enrolled * 100)}% done
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Card className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-5 w-5 text-info mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">{orgStats.coursesCompleted}</p>
                <p className="text-[10px] text-muted-foreground">Courses Completed</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4 text-center">
                <Target className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">{orgStats.avgReadiness}%</p>
                <p className="text-[10px] text-muted-foreground">Avg Readiness Score</p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4 text-center">
                <Calendar className="h-5 w-5 text-accent mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">24</p>
                <p className="text-[10px] text-muted-foreground">Programs Active</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* COMPLIANCE */}
        <TabsContent value="compliance" className="space-y-3">
          {complianceGaps.map(item => {
            const pct = Math.round(item.compliant / item.total * 100);
            return (
              <Card key={item.area} className={cn(
                "backdrop-blur-sm bg-card/80",
                pct < 80 && "border-warning/20"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.area}</p>
                      <p className="text-[10px] text-muted-foreground">Deadline: {item.deadline} · {item.compliant}/{item.total} compliant</p>
                    </div>
                    <Badge className={cn(
                      "text-[10px] h-5",
                      pct >= 90 ? "bg-success/15 text-success" :
                      pct >= 70 ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
                    )}>{pct}%</Badge>
                  </div>
                  <Progress value={pct} className="h-2" />
                  {pct < 80 && (
                    <p className="text-[10px] text-warning mt-2 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {item.total - item.compliant} employees need to complete this before {item.deadline}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* AI INSIGHTS */}
        <TabsContent value="insights">
          <div className="space-y-4">
            <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Organizational Intelligence</p>
                </div>
                <div className="space-y-3">
                  {[
                    { insight: "Operations department has the lowest readiness score (58%). Consider prioritizing L&D budget allocation for Q3.", severity: "high" },
                    { insight: "PMP certification has the highest ROI — employees who completed it show 23% improvement in project delivery scores.", severity: "positive" },
                    { insight: "Anti-Harassment Certification deadline is April 15. 157 employees still need to complete it.", severity: "urgent" },
                    { insight: "Qatarization target: 15 national employees are ready for promotion based on CDP completion and readiness scores.", severity: "positive" },
                    { insight: "Budget utilization is at 62.5%. Recommend accelerating Q2 training enrollments to optimize annual allocation.", severity: "medium" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        item.severity === "urgent" ? "bg-destructive" :
                        item.severity === "high" ? "bg-warning" :
                        item.severity === "positive" ? "bg-success" : "bg-info"
                      )} />
                      <p className="text-xs text-foreground leading-relaxed">{item.insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2LDDashboardPage;
