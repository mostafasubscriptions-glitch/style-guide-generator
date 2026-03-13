import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award, Target, TrendingUp, BookOpen, ArrowRight, AlertTriangle,
  CheckCircle2, Clock, Download
} from "lucide-react";
import { currentEmployee, activePlan, competencies } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const severityColor: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive",
  Moderate: "bg-warning/15 text-warning",
  Met: "bg-success/15 text-success",
};

const statusBadge: Record<string, string> = {
  Completed: "bg-success/15 text-success",
  InProgress: "bg-primary/15 text-primary",
  NotStarted: "bg-muted text-muted-foreground",
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const criticalGaps = competencies.filter((c) => c.severity === "Critical");
  const moderateGaps = competencies.filter((c) => c.severity === "Moderate");

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your career development progress</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Career Aspiration */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Career Aspiration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold text-foreground">{activePlan.targetPosition}</p>
                <p className="text-sm text-muted-foreground">Grade {activePlan.targetGrade} · {currentEmployee.department.name}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{activePlan.completionPercent}%</p>
                <p className="text-xs text-muted-foreground">Readiness</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Gaps</p>
              {criticalGaps.map((gap) => (
                <div key={gap.id} className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{gap.name}</span>
                      <span className="text-muted-foreground">Level {gap.currentLevel} → {gap.requiredLevel}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((l) => (
                        <div
                          key={l}
                          className={`h-1.5 flex-1 rounded-full ${
                            l <= gap.currentLevel ? "bg-destructive" : l <= gap.requiredLevel ? "bg-destructive/20" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active CDP Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Active CDP</CardTitle>
              <Badge className="bg-primary/15 text-primary hover:bg-primary/15">In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-mono text-muted-foreground">{activePlan.planCode}</p>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium text-foreground">{activePlan.completedItems}/{activePlan.totalItems} items</span>
              </div>
              <Progress value={activePlan.completionPercent} className="h-2" />
            </div>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved</span>
                <span className="text-foreground">{activePlan.approvedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Cost</span>
                <span className="text-foreground">QAR {activePlan.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            <Button size="sm" className="w-full gap-2" onClick={() => navigate("/wizard")}>
              View Plan <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Plan Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Development Plan Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-muted text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1 px-4 py-3">#</div>
              <div className="col-span-1 px-4 py-3">Type</div>
              <div className="col-span-3 px-4 py-3">Title</div>
              <div className="col-span-2 px-4 py-3">Competency</div>
              <div className="col-span-2 px-4 py-3">Quarter</div>
              <div className="col-span-1 px-4 py-3">Priority</div>
              <div className="col-span-1 px-4 py-3">Conf.</div>
              <div className="col-span-1 px-4 py-3">Status</div>
            </div>
            {activePlan.items.map((item, i) => (
              <div key={item.id} className="grid grid-cols-12 border-t border-border text-sm items-center hover:bg-muted/50 transition-colors">
                <div className="col-span-1 px-4 py-3 text-muted-foreground">{i + 1}</div>
                <div className="col-span-1 px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.type === "Certification" ? "bg-accent/15 text-accent" :
                    item.type === "Course" ? "bg-info/15 text-info" :
                    "bg-primary/15 text-primary"
                  }`}>
                    {item.type === "Certification" ? "Cert" : item.type === "Course" ? "Course" : "Mentor"}
                  </span>
                </div>
                <div className="col-span-3 px-4 py-3 text-foreground font-medium truncate">{item.title}</div>
                <div className="col-span-2 px-4 py-3 text-muted-foreground">{item.competency}</div>
                <div className="col-span-2 px-4 py-3 text-muted-foreground">{item.quarter}</div>
                <div className="col-span-1 px-4 py-3">
                  <span className={`text-xs ${
                    item.priority === "Essential" ? "text-destructive" :
                    item.priority === "Recommended" ? "text-warning" : "text-muted-foreground"
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="col-span-1 px-4 py-3">
                  <span className="text-xs font-medium text-foreground">{item.confidence}%</span>
                </div>
                <div className="col-span-1 px-4 py-3">
                  {item.status === "Completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {item.status === "InProgress" && <Clock className="h-4 w-4 text-primary" />}
                  {item.status === "NotStarted" && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competency Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Competency Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {competencies.map((comp) => (
              <div key={comp.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{comp.name}</span>
                    <Badge variant="outline" className={severityColor[comp.severity]}>
                      {comp.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{comp.category}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((l) => (
                      <div
                        key={l}
                        className={`h-2 flex-1 rounded-full ${
                          l <= comp.currentLevel
                            ? comp.severity === "Critical" ? "bg-destructive" : comp.severity === "Moderate" ? "bg-warning" : "bg-success"
                            : l <= comp.requiredLevel
                            ? "bg-muted"
                            : "bg-muted/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Current: {comp.currentLevel}</span>
                    <span>Required: {comp.requiredLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
