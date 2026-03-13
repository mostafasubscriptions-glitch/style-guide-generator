import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Shield, User, Users, BookOpen, ChevronRight, BarChart3 } from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";

const roles: { value: UserRole; label: string; description: string; icon: React.ElementType; color: string }[] = [
  { value: "employee", label: "Employee", description: "Access your CDP, learning catalogue, and Daleel AI", icon: User, color: "from-primary to-primary-dark" },
  { value: "manager", label: "Direct Manager", description: "Review team CDPs, approve training, and track progress", icon: Users, color: "from-accent to-accent/80" },
  { value: "ld", label: "L&D Management", description: "Org-wide analytics, compliance, training programs", icon: BookOpen, color: "from-info to-info/80" },
  { value: "strategic_leader", label: "Strategic Leader", description: "Workforce planning, KPIs, and strategic alignment", icon: BarChart3, color: "from-warning to-warning/80" },
];

const V2LoginPage = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole>("employee");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleMicrosoftLogin = () => {
    setIsSigningIn(true);
    setRole(selectedRole);
    setTimeout(() => {
      navigate("/v2");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-v2-bg flex items-center justify-center relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-info/6 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-3xl shadow-2xl shadow-black/10 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/25 mb-4">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Mowasalat Career Portal</h1>
            <p className="text-xs text-muted-foreground mt-1">Sign in to access your career development tools</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3 text-center">Select your role</p>
            <div className="space-y-2">
              {roles.map((role) => {
                const isSelected = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    onClick={() => setSelectedRole(role.value)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                      isSelected
                        ? "border-primary/40 bg-primary/5 shadow-sm"
                        : "border-border/50 hover:border-border hover:bg-muted/30"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br",
                      isSelected ? role.color : "from-muted to-muted"
                    )}>
                      <role.icon className={cn("h-4 w-4", isSelected ? "text-primary-foreground" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium", isSelected ? "text-foreground" : "text-muted-foreground")}>{role.label}</p>
                      <p className="text-[10px] text-muted-foreground">{role.description}</p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
                      >
                        <ChevronRight className="h-3 w-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Microsoft Sign In */}
          <Button
            onClick={handleMicrosoftLogin}
            disabled={isSigningIn}
            className="w-full h-11 rounded-xl bg-[hsl(213,33%,15%)] hover:bg-[hsl(213,33%,20%)] text-primary-foreground gap-3 text-sm font-medium shadow-lg"
          >
            {isSigningIn ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <svg viewBox="0 0 21 21" className="w-5 h-5" fill="none">
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
            )}
            {isSigningIn ? "Signing in..." : "Sign in with Microsoft"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-[10px] text-muted-foreground uppercase">Demo Mode</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          {/* Role badge info */}
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground mb-2">You'll sign in as</p>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs px-3 py-1">
              <Shield className="h-3 w-3 mr-1.5" />
              {roles.find(r => r.value === selectedRole)?.label}
            </Badge>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-4">
          © 2026 Mowasalat · Qatar's Integrated Transport Company
        </p>
      </motion.div>
    </div>
  );
};

export default V2LoginPage;
