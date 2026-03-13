import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, User, Target, Award, BookOpen, Brain, Calendar,
  CheckCircle2, Clock, TrendingUp, Star, Sparkles, AlertTriangle
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { teamMembers } from "@/data/mockData";

// Extended mock data per member
const memberDetails: Record<number, {
  email: string; hireDate: string; nationality: string; manager: string;
  targetPosition: string; targetGrade: string;
  competencies: { name: string; current: number; required: number; category: string }[];
  learningHistory: { title: string; type: string; status: string; date: string; score?: number }[];
  aiRecommendations: { text: string; confidence: number; type: string }[];
}> = {
  2: {
    email: "khalid.mohannadi@mowasalat.com", hireDate: "2020-06-01", nationality: "Qatari", manager: "Ahmed Al-Thani",
    targetPosition: "Project Manager", targetGrade: "G8",
    competencies: [
      { name: "Project Management", current: 3, required: 4, category: "Technical" },
      { name: "Leadership", current: 2, required: 3, category: "Behavioral" },
      { name: "Risk Management", current: 2, required: 3, category: "Technical" },
      { name: "Communication", current: 3, required: 4, category: "Behavioral" },
      { name: "Stakeholder Mgmt", current: 3, required: 4, category: "Behavioral" },
      { name: "Financial Analysis", current: 2, required: 3, category: "Technical" },
    ],
    learningHistory: [
      { title: "PMP Certification Prep", type: "Course", status: "InProgress", date: "2026-03-01" },
      { title: "PRINCE2 Foundation", type: "Certification", status: "Completed", date: "2025-11-15", score: 88 },
      { title: "Leadership Essentials", type: "Course", status: "Completed", date: "2025-09-20", score: 92 },
    ],
    aiRecommendations: [
      { text: "Khalid is ready for PMP certification — completed all prerequisites. Recommend scheduling exam in Q2 2026.", confidence: 92, type: "certification" },
      { text: "Consider enrolling in 'Financial Analysis for Non-Finance' to close moderate gap before G8 promotion.", confidence: 78, type: "course" },
      { text: "Strong candidate for Qatari Leaders Pipeline program based on performance trajectory.", confidence: 85, type: "program" },
    ],
  },
  3: {
    email: "sara.sulaiti@mowasalat.com", hireDate: "2022-01-15", nationality: "Qatari", manager: "Ahmed Al-Thani",
    targetPosition: "Project Coordinator", targetGrade: "G6",
    competencies: [
      { name: "Project Management", current: 2, required: 3, category: "Technical" },
      { name: "Leadership", current: 1, required: 3, category: "Behavioral" },
      { name: "Risk Management", current: 1, required: 2, category: "Technical" },
      { name: "Communication", current: 3, required: 3, category: "Behavioral" },
      { name: "Stakeholder Mgmt", current: 2, required: 3, category: "Behavioral" },
      { name: "Financial Analysis", current: 1, required: 2, category: "Technical" },
    ],
    learningHistory: [
      { title: "Project Fundamentals", type: "Course", status: "Completed", date: "2025-12-10", score: 75 },
    ],
    aiRecommendations: [
      { text: "Leadership gap is critical for Sara's progression. Recommend 'Leadership Essentials for Managers' course.", confidence: 88, type: "course" },
      { text: "CDP submitted but awaiting approval — consider fast-tracking given Qatarization alignment.", confidence: 82, type: "action" },
    ],
  },
  4: {
    email: "mohammed.kuwari@mowasalat.com", hireDate: "2021-04-10", nationality: "Qatari", manager: "Ahmed Al-Thani",
    targetPosition: "Senior Project Analyst", targetGrade: "G7",
    competencies: [
      { name: "Project Management", current: 3, required: 4, category: "Technical" },
      { name: "Leadership", current: 2, required: 3, category: "Behavioral" },
      { name: "Risk Management", current: 3, required: 4, category: "Technical" },
      { name: "Communication", current: 4, required: 4, category: "Behavioral" },
      { name: "Stakeholder Mgmt", current: 3, required: 4, category: "Behavioral" },
      { name: "Financial Analysis", current: 3, required: 4, category: "Technical" },
    ],
    learningHistory: [
      { title: "Risk Management Foundations", type: "Course", status: "Completed", date: "2026-01-20", score: 90 },
      { title: "Data Analysis Workshop", type: "Course", status: "InProgress", date: "2026-02-15" },
    ],
    aiRecommendations: [
      { text: "CDP draft stalled for 3 weeks. Schedule a career planning session to unblock.", confidence: 78, type: "action" },
      { text: "Strong analytical skills — consider CBAP certification path for a business analysis specialization.", confidence: 72, type: "certification" },
    ],
  },
  5: {
    email: "noura.hajri@mowasalat.com", hireDate: "2019-08-20", nationality: "Qatari", manager: "Ahmed Al-Thani",
    targetPosition: "Senior Project Manager", targetGrade: "G9",
    competencies: [
      { name: "Project Management", current: 4, required: 5, category: "Technical" },
      { name: "Leadership", current: 3, required: 4, category: "Behavioral" },
      { name: "Risk Management", current: 3, required: 4, category: "Technical" },
      { name: "Communication", current: 4, required: 4, category: "Behavioral" },
      { name: "Stakeholder Mgmt", current: 4, required: 4, category: "Behavioral" },
      { name: "Financial Analysis", current: 3, required: 3, category: "Technical" },
    ],
    learningHistory: [
      { title: "PMP Certification", type: "Certification", status: "Completed", date: "2025-06-10", score: 95 },
      { title: "Strategic Planning Workshop", type: "Course", status: "InProgress", date: "2026-02-01" },
      { title: "Leadership Essentials", type: "Course", status: "Completed", date: "2025-04-15", score: 94 },
      { title: "Lean Six Sigma Green Belt", type: "Certification", status: "Completed", date: "2024-11-20", score: 91 },
    ],
    aiRecommendations: [
      { text: "Top performer — consider nominating for the Senior PM fast-track program. Readiness at 81%.", confidence: 88, type: "promotion" },
      { text: "RMP certification would close remaining risk management gap and strengthen G9 candidacy.", confidence: 85, type: "certification" },
    ],
  },
};

