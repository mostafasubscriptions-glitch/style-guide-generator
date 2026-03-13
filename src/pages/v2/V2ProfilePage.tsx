import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  User, Mail, Phone, MapPin, Building2, Calendar, GraduationCap,
  Award, Upload, FileText, Briefcase, Shield, CheckCircle2,
  Brain, History, TrendingUp, Star, Edit3, Save
} from "lucide-react";
import { currentEmployee } from "@/data/mockData";
import { cn } from "@/lib/utils";

const learningHistory = [
  { title: "Project Management Bootcamp", type: "Course", provider: "QatarSkills", completedDate: "2026-01-20", result: "Completed", score: "92%" },
  { title: "Risk Management Foundations", type: "Course", provider: "QatarSkills", completedDate: "2025-11-15", result: "Completed", score: "88%" },
  { title: "Leadership Essentials for Managers", type: "Course", provider: "HBKU", completedDate: "2026-03-10", result: "Completed", score: "95%" },
  { title: "PRINCE2 Foundation", type: "Certification", provider: "Axelos", completedDate: "2020-09-15", result: "Passed", score: "78%" },
  { title: "Lean Six Sigma Green Belt", type: "Certification", provider: "ASQ", completedDate: "2021-04-20", result: "Passed", score: "85%" },
  { title: "Agile Fundamentals", type: "Course", provider: "Scrum.org", completedDate: "2023-06-10", result: "Completed", score: "90%" },
];

const appraisalHistory = [
  { year: "2025", rating: "Exceeds Expectations", score: 4.2, maxScore: 5, managerComment: "Ahmed consistently delivered projects ahead of schedule and mentored junior team members effectively.", strengths: ["Project Delivery", "Team Collaboration", "Initiative"], improvements: ["Strategic Thinking", "Stakeholder Presentations"] },
  { year: "2024", rating: "Meets Expectations", score: 3.6, maxScore: 5, managerComment: "Solid performance with good project coordination skills. Needs to develop leadership capabilities for next grade.", strengths: ["Technical Accuracy", "Reliability", "Communication"], improvements: ["Leadership", "Risk Management"] },
  { year: "2023", rating: "Meets Expectations", score: 3.4, maxScore: 5, managerComment: "Good first full year. Ahmed showed strong foundation skills and willingness to learn.", strengths: ["Learning Agility", "Teamwork", "Attention to Detail"], improvements: ["Project Planning", "Time Management"] },
];

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-3">
    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
    <div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  </div>
);

