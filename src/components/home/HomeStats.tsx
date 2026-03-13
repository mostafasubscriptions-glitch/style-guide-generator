import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, BookOpen, TrendingUp, FileText, Users, ClipboardCheck, Building2, Target } from "lucide-react";
import { activePlan, competencies } from "@/data/mockData";
import { UserRole } from "@/contexts/RoleContext";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface StatConfig {
  label: string;
  value: string;
  icon: typeof Award;
  gradient: string;
  iconColor: string;
}

const getStats = (role: UserRole): StatConfig[] => {
  const criticalGaps = competencies.filter((c) => c.severity === "Critical");

  switch (role) {
    case "employee":
      return [
        { label: "Certifications Available", value: "127", icon: Award, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent" },
        { label: "Active CDP Items", value: `${activePlan.completedItems}/${activePlan.totalItems}`, icon: FileText, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary" },
        { label: "Critical Gaps", value: String(criticalGaps.length), icon: TrendingUp, gradient: "from-destructive/15 to-destructive/5", iconColor: "text-destructive" },
        { label: "Learning This Year", value: "3", icon: BookOpen, gradient: "from-info/15 to-info/5", iconColor: "text-info" },
      ];
    case "manager":
      return [
        { label: "Direct Reports", value: "8", icon: Users, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary" },
        { label: "Pending Approvals", value: "5", icon: ClipboardCheck, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent" },
        { label: "Team Gaps", value: "12", icon: TrendingUp, gradient: "from-destructive/15 to-destructive/5", iconColor: "text-destructive" },
        { label: "CDPs In Progress", value: "6", icon: FileText, gradient: "from-info/15 to-info/5", iconColor: "text-info" },
      ];
    case "ld":
      return [
        { label: "Active Programs", value: "24", icon: BookOpen, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary" },
        { label: "Pending Provisions", value: "18", icon: ClipboardCheck, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent" },
        { label: "Org-Wide Gaps", value: "47", icon: TrendingUp, gradient: "from-destructive/15 to-destructive/5", iconColor: "text-destructive" },
        { label: "Budget Utilized", value: "62%", icon: Target, gradient: "from-info/15 to-info/5", iconColor: "text-info" },
      ];
    case "strategic_leader":
      return [
        { label: "Departments", value: "12", icon: Building2, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary" },
        { label: "Workforce Alignment", value: "68%", icon: Target, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent" },
        { label: "Critical Positions", value: "23", icon: TrendingUp, gradient: "from-destructive/15 to-destructive/5", iconColor: "text-destructive" },
        { label: "Total Budget", value: "2.4M", icon: FileText, gradient: "from-info/15 to-info/5", iconColor: "text-info" },
      ];
  }
};

const HomeStats = ({ role }: { role: UserRole }) => {
  const stats = getStats(role);

  return (
    <motion.div variants={item} className="grid grid-cols-4 gap-5">
      {stats.map((stat) => (
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
  );
};

export default HomeStats;
