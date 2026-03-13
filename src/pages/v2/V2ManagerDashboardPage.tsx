import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, TrendingUp, CheckCircle2, Clock, AlertTriangle, Eye,
  BookOpen, Award, Brain, ChevronRight, ThumbsUp, ThumbsDown,
  GraduationCap, Target, BarChart3
} from "lucide-react";
import { teamMembers, pendingApprovals } from "@/data/mockData";
import { cn } from "@/lib/utils";

const trainingRequests = [
  { id: 1, employee: "Khalid Al-Mohannadi", course: "PMP Certification Prep", cost: 3500, priority: "Essential", status: "pending" },
  { id: 2, employee: "Sara Al-Sulaiti", course: "Risk Management Foundations", cost: 600, priority: "Recommended", status: "pending" },
  { id: 3, employee: "Noura Al-Hajri", course: "Strategic Planning Workshop", cost: 1500, priority: "Recommended", status: "pending" },
];

const aiRecommendations = [
  { employee: "Khalid Al-Mohannadi", suggestion: "Ready for PMP certification — completed all prerequisites. Schedule exam in Q2.", confidence: 92, type: "certification" },
  { employee: "Sara Al-Sulaiti", suggestion: "Leadership gap identified. Recommend 'Leadership Essentials' course before CDP approval.", confidence: 85, type: "course" },
  { employee: "Mohammed Al-Kuwari", suggestion: "CDP draft stalled for 3 weeks. Consider scheduling a career planning session.", confidence: 78, type: "action" },
  { employee: "Noura Al-Hajri", suggestion: "Top performer — consider nominating for the Senior PM fast-track program.", confidence: 88, type: "promotion" },
];

const V2ManagerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("team");

  const statusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-success/15 text-success";
      case "InProgress": return "bg-info/15 text-info";
      case "PendingApproval": return "bg-warning/15 text-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Team Management</h1>
        <p className="text-xs text-muted-foreground">Manage your direct reports, approve plans, and track team development</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Users, label: "Direct Reports", value: teamMembers.length, color: "text-primary" },
          { icon: Clock, label: "Pending Approvals", value: pendingApprovals.length, color: "text-warning" },
          { icon: TrendingUp, label: "Avg Readiness", value: `${Math.round(teamMembers.reduce((a, b) => a + b.readiness, 0) / teamMembers.length)}%`, color: "text-success" },
          { icon: AlertTriangle, label: "Training Requests", value: trainingRequests.length, color: "text-accent" },
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
          <TabsTrigger value="team" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Users className="h-3.5 w-3.5" /> Team Overview
          </TabsTrigger>
          <TabsTrigger value="approvals" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" /> Approvals
            {(pendingApprovals.length + trainingRequests.length) > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-warning/20 text-warning text-[10px] flex items-center justify-center font-bold">
                {pendingApprovals.length + trainingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> AI Insights
          </TabsTrigger>
        </TabsList>

        {/* TEAM OVERVIEW */}
        <TabsContent value="team" className="space-y-3">
          {teamMembers.map(member => (
            <Card key={member.id} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-foreground">{member.name}</p>
                      <Badge className={cn("text-[9px] h-5", statusColor(member.cdpStatus))}>
                        {member.cdpStatus.replace(/([A-Z])/g, ' $1').trim()}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{member.position} · {member.grade}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Readiness</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={member.readiness} className="h-1.5 w-20" />
                        <span className="text-xs font-semibold text-foreground">{member.readiness}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Learning</p>
                      <div className="flex items-center gap-1 mt-1">
                        <BookOpen className="h-3 w-3 text-info" />
                        <span className="text-xs font-semibold text-foreground">{member.learningCount} active</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* APPROVALS */}
        <TabsContent value="approvals" className="space-y-4">
          {/* CDP Approvals */}
          {pendingApprovals.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="h-3.5 w-3.5" /> CDP Plans Pending Approval
              </h3>
              {pendingApprovals.map(plan => (
                <Card key={plan.id} className="backdrop-blur-sm bg-card/80 border-warning/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center">
                          <Target className="h-4 w-4 text-warning" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{plan.employeeName}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {plan.planCode} · Target: {plan.targetPosition} · {plan.itemCount} items · QAR {plan.estimatedCost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Submitted {plan.submittedAt}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
                        <ThumbsDown className="h-3 w-3" /> Return
                      </Button>
                      <Button size="sm" className="h-8 text-xs gap-1.5">
                        <ThumbsUp className="h-3 w-3" /> Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Training Requests */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" /> Training Requests
            </h3>
            <div className="space-y-2">
              {trainingRequests.map(req => (
                <Card key={req.id} className="backdrop-blur-sm bg-card/80">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-3.5 w-3.5 text-info" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{req.course}</p>
                      <p className="text-[10px] text-muted-foreground">{req.employee} · QAR {req.cost.toLocaleString()}</p>
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-[9px] h-5",
                      req.priority === "Essential" ? "border-destructive/30 text-destructive" : "border-primary/30 text-primary"
                    )}>{req.priority}</Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-success hover:bg-success/10">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* AI INSIGHTS */}
        <TabsContent value="ai" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Daleel AI Team Insights</p>
              </div>
              <p className="text-xs text-muted-foreground">AI-powered recommendations for your team's development, based on their profiles, learning history, and performance data.</p>
            </CardContent>
          </Card>
          {aiRecommendations.map((rec, i) => (
            <Card key={i} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  rec.type === "certification" ? "bg-accent/10" :
                  rec.type === "course" ? "bg-info/10" :
                  rec.type === "promotion" ? "bg-success/10" : "bg-warning/10"
                )}>
                  {rec.type === "certification" ? <Award className="h-3.5 w-3.5 text-accent" /> :
                   rec.type === "course" ? <GraduationCap className="h-3.5 w-3.5 text-info" /> :
                   rec.type === "promotion" ? <TrendingUp className="h-3.5 w-3.5 text-success" /> :
                   <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-foreground">{rec.employee}</p>
                    <Badge variant="outline" className="text-[9px] h-4 border-primary/30 text-primary">{rec.confidence}% confidence</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rec.suggestion}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-primary shrink-0">
                  Act <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2ManagerDashboardPage;
