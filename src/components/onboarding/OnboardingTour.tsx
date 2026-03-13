import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles, ArrowRight, LayoutDashboard, BookOpen, Compass,
  Users, BarChart3, MessageSquare, X, Landmark, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole, UserRole } from "@/contexts/RoleContext";

interface TourStep {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const tourSteps: Record<UserRole, TourStep[]> = {
  employee: [
    { title: "Welcome to Your Career Portal", description: "This is your hub for career development. Track your progress, explore certifications, and plan your growth.", icon: Sparkles, color: "text-primary" },
    { title: "Your Dashboard", description: "View your CDP progress, competency gaps, and upcoming deadlines all in one place.", icon: LayoutDashboard, color: "text-info" },
    { title: "CDP Wizard", description: "Build your Career Development Plan step-by-step with AI-powered recommendations and gap analysis.", icon: Compass, color: "text-accent" },
    { title: "Learning Catalogue", description: "Browse certifications and training courses. Filter by provider, level, and competency alignment.", icon: BookOpen, color: "text-success" },
    { title: "Ask Daleel", description: "Your AI career advisor — ask about career paths, certifications, or get personalized development guidance.", icon: MessageSquare, color: "text-primary" },
  ],
  manager: [
    { title: "Welcome, Manager", description: "Manage your team's development, approve plans, and leverage AI insights to guide career growth.", icon: Sparkles, color: "text-accent" },
    { title: "Team Overview", description: "See readiness scores, learning progress, and CDP status for all your direct reports at a glance.", icon: Users, color: "text-primary" },
    { title: "Approvals", description: "Review and approve CDP plans and training requests. Each comes with AI confidence scores.", icon: CheckCircle2, color: "text-success" },
    { title: "AI Team Insights", description: "Daleel provides personalized recommendations for each team member based on their competency profile.", icon: Sparkles, color: "text-info" },
  ],
  ld: [
    { title: "L&D Management Hub", description: "Your command center for organizational learning analytics, compliance, and workforce development.", icon: Sparkles, color: "text-info" },
    { title: "Department Analytics", description: "Track readiness scores, budget utilization, and CDP adoption across all departments.", icon: BarChart3, color: "text-primary" },
    { title: "CDP Provisioning", description: "Build and assign career development plans for any employee with AI-assisted recommendations.", icon: Compass, color: "text-accent" },
    { title: "Compliance Tracking", description: "Monitor mandatory certifications and training deadlines with automated gap alerts.", icon: CheckCircle2, color: "text-warning" },
  ],
  strategic_leader: [
    { title: "Strategic Dashboard", description: "High-level workforce KPIs aligned with Qatar National Vision 2030 and organizational strategy.", icon: Sparkles, color: "text-warning" },
    { title: "Qatarization Metrics", description: "Track nationalization targets by department with gap analysis and trend indicators.", icon: Landmark, color: "text-primary" },
    { title: "Succession Pipeline", description: "Monitor critical role coverage, candidate readiness, and talent pipeline health.", icon: Users, color: "text-accent" },
    { title: "Capability Gaps", description: "Organization-wide capability analysis with AI-powered strategic recommendations.", icon: BarChart3, color: "text-info" },
  ],
};

const TOUR_KEY = "cdp_onboarding_seen";

const OnboardingTour = () => {
  const { role } = useRole();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  const steps = tourSteps[role];

  useEffect(() => {
    const seen = localStorage.getItem(`${TOUR_KEY}_${role}`);
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, [role]);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem(`${TOUR_KEY}_${role}`, "true");
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const current = steps[step];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
          >
            <div className="bg-card border border-border/50 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
              {/* Gradient header */}
              <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-info/10 flex items-center justify-center relative">
                <motion.div
                  key={step}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <current.icon className={cn("h-12 w-12", current.color)} />
                </motion.div>
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-base font-bold text-foreground mb-2">{current.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
                </motion.div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mt-6 mb-4">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === step ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button onClick={handleClose} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Skip tour
                  </button>
                  <Button onClick={handleNext} size="sm" className="gap-2 text-xs rounded-xl">
                    {step < steps.length - 1 ? (
                      <>Next <ArrowRight className="h-3 w-3" /></>
                    ) : (
                      <>Get Started <CheckCircle2 className="h-3 w-3" /></>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingTour;
