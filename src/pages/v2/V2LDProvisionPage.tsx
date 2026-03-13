import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  User, Target, Award, Calendar, ChevronRight, ArrowLeft, ArrowRight,
  Sparkles, BookOpen, Check, CheckCircle2, Star, Compass, BarChart3,
  FileText, Search, Users, AlertTriangle, Send, Brain
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend
} from "recharts";
import { competencies, certifications, trainings, positions } from "@/data/mockData";
import { toast } from "sonner";

// --- Employee roster for L&D to pick from ---
const employeeRoster = [
  { id: 1, name: "Ahmed Al-Thani", position: "Senior Project Coordinator", grade: "G7", department: "Planning & Projects", readiness: 64, cdpStatus: "InProgress", avatar: "AA" },
  { id: 2, name: "Khalid Al-Mohannadi", position: "Project Coordinator", grade: "G6", department: "Planning & Projects", readiness: 72, cdpStatus: "Approved", avatar: "KM" },
  { id: 3, name: "Sara Al-Sulaiti", position: "Junior Project Coordinator", grade: "G5", department: "Planning & Projects", readiness: 45, cdpStatus: "None", avatar: "SS" },
  { id: 4, name: "Mohammed Al-Kuwari", position: "Project Analyst", grade: "G6", department: "Planning & Projects", readiness: 58, cdpStatus: "Draft", avatar: "MK" },
  { id: 5, name: "Noura Al-Hajri", position: "Senior Coordinator", grade: "G7", department: "Corporate Services", readiness: 81, cdpStatus: "InProgress", avatar: "NH" },
  { id: 6, name: "Fatima Al-Dosari", position: "Operations Specialist", grade: "G5", department: "Operations", readiness: 39, cdpStatus: "None", avatar: "FD" },
  { id: 7, name: "Hassan Al-Marri", position: "IT Analyst", grade: "G6", department: "IT & Digital", readiness: 67, cdpStatus: "Approved", avatar: "HM" },
  { id: 8, name: "Maryam Al-Thani", position: "HR Officer", grade: "G5", department: "HR & Admin", readiness: 54, cdpStatus: "None", avatar: "MT" },
];

// Steps for the provisioning wizard
const steps = [
  { id: 1, label: "Select Employee", icon: Users },
  { id: 2, label: "Profile & Gaps", icon: BarChart3 },
  { id: 3, label: "Build Plan", icon: Award },
  { id: 4, label: "Schedule", icon: Calendar },
  { id: 5, label: "Review & Assign", icon: Send },
];

// Simulated per-employee competency data
const getEmployeeCompetencies = (employeeId: number) => {
  // Vary gaps slightly per employee for realism
  const variations: Record<number, { current: number[]; required: number[] }> = {
    1: { current: [3, 3, 4, 2, 3, 4, 2, 3], required: [5, 4, 4, 4, 4, 4, 3, 4] },
    2: { current: [3, 2, 3, 2, 2, 3, 2, 2], required: [4, 3, 4, 3, 3, 4, 3, 3] },
    3: { current: [2, 1, 2, 1, 2, 3, 1, 1], required: [3, 3, 3, 2, 3, 3, 2, 3] },
    4: { current: [3, 2, 3, 3, 2, 4, 3, 2], required: [4, 3, 4, 4, 3, 4, 4, 3] },
    5: { current: [4, 3, 4, 3, 3, 4, 3, 3], required: [5, 4, 4, 4, 4, 4, 3, 4] },
    6: { current: [2, 1, 2, 1, 1, 2, 1, 1], required: [3, 3, 3, 3, 2, 3, 2, 3] },
    7: { current: [3, 2, 3, 2, 3, 3, 2, 2], required: [4, 3, 4, 3, 4, 4, 3, 3] },
    8: { current: [2, 2, 3, 1, 2, 3, 2, 2], required: [3, 3, 3, 2, 3, 3, 3, 3] },
  };
  const v = variations[employeeId] || variations[1];
  const names = ["Project Management", "Leadership", "Stakeholder Management", "Risk Management", "Strategic Planning", "Communication", "Financial Analysis", "Change Management"];
  const categories = ["Technical", "Behavioral", "Behavioral", "Technical", "Technical", "Behavioral", "Technical", "Behavioral"];

  return names.map((name, i) => {
    const gap = Math.max(0, v.required[i] - v.current[i]);
    return {
      id: i + 1, name, category: categories[i],
      currentLevel: v.current[i], requiredLevel: v.required[i],
      gap,
      severity: (gap >= 2 ? "Critical" : gap === 1 ? "Moderate" : "Met") as "Critical" | "Moderate" | "Met",
    };
  });
};

