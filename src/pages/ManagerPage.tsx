import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users, FileText, CheckCircle2, Clock, XCircle, ArrowRight,
  TrendingUp, Award, BookOpen
} from "lucide-react";
import { teamMembers, pendingApprovals } from "@/data/mockData";
import { cn } from "@/lib/utils";

const cdpStatusColor: Record<string, string> = {
  Approved: "bg-success/15 text-success",
  PendingApproval: "bg-warning/15 text-warning",
  Draft: "bg-muted text-muted-foreground",
  InProgress: "bg-primary/15 text-primary",
  None: "bg-muted text-muted-foreground",
};

const ManagerPage = () => {
  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Oversee your team's career development</p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-foreground">4</p>
            <p className="text-sm text-muted-foreground mt-1">Team Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground mt-1">CDPs Created</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-success">64%</p>
            <p className="text-sm text-muted-foreground mt-1">Avg Readiness</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-info">42</p>
            <p className="text-sm text-muted-foreground mt-1">Training Hours (Q1)</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="border-warning/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-warning" />
            Pending CDP Approvals
            <Badge className="bg-warning/15 text-warning hover:bg-warning/15">{pendingApprovals.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingApprovals.map((pa) => (
            <div key={pa.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{pa.employeeName}</p>
                <p className="text-xs text-muted-foreground">
                  Target: {pa.targetPosition} · {pa.itemCount} items · QAR {pa.estimatedCost.toLocaleString()} · Submitted {pa.submittedAt}
                </p>
                <p className="text-xs text-muted-foreground font-mono">{pa.planCode}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10">
                  <XCircle className="h-3 w-3" /> Return
                </Button>
                <Button size="sm" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Approve
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Team Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {teamMembers.map((m) => (
              <div key={m.id} className="p-4 rounded-lg border border-border hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.position} · {m.grade}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-[10px]", cdpStatusColor[m.cdpStatus])}>
                    {m.cdpStatus === "PendingApproval" ? "Pending" : m.cdpStatus}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Readiness</span>
                    <span className="font-medium text-foreground">{m.readiness}%</span>
                  </div>
                  <Progress value={m.readiness} className="h-1.5" />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3" /> {m.learningCount} active courses
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

export default ManagerPage;
