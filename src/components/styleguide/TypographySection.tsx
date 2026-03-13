import SectionHeader from "./SectionHeader";

const TypographySection = () => (
  <section>
    <SectionHeader
      id="typography"
      title="Typography"
      description="Inter is our sole typeface — clean, legible, and highly versatile. We use weight and size to establish hierarchy, not typeface variety."
    />

    <div className="space-y-8 mb-8">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-5xl font-bold text-foreground">Display</p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-5xl</span><span>font-bold</span><span>48px / 700</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-4xl font-bold text-foreground">Heading 1</p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-4xl</span><span>font-bold</span><span>36px / 700</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-2xl font-semibold text-foreground">Heading 2</p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-2xl</span><span>font-semibold</span><span>24px / 600</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-xl font-semibold text-foreground">Heading 3</p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-xl</span><span>font-semibold</span><span>20px / 600</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-base text-foreground">
            Body text — The quick brown fox jumps over the lazy dog. Career development plans enable employees to achieve their professional goals through structured learning and mentorship programs.
          </p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-base</span><span>font-normal</span><span>16px / 400</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-sm text-muted-foreground">
            Small / Caption — Secondary information, labels, and helper text. Use muted-foreground for reduced emphasis.
          </p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-sm</span><span>text-muted-foreground</span><span>14px / 400</span>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-6 bg-surface-elevated">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Overline / Label
          </p>
        </div>
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-6 text-xs text-muted-foreground font-mono">
          <span>text-xs uppercase tracking-widest</span><span>font-semibold</span><span>12px / 600</span>
        </div>
      </div>
    </div>

    <div className="rounded-lg border border-border p-6 bg-surface">
      <h4 className="text-sm font-semibold text-foreground mb-2">✅ Typography Rules</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
        <li>Use a single H1 per page for SEO and accessibility</li>
        <li>Line height: 1.5 for body, 1.2 for headings</li>
        <li>Maximum line width: 65–75 characters for readability</li>
        <li>Never use font weights below 400 (Regular)</li>
      </ul>
    </div>
  </section>
);

export default TypographySection;
