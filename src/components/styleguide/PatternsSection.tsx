import SectionHeader from "./SectionHeader";

const PatternsSection = () => (
  <section>
    <SectionHeader
      id="patterns"
      title="Usage Patterns"
      description="Standard layout and interaction patterns used throughout the Mowasalat CDP application."
    />

    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* Wizard Pattern */}
      <div className="border border-border rounded-lg overflow-hidden bg-surface-elevated">
        <div className="p-4 border-b border-border bg-surface">
          <h3 className="text-sm font-semibold text-foreground">Wizard Stepper</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            {["Profile", "Gap Analysis", "Certifications", "Courses", "Mentors", "Timeline"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  i < 2 ? "bg-primary text-primary-foreground" :
                  i === 2 ? "border-2 border-primary text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                {i < 5 && <div className={`w-4 h-0.5 ${i < 2 ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">6-step CDP wizard — completed, active, and upcoming states</p>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="border border-border rounded-lg overflow-hidden bg-surface-elevated">
        <div className="p-4 border-b border-border bg-surface">
          <h3 className="text-sm font-semibold text-foreground">Dashboard Layout</h3>
        </div>
        <div className="p-6">
          <div className="flex gap-2 h-28">
            <div className="w-12 bg-foreground/10 rounded flex flex-col items-center pt-3 gap-2">
              {[1,2,3,4].map(i => <div key={i} className="w-5 h-5 rounded bg-foreground/20" />)}
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-surface rounded border border-border" />
              <div className="grid grid-cols-3 gap-2 flex-1">
                <div className="bg-surface rounded border border-border" />
                <div className="bg-surface rounded border border-border" />
                <div className="bg-surface rounded border border-border" />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Left sidebar + top bar + metric cards grid</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-surface-elevated">
        <div className="p-4 border-b border-border bg-surface">
          <h3 className="text-sm font-semibold text-foreground">Data Table</h3>
        </div>
        <div className="p-6">
          <div className="border border-border rounded-md overflow-hidden">
            <div className="grid grid-cols-4 bg-surface text-xs font-semibold text-muted-foreground">
              <div className="px-3 py-2">Name</div>
              <div className="px-3 py-2">Department</div>
              <div className="px-3 py-2">Status</div>
              <div className="px-3 py-2">Score</div>
            </div>
            {[1,2,3].map(i => (
              <div key={i} className="grid grid-cols-4 border-t border-border text-xs text-foreground">
                <div className="px-3 py-2">Employee {i}</div>
                <div className="px-3 py-2">Dept {i}</div>
                <div className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    i === 1 ? "bg-success/15 text-success" : i === 2 ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary"
                  }`}>
                    {i === 1 ? "Completed" : i === 2 ? "Pending" : "In Progress"}
                  </span>
                </div>
                <div className="px-3 py-2">{85 + i}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="border border-border rounded-lg overflow-hidden bg-surface-elevated">
        <div className="p-4 border-b border-border bg-surface">
          <h3 className="text-sm font-semibold text-foreground">AI Recommendation</h3>
        </div>
        <div className="p-6">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] text-primary font-bold">AI</span>
              </div>
              <span className="text-xs font-semibold text-primary">92% Confidence</span>
            </div>
            <p className="text-sm text-foreground font-medium">Recommended: PMP Certification</p>
            <p className="text-xs text-muted-foreground mt-1">Based on your leadership gap and career trajectory toward Senior PM role.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="rounded-lg border border-border p-6 bg-surface">
      <h4 className="text-sm font-semibold text-foreground mb-2">✅ Pattern Rules</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
        <li>Certifications are always displayed before courses in recommendations</li>
        <li>Every AI suggestion shows confidence score, reasoning, and pattern match</li>
        <li>Wizard state uses Fluxor; all other pages use component-level state</li>
        <li>Empty states must include a clear CTA to guide the user</li>
      </ul>
    </div>
  </section>
);

export default PatternsSection;
