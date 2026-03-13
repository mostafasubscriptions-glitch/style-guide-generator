import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, BookOpen, Users, BarChart3, Sparkles, Building2 } from "lucide-react";
import { currentEmployee, activePlan } from "@/data/mockData";
import { UserRole } from "@/contexts/RoleContext";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const heroConfig: Record<UserRole, {
  greeting: string;
  subtitle: string;
  statLabel: string;
  statValue: string;
  statPercent: number;
  actions: { label: string; icon: typeof Compass; path: string; primary?: boolean }[];
}> = {
  employee: {
    greeting: "Good morning,",
    subtitle: `${currentEmployee.position.title} · ${currentEmployee.department.name} · Grade ${currentEmployee.position.grade}`,
    statLabel: "Career Readiness",
    statValue: `${activePlan.completionPercent}%`,
    statPercent: activePlan.completionPercent,
    actions: [
      { label: "Start CDP Wizard", icon: Compass, path: "/v2/wizard", primary: true },
      { label: "Browse Catalogue", icon: BookOpen, path: "/v2/catalogue" },
    ],
  },
  manager: {
    greeting: "Welcome back,",
    subtitle: `Head of Projects · ${currentEmployee.department.name}`,
    statLabel: "Team Readiness",
    statValue: "72%",
    statPercent: 72,
    actions: [
      { label: "Review Team", icon: Users, path: "/v2/manager", primary: true },
      { label: "Pending Approvals", icon: BarChart3, path: "/v2/manager" },
    ],
  },
  ld: {
    greeting: "Good morning,",
    subtitle: "L&D Management · Corporate Services",
    statLabel: "Org Compliance",
    statValue: "84%",
    statPercent: 84,
    actions: [
      { label: "L&D Dashboard", icon: BarChart3, path: "/v2/ld", primary: true },
      { label: "Provision Training", icon: BookOpen, path: "/v2/ld/provision" },
    ],
  },
  strategic_leader: {
    greeting: "Good morning,",
    subtitle: "Strategic Leadership · Executive Office",
    statLabel: "Workforce Alignment",
    statValue: "68%",
    statPercent: 68,
    actions: [
      { label: "Strategic Dashboard", icon: Building2, path: "/v2/strategic", primary: true },
      { label: "Org Analytics", icon: BarChart3, path: "/v2/strategic" },
    ],
  },
};

const HomeHero = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const config = heroConfig[role];

  return (
    <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[hsl(214,36%,16%)] p-10 text-primary-foreground">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[80px] -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-info/15 rounded-full blur-[60px]" />
      <div className="relative flex items-center justify-between">
        <div>
          <motion.p variants={item} className="text-sm opacity-80 flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> {config.greeting}
          </motion.p>
          <motion.h1 variants={item} className="text-3xl font-bold mt-2">{currentEmployee.fullName}</motion.h1>
          <motion.p variants={item} className="text-base opacity-80 mt-2">{config.subtitle}</motion.p>
          <motion.div variants={item} className="flex gap-3 mt-6">
            {config.actions.map((action) => (
              <Button
                key={action.label}
                variant={action.primary ? "default" : "ghost"}
                onClick={() => navigate(action.path)}
                className={action.primary
                  ? "bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground backdrop-blur-sm rounded-xl gap-2 border border-primary-foreground/10"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2"
                }
              >
                <action.icon className="h-4 w-4" /> {action.label}
              </Button>
            ))}
          </motion.div>
        </div>
        <motion.div variants={item} className="text-center backdrop-blur-sm bg-primary-foreground/10 rounded-2xl p-6 border border-primary-foreground/10">
          <p className="text-5xl font-bold">{config.statValue}</p>
          <p className="text-sm opacity-80 mt-1">{config.statLabel}</p>
          <div className="w-32 h-2 bg-primary-foreground/20 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-primary-foreground rounded-full" style={{ width: `${config.statPercent}%` }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeHero;
