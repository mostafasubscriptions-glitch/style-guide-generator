import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Shield, User, Users, BookOpen, ChevronRight, BarChart3, Sparkles, TrendingUp, Award, Globe } from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";
import loginHero from "@/assets/login-hero.jpg";
import loginPattern from "@/assets/login-pattern.jpg";

const roles: { value: UserRole; label: string; description: string; icon: React.ElementType; color: string; stat: string; statLabel: string }[] = [
  { value: "employee", label: "Employee", description: "Access your CDP, learning catalogue, and Daleel AI", icon: User, color: "from-primary to-primary-dark", stat: "847", statLabel: "Active employees" },
  { value: "manager", label: "Direct Manager", description: "Review team CDPs, approve training, and track progress", icon: Users, color: "from-accent to-accent/80", stat: "124", statLabel: "Team leads" },
  { value: "ld", label: "L&D Management", description: "Org-wide analytics, compliance, training programs", icon: BookOpen, color: "from-info to-info/80", stat: "312", statLabel: "Active CDPs" },
  { value: "strategic_leader", label: "Strategic Leader", description: "Workforce planning, KPIs, and strategic alignment", icon: BarChart3, color: "from-warning to-warning/80", stat: "42%", statLabel: "Qatarization" },
];

const highlights = [
  { icon: TrendingUp, text: "AI-powered career development paths" },
  { icon: Award, text: "89 certifications earned this year" },
  { icon: Globe, text: "Aligned with Qatar National Vision 2030" },
];

const V2LoginPage = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole>("employee");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleMicrosoftLogin = () => {
    setIsSigningIn(true);
    setRole(selectedRole);
    setTimeout(() => navigate("/"), 1200);
  };

  const selectedRoleData = roles.find(r => r.value === selectedRole)!;

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Hero panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Main hero image */}
        <img
          src={loginHero}
          alt="Qatar modern transportation infrastructure"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(214,36%,10%)]/90 via-[hsl(214,36%,10%)]/40 to-transparent" />
        {/* Pattern overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] opacity-20">
          <img src={loginPattern} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Top — Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/30 backdrop-blur-sm">
              <span className="text-primary-foreground font-bold text-base">M</span>
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground/95">Mowasalat</p>
              <p className="text-[10px] text-primary-foreground/60">Qatar's Integrated Transport</p>
            </div>
          </div>

          {/* Bottom — Text + highlights */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-primary-foreground/95 leading-tight mb-3"
            >
              Shape Your Career.<br />
              <span className="text-primary">Move Qatar Forward.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-sm text-primary-foreground/60 mb-8 max-w-md"
            >
              The Career Development Portal empowers Mowasalat employees with AI-driven growth pathways, certifications, and strategic workforce planning.
            </motion.p>

            {/* Highlights */}
            <div className="flex flex-col gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <h.icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-primary-foreground/70">{h.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-6 mt-8 pt-6 border-t border-primary-foreground/10"
            >
              {[
                { val: "847", label: "Employees" },
                { val: "312", label: "Active CDPs" },
                { val: "68%", label: "Completion Rate" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-lg font-bold text-primary">{s.val}</p>
                  <p className="text-[10px] text-primary-foreground/50">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT — Login form */}
      <div className="flex-1 flex items-center justify-center bg-v2-bg relative overflow-hidden">
        {/* Subtle ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-accent/6 rounded-full blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md mx-6"
        >
          {/* Mobile logo (hidden on lg) */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/25 mb-4">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-3xl shadow-2xl shadow-black/10 p-8">
            {/* Header */}
            <div className="mb-7">
              <h1 className="text-xl font-bold text-foreground">Welcome back</h1>
              <p className="text-xs text-muted-foreground mt-1">Sign in to your career development portal</p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Select your role</p>
              <div className="space-y-2">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.value;
                  return (
                    <motion.button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                        isSelected
                          ? "border-primary/40 bg-primary/5 shadow-sm"
                          : "border-border/50 hover:border-border hover:bg-muted/30"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br transition-all",
                        isSelected ? role.color : "from-muted to-muted"
                      )}>
                        <role.icon className={cn("h-4 w-4", isSelected ? "text-primary-foreground" : "text-muted-foreground")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium", isSelected ? "text-foreground" : "text-muted-foreground")}>{role.label}</p>
                        <p className="text-[10px] text-muted-foreground">{role.description}</p>
                      </div>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="flex flex-col items-end shrink-0"
                          >
                            <span className="text-xs font-bold text-primary">{role.stat}</span>
                            <span className="text-[8px] text-muted-foreground">{role.statLabel}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* AI insight for selected role */}
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 p-3 rounded-xl bg-primary/5 border border-primary/10"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-semibold text-primary">What you'll see</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {selectedRole === "employee" && "Your personalized dashboard with CDP progress, AI-recommended certifications via Daleel, and your competency radar."}
                {selectedRole === "manager" && "Team overview with readiness scores, pending CDP approvals, AI insights for each team member's development path."}
                {selectedRole === "ld" && "Organization-wide analytics, department readiness heatmap, compliance tracking, and the CDP Provisioning Playground."}
                {selectedRole === "strategic_leader" && "Qatarization metrics, succession pipeline, capability gap analysis, and strategic initiative tracking across all departments."}
              </p>
            </motion.div>

            {/* Microsoft Sign In */}
            <Button
              onClick={handleMicrosoftLogin}
              disabled={isSigningIn}
              className="w-full h-12 rounded-xl bg-[hsl(214,36%,16%)] hover:bg-[hsl(214,36%,22%)] text-primary-foreground gap-3 text-sm font-medium shadow-lg transition-all"
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
              {isSigningIn ? "Signing in..." : "Sign in with Microsoft Entra"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-[10px] text-muted-foreground uppercase">Demo Mode</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            {/* Role badge */}
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground mb-2">Signing in as</p>
              <Badge className={cn("text-xs px-3 py-1 gap-1.5",
                selectedRole === "employee" ? "bg-primary/10 text-primary" :
                selectedRole === "manager" ? "bg-accent/10 text-accent" :
                selectedRole === "ld" ? "bg-info/10 text-info" :
                "bg-warning/10 text-warning"
              )}>
                <Shield className="h-3 w-3" />
                {selectedRoleData.label}
              </Badge>
            </div>
          </div>

          <p className="text-center text-[10px] text-muted-foreground mt-4">
            © 2026 Mowasalat · Qatar's Integrated Transport Company
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default V2LoginPage;
