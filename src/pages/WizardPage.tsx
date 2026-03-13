import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  User, Target, Award, Calendar, ChevronRight, ChevronDown,
  ArrowLeft, ArrowRight, Sparkles, BookOpen, Users, FileText,
  AlertTriangle, Check, CheckCircle2, Star, Compass, BarChart3
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { currentEmployee, competencies, certifications, trainings, activePlan, strategicPriorities, positions } from "@/data/mockData";

const steps = [
  { id: 1, label: "Profile", icon: User },
  { id: 2, label: "Target Position", icon: Compass },
  { id: 3, label: "Gap Analysis", icon: BarChart3 },
  { id: 4, label: "Recommendations", icon: Award },
  { id: 5, label: "Schedule", icon: Calendar },
  { id: 6, label: "Review", icon: FileText },
];

const aiPositionMatches = [
  {
    position: positions[1],
    matchScore: 92,
    reasoning: "Your 7+ years in project coordination and strong stakeholder management skills align exceptionally well. Only 2 critical competency gaps to close.",
    gapCount: 2,
    estimatedTime: "12 months",
  },
  {
    position: positions[0],
    matchScore: 85,
    reasoning: "Lateral move that strengthens your project delivery role. Fewer gaps to close, making it achievable within 6 months.",
    gapCount: 1,
    estimatedTime: "6 months",
  },
  {
    position: positions[3],
    matchScore: 68,
    reasoning: "Cross-functional move into operations. Leverages your communication and stakeholder skills but requires new operational domain knowledge.",
    gapCount: 4,
    estimatedTime: "18 months",
  },
];

const getRadarData = (targetPositionId: number) => {
  const baseCompetencies = [
    "Project Mgmt", "Leadership", "Stakeholder Mgmt", "Risk Mgmt",
    "Strategic Planning", "Communication", "Financial Analysis", "Change Mgmt"
  ];
  const currentLevels = [3, 3, 4, 2, 3, 4, 2, 3];
  const requiredByPosition: Record<number, number[]> = {
    2: [5, 4, 4, 4, 4, 4, 3, 4],
    1: [4, 3, 4, 3, 3, 4, 3, 3],
    4: [3, 4, 3, 4, 4, 4, 4, 4],
  };
  const required = requiredByPosition[targetPositionId] || requiredByPosition[2];
  return baseCompetencies.map((name, i) => ({
    subject: name,
    current: currentLevels[i],
    required: required[i],
    fullMark: 5,
  }));
};

const gapJustifications: Record<string, string> = {
  "Project Management": "Critical gap — your coordination experience needs to evolve into full lifecycle PM ownership including methodology governance, earned value management, and portfolio-level oversight.",
  "Leadership": "Moderate gap — you demonstrate team collaboration but need formal leadership of cross-functional teams and decision-making under ambiguity.",
  "Stakeholder Management": "Met — your consistent stakeholder engagement across departments shows proficiency at the required level.",
  "Risk Management": "Critical gap — limited exposure to formal risk frameworks. Need competency in quantitative risk analysis, risk registers, and mitigation planning.",
  "Strategic Planning": "Moderate gap — operational planning is solid but strategic horizon thinking and alignment to organizational vision needs development.",
  "Communication": "Met — strong written and verbal communication evidenced by successful cross-departmental project updates and executive reporting.",
  "Financial Analysis": "Moderate gap — basic budgeting skills present but need proficiency in cost-benefit analysis, ROI calculations, and financial forecasting.",
  "Change Management": "Moderate gap — awareness of change processes exists but formal methodology (e.g., ADKAR, Kotter) application is needed.",
};

// Build gap-to-recommendation mapping: for each gap, pick top 3 from certs+courses
type RecommendationOption = {
  id: string;
  type: "Certification" | "Course";
  code: string;
  title: string;
  provider: string;
  cost: number;
  duration: string;
  aiConfidence: number;
  aiReasoning: string;
  isQatarRecommended?: boolean;
  skills: string[];
};

const getRecommendationsForGap = (competencyName: string): RecommendationOption[] => {
  const certs: RecommendationOption[] = certifications
    .filter(c => c.competencyName === competencyName)
    .map(c => ({
      id: `cert-${c.id}`, type: "Certification" as const, code: c.code, title: c.title,
      provider: c.provider, cost: c.cost, duration: c.duration, aiConfidence: c.aiConfidence,
      aiReasoning: c.aiReasoning, isQatarRecommended: c.isQatarRecommended, skills: c.skills,
    }));
  const courses: RecommendationOption[] = trainings
    .filter(t => t.competencyName === competencyName)
    .map(t => ({
      id: `course-${t.id}`, type: "Course" as const, code: t.code, title: t.title,
      provider: t.provider, cost: t.cost, duration: t.duration, aiConfidence: 80,
      aiReasoning: `Targeted training for ${competencyName} development.`, skills: t.skills,
    }));
  return [...certs, ...courses].sort((a, b) => b.aiConfidence - a.aiConfidence).slice(0, 3);
};

