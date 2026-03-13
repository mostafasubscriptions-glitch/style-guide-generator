import SectionHeader from "./SectionHeader";

const spacingScale = [
  { name: "4px", token: "p-1", size: 4 },
  { name: "8px", token: "p-2", size: 8 },
  { name: "12px", token: "p-3", size: 12 },
  { name: "16px", token: "p-4", size: 16 },
  { name: "24px", token: "p-6", size: 24 },
  { name: "32px", token: "p-8", size: 32 },
  { name: "48px", token: "p-12", size: 48 },
  { name: "64px", token: "p-16", size: 64 },
];

const SpacingSection = () => (
  <section>
    <SectionHeader
      id="spacing"
      title="Spacing & Grid"
      description="All spacing follows a strict 4px / 8px base scale. Consistency in spacing creates visual rhythm and professional polish."
    />

    <h3 className="text-lg font-semibold text-foreground mb-4">Spacing Scale</h3>
    <div className="space-y-3 mb-8">
      {spacingScale.map((s) => (
        <div key={s.name} className="flex items-center gap-4">
          <span className="w-16 text-sm font-mono text-muted-foreground">{s.name}</span>
          <span className="w-16 text-sm font-mono text-foreground">{s.token}</span>
          <div className="bg-primary rounded" style={{ width: s.size * 3, height: 16 }} />
        </div>
      ))}
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Grid System</h3>
    <div className="border border-border rounded-lg p-6 bg-surface mb-4">
      <div className="grid grid-cols-12 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-12 bg-primary/15 rounded flex items-center justify-center">
            <span className="text-xs font-mono text-primary">{i + 1}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">12-column grid · 2rem (32px) container padding · max-width 1400px</p>
    </div>

    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="border border-border rounded-lg p-4 bg-surface">
        <div className="grid grid-cols-12 gap-1 mb-3">
          <div className="col-span-12 h-6 bg-primary/20 rounded" />
        </div>
        <p className="text-xs font-mono text-muted-foreground">Full width (12 cols)</p>
      </div>
      <div className="border border-border rounded-lg p-4 bg-surface">
        <div className="grid grid-cols-12 gap-1 mb-3">
          <div className="col-span-6 h-6 bg-primary/20 rounded" />
          <div className="col-span-6 h-6 bg-primary/20 rounded" />
        </div>
        <p className="text-xs font-mono text-muted-foreground">Two columns (6+6)</p>
      </div>
      <div className="border border-border rounded-lg p-4 bg-surface">
        <div className="grid grid-cols-12 gap-1 mb-3">
          <div className="col-span-4 h-6 bg-primary/20 rounded" />
          <div className="col-span-4 h-6 bg-primary/20 rounded" />
          <div className="col-span-4 h-6 bg-primary/20 rounded" />
        </div>
        <p className="text-xs font-mono text-muted-foreground">Three columns (4+4+4)</p>
      </div>
    </div>

    <div className="rounded-lg border border-border p-6 bg-surface">
      <h4 className="text-sm font-semibold text-foreground mb-2">✅ Spacing Rules</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
        <li>Always use multiples of 4px for spacing</li>
        <li>Section padding: 48px–64px vertical, 32px horizontal</li>
        <li>Card internal padding: 24px</li>
        <li>Element gaps: 8px (tight), 16px (standard), 24px (relaxed)</li>
      </ul>
    </div>
  </section>
);

export default SpacingSection;
