import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyleGuideNav from "@/components/styleguide/StyleGuideNav";
import OverviewSection from "@/components/styleguide/OverviewSection";
import ColorSection from "@/components/styleguide/ColorSection";
import TypographySection from "@/components/styleguide/TypographySection";
import SpacingSection from "@/components/styleguide/SpacingSection";
import ButtonsSection from "@/components/styleguide/ButtonsSection";
import FormsSection from "@/components/styleguide/FormsSection";
import CardsSection from "@/components/styleguide/CardsSection";
import AlertsSection from "@/components/styleguide/AlertsSection";
import IconsSection from "@/components/styleguide/IconsSection";
import MotionSection from "@/components/styleguide/MotionSection";
import PatternsSection from "@/components/styleguide/PatternsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const StyleGuidePage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <StyleGuideNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-12 py-8">
          <Button variant="ghost" size="sm" className="gap-2 mb-4" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" /> Back to App
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Mowasalat CDP</h1>
          <p className="text-lg text-muted-foreground mt-2">Corporate Style Guide & Design System</p>
        </div>
        <div className="px-12 py-10 space-y-16 max-w-5xl">
          <OverviewSection />
          <ColorSection />
          <TypographySection />
          <SpacingSection />
          <ButtonsSection />
          <FormsSection />
          <CardsSection />
          <AlertsSection />
          <IconsSection />
          <MotionSection />
          <PatternsSection />
        </div>
      </main>
    </div>
  );
};

export default StyleGuidePage;
