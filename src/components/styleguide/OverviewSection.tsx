import SectionHeader from "./SectionHeader";

const OverviewSection = () => (
  <section>
    <SectionHeader
      id="overview"
      title="Brand Overview"
      description="The Mowasalat Career Development Platform (CDP) design system. A comprehensive guide to maintain visual consistency across the application."
    />

    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="rounded-lg border border-border p-6 bg-surface-elevated">
        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground font-bold text-lg">M</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Brand Identity</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Mowasalat (Karwa) — Qatar's national transport company. Our design reflects professionalism, trust, and forward-thinking innovation.
        </p>
      </div>

      <div className="rounded-lg border border-border p-6 bg-surface-elevated">
        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
          <span className="text-accent-foreground font-bold text-lg">D</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Design Principles</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Clean, spacious layouts. Purposeful color usage. Accessibility-first. Every pixel earns its place.
        </p>
      </div>

      <div className="rounded-lg border border-border p-6 bg-surface-elevated">
        <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center mb-4">
          <span className="text-background font-bold text-lg">T</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
        <p className="text-sm text-muted-foreground mt-2">
          .NET 10 Blazor · Fluent UI · Tailwind CSS · SQL Server · Azure OpenAI · Semantic Kernel
        </p>
      </div>
    </div>

    <div className="rounded-lg border border-border p-6 bg-primary/5">
      <h3 className="text-sm font-semibold text-foreground mb-3">Core Values</h3>
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: "Clarity", desc: "Every element communicates purpose" },
          { title: "Consistency", desc: "Tokens over ad-hoc styling" },
          { title: "Accessibility", desc: "WCAG AA minimum standard" },
          { title: "Performance", desc: "Fast, responsive experiences" },
        ].map((v) => (
          <div key={v.title}>
            <p className="text-sm font-semibold text-primary">{v.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OverviewSection;
