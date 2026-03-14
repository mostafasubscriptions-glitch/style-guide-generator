import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Award, Target, TrendingUp, BookOpen, ArrowRight, AlertTriangle,
  CheckCircle2, Clock, Download, Sparkles
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { currentEmployee, activePlan, competencies } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const radarData = [
  { subject: "Project Mgmt", current: 3, required: 5, fullMark: 5 },
  { subject: "Leadership", current: 3, required: 4, fullMark: 5 },
  { subject: "Stakeholder", current: 4, required: 4, fullMark: 5 },
  { subject: "Risk Mgmt", current: 2, required: 4, fullMark: 5 },
  { subject: "Strategic Plan", current: 3, required: 4, fullMark: 5 },
  { subject: "Communication", current: 4, required: 4, fullMark: 5 },
  { subject: "Financial", current: 2, required: 3, fullMark: 5 },
  { subject: "Change Mgmt", current: 3, required: 4, fullMark: 5 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const V2DashboardPage = () => {
  const navigate = useNavigate();
  const criticalGaps = competencies.filter((c) => c.severity === "Critical");
  const moderateGaps = competencies.filter((c) => c.severity === "Moderate");
  const metGaps = competencies.filter((c) => c.severity === "Met");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-8 space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your career development progress</p>
        </div>
        <Button variant="outline" className="gap-2 rounded-xl">
          <Download className="h-4 w-4" /> Export PDF
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-4 gap-5">
        {[
          { label: "Readiness", value: `${activePlan.completionPercent}%`, sub: "Career Score", color: "text-primary", bg: "from-primary/15 to-primary/5" },
          { label: "Critical", value: String(criticalGaps.length), sub: "Competency Gaps", color: "text-destructive", bg: "from-destructive/15 to-destructive/5" },
          { label: "Moderate", value: String(moderateGaps.length), sub: "Competency Gaps", color: "text-warning", bg: "from-warning/15 to-warning/5" },
          { label: "Met", value: String(metGaps.length), sub: "Competencies", color: "text-success", bg: "from-success/15 to-success/5" },
        ].map((s) => (
          <Card key={s.label} className="backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl overflow-hidden">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-5 gap-6">
        {/* Radar Chart */}
        <motion.div variants={item} className="col-span-3">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Competency Radar — {activePlan.targetPosition}</h3>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickCount={6} />
                    <Radar name="Current" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="Required" dataKey="required" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active CDP */}
        <motion.div variants={item} className="col-span-2">
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Active CDP</h3>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 rounded-lg">In Progress</Badge>
              </div>
              <div className="backdrop-blur-sm bg-muted/30 rounded-2xl p-4 space-y-3">
                <p className="text-sm font-mono text-muted-foreground">{activePlan.planCode}</p>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium text-foreground">{activePlan.completedItems}/{activePlan.totalItems}</span>
                  </div>
                  <Progress value={activePlan.completionPercent} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Target</p>
                    <p className="font-medium text-foreground">{activePlan.targetPosition}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Est. Cost</p>
                    <p className="font-medium text-foreground">QAR {activePlan.estimatedCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full gap-2 rounded-xl" onClick={() => navigate("/wizard")}>
                View Plan <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Plan Items */}
      <motion.div variants={item}>
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Development Plan Items</h3>
            </div>
            <div className="space-y-2">
              {activePlan.items.map((planItem, i) => (
                <div key={planItem.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                  <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${
                    planItem.type === "Certification" ? "bg-accent/15 text-accent" :
                    planItem.type === "Course" ? "bg-info/15 text-info" : "bg-primary/15 text-primary"
                  }`}>
                    {planItem.type === "Certification" ? "Cert" : planItem.type === "Course" ? "Course" : "Mentor"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{planItem.title}</p>
                    <p className="text-xs text-muted-foreground">{planItem.competency}</p>
                  </div>
                  <Badge variant="outline" className="rounded-lg">{planItem.quarter}</Badge>
                  <span className="text-xs font-medium text-primary">{planItem.confidence}%</span>
                  {planItem.status === "Completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {planItem.status === "InProgress" && <Clock className="h-4 w-4 text-primary" />}
                  {planItem.status === "NotStarted" && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Competency Grid */}
      <motion.div variants={item}>
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Competency Overview</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {competencies.map((comp) => (
                <div key={comp.id} className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{comp.name}</span>
                    <Badge className={`rounded-lg text-[10px] ${
                      comp.severity === "Critical" ? "bg-destructive/15 text-destructive hover:bg-destructive/15" :
                      comp.severity === "Moderate" ? "bg-warning/15 text-warning hover:bg-warning/15" :
                      "bg-success/15 text-success hover:bg-success/15"
                    }`}>{comp.severity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{comp.category}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((l) => (
                      <div key={l} className={`h-2 flex-1 rounded-full ${
                        l <= comp.currentLevel
                          ? comp.severity === "Critical" ? "bg-destructive" : comp.severity === "Moderate" ? "bg-warning" : "bg-success"
                          : l <= comp.requiredLevel ? "bg-muted" : "bg-muted/50"
                      }`} />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Current: {comp.currentLevel}</span>
                    <span>Required: {comp.requiredLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default V2DashboardPage;
