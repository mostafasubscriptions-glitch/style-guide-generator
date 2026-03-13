import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  User, Mail, Phone, MapPin, Building2, Calendar, GraduationCap,
  Award, Upload, FileText, Briefcase, Shield, CheckCircle2
} from "lucide-react";
import { currentEmployee } from "@/data/mockData";
import { cn } from "@/lib/utils";

const V2ProfilePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; date: string }[]>([
    { name: "PRINCE2_Foundation_Certificate.pdf", type: "Certification Proof", date: "2020-09-15" },
    { name: "Lean_Six_Sigma_Green_Belt.pdf", type: "Certification Proof", date: "2021-04-20" },
    { name: "Ahmed_AlThani_CV_2025.pdf", type: "CV / Resume", date: "2025-11-10" },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).map(f => ({
      name: f.name,
      type: "Document",
      date: new Date().toISOString().split("T")[0],
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
            {[
              { icon: User, label: "Full Name", value: currentEmployee.fullName },
              { icon: Calendar, label: "Date of Birth", value: currentEmployee.dateOfBirth },
              { icon: Shield, label: "Nationality", value: currentEmployee.nationality },
              { icon: Mail, label: "Email", value: currentEmployee.email },
              { icon: Phone, label: "Phone", value: currentEmployee.phone },
              { icon: MapPin, label: "Location", value: currentEmployee.location },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-foreground">{value}</p>
                </div>
              </div>
            ))}
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
            {[
              { icon: Briefcase, label: "Employee ID", value: currentEmployee.employeeNumber },
              { icon: Briefcase, label: "Position", value: `${currentEmployee.position.title} (${currentEmployee.position.code})` },
              { icon: Building2, label: "Department", value: currentEmployee.department.name },
              { icon: Building2, label: "Division", value: currentEmployee.division.name },
              { icon: User, label: "Grade", value: currentEmployee.position.grade },
              { icon: Calendar, label: "Hire Date", value: currentEmployee.hireDate },
              { icon: User, label: "Manager", value: `${currentEmployee.manager} — ${currentEmployee.managerTitle}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-foreground">{value}</p>
                </div>
              </div>
            ))}
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

        {/* Existing Certifications */}
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

        {/* Document Upload — full width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="h-4 w-4 text-primary" /> Documents & Proof
              </CardTitle>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" size="sm" asChild>
                  <span className="gap-2">
                    <Upload className="h-3.5 w-3.5" /> Upload File
                  </span>
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
                <p className="text-xs">Upload your CV or certification proofs</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default V2ProfilePage;
