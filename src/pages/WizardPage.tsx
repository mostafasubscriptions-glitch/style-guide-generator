import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  User, Target, Award, Calendar, ChevronRight,
  ArrowLeft, ArrowRight, Sparkles, BookOpen, Users, FileText,
  AlertTriangle, Check, CheckCircle2, Star
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { currentEmployee, competencies, certifications, trainings, activePlan, strategicPriorities, positions } from "@/data/mockData";

const steps = [
  { id: 1, label: "Profile", icon: User },
  { id: 2, label: "Target Position", icon: Target },
  { id: 3, label: "Gap Analysis", icon: Target },
  { id: 4, label: "Recommendations", icon: Award },
  { id: 5, label: "Schedule", icon: Calendar },
  { id: 6, label: "Review", icon: FileText },
];

// AI-suggested top 3 position matches
const aiPositionMatches = [
  {
    position: positions[1], // Senior Project Manager G9
    matchScore: 92,
    reasoning: "Your 7+ years in project coordination and strong stakeholder management skills align exceptionally well. Only 2 critical competency gaps to close.",
    gapCount: 2,
    estimatedTime: "12 months",
  },
  {
    position: positions[0], // Project Manager G8
    matchScore: 85,
    reasoning: "Lateral move that strengthens your project delivery role. Fewer gaps to close, making it achievable within 6 months.",
    gapCount: 1,
    estimatedTime: "6 months",
  },
  {
    position: positions[3], // Operations Manager G8
    matchScore: 68,
    reasoning: "Cross-functional move into operations. Leverages your communication and stakeholder skills but requires new operational domain knowledge.",
    gapCount: 4,
    estimatedTime: "18 months",
  },
];

// Competency profiles per target position (for radar chart)
const getRadarData = (targetPositionId: number) => {
  const baseCompetencies = [
    "Project Mgmt", "Leadership", "Stakeholder Mgmt", "Risk Mgmt",
    "Strategic Planning", "Communication", "Financial Analysis", "Change Mgmt"
  ];
  const currentLevels = [3, 3, 4, 2, 3, 4, 2, 3];

  const requiredByPosition: Record<number, number[]> = {
    2: [5, 4, 4, 4, 4, 4, 3, 4], // Senior PM
    1: [4, 3, 4, 3, 3, 4, 3, 3], // PM
    4: [3, 4, 3, 4, 4, 4, 4, 4], // Ops Manager
  };

  const required = requiredByPosition[targetPositionId] || requiredByPosition[2];

  return baseCompetencies.map((name, i) => ({
    subject: name,
    current: currentLevels[i],
    required: required[i],
    fullMark: 5,
  }));
};

// Gap justifications per competency
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

const WizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedCerts, setSelectedCerts] = useState<number[]>([1, 3]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([1, 2, 3]);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([1, 3]);

  const selectedMatch = aiPositionMatches.find(m => m.position.id === selectedPosition);
  const radarData = getRadarData(selectedPosition || 2);

  return (
    <div className="p-8 animate-fade-in">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 bg-card rounded-xl p-4 border border-border">
        {steps.map((step, i) => (
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
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                currentStep === step.id ? "bg-primary-foreground/20" :
                currentStep > step.id ? "bg-success/20" : "bg-muted"
              )}>
                {currentStep > step.id ? <Check className="h-3.5 w-3.5" /> : step.id}
              </div>
              <span className="text-sm font-medium hidden xl:block">{step.label}</span>
            </button>
            {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
          </div>
        ))}
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
                Select one to proceed with your development plan.
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
                        <div className="flex items-center gap-1">
                          <span className={cn(
                            "text-2xl font-bold",
                            match.matchScore >= 85 ? "text-success" :
                            match.matchScore >= 70 ? "text-warning" : "text-info"
                          )}>{match.matchScore}%</span>
                        </div>
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

          {/* Also allow manual selection */}
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

      {/* Step 3: Gap Analysis with Radar Chart */}
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

          {/* Radar Chart */}
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
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 5]}
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      tickCount={6}
                    />
                    <Radar
                      name="Current Level"
                      dataKey="current"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Required Level"
                      dataKey="required"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gap Justifications */}
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
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        "text-[10px]",
                        comp.severity === "Critical" ? "bg-destructive/15 text-destructive hover:bg-destructive/15" :
                        comp.severity === "Moderate" ? "bg-warning/15 text-warning hover:bg-warning/15" :
                        "bg-success/15 text-success hover:bg-success/15"
                      )}>
                        Level {comp.currentLevel} → {comp.requiredLevel}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{gapJustifications[comp.name]}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Recommendations (Certs & Courses) */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI-Recommended Certifications & Courses</h2>
              <p className="text-sm text-muted-foreground">Selected: {selectedCerts.length} certs, {selectedCourses.length} courses · Est. cost: QAR 12,950</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" /> Certifications
            </p>
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedCerts.includes(cert.id) ? "border-primary ring-1 ring-primary/20" : "hover:border-primary/40"
                )}
                onClick={() => setSelectedCerts((prev) =>
                  prev.includes(cert.id) ? prev.filter((id) => id !== cert.id) : [...prev, cert.id]
                )}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5",
                      selectedCerts.includes(cert.id) ? "bg-primary border-primary" : "border-muted-foreground/30"
                    )}>
                      {selectedCerts.includes(cert.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{cert.code}</span>
                        <span className="text-sm text-foreground">{cert.title}</span>
                        {cert.isQatarRecommended && <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px]">Qatar Recommended</Badge>}
                        <Badge variant="outline" className="text-[10px]">{cert.level}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{cert.provider} · {cert.duration} · QAR {cert.cost.toLocaleString()} · Competency: {cert.competencyName}</p>
                      <div className="mt-2 flex items-start gap-2">
                        <div className="flex items-center gap-1 shrink-0">
                          <Sparkles className="h-3 w-3 text-primary" />
                          <span className="text-xs font-semibold text-primary">{cert.aiConfidence}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{cert.aiReasoning}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-info" /> Courses
            </p>
            {trainings.map((t) => (
              <Card
                key={t.id}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedCourses.includes(t.id) ? "border-info ring-1 ring-info/20" : "hover:border-info/40"
                )}
                onClick={() => setSelectedCourses((prev) =>
                  prev.includes(t.id) ? prev.filter((id) => id !== t.id) : [...prev, t.id]
                )}
              >
                <CardContent className="py-3">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
                      selectedCourses.includes(t.id) ? "bg-info border-info" : "border-muted-foreground/30"
                    )}>
                      {selectedCourses.includes(t.id) && <Check className="h-3 w-3 text-info-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{t.title}</span>
                        {t.prepForCertCode && <Badge variant="outline" className="text-[10px]">Prep for {t.prepForCertCode}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{t.provider} · {t.format} · {t.duration} · QAR {t.cost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Schedule */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI Sequencing Rationale</span>
              </div>
              <p className="text-sm text-foreground">
                Items are ordered by priority: critical gaps first, with preparatory courses before their certifications.
                Quick wins are scheduled early for momentum. The PMP prep course comes before the PMP exam, and
                risk management foundations before the RMP certification.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Learning Schedule</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activePlan.items.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <span className="text-lg font-bold text-muted-foreground w-8">{i + 1}</span>
                    <div className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-semibold w-16 text-center",
                      item.type === "Certification" ? "bg-accent/15 text-accent" :
                      item.type === "Course" ? "bg-info/15 text-info" : "bg-primary/15 text-primary"
                    )}>
                      {item.type === "Certification" ? "Cert" : item.type === "Course" ? "Course" : "Mentor"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.competency}</p>
                    </div>
                    <Badge variant="outline">{item.quarter}</Badge>
                    <span className={cn(
                      "text-xs",
                      item.priority === "Essential" ? "text-destructive" :
                      item.priority === "Recommended" ? "text-warning" : "text-muted-foreground"
                    )}>{item.priority}</span>
                  </div>
                ))}
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
              { label: "Items", value: "2 Certs · 4 Courses · 1 Mentor" },
              { label: "Estimated Cost", value: "QAR 12,950" },
              { label: "Duration", value: "Q1–Q4 2026" },
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
                {activePlan.items.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-semibold w-14 text-center",
                      item.type === "Certification" ? "bg-accent/15 text-accent" :
                      item.type === "Course" ? "bg-info/15 text-info" : "bg-primary/15 text-primary"
                    )}>
                      {item.type === "Certification" ? "Cert" : item.type === "Course" ? "Course" : "Mentor"}
                    </span>
                    <span className="text-sm text-foreground flex-1">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.quarter}</span>
                    <span className="text-xs text-primary font-medium">{item.confidence}%</span>
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
        <Button onClick={() => setCurrentStep(Math.min(6, currentStep + 1))} disabled={currentStep === 6} className="gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WizardPage;
