import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User, Mail, Phone, MapPin, Building2, Calendar, GraduationCap,
  Award, Upload, FileText, Briefcase, Shield, CheckCircle2,
  Brain, History, TrendingUp, Star, Edit3, Save, Target, Zap, BookOpen, Clock
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

const skills = [
  { name: "Project Management", level: 85 },
  { name: "Risk Assessment", level: 72 },
  { name: "Stakeholder Management", level: 68 },
  { name: "Agile / Scrum", level: 78 },
  { name: "Leadership", level: 60 },
  { name: "Data Analysis", level: 55 },
];

const V2ProfilePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "PRINCE2_Foundation_Certificate.pdf", type: "Certification Proof", date: "2020-09-15" },
    { name: "Lean_Six_Sigma_Green_Belt.pdf", type: "Certification Proof", date: "2021-04-20" },
    { name: "Ahmed_AlThani_CV_2025.pdf", type: "CV / Resume", date: "2025-11-10" },
  ]);
  const [aiContext, setAiContext] = useState(
    "I'm interested in transitioning to a senior project management role with a focus on infrastructure and transport projects. I have experience managing cross-functional teams of 10+ members. I prefer in-person or hybrid training formats over fully online courses."
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

  const emp = currentEmployee;

  return (
    <div className="p-6 animate-fade-in max-w-6xl mx-auto">
      {/* Enhanced Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-xl font-bold text-primary-foreground">AA</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-foreground">{emp.fullName}</h1>
              <Badge className="bg-success/15 text-success hover:bg-success/15 text-[10px]">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{emp.position.title} · {emp.position.grade} · {emp.department.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{emp.email} · {emp.phone}</p>
          </div>
        </div>
        {/* Quick Stats */}
        <div className="flex gap-3">
          {[
            { icon: BookOpen, label: "Courses", value: "6", color: "text-info" },
            { icon: Award, label: "Certs", value: "2", color: "text-accent" },
            { icon: Star, label: "Rating", value: "4.2", color: "text-warning" },
            { icon: Clock, label: "Tenure", value: "3y", color: "text-primary" },
          ].map(stat => (
            <div key={stat.label} className="text-center px-3 py-2 rounded-xl bg-card border border-border/50">
              <stat.icon className={cn("h-4 w-4 mx-auto mb-1", stat.color)} />
              <p className="text-sm font-bold text-foreground">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <User className="h-3.5 w-3.5" /> Overview
          </TabsTrigger>
          <TabsTrigger value="learning" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <GraduationCap className="h-3.5 w-3.5" /> Learning
          </TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <TrendingUp className="h-3.5 w-3.5" /> Performance
          </TabsTrigger>
          <TabsTrigger value="documents" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <FileText className="h-3.5 w-3.5" /> Documents
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg gap-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
            <Brain className="h-3.5 w-3.5" /> AI Context
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB - Now much richer */}
        <TabsContent value="overview" className="space-y-4">
          {/* Row 1: Personal + Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-primary" /> Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {[
                    { label: "Date of Birth", value: emp.dateOfBirth },
                    { label: "Nationality", value: emp.nationality },
                    { label: "Email", value: emp.email },
                    { label: "Phone", value: emp.phone },
                    { label: "Location", value: emp.location },
                    { label: "Hire Date", value: emp.hireDate },
                  ].map(r => (
                    <div key={r.label}>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{r.label}</p>
                      <p className="text-xs text-foreground">{r.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-primary" /> Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {[
                    { label: "Employee ID", value: emp.employeeNumber },
                    { label: "Position", value: `${emp.position.title}` },
                    { label: "Position Code", value: emp.position.code },
                    { label: "Department", value: emp.department.name },
                    { label: "Division", value: emp.division.name },
                    { label: "Grade", value: emp.position.grade },
                    { label: "Manager", value: emp.manager },
                  ].map(r => (
                    <div key={r.label}>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{r.label}</p>
                      <p className="text-xs text-foreground">{r.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Skills + Education & Certs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skills */}
            <Card className="backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-primary" /> Skills & Competencies
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-foreground">{skill.name}</p>
                      <span className="text-[10px] font-medium text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education + Certifications stacked */}
            <div className="space-y-4">
              <Card className="backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" /> Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 px-4 pb-4">
                  {emp.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{edu.degree}</p>
                        <p className="text-[10px] text-muted-foreground">{edu.institution} · {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-primary" /> Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 px-4 pb-4">
                  {emp.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-foreground">{cert.name}</p>
                        <p className="text-[10px] text-muted-foreground">{cert.provider} · {cert.year}</p>
                      </div>
                      <Badge className={cn(
                        "text-[9px] h-5",
                        cert.status === "Active" ? "bg-success/15 text-success hover:bg-success/15" : "bg-muted text-muted-foreground"
                      )}>{cert.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Row 3: Recent Activity + Latest Appraisal snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <History className="h-3.5 w-3.5 text-primary" /> Recent Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-1.5">
                  {learningHistory.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center shrink-0",
                        item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                      )}>
                        {item.type === "Certification"
                          ? <Award className="h-3 w-3 text-accent" />
                          : <GraduationCap className="h-3 w-3 text-info" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground">{item.completedDate}</p>
                      </div>
                      <span className="text-xs font-semibold text-foreground">{item.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" /> Latest Appraisal
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{appraisalHistory[0].year}</span>
                    <Badge className="bg-success/15 text-success hover:bg-success/15 text-[10px]">
                      {appraisalHistory[0].rating}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: appraisalHistory[0].maxScore }).map((_, si) => (
                      <Star key={si} className={cn(
                        "h-3 w-3",
                        si < Math.round(appraisalHistory[0].score) ? "text-accent fill-accent" : "text-muted-foreground/20"
                      )} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed mb-3">
                  "{appraisalHistory[0].managerComment}"
                </p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Strengths</p>
                    <div className="flex flex-wrap gap-1">
                      {appraisalHistory[0].strengths.map(s => (
                        <Badge key={s} variant="outline" className="text-[9px] h-5 border-success/30 text-success">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Improve</p>
                    <div className="flex flex-wrap gap-1">
                      {appraisalHistory[0].improvements.map(s => (
                        <Badge key={s} variant="outline" className="text-[9px] h-5 border-warning/30 text-warning">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* LEARNING TAB */}
        <TabsContent value="learning">
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-3 pt-4 px-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="h-3.5 w-3.5 text-primary" /> Learning History
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="space-y-1.5">
                {learningHistory.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      item.type === "Certification" ? "bg-accent/10" : "bg-info/10"
                    )}>
                      {item.type === "Certification"
                        ? <Award className="h-3.5 w-3.5 text-accent" />
                        : <GraduationCap className="h-3.5 w-3.5 text-info" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.provider} · {item.completedDate}</p>
                    </div>
                    <Badge className="bg-success/15 text-success hover:bg-success/15 text-[9px] h-5">{item.result}</Badge>
                    <span className="text-xs font-semibold text-foreground w-10 text-right">{item.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERFORMANCE TAB */}
        <TabsContent value="performance">
          <div className="space-y-4">
            {appraisalHistory.map((a, i) => (
              <Card key={i} className="backdrop-blur-sm bg-card/80">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">{a.year}</span>
                      <Badge className={cn(
                        "text-[10px] h-5",
                        a.rating === "Exceeds Expectations"
                          ? "bg-success/15 text-success hover:bg-success/15"
                          : "bg-primary/15 text-primary hover:bg-primary/15"
                      )}>{a.rating}</Badge>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: a.maxScore }).map((_, si) => (
                        <Star key={si} className={cn(
                          "h-3 w-3",
                          si < Math.round(a.score) ? "text-accent fill-accent" : "text-muted-foreground/20"
                        )} />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1.5">{a.score}/{a.maxScore}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 italic leading-relaxed">"{a.managerComment}"</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {a.strengths.map(s => (
                          <Badge key={s} variant="outline" className="text-[9px] h-5 border-success/30 text-success">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Improve</p>
                      <div className="flex flex-wrap gap-1">
                        {a.improvements.map(s => (
                          <Badge key={s} variant="outline" className="text-[9px] h-5 border-warning/30 text-warning">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* DOCUMENTS TAB */}
        <TabsContent value="documents">
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-3 pt-4 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Upload className="h-3.5 w-3.5 text-primary" /> Documents & Proof
                </CardTitle>
                <label className="cursor-pointer">
                  <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5" asChild>
                    <span><Upload className="h-3 w-3" /> Upload</span>
                  </Button>
                </label>
              </div>
              <p className="text-[10px] text-muted-foreground">Upload CV, certification proofs, or training certificates to enrich Daleel AI context.</p>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="space-y-1.5">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{file.type} · {file.date}</p>
                    </div>
                    <Badge variant="outline" className="text-[9px] h-5">{file.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI CONTEXT TAB */}
        <TabsContent value="ai">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader className="pb-3 pt-4 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Brain className="h-3.5 w-3.5 text-primary" /> Additional AI Context
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1.5"
                  onClick={() => setIsEditingContext(!isEditingContext)}
                >
                  {isEditingContext ? <Save className="h-3 w-3" /> : <Edit3 className="h-3 w-3" />}
                  {isEditingContext ? "Save" : "Edit"}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Share career preferences, aspirations, or constraints to help Daleel AI give you better recommendations.
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              {isEditingContext ? (
                <Textarea
                  value={aiContext}
                  onChange={(e) => setAiContext(e.target.value)}
                  className="min-h-[140px] text-xs"
                  placeholder="Describe your career goals, preferred learning styles, constraints..."
                />
              ) : (
                <div className="text-xs text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-4">
                  {aiContext || "No additional context provided. Click Edit to add your career preferences."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default V2ProfilePage;
