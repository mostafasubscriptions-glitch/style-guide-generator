import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, LayoutDashboard, Compass, BookOpen, HelpCircle,
  Users, Award, GraduationCap, MessageSquare, Bell, Search,
  ChevronDown, User, Settings, LogOut, BarChart3, Shield, Landmark, Moon, Sun
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DaleelChat from "@/components/chat/DaleelChat";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import OnboardingTour from "@/components/onboarding/OnboardingTour";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { useTheme } from "@/contexts/ThemeContext";

const roleColors: Record<UserRole, string> = {
  employee: "bg-primary/15 text-primary",
  manager: "bg-accent/15 text-accent",
  ld: "bg-info/15 text-info",
  strategic_leader: "bg-warning/15 text-warning",
};

const roleLabels: Record<UserRole, string> = {
  employee: "Employee",
  manager: "Direct Manager",
  ld: "L&D Management",
  strategic_leader: "Strategic Leader",
};

const ModernLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, roleName } = useRole();
  const { theme, toggleTheme, setLayoutTheme } = useTheme();
  const [chatOpen, setChatOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: Home, color: "from-primary to-primary-dark", roles: ["employee", "manager", "ld", "strategic_leader"] },
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, color: "from-info to-primary", roles: ["employee"] },
    { label: "CDP Wizard", path: "/wizard", icon: Compass, color: "from-purple to-info", roles: ["employee"] },
    { label: "Catalogue", path: "/catalogue", icon: BookOpen, color: "from-accent to-warning", roles: ["employee", "manager", "ld"] },
    { label: "FAQ", path: "/faq", icon: HelpCircle, color: "from-success to-primary", roles: ["employee", "manager", "ld", "strategic_leader"] },
    { label: "My Team", path: "/manager", icon: Users, color: "from-accent to-primary", roles: ["manager"] },
    { label: "L&D Dashboard", path: "/ld", icon: BarChart3, color: "from-info to-purple", roles: ["ld"] },
    { label: "Provision", path: "/ld/provision", icon: Compass, color: "from-purple to-accent", roles: ["ld"] },
    { label: "Strategic", path: "/strategic", icon: Landmark, color: "from-warning to-accent", roles: ["strategic_leader"] },
  ];

  const adminItems = [
    { label: "Positions", path: "/admin/positions", icon: Users },
    { label: "Certifications", path: "/admin/certifications", icon: Award },
    { label: "Training", path: "/admin/training", icon: GraduationCap },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="min-h-screen bg-v2-bg">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-info/5 rounded-full blur-[80px]" />
      </div>

      <OnboardingTour />

      {/* Top Navigation — Two Levels */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-card/70 border-b border-border/50">
        {/* Level 1: Brand + Utility bar */}
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center h-14 gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate("/")}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">Mowasalat</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Career Portal</p>
              </div>
            </div>

            {/* Search — expands in center */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search catalogue, certifications, courses..."
                  className="w-full h-9 pl-9 pr-3 rounded-xl bg-muted/50 border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* Right utilities */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg transition-colors hover:bg-muted/50"
                >
                  <Badge className={cn("text-[9px] h-5 gap-1", roleColors[role])}>
                    <Shield className="h-2.5 w-2.5" />
                    {roleName}
                  </Badge>
                  <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", roleMenuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {roleMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-52 backdrop-blur-xl bg-card/90 border border-border/50 rounded-2xl shadow-xl shadow-black/10 p-2 z-50"
                    >
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider px-3 py-1.5">Switch Role</p>
                      {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => { setRole(r); setRoleMenuOpen(false); navigate("/"); }}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors",
                            role === r ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted/50"
                          )}
                        >
                          <div className={cn("w-2 h-2 rounded-full", role === r ? "bg-primary" : "bg-muted-foreground/30")} />
                          {roleLabels[r]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-border/50 mx-1" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors"
                title={theme === "dark" ? "Light mode" : "Dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Layout Toggle */}
              <button
                onClick={() => setLayoutTheme("classic")}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors group"
                title="Switch to Sidebar Navigation"
              >
                <LayoutDashboard className="h-4 w-4 group-hover:text-primary transition-colors" />
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-border/50 mx-1" />

              {/* Daleel */}
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className={cn(
                  "flex items-center gap-2 h-8 px-3 rounded-lg text-xs font-medium transition-all",
                  chatOpen
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-gradient-to-r from-primary/10 to-accent/10 text-primary hover:from-primary/20 hover:to-accent/20"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Daleel
              </button>

              {/* Notifications */}
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={cn(
                  "relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  notificationsOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 h-8 px-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary-foreground">AA</span>
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-64 backdrop-blur-xl bg-card/90 border border-border/50 rounded-2xl shadow-xl shadow-black/10 p-3 z-50"
                    >
                      <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-xs font-bold text-primary-foreground">AA</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Ahmed Al-Thani</p>
                          <p className="text-[11px] text-muted-foreground">G7 · Planning & Projects</p>
                        </div>
                      </div>
                      <div className="pt-2 space-y-1">
                        <button
                          onClick={() => { navigate("/profile"); setProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <User className="h-4 w-4 text-muted-foreground" /> Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors">
                          <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                        </button>
                        <button
                          onClick={() => { navigate("/login"); setProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Level 2: Vertical icon tile navigation */}
        <div className="border-t border-border/30">
          <div className="max-w-[1440px] mx-auto px-6 py-3">
            <div className="flex items-stretch gap-2">
              {filteredNav.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl text-xs font-medium transition-all duration-200 min-w-0 group",
                      isActive
                        ? "bg-card shadow-md border border-border/50"
                        : "hover:bg-card/60 hover:shadow-sm"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                      isActive
                        ? `bg-gradient-to-br ${item.color} shadow-lg`
                        : "bg-muted/60 group-hover:bg-muted"
                    )}>
                      <item.icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                    </div>
                    <span className={cn(
                      "truncate max-w-full transition-colors",
                      isActive ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-primary"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Admin Dropdown */}
              {(role === "ld" || role === "strategic_leader") && (
                <>
                  <div className="w-px bg-border/40 my-2" />
                  <div className="relative">
                    <motion.button
                      onClick={() => setAdminOpen(!adminOpen)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex flex-col items-center gap-1.5 py-3 px-5 rounded-2xl text-xs font-medium transition-all duration-200 group",
                        location.pathname.startsWith("/admin")
                          ? "bg-card shadow-md border border-border/50"
                          : "hover:bg-card/60 hover:shadow-sm"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                        location.pathname.startsWith("/admin")
                          ? "bg-gradient-to-br from-destructive/80 to-warning shadow-lg"
                          : "bg-muted/60 group-hover:bg-muted"
                      )}>
                        <Settings className={cn(
                          "h-5 w-5 transition-colors",
                          location.pathname.startsWith("/admin") ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )} />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={cn(
                          "transition-colors",
                          location.pathname.startsWith("/admin") ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"
                        )}>Admin</span>
                        <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", adminOpen && "rotate-180")} />
                      </div>
                    </motion.button>
                    <AnimatePresence>
                      {adminOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-2 right-0 w-52 bg-card border border-border/50 rounded-xl shadow-lg p-1.5 z-50"
                        >
                          {adminItems.map((item) => (
                            <button
                              key={item.path}
                              onClick={() => { navigate(item.path); setAdminOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground" />
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10">
        <main className="max-w-[1440px] mx-auto">
          <Outlet />
        </main>
        <DaleelChat open={chatOpen} onClose={() => setChatOpen(false)} />
        <NotificationsPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      </div>

      {/* Click outside to close dropdowns */}
      {(adminOpen || profileOpen || roleMenuOpen) && (
        <div className="fixed inset-0 z-30" onClick={() => { setAdminOpen(false); setProfileOpen(false); setRoleMenuOpen(false); }} />
      )}
    </div>
  );
};

export default ModernLayout;
