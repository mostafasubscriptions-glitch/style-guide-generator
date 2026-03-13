import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  User, Target, Award, Calendar, CheckCircle2, ChevronRight,
  ArrowLeft, ArrowRight, Sparkles, BookOpen, Users, FileText,
  AlertTriangle, Check
} from "lucide-react";
import { currentEmployee, competencies, certifications, trainings, activePlan, strategicPriorities } from "@/data/mockData";

const steps = [
  { id: 1, label: "Profile", icon: User },
  { id: 2, label: "Gap Analysis", icon: Target },
  { id: 3, label: "Certifications", icon: Award },
  { id: 4, label: "Schedule", icon: Calendar },
  { id: 5, label: "Strategic", icon: Users },
  { id: 6, label: "Review", icon: FileText },
];

const WizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCerts, setSelectedCerts] = useState<number[]>([1, 3]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([1, 2, 3]);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([1, 3]);

  return (
    <div className="p-8 animate-fade-in">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 bg-card rounded-xl p-4 border border-border">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
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
              <span className="text-sm font-medium hidden lg:block">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Profile */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Employee Profile
              </CardTitle>
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

          {/* AI Profile Analysis */}
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

      {/* Step 2: Gap Analysis */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="border-destructive/20">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-destructive">2</p>
                <p className="text-sm text-muted-foreground mt-1">Critical Gaps</p>
              </CardContent>
            </Card>
            <Card className="border-warning/20">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-warning">4</p>
                <p className="text-sm text-muted-foreground mt-1">Moderate Gaps</p>
              </CardContent>
            </Card>
            <Card className="border-success/20">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-success">2</p>
                <p className="text-sm text-muted-foreground mt-1">Met</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Competency Gap Analysis — Target: Senior Project Manager (G9)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {competencies.map((comp) => (
                <div key={comp.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">{comp.name}</span>
                      <Badge variant="outline" className="text-[10px]">{comp.category}</Badge>
                    </div>
                    <Badge className={cn(
                      "text-[10px]",
                      comp.severity === "Critical" ? "bg-destructive/15 text-destructive hover:bg-destructive/15" :
                      comp.severity === "Moderate" ? "bg-warning/15 text-warning hover:bg-warning/15" :
                      "bg-success/15 text-success hover:bg-success/15"
                    )}>
                      {comp.severity} {comp.gap > 0 ? `(Gap: ${comp.gap})` : ""}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((l) => (
                        <div key={l} className="h-3 flex-1 rounded-full relative overflow-hidden bg-muted">
                          {l <= comp.currentLevel && (
                            <div className={`absolute inset-0 rounded-full ${
                              comp.severity === "Critical" ? "bg-destructive" : comp.severity === "Moderate" ? "bg-warning" : "bg-success"
                            }`} />
                          )}
                          {l > comp.currentLevel && l <= comp.requiredLevel && (
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/30" />
                          )}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground w-16 text-right">{comp.currentLevel} → {comp.requiredLevel}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Certifications & Courses */}
      {currentStep === 3 && (
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
                        {cert.isQatarRecommended && (
                          <Badge className="bg-accent/15 text-accent hover:bg-accent/15 text-[10px]">Qatar Recommended</Badge>
                        )}
                        <Badge variant="outline" className="text-[10px]">{cert.level}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.provider} · {cert.duration} · QAR {cert.cost.toLocaleString()} · Competency: {cert.competencyName}
                      </p>
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
                        {t.prepForCertCode && (
                          <Badge variant="outline" className="text-[10px]">Prep for {t.prepForCertCode}</Badge>
                        )}
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

      {/* Step 4: Schedule */}
      {currentStep === 4 && (
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
            <CardHeader>
              <CardTitle>Learning Schedule</CardTitle>
            </CardHeader>
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
                    )}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 5: Strategic Alignment */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Priorities Alignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {strategicPriorities.map((sp) => (
                <div
                  key={sp.id}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                    selectedPriorities.includes(sp.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  )}
                  onClick={() => setSelectedPriorities((prev) =>
                    prev.includes(sp.id) ? prev.filter((id) => id !== sp.id) : [...prev, sp.id]
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5",
                    selectedPriorities.includes(sp.id) ? "bg-primary border-primary" : "border-muted-foreground/30"
                  )}>
                    {selectedPriorities.includes(sp.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{sp.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{sp.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Suggested Mentor</span>
                <Badge className="bg-primary/15 text-primary hover:bg-primary/15 text-[10px]">84% Match</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">FA</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Fatima Al-Mansouri</p>
                  <p className="text-xs text-muted-foreground">Head of Projects · G10 · Planning & Projects</p>
                  <p className="text-xs text-muted-foreground mt-1">Strong alignment in Project Management and Leadership competencies. 12+ years experience in transport sector program delivery.</p>
                </div>
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
              { label: "Target Position", value: "Senior PM (G9)" },
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
            <CardHeader>
              <CardTitle>Plan Summary</CardTitle>
            </CardHeader>
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
            <Button className="flex-1 gap-2">
              Submit for Approval <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
          disabled={currentStep === 6}
          className="gap-2"
        >
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WizardPage;
