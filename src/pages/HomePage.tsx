import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award, BookOpen, Compass, MessageSquare, TrendingUp,
  FileText, CheckCircle2, Calendar, ArrowRight, Clock
} from "lucide-react";
import { currentEmployee, activePlan, recentActivity } from "@/data/mockData";

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

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Welcome back,</p>
            <h1 className="text-2xl font-bold mt-1">{currentEmployee.fullName}</h1>
            <p className="text-sm opacity-80 mt-1">
              {currentEmployee.position.title} · {currentEmployee.department.name} · Grade {currentEmployee.position.grade}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-2xl font-bold">AA</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certifications Available</p>
                <p className="text-3xl font-bold text-foreground mt-1">127</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Readiness</p>
                <p className="text-3xl font-bold text-foreground mt-1">{activePlan.completionPercent}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={activePlan.completionPercent} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CDP Status</p>
                <Badge className="mt-2 bg-primary/15 text-primary hover:bg-primary/15">In Progress</Badge>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning This Year</p>
                <p className="text-3xl font-bold text-foreground mt-1">3</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Start CDP Wizard", desc: "Create your development plan", icon: Compass, path: "/wizard", color: "bg-primary" },
          { label: "Browse Catalogue", desc: "Explore certifications & courses", icon: BookOpen, path: "/catalogue", color: "bg-info" },
          { label: "Ask Daleel", desc: "AI career advisor", icon: MessageSquare, path: "#", color: "bg-accent" },
          { label: "View My Plan", desc: activePlan.planCode, icon: FileText, path: "/dashboard", color: "bg-success" },
        ].map((action) => (
          <Card
            key={action.label}
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => navigate(action.path)}
          >
            <CardContent className="pt-6">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{action.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{action.desc}</p>
              <ArrowRight className="h-4 w-4 text-muted-foreground mt-3 group-hover:translate-x-1 transition-transform" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = statusIcon[item.type] || CheckCircle2;
              return (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${statusColor[item.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">{item.date}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
