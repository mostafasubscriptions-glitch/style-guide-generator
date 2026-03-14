import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CheckCircle2, Calendar, MessageSquare, FileText,
  ArrowRight, Clock, Star, Users, AlertTriangle
} from "lucide-react";
import { activePlan, recentActivity } from "@/data/mockData";
import { UserRole } from "@/contexts/RoleContext";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const statusColor: Record<string, string> = {
  completion: "bg-success/15 text-success",
  milestone: "bg-info/15 text-info",
  session: "bg-primary/15 text-primary",
  approval: "bg-accent/15 text-accent",
};

const statusIcon: Record<string, typeof CheckCircle2> = {
  completion: CheckCircle2,
  milestone: Calendar,
  session: MessageSquare,
  approval: FileText,
};

const ActivityFeed = () => (
  <Card className="col-span-2 backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
    <CardContent className="pt-6">
      <div className="flex items-center gap-2 mb-5">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="space-y-4">
        {recentActivity.map((act) => {
          const Icon = statusIcon[act.type] || CheckCircle2;
          return (
            <div key={act.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${statusColor[act.type]}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{act.text}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{act.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

// Employee: Active Plan + Activity
const EmployeeBottom = () => {
  const navigate = useNavigate();
  return (
    <motion.div variants={item} className="grid grid-cols-5 gap-6">
      <Card className="col-span-3 backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Active Development Plan</h3>
            </div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 rounded-lg">{activePlan.planCode}</Badge>
          </div>
          <div className="space-y-3">
            {activePlan.items.slice(0, 5).map((planItem, i) => (
              <div key={planItem.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${
                  planItem.type === "Certification" ? "bg-accent/15 text-accent" :
                  planItem.type === "Course" ? "bg-info/15 text-info" : "bg-primary/15 text-primary"
                }`}>
                  {planItem.type === "Certification" ? "Cert" : planItem.type === "Course" ? "Course" : "Mentor"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{planItem.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{planItem.quarter}</span>
                {planItem.status === "Completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                {planItem.status === "InProgress" && <Clock className="h-4 w-4 text-primary" />}
                {planItem.status === "NotStarted" && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />}
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-primary rounded-xl gap-2" onClick={() => navigate("/dashboard")}>
            View all items <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <ActivityFeed />
    </motion.div>
  );
};

// Manager: Pending Approvals + Activity
const ManagerBottom = () => {
  const navigate = useNavigate();
  const pendingApprovals = [
    { id: 1, name: "Khalid Al-Sulaiti", action: "CDP Plan Approval", date: "2 hours ago", urgent: true },
    { id: 2, name: "Noura Al-Kuwari", action: "Training Request — PMP Certification", date: "1 day ago", urgent: true },
    { id: 3, name: "Omar Hassan", action: "Mentorship Assignment", date: "2 days ago", urgent: false },
    { id: 4, name: "Maryam Al-Thani", action: "Course Enrollment — Agile Leadership", date: "3 days ago", urgent: false },
    { id: 5, name: "Youssef Kamal", action: "CDP Extension Request", date: "4 days ago", urgent: false },
  ];

  return (
    <motion.div variants={item} className="grid grid-cols-5 gap-6">
      <Card className="col-span-3 backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Pending Approvals</h3>
            </div>
            <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 rounded-lg">5 pending</Badge>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{item.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.date}</span>
                {item.urgent && <div className="w-2 h-2 rounded-full bg-destructive" />}
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-primary rounded-xl gap-2" onClick={() => navigate("/v2/manager")}>
            View all approvals <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <ActivityFeed />
    </motion.div>
  );
};

// L&D: Training Programs + Activity
const LDBottom = () => {
  const navigate = useNavigate();
  const programs = [
    { id: 1, name: "PMP Certification Cohort", enrolled: 18, capacity: 25, status: "Active" },
    { id: 2, name: "Agile Leadership Workshop", enrolled: 12, capacity: 15, status: "Active" },
    { id: 3, name: "Data Analytics Bootcamp", enrolled: 8, capacity: 20, status: "Upcoming" },
    { id: 4, name: "Six Sigma Green Belt", enrolled: 22, capacity: 22, status: "Full" },
    { id: 5, name: "Change Management Cert", enrolled: 5, capacity: 30, status: "Open" },
  ];

  return (
    <motion.div variants={item} className="grid grid-cols-5 gap-6">
      <Card className="col-span-3 backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Active Training Programs</h3>
            </div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 rounded-lg">5 programs</Badge>
          </div>
          <div className="space-y-3">
            {programs.map((prog) => (
              <div key={prog.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{prog.name}</p>
                </div>
                <span className="text-xs text-muted-foreground">{prog.enrolled}/{prog.capacity}</span>
                <Badge variant="outline" className={`text-[10px] rounded-lg ${
                  prog.status === "Full" ? "border-destructive/30 text-destructive" :
                  prog.status === "Upcoming" ? "border-info/30 text-info" :
                  prog.status === "Open" ? "border-success/30 text-success" : "border-primary/30 text-primary"
                }`}>
                  {prog.status}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-primary rounded-xl gap-2" onClick={() => navigate("/v2/ld")}>
            View all programs <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <ActivityFeed />
    </motion.div>
  );
};

// Strategic: Department Overview + Activity
const StrategicBottom = () => {
  const navigate = useNavigate();
  const departments = [
    { id: 1, name: "Planning & Projects", readiness: 78, headcount: 42, gaps: 8 },
    { id: 2, name: "Operations", readiness: 65, headcount: 156, gaps: 23 },
    { id: 3, name: "Finance & Admin", readiness: 82, headcount: 38, gaps: 5 },
    { id: 4, name: "IT & Digital", readiness: 71, headcount: 52, gaps: 14 },
    { id: 5, name: "HR & Corporate", readiness: 88, headcount: 28, gaps: 3 },
  ];

  return (
    <motion.div variants={item} className="grid grid-cols-5 gap-6">
      <Card className="col-span-3 backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Department Readiness</h3>
            </div>
          </div>
          <div className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{dept.name}</p>
                  <p className="text-xs text-muted-foreground">{dept.headcount} employees · {dept.gaps} gaps</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${dept.readiness >= 80 ? "bg-success" : dept.readiness >= 70 ? "bg-primary" : "bg-destructive"}`}
                      style={{ width: `${dept.readiness}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-10 text-right">{dept.readiness}%</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-primary rounded-xl gap-2" onClick={() => navigate("/v2/strategic")}>
            Full analytics <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <ActivityFeed />
    </motion.div>
  );
};

const HomeBottomSection = ({ role }: { role: UserRole }) => {
  switch (role) {
    case "employee": return <EmployeeBottom />;
    case "manager": return <ManagerBottom />;
    case "ld": return <LDBottom />;
    case "strategic_leader": return <StrategicBottom />;
  }
};

export default HomeBottomSection;