const V2ProfilePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "PRINCE2_Foundation_Certificate.pdf", type: "Certification Proof", date: "2020-09-15" },
    { name: "Lean_Six_Sigma_Green_Belt.pdf", type: "Certification Proof", date: "2021-04-20" },
    { name: "Ahmed_AlThani_CV_2025.pdf", type: "CV / Resume", date: "2025-11-10" },
  ]);

  const [aiContext, setAiContext] = useState(
    "I'm interested in transitioning to a senior project management role with a focus on infrastructure and transport projects. I have experience managing cross-functional teams of 10+ members. I prefer in-person or hybrid training formats over fully online courses. I'm also exploring program management as a long-term career path."
  );
  const [isEditingContext, setIsEditingContext] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).map(f => ({
      name: f.name, type: "Document", date: new Date().toISOString().split("T")[0],
    }));
    setUploadedFiles(prev => [...newFiles, ...prev]);
  };

  return (
    <div className="p-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-primary-foreground">AA</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{currentEmployee.fullName}</h1>
          <p className="text-sm text-muted-foreground">{currentEmployee.position.title} · {currentEmployee.position.grade}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentEmployee.department.name} · {currentEmployee.division.name}</p>
        </div>
        <div className="ml-auto">
          <Badge className="bg-success/15 text-success hover:bg-success/15">Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow icon={User} label="Full Name" value={currentEmployee.fullName} />
            <InfoRow icon={Calendar} label="Date of Birth" value={currentEmployee.dateOfBirth} />
            <InfoRow icon={Shield} label="Nationality" value={currentEmployee.nationality} />
            <InfoRow icon={Mail} label="Email" value={currentEmployee.email} />
            <InfoRow icon={Phone} label="Phone" value={currentEmployee.phone} />
            <InfoRow icon={MapPin} label="Location" value={currentEmployee.location} />
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" /> Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow icon={Briefcase} label="Employee ID" value={currentEmployee.employeeNumber} />
            <InfoRow icon={Briefcase} label="Position" value={`${currentEmployee.position.title} (${currentEmployee.position.code})`} />
            <InfoRow icon={Building2} label="Department" value={currentEmployee.department.name} />
            <InfoRow icon={Building2} label="Division" value={currentEmployee.division.name} />
            <InfoRow icon={User} label="Grade" value={currentEmployee.position.grade} />
            <InfoRow icon={Calendar} label="Hire Date" value={currentEmployee.hireDate} />
            <InfoRow icon={User} label="Manager" value={`${currentEmployee.manager} — ${currentEmployee.managerTitle}`} />
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-primary" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentEmployee.education.map((edu, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution} · {edu.year}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications Held */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4 text-primary" /> Certifications Held
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentEmployee.certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{cert.name}</p>
                    <Badge className={cn(
                      "text-[10px]",
                      cert.status === "Active" ? "bg-success/15 text-success hover:bg-success/15" : "bg-muted text-muted-foreground"
                    )}>
                      {cert.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{cert.provider} · {cert.year}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Context — full width */}
        <Card className="lg:col-span-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-4 w-4 text-primary" /> Additional AI Context
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setIsEditingContext(!isEditingContext)}
              >
                {isEditingContext ? <Save className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
                {isEditingContext ? "Save" : "Edit"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Add personal career preferences, aspirations, constraints, or context to help Daleel AI provide better recommendations and matching.
            </p>
          </CardHeader>
          <CardContent>
            {isEditingContext ? (
              <Textarea
                value={aiContext}
                onChange={(e) => setAiContext(e.target.value)}
                className="min-h-[120px] text-sm"
                placeholder="Describe your career goals, preferred learning styles, constraints, or any other context..."
              />
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-4">
                {aiContext || "No additional context provided. Click Edit to add your career preferences and goals."}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Learning History — full width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="h-4 w-4 text-primary" /> Learning History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {learningHistory.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                  )}>
                    {item.type === "Certification"
                      ? <Award className="h-4 w-4 text-accent" />
                      : <GraduationCap className="h-4 w-4 text-info" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground">{item.provider} · {item.completedDate}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{item.type}</Badge>
                  <Badge className="bg-success/15 text-success hover:bg-success/15 text-[10px] shrink-0">{item.result}</Badge>
                  {item.score && (
                    <span className="text-xs font-medium text-foreground shrink-0">{item.score}</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Appraisal History — full width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" /> Performance Appraisal History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appraisalHistory.map((a, i) => (
              <div key={i} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-foreground">{a.year}</span>
                    <Badge className={cn(
                      "text-[10px]",
                      a.rating === "Exceeds Expectations"
                        ? "bg-success/15 text-success hover:bg-success/15"
                        : "bg-primary/15 text-primary hover:bg-primary/15"
                    )}>
                      {a.rating}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: a.maxScore }).map((_, si) => (
                      <Star
                        key={si}
                        className={cn(
                          "h-3.5 w-3.5",
                          si < Math.round(a.score) ? "text-accent fill-accent" : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{a.score}/{a.maxScore}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 italic">"{a.managerComment}"</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Strengths</p>
                    <div className="flex flex-wrap gap-1">
                      {a.strengths.map(s => (
                        <Badge key={s} variant="outline" className="text-[9px] border-success/30 text-success">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Areas for Improvement</p>
                    <div className="flex flex-wrap gap-1">
                      {a.improvements.map(s => (
                        <Badge key={s} variant="outline" className="text-[9px] border-warning/30 text-warning">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Upload — full width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="h-4 w-4 text-primary" /> Documents & Proof
              </CardTitle>
              <label className="cursor-pointer">
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                <Button variant="outline" size="sm" asChild>
                  <span className="gap-2"><Upload className="h-3.5 w-3.5" /> Upload File</span>
                </Button>
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload your CV, certification proofs, or training completion certificates. These help Daleel AI provide better recommendations.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">{file.type} · Uploaded {file.date}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{file.type}</Badge>
                </div>
              ))}
            </div>
            {uploadedFiles.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No documents uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default V2ProfilePage;
