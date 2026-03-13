import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Award, BookOpen, Compass, MessageSquare, TrendingUp,
  FileText, CheckCircle2, Calendar, ArrowRight, Clock, Sparkles, Star
} from "lucide-react";
import { currentEmployee, activePlan, recentActivity, competencies } from "@/data/mockData";

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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const V2HomePage = () => {
  const navigate = useNavigate();
  const criticalGaps = competencies.filter((c) => c.severity === "Critical");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-8 space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[hsl(214,36%,16%)] p-10 text-primary-foreground">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[80px] -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-info/15 rounded-full blur-[60px]" />
        <div className="relative flex items-center justify-between">
          <div>
            <motion.p variants={item} className="text-sm opacity-80 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Good morning,
            </motion.p>
            <motion.h1 variants={item} className="text-3xl font-bold mt-2">{currentEmployee.fullName}</motion.h1>
            <motion.p variants={item} className="text-base opacity-80 mt-2">
              {currentEmployee.position.title} · {currentEmployee.department.name} · Grade {currentEmployee.position.grade}
            </motion.p>
            <motion.div variants={item} className="flex gap-3 mt-6">
              <Button
                onClick={() => navigate("/v2/wizard")}
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground backdrop-blur-sm rounded-xl gap-2 border border-primary-foreground/10"
              >
                <Compass className="h-4 w-4" /> Start CDP Wizard
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/v2/catalogue")}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2"
              >
                <BookOpen className="h-4 w-4" /> Browse Catalogue
              </Button>
            </motion.div>
          </div>
          <motion.div
            variants={item}
            className="text-center backdrop-blur-sm bg-primary-foreground/10 rounded-2xl p-6 border border-primary-foreground/10"
          >
            <p className="text-5xl font-bold">{activePlan.completionPercent}%</p>
            <p className="text-sm opacity-80 mt-1">Career Readiness</p>
            <div className="w-32 h-2 bg-primary-foreground/20 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-primary-foreground rounded-full"
                style={{ width: `${activePlan.completionPercent}%` }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-5">
        {[
          { label: "Certifications Available", value: "127", icon: Award, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent" },
          { label: "Active CDP Items", value: `${activePlan.completedItems}/${activePlan.totalItems}`, icon: FileText, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary" },
          { label: "Critical Gaps", value: String(criticalGaps.length), icon: TrendingUp, gradient: "from-destructive/15 to-destructive/5", iconColor: "text-destructive" },
          { label: "Learning This Year", value: "3", icon: BookOpen, gradient: "from-info/15 to-info/5", iconColor: "text-info" },
        ].map((stat) => (
          <Card key={stat.label} className="backdrop-blur-sm bg-card/80 border-border/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-4 gap-5">
        {[
          { label: "CDP Wizard", desc: "Create your development plan", icon: Compass, path: "/v2/wizard", gradient: "from-primary to-primary-dark" },
          { label: "Browse Catalogue", desc: "Explore certifications & courses", icon: BookOpen, path: "/v2/catalogue", gradient: "from-info to-[hsl(213,93%,45%)]" },
          { label: "Ask Daleel", desc: "AI career advisor", icon: MessageSquare, path: "#", gradient: "from-accent to-[hsl(43,86%,36%)]" },
          { label: "My Dashboard", desc: activePlan.planCode, icon: FileText, path: "/v2/dashboard", gradient: "from-success to-[hsl(152,61%,27%)]" },
        ].map((action) => (
          <motion.div
            key={action.label}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="pt-6 pb-5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.desc}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground mt-4 group-hover:translate-x-2 group-hover:text-primary transition-all" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Two Column: Plan Progress + Activity */}
      <motion.div variants={item} className="grid grid-cols-5 gap-6">
        {/* Active Plan */}
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
            <Button variant="ghost" className="w-full mt-4 text-primary rounded-xl gap-2" onClick={() => navigate("/v2/dashboard")}>
              View all items <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
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
      </motion.div>
    </motion.div>
  );
};

export default V2HomePage;
