import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X, Bell, Calendar, AlertTriangle, CheckCircle2, Users,
  Award, BookOpen, TrendingUp, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  category: "approval" | "deadline" | "milestone" | "learning" | "system";
  priority: "urgent" | "high" | "normal" | "low";
  unread: boolean;
}

const notifications: Notification[] = [
  { id: 1, title: "CDP Approval Required", description: "Sara Al-Sulaiti submitted CDP-2026-0031 for your review", time: "2 hours ago", category: "approval", priority: "urgent", unread: true },
  { id: 2, title: "PMP Exam in 5 Days", description: "Your PMP certification exam is scheduled for April 15, 2026", time: "Today", category: "deadline", priority: "urgent", unread: true },
  { id: 3, title: "Course Completed", description: "Leadership Essentials for Managers — Score: 92%", time: "2 days ago", category: "milestone", priority: "normal", unread: true },
  { id: 4, title: "New Training Available", description: "Strategic Planning Workshop (Q3 2026) — enrollment open", time: "3 days ago", category: "learning", priority: "normal", unread: false },
  { id: 5, title: "Mentorship Session", description: "Upcoming session with Fatima Al-Mansouri on March 19", time: "5 days ago", category: "deadline", priority: "high", unread: false },
  { id: 6, title: "Compliance Reminder", description: "Anti-Harassment Certification due by April 15, 2026", time: "1 week ago", category: "deadline", priority: "high", unread: false },
  { id: 7, title: "Team Readiness Improved", description: "Your team's average readiness increased to 64% (+3%)", time: "1 week ago", category: "milestone", priority: "low", unread: false },
  { id: 8, title: "Risk Management Foundations", description: "Course completed successfully — Certificate issued", time: "2 weeks ago", category: "milestone", priority: "normal", unread: false },
];

const categoryIcons: Record<string, React.ElementType> = {
  approval: Users,
  deadline: Calendar,
  milestone: CheckCircle2,
  learning: BookOpen,
  system: Bell,
};

const priorityStyles: Record<string, string> = {
  urgent: "bg-destructive/15 text-destructive",
  high: "bg-warning/15 text-warning",
  normal: "bg-info/15 text-info",
  low: "bg-muted text-muted-foreground",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ open, onClose }: Props) => {
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-[72px] w-[380px] max-h-[calc(100vh-90px)] z-50 backdrop-blur-xl bg-card/95 border border-border/50 rounded-2xl shadow-2xl shadow-black/15 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 shrink-0">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge className="bg-destructive/15 text-destructive text-[9px] h-5">{unreadCount} new</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-[10px] h-7 text-primary">
                  Mark all read
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto">
              {/* Urgent section */}
              {notifications.some(n => n.priority === "urgent" && n.unread) && (
                <div className="px-4 pt-3 pb-1">
                  <p className="text-[9px] text-destructive font-semibold uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Requires Attention
                  </p>
                </div>
              )}
              {notifications.filter(n => n.priority === "urgent" && n.unread).map(notif => (
                <NotificationItem key={notif.id} notif={notif} />
              ))}

              {/* Other unread */}
              {notifications.some(n => n.unread && n.priority !== "urgent") && (
                <div className="px-4 pt-3 pb-1">
                  <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">New</p>
                </div>
              )}
              {notifications.filter(n => n.unread && n.priority !== "urgent").map(notif => (
                <NotificationItem key={notif.id} notif={notif} />
              ))}

              {/* Earlier */}
              {notifications.some(n => !n.unread) && (
                <div className="px-4 pt-3 pb-1">
                  <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">Earlier</p>
                </div>
              )}
              {notifications.filter(n => !n.unread).map(notif => (
                <NotificationItem key={notif.id} notif={notif} />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const NotificationItem = ({ notif }: { notif: Notification }) => {
  const Icon = categoryIcons[notif.category] || Bell;
  return (
    <div className={cn(
      "px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer border-b border-border/20 last:border-0",
      notif.unread && "bg-primary/[0.03]"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
          notif.priority === "urgent" ? "bg-destructive/10" :
          notif.priority === "high" ? "bg-warning/10" :
          notif.category === "milestone" ? "bg-success/10" : "bg-info/10"
        )}>
          <Icon className={cn(
            "h-3.5 w-3.5",
            notif.priority === "urgent" ? "text-destructive" :
            notif.priority === "high" ? "text-warning" :
            notif.category === "milestone" ? "text-success" : "text-info"
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn("text-xs font-medium", notif.unread ? "text-foreground" : "text-muted-foreground")}>{notif.title}</p>
            {notif.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{notif.description}</p>
          <p className="text-[9px] text-muted-foreground/60 mt-1 flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" /> {notif.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
