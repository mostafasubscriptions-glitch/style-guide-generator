import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";

const ButtonsSection = () => (
  <section>
    <SectionHeader
      id="buttons"
      title="Buttons"
      description="Buttons communicate actions. Use visual hierarchy to guide users toward the most important action on any given screen."
    />

    <h3 className="text-lg font-semibold text-foreground mb-4">Variants</h3>
    <div className="border border-border rounded-lg p-8 bg-surface-elevated mb-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button>Primary Action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link Style</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
      </div>
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Sizes</h3>
    <div className="border border-border rounded-lg p-8 bg-surface-elevated mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon"><Plus className="h-4 w-4" /></Button>
      </div>
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">With Icons</h3>
    <div className="border border-border rounded-lg p-8 bg-surface-elevated mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button><Plus className="h-4 w-4" /> Create Plan</Button>
        <Button variant="secondary"><Download className="h-4 w-4" /> Export PDF</Button>
        <Button variant="outline">Continue <ArrowRight className="h-4 w-4" /></Button>
        <Button variant="destructive"><Trash2 className="h-4 w-4" /> Delete</Button>
      </div>
    </div>

    <div className="rounded-lg border border-border p-6 bg-surface">
      <h4 className="text-sm font-semibold text-foreground mb-2">✅ Button Usage Rules</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
        <li>One primary button per section — never two competing primary CTAs</li>
        <li>Use destructive variant only for irreversible actions with confirmation dialogs</li>
        <li>Icon-only buttons require a tooltip for accessibility</li>
        <li>Button labels: use verbs ("Create Plan", not "Plan")</li>
      </ul>
    </div>
  </section>
);

export default ButtonsSection;
