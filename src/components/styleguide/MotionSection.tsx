import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";

const MotionSection = () => {
  const [showCard, setShowCard] = useState(true);
  const [expanded, setExpanded] = useState(false);

  return (
    <section>
      <SectionHeader
        id="motion"
        title="Motion & Animation"
        description="Animations should feel quick and purposeful. Use 150–200ms for micro-interactions and 300ms for layout transitions. Motion reinforces hierarchy, never distracts."
      />

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border border-border rounded-lg p-6 bg-surface-elevated">
          <h3 className="text-sm font-semibold text-foreground mb-4">Fade In/Out</h3>
          <div className="h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showCard && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-4 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  Animated Element
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowCard(!showCard)} className="w-full mt-2">
            Toggle
          </Button>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface-elevated">
          <h3 className="text-sm font-semibold text-foreground mb-4">Expand / Collapse</h3>
          <motion.div
            animate={{ height: expanded ? 120 : 48 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <div className="p-3 text-sm text-foreground font-medium">Competency: Leadership</div>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 pb-3 text-sm text-muted-foreground"
              >
                <p>Current Level: 3 / 5</p>
                <p>Required Level: 4 / 5</p>
                <p>Gap: 1 level — Recommended certification</p>
              </motion.div>
            )}
          </motion.div>
          <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)} className="w-full mt-2">
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 bg-surface-elevated mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Staggered List</h3>
        <Button variant="outline" size="sm" onClick={() => setShowCard((v) => !v)} className="mb-4">
          Replay
        </Button>
        <div className="space-y-2">
          {["Gap Analysis", "Certifications", "Courses", "Mentorship", "Timeline"].map((item, i) => (
            <motion.div
              key={`${item}-${showCard}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.2 }}
              className="px-4 py-3 rounded-md bg-surface border border-border text-sm text-foreground"
            >
              Step {i + 1}: {item}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border p-6 bg-surface">
        <h4 className="text-sm font-semibold text-foreground mb-2">✅ Motion Rules</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Micro-interactions: 150–200ms (hovers, toggles, button feedback)</li>
          <li>Layout transitions: 200–300ms (expanding panels, page transitions)</li>
          <li>Easing: <code className="text-xs bg-muted px-1 py-0.5 rounded">ease-in-out</code> for most, <code className="text-xs bg-muted px-1 py-0.5 rounded">ease-out</code> for entrances</li>
          <li>Stagger delay: 50–80ms between items</li>
          <li>Respect <code className="text-xs bg-muted px-1 py-0.5 rounded">prefers-reduced-motion</code></li>
        </ul>
      </div>
    </section>
  );
};

export default MotionSection;
