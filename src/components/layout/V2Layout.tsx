import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, LayoutDashboard, Compass, BookOpen, HelpCircle,
  Users, Award, GraduationCap, MessageSquare, Bell, Search,
  ChevronDown, User, Settings, LogOut
} from "lucide-react";
import DaleelChat from "@/components/chat/DaleelChat";

const navItems = [
  { label: "Home", path: "/v2", icon: Home },
  { label: "Dashboard", path: "/v2/dashboard", icon: LayoutDashboard },
  { label: "CDP Wizard", path: "/v2/wizard", icon: Compass },
  { label: "Catalogue", path: "/v2/catalogue", icon: BookOpen },
  { label: "FAQ", path: "/v2/faq", icon: HelpCircle },
];

const adminItems = [
  { label: "Positions", path: "/admin/positions", icon: Users },
  { label: "Certifications", path: "/admin/certifications", icon: Award },
  { label: "Training", path: "/admin/training", icon: GraduationCap },
];

const V2Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-v2-bg">
      {/* Gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-info/5 rounded-full blur-[80px]" />
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-card/70 border-b border-border/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center h-16 gap-8">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer shrink-0"
              onClick={() => navigate("/v2")}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">Mowasalat</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Career Portal</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-1 flex-1">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/v2" && location.pathname.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Admin Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  <Settings className="h-4 w-4" />
                  Admin
                  <ChevronDown className={cn("h-3 w-3 transition-transform", adminOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {adminOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 left-0 w-56 backdrop-blur-xl bg-card/90 border border-border/50 rounded-2xl shadow-xl shadow-black/10 p-2 z-50"
                    >
                      {adminItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setAdminOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-border/50 my-1" />
                      <button
                        onClick={() => { navigate("/manager"); setAdminOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <Users className="h-4 w-4 text-muted-foreground" />
                        Manager Dashboard
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search..."
                  className="w-48 h-9 pl-9 pr-3 rounded-xl bg-muted/50 border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all focus:w-64"
                />
              </div>

              {/* Daleel */}
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className={cn(
                  "flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-medium transition-all",
                  chatOpen
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-gradient-to-r from-primary/10 to-accent/10 text-primary hover:from-primary/20 hover:to-accent/20"
                )}
              >
                <MessageSquare className="h-4 w-4" />
                Daleel
              </button>

              {/* Notifications */}
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 h-9 px-2 rounded-xl hover:bg-muted/50 transition-colors"
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
                          onClick={() => { navigate("/v2/profile"); setProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <User className="h-4 w-4 text-muted-foreground" /> Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors">
                          <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                        </button>
                        <button
                          onClick={() => { navigate("/v2/login"); setProfileOpen(false); }}
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
      </header>

      {/* Content — chat no longer affects layout */}
      <div className="relative z-10">
        <main className="max-w-[1440px] mx-auto">
          <Outlet />
        </main>
        <DaleelChat open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* Click outside to close dropdowns */}
      {(adminOpen || profileOpen) && (
        <div className="fixed inset-0 z-30" onClick={() => { setAdminOpen(false); setProfileOpen(false); }} />
      )}
    </div>
  );
};

export default V2Layout;
