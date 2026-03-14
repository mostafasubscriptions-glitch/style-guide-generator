import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Compass, BookOpen, MessageSquare, FileText, Users,
  ClipboardCheck, BarChart3, Building2, ArrowRight, Settings
} from "lucide-react";
import { activePlan } from "@/data/mockData";
import { UserRole } from "@/contexts/RoleContext";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ActionConfig {
  label: string;
  desc: string;
  icon: typeof Compass;
  path: string;
  gradient: string;
}

const getActions = (role: UserRole): ActionConfig[] => {
  switch (role) {
    case "employee":
      return [
        { label: "CDP Wizard", desc: "Create your development plan", icon: Compass, path: "/wizard", gradient: "from-primary to-primary-dark" },
        { label: "Browse Catalogue", desc: "Explore certifications & courses", icon: BookOpen, path: "/catalogue", gradient: "from-info to-[hsl(213,93%,45%)]" },
        { label: "Ask Daleel", desc: "AI career advisor", icon: MessageSquare, path: "#", gradient: "from-accent to-[hsl(43,86%,36%)]" },
        { label: "My Dashboard", desc: activePlan.planCode, icon: FileText, path: "/dashboard", gradient: "from-success to-[hsl(152,61%,27%)]" },
      ];
    case "manager":
      return [
        { label: "My Team", desc: "View direct reports & CDPs", icon: Users, path: "/manager", gradient: "from-primary to-primary-dark" },
        { label: "Approve CDPs", desc: "5 pending approvals", icon: ClipboardCheck, path: "/manager", gradient: "from-accent to-[hsl(43,86%,36%)]" },
        { label: "Team Analytics", desc: "Competency & progress insights", icon: BarChart3, path: "/manager", gradient: "from-info to-[hsl(213,93%,45%)]" },
        { label: "Ask Daleel", desc: "AI advisor for managers", icon: MessageSquare, path: "#", gradient: "from-success to-[hsl(152,61%,27%)]" },
      ];
    case "ld":
      return [
        { label: "L&D Dashboard", desc: "Organization-wide analytics", icon: BarChart3, path: "/ld", gradient: "from-primary to-primary-dark" },
        { label: "Provision Training", desc: "Schedule & assign programs", icon: BookOpen, path: "/ld/provision", gradient: "from-info to-[hsl(213,93%,45%)]" },
        { label: "Manage Catalogue", desc: "Curate certifications & courses", icon: Settings, path: "/catalogue", gradient: "from-accent to-[hsl(43,86%,36%)]" },
        { label: "Ask Daleel", desc: "AI-powered L&D insights", icon: MessageSquare, path: "#", gradient: "from-success to-[hsl(152,61%,27%)]" },
      ];
    case "strategic_leader":
      return [
        { label: "Strategic Dashboard", desc: "Workforce alignment overview", icon: Building2, path: "/strategic", gradient: "from-primary to-primary-dark" },
        { label: "Org Analytics", desc: "Cross-department insights", icon: BarChart3, path: "/strategic", gradient: "from-info to-[hsl(213,93%,45%)]" },
        { label: "Talent Pipeline", desc: "Succession & readiness", icon: Users, path: "/strategic", gradient: "from-accent to-[hsl(43,86%,36%)]" },
        { label: "Ask Daleel", desc: "AI strategic advisor", icon: MessageSquare, path: "#", gradient: "from-success to-[hsl(152,61%,27%)]" },
      ];
  }
};

const HomeQuickActions = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const actions = getActions(role);

  return (
    <motion.div variants={item} className="grid grid-cols-4 gap-5">
      {actions.map((action) => (
        <motion.div key={action.label} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
  );
};

export default HomeQuickActions;
