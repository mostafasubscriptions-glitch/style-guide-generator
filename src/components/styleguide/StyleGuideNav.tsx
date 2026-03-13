import { cn } from "@/lib/utils";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Color Palette" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing & Grid" },
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Form Elements" },
  { id: "cards", label: "Cards & Surfaces" },
  { id: "alerts", label: "Alerts & Status" },
  { id: "icons", label: "Iconography" },
  { id: "motion", label: "Motion" },
  { id: "patterns", label: "Usage Patterns" },
];

interface Props {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const StyleGuideNav = ({ activeSection, onSectionChange }: Props) => {
  return (
    <nav className="sticky top-0 w-64 shrink-0 border-r border-border bg-surface-elevated p-6 h-screen overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Style Guide
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Mowasalat CDP</p>
      </div>
      <ul className="space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onSectionChange(s.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150",
                activeSection === s.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StyleGuideNav;