const V2TeamMemberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const memberId = Number(id);
  const member = teamMembers.find(m => m.id === memberId);
  const details = memberDetails[memberId];

  if (!member || !details) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/v2/manager")} className="gap-2 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Team
        </Button>
        <p className="text-muted-foreground">Team member not found.</p>
      </div>
    );
  }

  const radarData = details.competencies.map(c => ({
    subject: c.name,
    current: c.current,
    required: c.required,
    fullMark: 5,
  }));

  const gapCount = details.competencies.filter(c => c.required - c.current >= 2).length;
  const moderateCount = details.competencies.filter(c => c.required - c.current === 1).length;
  const metCount = details.competencies.filter(c => c.required - c.current === 0).length;

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Back button */}
      <Button variant="ghost" onClick={() => navigate("/v2/manager")} className="gap-2 mb-4 text-xs">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Team
      </Button>

      {/* Employee header card */}
      <Card className="backdrop-blur-sm bg-card/80 mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">
                {member.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-lg font-bold text-foreground">{member.name}</h1>
                <Badge className="bg-primary/15 text-primary text-[9px]">{details.nationality}</Badge>
                <Badge className={cn("text-[9px]",
                  member.cdpStatus === "Approved" ? "bg-success/15 text-success" :
                  member.cdpStatus === "InProgress" ? "bg-info/15 text-info" :
                  member.cdpStatus === "PendingApproval" ? "bg-warning/15 text-warning" :
                  "bg-muted text-muted-foreground"
                )}>{member.cdpStatus.replace(/([A-Z])/g, ' $1').trim()}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{member.position} · {member.grade} · {details.email}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Hired {details.hireDate} · Reports to {details.manager}</p>
            </div>
            <div className="text-center">
              <p className={cn("text-3xl font-bold",
                member.readiness >= 70 ? "text-success" : member.readiness >= 50 ? "text-warning" : "text-destructive"
              )}>{member.readiness}%</p>
              <p className="text-[10px] text-muted-foreground">Readiness</p>
            </div>
            <div className="text-center border-l border-border/50 pl-5">
              <p className="text-sm font-bold text-foreground">{details.targetPosition}</p>
              <p className="text-[10px] text-muted-foreground">Target · {details.targetGrade}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <Card className="backdrop-blur-sm bg-card/80 border-destructive/15">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-destructive">{gapCount}</p>
            <p className="text-[9px] text-muted-foreground">Critical Gaps</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-warning/15">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-warning">{moderateCount}</p>
            <p className="text-[9px] text-muted-foreground">Moderate Gaps</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-success/15">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-success">{metCount}</p>
            <p className="text-[9px] text-muted-foreground">Met</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-info/15">
          <CardContent className="p-3 text-center">
            <p className="text-xl font-bold text-info">{details.learningHistory.length}</p>
            <p className="text-[9px] text-muted-foreground">Learning Items</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="competencies" className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="competencies" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Target className="h-3.5 w-3.5" /> Competencies
          </TabsTrigger>
          <TabsTrigger value="learning" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <BookOpen className="h-3.5 w-3.5" /> Learning History
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> AI Recommendations
          </TabsTrigger>
        </TabsList>

        {/* COMPETENCIES */}
        <TabsContent value="competencies" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Competency Radar — {details.targetPosition} ({details.targetGrade})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9 }} tickCount={6} />
                    <Radar name="Current" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="Required" dataKey="required" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4 space-y-2">
              {details.competencies.map(c => {
                const gap = c.required - c.current;
                const severity = gap >= 2 ? "Critical" : gap === 1 ? "Moderate" : "Met";
                return (
                  <div key={c.name} className={cn(
                    "p-3 rounded-lg border-l-4",
                    severity === "Critical" ? "border-l-destructive bg-destructive/5" :
                    severity === "Moderate" ? "border-l-warning bg-warning/5" :
                    "border-l-success bg-success/5"
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">{c.name}</span>
                        <Badge variant="outline" className="text-[9px]">{c.category}</Badge>
                      </div>
                      <Badge className={cn("text-[9px]",
                        severity === "Critical" ? "bg-destructive/15 text-destructive" :
                        severity === "Moderate" ? "bg-warning/15 text-warning" :
                        "bg-success/15 text-success"
                      )}>Lv {c.current} → {c.required}</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEARNING HISTORY */}
        <TabsContent value="learning" className="space-y-3">
          {details.learningHistory.map((item, i) => (
            <Card key={i} className="backdrop-blur-sm bg-card/80">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                )}>
                  {item.type === "Certification" ? <Award className="h-4 w-4 text-accent" /> : <BookOpen className="h-4 w-4 text-info" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.type} · {item.date}</p>
                </div>
                <Badge className={cn("text-[9px] h-5",
                  item.status === "Completed" ? "bg-success/15 text-success" : "bg-info/15 text-info"
                )}>
                  {item.status === "Completed" ? <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> : <Clock className="h-2.5 w-2.5 mr-1" />}
                  {item.status}
                </Badge>
                {item.score && (
                  <div className="text-center shrink-0">
                    <p className="text-sm font-bold text-success">{item.score}%</p>
                    <p className="text-[8px] text-muted-foreground">Score</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* AI RECOMMENDATIONS */}
        <TabsContent value="ai" className="space-y-3">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/15">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Daleel AI Insights for {member.name}</p>
              </div>
              <p className="text-[10px] text-muted-foreground">Personalized recommendations based on competency profile, learning history, and organizational priorities.</p>
            </CardContent>
          </Card>
          {details.aiRecommendations.map((rec, i) => (
            <Card key={i} className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  rec.type === "certification" ? "bg-accent/10" :
                  rec.type === "course" ? "bg-info/10" :
                  rec.type === "promotion" ? "bg-success/10" : "bg-warning/10"
                )}>
                  {rec.type === "certification" ? <Award className="h-3.5 w-3.5 text-accent" /> :
                   rec.type === "course" ? <BookOpen className="h-3.5 w-3.5 text-info" /> :
                   rec.type === "promotion" ? <TrendingUp className="h-3.5 w-3.5 text-success" /> :
                   <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[9px] h-4 border-primary/30 text-primary">{rec.confidence}% confidence</Badge>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{rec.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2TeamMemberDetailPage;
