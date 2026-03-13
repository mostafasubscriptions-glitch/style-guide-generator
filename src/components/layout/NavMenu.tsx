import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home, LayoutDashboard, Compass, BookOpen, HelpCircle,
  ChevronLeft, ChevronRight, Award, GraduationCap, Users,
  Settings, MessageSquare, PanelLeftClose, PanelLeft
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "CDP Wizard", path: "/wizard", icon: Compass },
  { label: "Catalogue", path: "/catalogue", icon: BookOpen },
  { label: "FAQ", path: "/faq", icon: HelpCircle },
];

const adminItems = [
  { label: "Positions", path: "/admin/positions", icon: Users },
  { label: "Certifications", path: "/admin/certifications", icon: Award },
  { label: "Training", path: "/admin/training", icon: GraduationCap },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const NavMenu = ({ collapsed, onToggle }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar flex flex-col z-30 sidebar-transition",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <span className="text-sidebar-primary-foreground font-bold text-sm">M</span>
        </div>
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-semibold text-sidebar-primary-foreground truncate">Mowasalat</p>
            <p className="text-[10px] text-sidebar-muted truncate">Career Portal</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Manager section */}
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-widest text-sidebar-muted px-3 pt-6 pb-1">Manager</p>
        )}
        <button
          onClick={() => navigate("/manager")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150",
            location.pathname === "/manager"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
          title={collapsed ? "Manager Dashboard" : undefined}
        >
          <Users className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Manager Dashboard</span>}
        </button>

        {/* Admin section */}
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-widest text-sidebar-muted px-3 pt-6 pb-1">Admin</p>
        )}
        {collapsed && <div className="h-4" />}
        {adminItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-xs font-semibold text-sidebar-accent-foreground">AA</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Ahmed Al-Thani</p>
              <p className="text-[10px] text-sidebar-muted truncate">G7 · Planning & Projects</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default NavMenu;
