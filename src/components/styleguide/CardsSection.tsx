import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import SectionHeader from "./SectionHeader";
import { BookOpen, Award, TrendingUp } from "lucide-react";

const CardsSection = () => (
  <section>
    <SectionHeader
      id="cards"
      title="Cards & Surfaces"
      description="Cards are the primary container for grouping related content. They provide visual boundaries and consistent padding."
    />

    <div className="grid grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Basic Card
          </CardTitle>
          <CardDescription>Default card with header and content area</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cards use the <code className="text-xs bg-muted px-1 py-0.5 rounded">card</code> token for background and maintain 24px internal padding.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Certification
            </CardTitle>
            <Badge variant="secondary">Essential</Badge>
          </div>
          <CardDescription>PMP — Project Management Professional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">65%</span>
          </div>
          <Progress value={65} className="h-2" />
          <Button size="sm" className="w-full">View Details</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Competency Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-5xl font-bold text-foreground">4.2</p>
            <p className="text-sm text-muted-foreground mt-1">out of 5.0</p>
          </div>
          <div className="space-y-2">
            {[
              { label: "Leadership", value: 85 },
              { label: "Communication", value: 72 },
              { label: "Technical", value: 90 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-4">Surface Elevation</h3>
    <div className="flex gap-6 mb-8">
      <div className="flex-1 p-6 rounded-lg bg-surface border border-border">
        <p className="text-sm font-medium text-foreground mb-1">Surface (Level 0)</p>
        <p className="text-xs text-muted-foreground">Page sections, table backgrounds</p>
      </div>
      <div className="flex-1 p-6 rounded-lg bg-surface-elevated border border-border shadow-sm">
        <p className="text-sm font-medium text-foreground mb-1">Elevated (Level 1)</p>
        <p className="text-xs text-muted-foreground">Cards, dialogs, dropdowns</p>
      </div>
      <div className="flex-1 p-6 rounded-lg bg-surface-elevated border border-border shadow-md">
        <p className="text-sm font-medium text-foreground mb-1">Floating (Level 2)</p>
        <p className="text-xs text-muted-foreground">Tooltips, popovers, modals</p>
      </div>
    </div>
  </section>
);

export default CardsSection;