const quarters = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026", "Q1 2027"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const WizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([1, 3]);

  // Step 4: gap-mapped selections — key = competencyName, value = selected recommendation id
  const gaps = competencies.filter(c => c.gap > 0);
  const gapRecommendations = gaps.map(g => ({
    gap: g,
    options: getRecommendationsForGap(g.name),
  }));

  const [gapSelections, setGapSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    gapRecommendations.forEach(gr => {
      if (gr.options.length > 0) initial[gr.gap.name] = gr.options[0].id;
    });
    return initial;
  });

  // Step 5: schedule with overridable quarter/month
  const selectedItems = Object.entries(gapSelections).map(([competencyName, recId]) => {
    const gr = gapRecommendations.find(g => g.gap.name === competencyName);
    const rec = gr?.options.find(o => o.id === recId);
    return rec ? { ...rec, competencyName } : null;
  }).filter(Boolean) as (RecommendationOption & { competencyName: string })[];

  // AI default schedule: critical gaps first, then moderate
  const getDefaultSchedule = () => {
    const sorted = [...selectedItems].sort((a, b) => {
      const gapA = gaps.find(g => g.name === a.competencyName);
      const gapB = gaps.find(g => g.name === b.competencyName);
      const sevOrder = { Critical: 0, Moderate: 1, Met: 2 };
      return (sevOrder[gapA?.severity || "Met"] - sevOrder[gapB?.severity || "Met"]) || (b.aiConfidence - a.aiConfidence);
    });
    return sorted.map((item, i) => ({
      ...item,
      quarter: quarters[Math.min(i, quarters.length - 1)],
      month: months[Math.min(i * 2, 11)],
    }));
  };

  const [schedule, setSchedule] = useState(getDefaultSchedule);

  // Sync schedule when selections change
  const updateScheduleFromSelections = () => {
    setSchedule(getDefaultSchedule());
  };

  const selectedMatch = aiPositionMatches.find(m => m.position.id === selectedPosition);
  const radarData = getRadarData(selectedPosition || 2);

  const totalCost = schedule.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="p-8 animate-fade-in">
      {/* Stepper with Icons */}
      <div className="flex items-center justify-between mb-8 bg-card rounded-xl p-4 border border-border">
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "bg-success/10 text-success"
                    : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center",
                  currentStep === step.id ? "bg-primary-foreground/20" :
                  currentStep > step.id ? "bg-success/20" : "bg-muted"
                )}>
                  {currentStep > step.id ? <Check className="h-3.5 w-3.5" /> : <StepIcon className="h-3.5 w-3.5" />}
                </div>
                <span className="text-sm font-medium hidden xl:block">{step.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Profile */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Employee Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">AA</span>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-3 flex-1">
                  {[
                    ["Full Name", currentEmployee.fullName],
                    ["Employee ID", currentEmployee.employeeNumber],
                    ["Position", currentEmployee.position.title],
                    ["Grade", currentEmployee.position.grade],
                    ["Department", currentEmployee.department.name],
                    ["Division", currentEmployee.division.name],
                    ["Hire Date", currentEmployee.hireDate],
                    ["Email", currentEmployee.email],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI Profile Analysis</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-success mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {["Stakeholder Management", "Communication", "Project Coordination"].map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-3 w-3 text-success" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-warning mb-2">Development Areas</p>
                  <ul className="space-y-1">
                    {["Project Management Methodology", "Risk Assessment", "Strategic Thinking"].map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                        <AlertTriangle className="h-3 w-3 text-warning" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Target Position Selection */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI Position Matching</span>
              </div>
              <p className="text-sm text-foreground">
                Based on your current competencies, experience, and career trajectory, here are the top 3 positions matched for you.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {aiPositionMatches.map((match, idx) => (
              <Card
                key={match.position.id}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedPosition === match.position.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/40"
                )}
                onClick={() => setSelectedPosition(match.position.id)}
              >
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg",
                      idx === 0 ? "bg-accent/15 text-accent" :
                      idx === 1 ? "bg-primary/15 text-primary" :
                      "bg-info/15 text-info"
                    )}>
                      {idx === 0 ? <Star className="h-6 w-6" /> : `#${idx + 1}`}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-semibold text-foreground">{match.position.title}</span>
                          <Badge variant="outline">{match.position.grade}</Badge>
                          <Badge variant="outline" className="text-[10px]">{match.position.department}</Badge>
                          {idx === 0 && <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px]">Top Match</Badge>}
                        </div>
                        <span className={cn(
                          "text-2xl font-bold",
                          match.matchScore >= 85 ? "text-success" :
                          match.matchScore >= 70 ? "text-warning" : "text-info"
                        )}>{match.matchScore}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{match.reasoning}</p>
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{match.gapCount} competency gap{match.gapCount > 1 ? "s" : ""}</span>
                        <span>·</span>
                        <span>Est. {match.estimatedTime} to ready</span>
                      </div>
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
                      selectedPosition === match.position.id ? "bg-primary border-primary" : "border-muted-foreground/30"
                    )}>
                      {selectedPosition === match.position.id && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Or choose from all positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {positions.filter(p => !aiPositionMatches.find(m => m.position.id === p.id)).map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setSelectedPosition(pos.id)}
                    className={cn(
                      "text-left p-3 rounded-lg border transition-colors text-sm",
                      selectedPosition === pos.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    )}
                  >
                    <span className="font-medium text-foreground">{pos.title}</span>
                    <span className="text-xs text-muted-foreground block">{pos.grade} · {pos.department}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Gap Analysis */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-destructive/20">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-destructive">{competencies.filter(c => c.severity === "Critical").length}</p>
                <p className="text-sm text-muted-foreground mt-1">Critical Gaps</p>
              </CardContent>
            </Card>
            <Card className="border-warning/20">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-warning">{competencies.filter(c => c.severity === "Moderate").length}</p>
                <p className="text-sm text-muted-foreground mt-1">Moderate Gaps</p>
              </CardContent>
            </Card>
            <Card className="border-success/20">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-success">{competencies.filter(c => c.severity === "Met").length}</p>
                <p className="text-sm text-muted-foreground mt-1">Met</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Competency Radar — {selectedMatch?.position.title || "Senior Project Manager"} ({selectedMatch?.position.grade || "G9"})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickCount={6} />
                    <Radar name="Current Level" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="Required Level" dataKey="required" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Gap Justification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {competencies.map((comp) => (
                <div key={comp.id} className={cn(
                  "p-4 rounded-lg border-l-4",
                  comp.severity === "Critical" ? "border-l-destructive bg-destructive/5" :
                  comp.severity === "Moderate" ? "border-l-warning bg-warning/5" :
                  "border-l-success bg-success/5"
                )}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{comp.name}</span>
                      <Badge variant="outline" className="text-[10px]">{comp.category}</Badge>
                    </div>
                    <Badge className={cn(
                      "text-[10px]",
                      comp.severity === "Critical" ? "bg-destructive/15 text-destructive hover:bg-destructive/15" :
                      comp.severity === "Moderate" ? "bg-warning/15 text-warning hover:bg-warning/15" :
                      "bg-success/15 text-success hover:bg-success/15"
                    )}>
                      Level {comp.currentLevel} → {comp.requiredLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{gapJustifications[comp.name]}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Gap-Mapped Recommendations */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI Gap-Mapped Recommendations</span>
              </div>
              <p className="text-sm text-foreground">
                For each competency gap, the AI has pre-selected the best recommendation. You can change the selection from up to 3 options per gap.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {Object.keys(gapSelections).length} gaps addressed · Est. cost: QAR {selectedItems.reduce((s, i) => s + i.cost, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {gapRecommendations.map(({ gap, options }) => (
              <Card key={gap.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-8 rounded-full",
                        gap.severity === "Critical" ? "bg-destructive" : "bg-warning"
                      )} />
                      <div>
                        <CardTitle className="text-sm">{gap.name}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Level {gap.currentLevel} → {gap.requiredLevel} · {gap.severity} gap
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(
                      "text-[10px]",
                      gap.severity === "Critical" ? "bg-destructive/15 text-destructive hover:bg-destructive/15" :
                      "bg-warning/15 text-warning hover:bg-warning/15"
                    )}>
                      {gap.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {options.map((rec, idx) => {
                      const isSelected = gapSelections[gap.name] === rec.id;
                      return (
                        <div
                          key={rec.id}
                          onClick={() => {
                            setGapSelections(prev => ({ ...prev, [gap.name]: rec.id }));
                          }}
                          className={cn(
                            "p-3 rounded-lg border cursor-pointer transition-all",
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                              : "border-border hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                              isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                            )}>
                              {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="text-[10px]">
                                  {rec.type === "Certification" ? <Award className="h-2.5 w-2.5 mr-1" /> : <BookOpen className="h-2.5 w-2.5 mr-1" />}
                                  {rec.type}
                                </Badge>
                                <span className="text-sm font-semibold text-foreground">{rec.code}</span>
                                <span className="text-sm text-foreground">{rec.title}</span>
                                {rec.isQatarRecommended && (
                                  <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px]">
                                    <Star className="h-2.5 w-2.5 mr-0.5" /> Qatar
                                  </Badge>
                                )}
                                {idx === 0 && (
                                  <Badge className="bg-primary/15 text-primary hover:bg-primary/15 text-[10px]">
                                    <Sparkles className="h-2.5 w-2.5 mr-0.5" /> AI Pick
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {rec.provider} · {rec.duration} · QAR {rec.cost.toLocaleString()}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs font-semibold text-primary">{rec.aiConfidence}% match</span>
                              </div>
                              {rec.skills.length > 0 && (
                                <div className="flex gap-1 mt-2 flex-wrap">
                                  {rec.skills.slice(0, 3).map(s => (
                                    <Badge key={s} variant="outline" className="text-[9px] px-1.5 py-0">{s}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {options.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">No recommendations available for this gap yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Schedule with month/quarter override */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI Sequencing Rationale</span>
              </div>
              <p className="text-sm text-foreground">
                Items are ordered by priority: critical gaps first, with preparatory courses before certifications.
                You can override the quarter and month for each item below.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Learning Schedule
              </CardTitle>
              <p className="text-xs text-muted-foreground">Drag to reorder or change quarter/month for each item</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.map((item, i) => {
                  const gap = gaps.find(g => g.name === item.competencyName);
                  return (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <span className="text-lg font-bold text-muted-foreground w-8">{i + 1}</span>
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-semibold w-16 text-center",
                        item.type === "Certification" ? "bg-accent/15 text-accent" : "bg-info/15 text-info"
                      )}>
                        {item.type === "Certification" ? "Cert" : "Course"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground">{item.competencyName}</p>
                          {gap && (
                            <Badge className={cn(
                              "text-[9px]",
                              gap.severity === "Critical" ? "bg-destructive/15 text-destructive hover:bg-destructive/15" :
                              "bg-warning/15 text-warning hover:bg-warning/15"
                            )}>
                              {gap.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {/* Quarter selector */}
                      <select
                        value={item.quarter}
                        onChange={(e) => {
                          setSchedule(prev => prev.map((s, idx) =>
                            idx === i ? { ...s, quarter: e.target.value } : s
                          ));
                        }}
                        className="text-xs border border-border rounded-md px-2 py-1.5 bg-card text-foreground"
                      >
                        {quarters.map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                      {/* Month selector */}
                      <select
                        value={item.month}
                        onChange={(e) => {
                          setSchedule(prev => prev.map((s, idx) =>
                            idx === i ? { ...s, month: e.target.value } : s
                          ));
                        }}
                        className="text-xs border border-border rounded-md px-2 py-1.5 bg-card text-foreground"
                      >
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <p className="text-xs text-muted-foreground shrink-0">QAR {item.cost.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={updateScheduleFromSelections}>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Reset to AI Order
                </Button>
                <p className="text-sm font-semibold text-foreground">Total: QAR {totalCost.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 6: Review */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Target Position", value: selectedMatch?.position.title || "Senior PM (G9)" },
              { label: "Items", value: `${schedule.filter(s => s.type === "Certification").length} Certs · ${schedule.filter(s => s.type === "Course").length} Courses` },
              { label: "Estimated Cost", value: `QAR ${totalCost.toLocaleString()}` },
              { label: "Duration", value: schedule.length > 0 ? `${schedule[0]?.quarter} – ${schedule[schedule.length - 1]?.quarter}` : "—" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-4 pb-4 text-center">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle>Plan Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {schedule.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-semibold w-14 text-center",
                      item.type === "Certification" ? "bg-accent/15 text-accent" : "bg-info/15 text-info"
                    )}>
                      {item.type === "Certification" ? "Cert" : "Course"}
                    </span>
                    <span className="text-sm text-foreground flex-1">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.month} · {item.quarter}</span>
                    <span className="text-xs text-primary font-medium">{item.aiConfidence}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">Save as Draft</Button>
            <Button className="flex-1 gap-2">Submit for Approval <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={() => {
          if (currentStep === 4) updateScheduleFromSelections();
          setCurrentStep(Math.min(6, currentStep + 1));
        }} disabled={currentStep === 6} className="gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WizardPage;
