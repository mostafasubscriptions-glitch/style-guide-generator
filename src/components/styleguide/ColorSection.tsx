import SectionHeader from "./SectionHeader";

interface ColorSwatchProps {
  name: string;
  token: string;
  hex: string;
  usage: string;
  className: string;
  textClass?: string;
}

const ColorSwatch = ({ name, token, hex, usage, className, textClass = "text-primary-foreground" }: ColorSwatchProps) => (
  <div className="overflow-hidden rounded-lg border border-border">
    <div className={`h-24 flex items-end p-3 ${className}`}>
      <span className={`text-sm font-semibold ${textClass}`}>{name}</span>
    </div>
    <div className="p-3 space-y-1 bg-surface-elevated">
      <p className="text-xs font-mono text-muted-foreground">{token}</p>
      <p className="text-xs font-mono text-foreground">{hex}</p>
      <p className="text-xs text-muted-foreground">{usage}</p>
    </div>
  </div>
);

const ColorSection = () => (
  <section>
    <SectionHeader
      id="colors"
      title="Color Palette"
      description="Our color system is built on a purposeful, accessible palette. Every color has a specific role to maintain consistency and hierarchy across the platform."
    />

    <h3 className="text-lg font-semibold text-foreground mb-4">Primary Colors</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <ColorSwatch name="Primary Blue" token="--primary" hex="#0052CC" usage="CTAs, links, active states" className="bg-primary" />
      <ColorSwatch name="Accent Teal" token="--accent" hex="#00A383" usage="Secondary actions, highlights" className="bg-accent" />
      <ColorSwatch name="Foreground" token="--foreground" hex="#262626" usage="Body text, headings" className="bg-foreground" />
      <ColorSwatch name="Background" token="--background" hex="#FFFFFF" usage="Page background" className="bg-background border" textClass="text-foreground" />
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Semantic Colors</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <ColorSwatch name="Success" token="--success" hex="#1A9D5C" usage="Confirmations, approvals" className="bg-success" />
      <ColorSwatch name="Warning" token="--warning" hex="#F5A623" usage="Cautions, pending states" className="bg-warning" />
      <ColorSwatch name="Destructive" token="--destructive" hex="#D63B3B" usage="Errors, deletions" className="bg-destructive" />
      <ColorSwatch name="Info" token="--info" hex="#0052CC" usage="Informational callouts" className="bg-info" />
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Neutral & Surface Colors</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <ColorSwatch name="Surface" token="--surface" hex="#F4F5F7" usage="Card backgrounds, sections" className="bg-surface" textClass="text-foreground" />
      <ColorSwatch name="Muted" token="--muted" hex="#F4F5F7" usage="Disabled states, subtle fills" className="bg-muted" textClass="text-muted-foreground" />
      <ColorSwatch name="Border" token="--border" hex="#E4E7EB" usage="Dividers, outlines" className="bg-border" textClass="text-foreground" />
      <ColorSwatch name="Secondary" token="--secondary" hex="#F4F5F7" usage="Secondary buttons, tags" className="bg-secondary" textClass="text-secondary-foreground" />
    </div>

    <div className="mt-8 rounded-lg border border-border p-6 bg-surface">
      <h4 className="text-sm font-semibold text-foreground mb-2">✅ Color Usage Rules</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
        <li>Never use raw hex values in components — always reference design tokens</li>
        <li>Primary blue is reserved for interactive elements only</li>
        <li>Maintain minimum 4.5:1 contrast ratio for all text (WCAG AA)</li>
        <li>Use accent teal sparingly for emphasis, not as a primary action color</li>
      </ul>
    </div>
  </section>
);

export default ColorSection;