type RecommendationOption = {
  id: string; type: "Certification" | "Course"; code: string; title: string;
  provider: string; cost: number; duration: string; aiConfidence: number;
  aiReasoning: string; isQatarRecommended?: boolean; skills: string[];
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

const V2LDProvisionPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [gapSelections, setGapSelections] = useState<Record<string, string>>({});
  const [schedule, setSchedule] = useState<(RecommendationOption & { competencyName: string; quarter: string; month: string })[]>([]);
  const [note, setNote] = useState("");

  const selectedEmployee = employeeRoster.find(e => e.id === selectedEmployeeId);
  const empCompetencies = useMemo(() => selectedEmployeeId ? getEmployeeCompetencies(selectedEmployeeId) : [], [selectedEmployeeId]);
  const gaps = empCompetencies.filter(c => c.gap > 0);

  const gapRecommendations = useMemo(() =>
    gaps.map(g => ({ gap: g, options: getRecommendationsForGap(g.name) })),
    [gaps.map(g => g.name).join(",")]
  );

  const selectedItems = Object.entries(gapSelections).map(([competencyName, recId]) => {
    const gr = gapRecommendations.find(g => g.gap.name === competencyName);
    return gr?.options.find(o => o.id === recId) ? { ...gr!.options.find(o => o.id === recId)!, competencyName } : null;
  }).filter(Boolean) as (RecommendationOption & { competencyName: string })[];

  const totalCost = schedule.reduce((sum, item) => sum + item.cost, 0);

  const departments = ["All", ...Array.from(new Set(employeeRoster.map(e => e.department)))];
  const filteredEmployees = employeeRoster.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = filterDept === "All" || e.department === filterDept;
    return matchSearch && matchDept;
  });

  // Radar data
  const radarData = empCompetencies.map(c => ({
    subject: c.name.length > 14 ? c.name.slice(0, 12) + "…" : c.name,
    current: c.currentLevel,
    required: c.requiredLevel,
    fullMark: 5,
  }));

  // Initialize selections when entering step 3
  const initializeSelections = () => {
    const initial: Record<string, string> = {};
    gapRecommendations.forEach(gr => {
      if (gr.options.length > 0) initial[gr.gap.name] = gr.options[0].id;
    });
    setGapSelections(initial);
  };

  const buildSchedule = () => {
    const items = Object.entries(gapSelections).map(([competencyName, recId]) => {
      const gr = gapRecommendations.find(g => g.gap.name === competencyName);
      const rec = gr?.options.find(o => o.id === recId);
      return rec ? { ...rec, competencyName } : null;
    }).filter(Boolean) as (RecommendationOption & { competencyName: string })[];

    const sorted = [...items].sort((a, b) => {
      const gapA = gaps.find(g => g.name === a.competencyName);
      const gapB = gaps.find(g => g.name === b.competencyName);
      const sevOrder = { Critical: 0, Moderate: 1, Met: 2 };
      return (sevOrder[gapA?.severity || "Met"] - sevOrder[gapB?.severity || "Met"]) || (b.aiConfidence - a.aiConfidence);
    });
    setSchedule(sorted.map((item, i) => ({
      ...item,
      quarter: quarters[Math.min(i, quarters.length - 1)],
      month: months[Math.min(i * 2, 11)],
    })));
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedEmployeeId) {
      toast.error("Please select an employee first");
      return;
    }
    if (currentStep === 2 && !selectedPosition) {
      toast.error("Please select a target position");
      return;
    }
    if (currentStep === 2) initializeSelections();
    if (currentStep === 3) buildSchedule();
    setCurrentStep(Math.min(5, currentStep + 1));
  };

  const handleProvision = () => {
    toast.success(`CDP provisioned for ${selectedEmployee?.name}`, {
      description: `${schedule.length} learning items assigned · QAR ${totalCost.toLocaleString()} budget allocated`,
    });
  };

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="h-5 w-5 text-info" />
          <h1 className="text-xl font-bold text-foreground">CDP Provisioning Playground</h1>
        </div>
        <p className="text-xs text-muted-foreground">Build and assign career development plans for employees across the organization</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 bg-card/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  if (step.id <= currentStep) setCurrentStep(step.id);
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-xs font-medium",
                  currentStep === step.id
                    ? "bg-info text-info-foreground"
                    : currentStep > step.id
                    ? "bg-success/10 text-success"
                    : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  currentStep === step.id ? "bg-info-foreground/20" :
                  currentStep > step.id ? "bg-success/20" : "bg-muted"
                )}>
                  {currentStep > step.id ? <Check className="h-3 w-3" /> : <StepIcon className="h-3 w-3" />}
                </div>
                <span className="hidden xl:block">{step.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1" />}
            </div>
          );
        })}
      </div>

      {/* STEP 1: Select Employee */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/80 border-info/15">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-info" />
                <span className="text-sm font-semibold text-info">AI Suggestion</span>
              </div>
              <p className="text-xs text-foreground">
                Employees without an active CDP or with low readiness scores are highlighted. Consider prioritizing
                those marked <Badge className="bg-destructive/15 text-destructive text-[9px] h-4 mx-1">No CDP</Badge> first.
              </p>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search employee name or position…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-muted/50 border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info/30"
              />
            </div>
            <div className="flex gap-1.5">
              {departments.map(d => (
                <button
                  key={d}
                  onClick={() => setFilterDept(d)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors",
                    filterDept === d ? "bg-info/15 text-info" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >{d}</button>
              ))}
            </div>
          </div>

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredEmployees.map(emp => (
              <Card
                key={emp.id}
                onClick={() => setSelectedEmployeeId(emp.id)}
                className={cn(
                  "cursor-pointer transition-all backdrop-blur-sm bg-card/80",
                  selectedEmployeeId === emp.id
                    ? "border-info ring-2 ring-info/20"
                    : "hover:border-info/40"
                )}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-info/80 to-primary/80 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">{emp.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{emp.name}</p>
                      {emp.cdpStatus === "None" && (
                        <Badge className="bg-destructive/15 text-destructive text-[9px] h-4">No CDP</Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{emp.position} · {emp.grade} · {emp.department}</p>
                  </div>
                  <div className="text-center shrink-0">
                    <p className={cn(
                      "text-lg font-bold",
                      emp.readiness >= 70 ? "text-success" : emp.readiness >= 50 ? "text-warning" : "text-destructive"
                    )}>{emp.readiness}%</p>
                    <p className="text-[9px] text-muted-foreground">Readiness</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                    selectedEmployeeId === emp.id ? "bg-info border-info" : "border-muted-foreground/30"
                  )}>
                    {selectedEmployeeId === emp.id && <Check className="h-3 w-3 text-info-foreground" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Profile & Gap Analysis */}
      {currentStep === 2 && selectedEmployee && (
        <div className="space-y-5">
          {/* Employee card */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-info/80 to-primary/80 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">{selectedEmployee.avatar}</span>
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">{selectedEmployee.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedEmployee.position} · {selectedEmployee.grade} · {selectedEmployee.department}</p>
                </div>
                <div className="ml-auto text-center">
                  <p className={cn("text-2xl font-bold", selectedEmployee.readiness >= 70 ? "text-success" : selectedEmployee.readiness >= 50 ? "text-warning" : "text-destructive")}>
                    {selectedEmployee.readiness}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">Current Readiness</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target position selection */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-3 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Compass className="h-4 w-4 text-info" /> Assign Target Position
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="grid grid-cols-3 gap-2">
                {positions.map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => setSelectedPosition(pos.id)}
                    className={cn(
                      "text-left p-3 rounded-lg border transition-colors text-sm",
                      selectedPosition === pos.id ? "border-info bg-info/5" : "border-border/50 hover:border-info/40"
                    )}
                  >
                    <span className="font-medium text-foreground">{pos.title}</span>
                    <span className="text-[10px] text-muted-foreground block">{pos.grade} · {pos.department}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gap summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-destructive/20 backdrop-blur-sm bg-card/80">
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold text-destructive">{empCompetencies.filter(c => c.severity === "Critical").length}</p>
                <p className="text-[10px] text-muted-foreground">Critical Gaps</p>
              </CardContent>
            </Card>
            <Card className="border-warning/20 backdrop-blur-sm bg-card/80">
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold text-warning">{empCompetencies.filter(c => c.severity === "Moderate").length}</p>
                <p className="text-[10px] text-muted-foreground">Moderate Gaps</p>
              </CardContent>
            </Card>
            <Card className="border-success/20 backdrop-blur-sm bg-card/80">
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold text-success">{empCompetencies.filter(c => c.severity === "Met").length}</p>
                <p className="text-[10px] text-muted-foreground">Met</p>
              </CardContent>
            </Card>
          </div>

          {/* Radar chart */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-info" /> Competency Radar
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickCount={6} />
                    <Radar name="Current" dataKey="current" stroke="hsl(var(--info))" fill="hsl(var(--info))" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="Required" dataKey="required" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Competency list */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-info" /> AI Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-2">
              {empCompetencies.map(c => (
                <div key={c.id} className={cn(
                  "p-3 rounded-lg border-l-4",
                  c.severity === "Critical" ? "border-l-destructive bg-destructive/5" :
                  c.severity === "Moderate" ? "border-l-warning bg-warning/5" :
                  "border-l-success bg-success/5"
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">{c.name}</span>
                      <Badge variant="outline" className="text-[9px]">{c.category}</Badge>
                    </div>
                    <Badge className={cn(
                      "text-[9px]",
                      c.severity === "Critical" ? "bg-destructive/15 text-destructive" :
                      c.severity === "Moderate" ? "bg-warning/15 text-warning" :
                      "bg-success/15 text-success"
                    )}>Lv {c.currentLevel} → {c.requiredLevel}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 3: Build Plan — Select recommendations per gap */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/80 border-info/15">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-info" />
                <span className="text-sm font-semibold text-info">AI-Mapped Recommendations for {selectedEmployee?.name}</span>
              </div>
              <p className="text-xs text-foreground">
                The AI has pre-selected the best option for each gap. Adjust selections as needed.
                · {Object.keys(gapSelections).length} gaps addressed · Est. QAR {selectedItems.reduce((s, i) => s + i.cost, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {gapRecommendations.map(({ gap, options }) => (
            <Card key={gap.id} className="backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1.5 h-7 rounded-full", gap.severity === "Critical" ? "bg-destructive" : "bg-warning")} />
                    <div>
                      <CardTitle className="text-xs">{gap.name}</CardTitle>
                      <p className="text-[10px] text-muted-foreground">Lv {gap.currentLevel} → {gap.requiredLevel} · {gap.severity}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-[9px]",
                    gap.severity === "Critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                  )}>{gap.severity}</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-4 space-y-2">
                {options.map((rec, idx) => {
                  const isSelected = gapSelections[gap.name] === rec.id;
                  return (
                    <div
                      key={rec.id}
                      onClick={() => setGapSelections(prev => ({ ...prev, [gap.name]: rec.id }))}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-all",
                        isSelected ? "border-info bg-info/5 ring-1 ring-info/20" : "border-border/50 hover:border-info/30"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                          isSelected ? "bg-info border-info" : "border-muted-foreground/30"
                        )}>
                          {isSelected && <Check className="h-2.5 w-2.5 text-info-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-[9px]">
                              {rec.type === "Certification" ? <Award className="h-2.5 w-2.5 mr-0.5" /> : <BookOpen className="h-2.5 w-2.5 mr-0.5" />}
                              {rec.type}
                            </Badge>
                            <span className="text-xs font-semibold text-foreground">{rec.code} — {rec.title}</span>
                            {rec.isQatarRecommended && (
                              <Badge className="bg-accent/15 text-accent text-[9px]">
                                <Star className="h-2 w-2 mr-0.5" /> Qatar
                              </Badge>
                            )}
                            {idx === 0 && <Badge className="bg-info/15 text-info text-[9px]"><Sparkles className="h-2 w-2 mr-0.5" /> AI Pick</Badge>}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {rec.provider} · {rec.duration} · QAR {rec.cost.toLocaleString()} · {rec.aiConfidence}% match
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {options.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">No recommendations available for this gap.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* STEP 4: Schedule */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/80 border-info/15">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-info" />
                <span className="text-sm font-semibold text-info">AI Sequencing</span>
              </div>
              <p className="text-xs text-foreground">
                Critical gaps scheduled first. Override quarter and month as needed.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4 space-y-2">
              {schedule.map((item, i) => {
                const gap = gaps.find(g => g.name === item.competencyName);
                return (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
                    <div className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-semibold w-14 text-center",
                      item.type === "Certification" ? "bg-accent/15 text-accent" : "bg-info/15 text-info"
                    )}>
                      {item.type === "Certification" ? "Cert" : "Course"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{item.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-muted-foreground">{item.competencyName}</p>
                        {gap && (
                          <Badge className={cn("text-[8px] h-3.5",
                            gap.severity === "Critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                          )}>{gap.severity}</Badge>
                        )}
                      </div>
                    </div>
                    <select
                      value={item.quarter}
                      onChange={(e) => setSchedule(prev => prev.map((s, idx) => idx === i ? { ...s, quarter: e.target.value } : s))}
                      className="text-[10px] border border-border/50 rounded-md px-2 py-1 bg-card text-foreground"
                    >
                      {quarters.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                    <select
                      value={item.month}
                      onChange={(e) => setSchedule(prev => prev.map((s, idx) => idx === i ? { ...s, month: e.target.value } : s))}
                      className="text-[10px] border border-border/50 rounded-md px-2 py-1 bg-card text-foreground"
                    >
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <p className="text-[10px] text-muted-foreground shrink-0 w-20 text-right">QAR {item.cost.toLocaleString()}</p>
                  </div>
                );
              })}
              <div className="flex justify-between mt-3 pt-3 border-t border-border/50">
                <Button variant="outline" size="sm" onClick={buildSchedule} className="text-xs h-8">
                  <Sparkles className="h-3 w-3 mr-1.5" /> Reset to AI Order
                </Button>
                <p className="text-sm font-semibold text-foreground">Total: QAR {totalCost.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 5: Review & Assign */}
      {currentStep === 5 && selectedEmployee && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Employee", value: selectedEmployee.name },
              { label: "Target Position", value: positions.find(p => p.id === selectedPosition)?.title || "—" },
              { label: "Items", value: `${schedule.filter(s => s.type === "Certification").length} Certs · ${schedule.filter(s => s.type === "Course").length} Courses` },
              { label: "Budget", value: `QAR ${totalCost.toLocaleString()}` },
            ].map(stat => (
              <Card key={stat.label} className="backdrop-blur-sm bg-card/80">
                <CardContent className="pt-3 pb-3 text-center">
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  <p className="text-xs font-semibold text-foreground mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Plan summary */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm">Plan Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="space-y-1.5">
                {schedule.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
                    <span className="text-[10px] text-muted-foreground w-5">{i + 1}</span>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px] font-semibold w-12 text-center",
                      item.type === "Certification" ? "bg-accent/15 text-accent" : "bg-info/15 text-info"
                    )}>
                      {item.type === "Certification" ? "Cert" : "Course"}
                    </span>
                    <span className="text-xs text-foreground flex-1">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground">{item.month} · {item.quarter}</span>
                    <span className="text-[10px] text-info font-medium">{item.aiConfidence}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Note */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-foreground mb-2">Note to Employee (optional)</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for the employee about this plan…"
                className="w-full h-20 rounded-lg bg-muted/50 border-0 text-sm text-foreground placeholder:text-muted-foreground p-3 focus:outline-none focus:ring-2 focus:ring-info/30 resize-none"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 text-xs h-10">Save as Draft</Button>
            <Button onClick={handleProvision} className="flex-1 text-xs h-10 gap-2 bg-info hover:bg-info/90 text-info-foreground">
              <Send className="h-3.5 w-3.5" />
              Provision & Assign CDP
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-5 border-t border-border/50">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1} className="gap-2 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" /> Previous
        </Button>
        {currentStep < 5 && (
          <Button size="sm" onClick={handleNext} className="gap-2 text-xs">
            Next <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default V2LDProvisionPage;
