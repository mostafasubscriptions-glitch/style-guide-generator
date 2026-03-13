import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "./SectionHeader";

const FormsSection = () => (
  <section>
    <SectionHeader
      id="forms"
      title="Form Elements"
      description="Form inputs are core to the CDP wizard experience. Every field must be clearly labeled, accessible, and provide appropriate feedback."
    />

    <div className="grid grid-cols-2 gap-8 mb-8">
      <div className="space-y-6 border border-border rounded-lg p-6 bg-surface-elevated">
        <h3 className="text-lg font-semibold text-foreground">Text Inputs</h3>
        <div className="space-y-2">
          <Label htmlFor="default">Default Input</Label>
          <Input id="default" placeholder="Enter employee name..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="filled">Filled Input</Label>
          <Input id="filled" defaultValue="Ahmed Al-Thani" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="disabled">Disabled Input</Label>
          <Input id="disabled" disabled defaultValue="System Generated" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="error" className="text-destructive">With Error</Label>
          <Input id="error" className="border-destructive focus-visible:ring-destructive" defaultValue="abc" />
          <p className="text-xs text-destructive">Employee ID must be numeric</p>
        </div>
      </div>

      <div className="space-y-6 border border-border rounded-lg p-6 bg-surface-elevated">
        <h3 className="text-lg font-semibold text-foreground">Other Controls</h3>
        <div className="space-y-2">
          <Label htmlFor="textarea">Textarea</Label>
          <Textarea id="textarea" placeholder="Describe your career aspiration..." rows={3} />
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">I agree to the development plan terms</Label>
        </div>
        <div className="flex items-center space-x-3">
          <Switch id="notifications" />
          <Label htmlFor="notifications" className="text-sm">Enable email notifications</Label>
        </div>
      </div>
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Badges & Tags</h3>
    <div className="border border-border rounded-lg p-6 bg-surface-elevated mb-6">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </div>
  </section>
);

export default FormsSection;
