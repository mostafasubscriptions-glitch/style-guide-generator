import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Compass, Brain, Target, BookOpen, GraduationCap, TrendingUp,
  Search, Star, ChevronRight, CheckCircle2, AlertTriangle, Clock,
  Award, Sparkles, ArrowUpRight, MessageSquare, Plus
} from "lucide-react";
import { certifications, trainings, competencies, currentEmployee } from "@/data/mockData";
import { cn } from "@/lib/utils";

const aiCareerPaths = [
  {
    id: 1, title: "Senior Project Manager", matchScore: 92, timeline: "18 months",
    description: "Natural progression leveraging your PM experience and PRINCE2 certification.",
    requiredCerts: ["PMP", "RMP"], requiredCourses: 3, gapCount: 2,
  },
  {
    id: 2, title: "Program Director", matchScore: 74, timeline: "3 years",
    description: "Strategic leadership role overseeing multiple project portfolios.",
    requiredCerts: ["PgMP", "PMP"], requiredCourses: 5, gapCount: 4,
  },
  {
    id: 3, title: "Head of PMO", matchScore: 68, timeline: "4 years",
    description: "Lead the Project Management Office with organizational-level impact.",
    requiredCerts: ["PMP", "PgMP", "CBAP"], requiredCourses: 6, gapCount: 5,
  },
];

const myGoals = [
  { id: 1, title: "Earn PMP Certification", target: "Q2 2026", progress: 65, status: "on-track" },
  { id: 2, title: "Complete Risk Management training", target: "Q2 2026", progress: 30, status: "on-track" },
  { id: 3, title: "Achieve Level 4 in Leadership", target: "Q3 2026", progress: 50, status: "at-risk" },
  { id: 4, title: "Mentor a junior team member", target: "Q4 2026", progress: 10, status: "not-started" },
];

const enrolledCourses = [
  { id: 1, title: "Project Management Bootcamp", provider: "QatarSkills", progress: 85, dueDate: "2026-04-01" },
  { id: 2, title: "Leadership Essentials for Managers", provider: "HBKU", progress: 100, dueDate: "2026-03-10" },
];

