import SectionHeader from "./SectionHeader";
import {
  Home, User, Settings, Search, Bell, FileText, Award, BookOpen,
  TrendingUp, MessageSquare, Calendar, Download, Upload, ChevronRight,
  Plus, Trash2, Edit, Eye, Check, X, ArrowRight, BarChart3, Brain, Target
} from "lucide-react";

const iconGroups = [
  {
    title: "Navigation",
    icons: [
      { icon: Home, name: "Home" }, { icon: User, name: "User" },
      { icon: Settings, name: "Settings" }, { icon: Search, name: "Search" },
      { icon: Bell, name: "Bell" }, { icon: ChevronRight, name: "ChevronRight" },
    ],
  },
  {
    title: "CDP Features",
    icons: [
      { icon: FileText, name: "FileText" }, { icon: Award, name: "Award" },
      { icon: BookOpen, name: "BookOpen" }, { icon: TrendingUp, name: "TrendingUp" },
      { icon: MessageSquare, name: "MessageSquare" }, { icon: Brain, name: "Brain" },
      { icon: Target, name: "Target" }, { icon: BarChart3, name: "BarChart3" },
      { icon: Calendar, name: "Calendar" },
    ],
  },
  {
    title: "Actions",
    icons: [
      { icon: Plus, name: "Plus" }, { icon: Edit, name: "Edit" },
      { icon: Trash2, name: "Trash2" }, { icon: Download, name: "Download" },
      { icon: Upload, name: "Upload" }, { icon: Eye, name: "Eye" },
      { icon: Check, name: "Check" }, { icon: X, name: "X" },
      { icon: ArrowRight, name: "ArrowRight" },
    ],
  },
];

const IconsSection = () => (
  <section>
    <SectionHeader
      id="icons"
      title="Iconography"
      description="We use Lucide icons — a clean, consistent icon set. Icons are always 16px (sm), 20px (md), or 24px (lg) and inherit their parent's text color."
    />

    {iconGroups.map((group) => (
      <div key={group.title} className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">{group.title}</h3>
        <div className="grid grid-cols-6 gap-3">
          {group.icons.map(({ icon: Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-surface-elevated hover:bg-secondary transition-colors">
              <Icon className="h-6 w-6 text-foreground" />
              <span className="text-xs font-mono text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    ))}

    <div className="border border-border rounded-lg p-6 bg-surface-elevated mb-6">
      <h4 className="text-sm font-semibold text-foreground mb-3">Size Reference</h4>
      <div className="flex items-end gap-8">
        <div className="flex flex-col items-center gap-2">
          <Home className="h-4 w-4 text-foreground" />
          <span className="text-xs font-mono text-muted-foreground">16px (sm)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Home className="h-5 w-5 text-foreground" />
          <span className="text-xs font-mono text-muted-foreground">20px (md)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Home className="h-6 w-6 text-foreground" />
          <span className="text-xs font-mono text-muted-foreground">24px (lg)</span>
        </div>
      </div>
    </div>
  </section>
);

export default IconsSection;
