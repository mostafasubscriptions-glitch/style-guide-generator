import SectionHeader from "./SectionHeader";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

const alerts = [
  {
    type: "Success",
    icon: CheckCircle2,
    bg: "bg-success/10",
    border: "border-success/30",
    iconColor: "text-success",
    title: "Plan Approved",
    message: "Your career development plan has been approved by your manager.",
  },
  {
    type: "Warning",
    icon: AlertTriangle,
    bg: "bg-warning/10",
    border: "border-warning/30",
    iconColor: "text-warning",
    title: "Certification Expiring",
    message: "Your PMP certification expires in 30 days. Renew to maintain your status.",
  },
  {
    type: "Error",
    icon: XCircle,
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    iconColor: "text-destructive",
    title: "Submission Failed",
    message: "Unable to submit your plan. Please check your connection and try again.",
  },
  {
    type: "Info",
    icon: Info,
    bg: "bg-info/10",
    border: "border-info/30",
    iconColor: "text-info",
    title: "AI Recommendation",
    message: "Based on your gap analysis, we recommend starting with the Leadership Essentials course.",
  },
];

const statuses = [
  { label: "Draft", className: "bg-muted text-muted-foreground" },
  { label: "Pending Approval", className: "bg-warning/15 text-warning" },
  { label: "Approved", className: "bg-success/15 text-success" },
  { label: "In Progress", className: "bg-primary/15 text-primary" },
  { label: "Completed", className: "bg-accent/15 text-accent" },
  { label: "Rejected", className: "bg-destructive/15 text-destructive" },
];

const AlertsSection = () => (
  <section>
    <SectionHeader
      id="alerts"
      title="Alerts & Status"
      description="Alerts communicate important information. Status indicators show workflow state throughout the career development process."
    />

    <h3 className="text-lg font-semibold text-foreground mb-4">Alert Messages</h3>
    <div className="space-y-4 mb-8">
      {alerts.map((a) => (
        <div key={a.type} className={`flex items-start gap-3 p-4 rounded-lg border ${a.bg} ${a.border}`}>
          <a.icon className={`h-5 w-5 mt-0.5 shrink-0 ${a.iconColor}`} />
          <div>
            <p className="text-sm font-semibold text-foreground">{a.title}</p>
            <p className="text-sm text-muted-foreground">{a.message}</p>
          </div>
        </div>
      ))}
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Plan Status Indicators</h3>
    <div className="border border-border rounded-lg p-6 bg-surface-elevated">
      <div className="flex flex-wrap gap-3">
        {statuses.map((s) => (
          <span key={s.label} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${s.className}`}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default AlertsSection;