const V2EmployeeCataloguePage = () => {
  const [activeTab, setActiveTab] = useState("paths");
  const [courseSearch, setCourseSearch] = useState("");

  const allLearning = [
    ...certifications.map(c => ({ ...c, type: "Certification" as const })),
    ...trainings.map(t => ({ ...t, type: "Course" as const })),
  ];

  const filteredLearning = allLearning.filter(item =>
    !courseSearch || item.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    item.code.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">My Career Development</h1>
        <p className="text-xs text-muted-foreground">Explore paths, build skills, and track your growth journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Compass, label: "Career Paths", value: aiCareerPaths.length, color: "text-primary" },
          { icon: AlertTriangle, label: "Skill Gaps", value: competencies.filter(c => c.gap > 0).length, color: "text-warning" },
          { icon: BookOpen, label: "Enrolled", value: enrolledCourses.length, color: "text-info" },
          { icon: Target, label: "Active Goals", value: myGoals.length, color: "text-success" },
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
          <TabsTrigger value="paths" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Compass className="h-3.5 w-3.5" /> AI Career Paths
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> Skill Gaps
          </TabsTrigger>
          <TabsTrigger value="enroll" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <GraduationCap className="h-3.5 w-3.5" /> Browse & Enroll
          </TabsTrigger>
          <TabsTrigger value="goals" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Target className="h-3.5 w-3.5" /> My Goals
          </TabsTrigger>
        </TabsList>

        {/* AI CAREER PATHS */}
        <TabsContent value="paths" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">AI-Recommended Career Paths</p>
              </div>
              <p className="text-xs text-muted-foreground">Based on your profile, competencies, certifications, and market trends in Qatar's transport sector.</p>
            </CardContent>
          </Card>
          {aiCareerPaths.map(path => (
            <Card key={path.id} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      path.matchScore >= 90 ? "bg-success/10" : path.matchScore >= 75 ? "bg-primary/10" : "bg-muted/50"
                    )}>
                      <TrendingUp className={cn("h-5 w-5", path.matchScore >= 90 ? "text-success" : path.matchScore >= 75 ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{path.title}</p>
                      <p className="text-[10px] text-muted-foreground">{path.description}</p>
                    </div>
                  </div>
                  <Badge className={cn(
                    "text-xs",
                    path.matchScore >= 90 ? "bg-success/15 text-success" : path.matchScore >= 75 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  )}>{path.matchScore}% match</Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Timeline</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{path.timeline}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Certifications</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{path.requiredCerts.length} needed</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Courses</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{path.requiredCourses} required</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Gaps</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{path.gapCount} to close</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-1 flex-wrap">
                  {path.requiredCerts.map(cert => (
                    <Badge key={cert} variant="outline" className="text-[9px] h-5 border-primary/30 text-primary">{cert}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* SKILL GAP ANALYSIS */}
        <TabsContent value="skills" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-warning/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-warning" />
                <p className="text-sm font-semibold text-foreground">Competency Gap Analysis</p>
              </div>
              <p className="text-xs text-muted-foreground">Your current competency levels vs. requirements for your target role: Senior Project Manager (G9)</p>
            </CardContent>
          </Card>
          {competencies.map(comp => (
            <Card key={comp.id} className={cn(
              "backdrop-blur-sm bg-card/80",
              comp.severity === "Critical" && "border-destructive/20",
              comp.severity === "Moderate" && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{comp.name}</p>
                    <Badge variant="outline" className="text-[9px] h-5">{comp.category}</Badge>
                  </div>
                  <Badge className={cn(
                    "text-[9px] h-5",
                    comp.severity === "Critical" ? "bg-destructive/15 text-destructive" :
                    comp.severity === "Moderate" ? "bg-warning/15 text-warning" :
                    "bg-success/15 text-success"
                  )}>{comp.severity === "Met" ? "✓ Met" : `Gap: ${comp.gap}`}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Current: Level {comp.currentLevel}</span>
                      <span>Required: Level {comp.requiredLevel}</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          comp.severity === "Met" ? "bg-success" : comp.severity === "Moderate" ? "bg-warning" : "bg-destructive"
                        )}
                        style={{ width: `${(comp.currentLevel / comp.requiredLevel) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* BROWSE & ENROLL */}
        <TabsContent value="enroll" className="space-y-4">
          {/* Currently Enrolled */}
          {enrolledCourses.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" /> Currently Enrolled
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {enrolledCourses.map(course => (
                  <Card key={course.id} className="backdrop-blur-sm bg-card/80">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-foreground">{course.title}</p>
                        {course.progress === 100 && <CheckCircle2 className="h-4 w-4 text-success" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-2">{course.provider} · Due {course.dueDate}</p>
                      <Progress value={course.progress} className="h-1.5" />
                      <p className="text-[10px] text-muted-foreground mt-1">{course.progress}% complete</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Browse Catalogue */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" /> Available Learning
            </h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses & certifications..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-2">
              {filteredLearning.slice(0, 8).map(item => (
                <Card key={`${item.type}-${item.id}`} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                    )}>
                      {item.type === "Certification" ? <Award className="h-3.5 w-3.5 text-accent" /> : <GraduationCap className="h-3.5 w-3.5 text-info" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-foreground">{item.title}</p>
                        {item.type === "Certification" && (item as any).isQatarRecommended && (
                          <Badge className="text-[8px] h-4 bg-accent/15 text-accent">🇶🇦 Qatar</Badge>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{item.provider} · {item.level} · QAR {item.cost.toLocaleString()}</p>
                    </div>
                    <Badge variant="outline" className="text-[9px] h-5 shrink-0">{item.type}</Badge>
                    <Button size="sm" className="h-7 text-xs gap-1 shrink-0">
                      Enroll <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* MY GOALS */}
        <TabsContent value="goals" className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Target className="h-3.5 w-3.5" /> Development Goals
              </h3>
            </div>
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <Plus className="h-3 w-3" /> Add Goal
            </Button>
          </div>
          {myGoals.map(goal => (
            <Card key={goal.id} className={cn(
              "backdrop-blur-sm bg-card/80",
              goal.status === "at-risk" && "border-warning/20"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{goal.title}</p>
                  <Badge className={cn(
                    "text-[9px] h-5",
                    goal.status === "on-track" ? "bg-success/15 text-success" :
                    goal.status === "at-risk" ? "bg-warning/15 text-warning" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {goal.status === "on-track" ? "On Track" : goal.status === "at-risk" ? "At Risk" : "Not Started"}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">Target: {goal.target}</p>
                <Progress value={goal.progress} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground mt-1">{goal.progress}% complete</p>
              </CardContent>
            </Card>
          ))}

          {/* Daleel Integration */}
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 mt-4">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Need guidance?</p>
                <p className="text-xs text-muted-foreground">Chat with Daleel AI for personalized career advice and goal recommendations.</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-primary/30 text-primary">
                Ask Daleel <ChevronRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2EmployeeCataloguePage;
