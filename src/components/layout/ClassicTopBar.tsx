import { Bell, Search, MessageSquare, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/contexts/RoleContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Shield, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserRole } from "@/contexts/RoleContext";

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

interface Props {
  onToggleChat: () => void;
  chatOpen: boolean;
  onToggleNotifications: () => void;
  notificationsOpen: boolean;
}

const ClassicTopBar = ({ onToggleChat, chatOpen, onToggleNotifications, notificationsOpen }: Props) => {
  const { role, setRole, roleName } = useRole();
  const { theme, toggleTheme } = useTheme();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search catalogue, certifications..."
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-9 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
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
                className="absolute top-full mt-2 right-0 w-52 bg-card border border-border rounded-xl shadow-lg p-2 z-50"
              >
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider px-3 py-1.5">Switch Role</p>
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setRoleMenuOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors",
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

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button
          variant={chatOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleChat}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Ask Daleel
        </Button>

        <Button variant="ghost" size="icon" className="relative" onClick={onToggleNotifications}>
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
            2
          </span>
        </Button>

        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">AA</span>
          </div>
          <span className="text-sm font-medium text-foreground hidden lg:block">Ahmed Al-Thani</span>
        </div>
      </div>

      {roleMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setRoleMenuOpen(false)} />
      )}
    </header>
  );
};

export default ClassicTopBar;
