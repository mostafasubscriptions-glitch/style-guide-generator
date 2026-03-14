import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User, Sparkles, Trash2, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole, UserRole } from "@/contexts/RoleContext";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  actions?: ActionChip[];
}

interface ActionChip {
  label: string;
  path: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

// Role-aware configuration
const roleConfig: Record<UserRole, {
  greeting: string;
  persona: string;
  suggestedPrompts: string[];
}> = {
  employee: {
    greeting: "Hello Ahmed! I'm Daleel, your career development advisor. How can I help you today?",
    persona: "Employee",
    suggestedPrompts: [
      "What certifications should I pursue?",
      "Help me understand my competency gaps",
      "What career paths are available to me?",
    ],
  },
  manager: {
    greeting: "Welcome! I'm Daleel, your team development advisor. I can help with team CDPs, approvals, and development planning.",
    persona: "Manager",
    suggestedPrompts: [
      "How is my team progressing on their CDPs?",
      "Which team members need attention?",
      "Help me prioritize pending approvals",
    ],
  },
  ld: {
    greeting: "Hello! I'm Daleel, your L&D intelligence assistant. I can help with program analytics, gap analysis, and training recommendations.",
    persona: "L&D Manager",
    suggestedPrompts: [
      "What are the top skill gaps across the organization?",
      "Which programs have the highest completion rates?",
      "Recommend training for the upcoming quarter",
    ],
  },
  strategic_leader: {
    greeting: "Good day! I'm Daleel, your strategic workforce advisor. I can help with alignment metrics, talent pipeline insights, and strategic priorities.",
    persona: "Strategic Leader",
    suggestedPrompts: [
      "How aligned is our workforce with Vision 2030?",
      "Show me department readiness overview",
      "What are the critical talent risks?",
    ],
  },
};

// Role-aware responses with action chips
const getRoleResponses = (role: UserRole): Record<string, { content: string; actions?: ActionChip[] }> => {
  const shared: Record<string, { content: string; actions?: ActionChip[] }> = {};

  switch (role) {
    case "employee":
      return {
        ...shared,
        "What certifications should I pursue?": {
          content: "Based on your profile, I strongly recommend:\n\n**1. PMP (Project Management Professional)** — Your top priority. You have a critical gap in Project Management (Level 3 → 5), and PMP is the industry gold standard.\n\n**2. RMP (Risk Management Professional)** — Addresses your risk management gap (Level 2 → 4).\n\nBoth are **Qatar Recommended** and highly valued in the transport sector.\n\nWould you like me to help you plan a study schedule?",
          actions: [
            { label: "Browse Certifications", path: "/catalogue" },
            { label: "Start CDP Wizard", path: "/wizard" },
          ],
        },
        "Help me understand my competency gaps": {
          content: "Looking at your profile vs. your target **Senior PM** role:\n\n🔴 **Critical Gaps:**\n- Project Management: Level 3/5 → need Level 5\n- Risk Management: Level 2/5 → need Level 4\n\n🟡 **Moderate Gaps:**\n- Leadership: Level 3/4\n- Strategic Planning: Level 3/4\n- Financial Analysis: Level 2/3\n- Change Management: Level 3/4\n\n✅ **Met:** Stakeholder Management, Communication\n\nI'd recommend starting with the critical gaps first.",
          actions: [
            { label: "View Dashboard", path: "/dashboard" },
            { label: "Start CDP Wizard", path: "/wizard" },
          ],
        },
        "What career paths are available to me?": {
          content: "Based on your current role as **Senior Project Coordinator (G7)**, here are your possible paths:\n\n📈 **Vertical Growth:**\n- Project Manager (G8) — 1-2 years\n- Senior Project Manager (G9) — 3-4 years\n- Head of Projects (G10) — 5+ years\n\n↔️ **Lateral Move:**\n- Operations Manager (G8)\n- IT Project Lead (G8)\n\nYour strongest path is toward **Project Manager** given your current competencies. You'd need PMP + leadership development to be fully ready.",
          actions: [
            { label: "View Career Paths", path: "/catalogue" },
            { label: "My Profile", path: "/profile" },
          ],
        },
      };

    case "manager":
      return {
        ...shared,
        "How is my team progressing on their CDPs?": {
          content: "Here's your team's CDP status overview:\n\n✅ **Khalid Al-Mohannadi** — Approved, 72% readiness, 3 learning items\n⏳ **Sara Al-Sulaiti** — Pending Approval, 45% readiness\n📝 **Mohammed Al-Kuwari** — Draft, 58% readiness\n🔄 **Noura Al-Hajri** — In Progress, 81% readiness, 4 learning items\n\n**Key Insight:** Sara's CDP needs your approval, and Mohammed hasn't submitted his yet. Noura is your strongest performer.",
          actions: [
            { label: "View My Team", path: "/manager" },
            { label: "Review Sara's CDP", path: "/manager/team/3" },
          ],
        },
        "Which team members need attention?": {
          content: "Based on my analysis, these team members need attention:\n\n🔴 **Sara Al-Sulaiti** — Lowest readiness at 45%. Her CDP is pending your approval. She needs guidance on certification choices.\n\n🟡 **Mohammed Al-Kuwari** — CDP still in draft. 58% readiness with only 2 learning items planned. Needs encouragement to complete his plan.\n\n✅ **Noura Al-Hajri** is excelling — consider her for stretch assignments or mentoring others.",
          actions: [
            { label: "View Sara's Profile", path: "/manager/team/3" },
            { label: "View Mohammed's Profile", path: "/manager/team/4" },
          ],
        },
        "Help me prioritize pending approvals": {
          content: "You have **5 pending approvals**. Here's my recommended priority:\n\n1. 🔴 **Sara Al-Sulaiti** — CDP Plan Approval (submitted 2 days ago, Q2 deadline approaching)\n2. 🟡 **Noura Al-Kuwari** — Training Request for PMP (exam slot may fill up)\n3. **Omar Hassan** — Mentorship Assignment\n4. **Maryam Al-Thani** — Course Enrollment\n5. **Youssef Kamal** — CDP Extension\n\nI recommend approving Sara and Noura today to keep them on track.",
          actions: [
            { label: "Go to Approvals", path: "/manager" },
          ],
        },
      };

    case "ld":
      return {
        ...shared,
        "What are the top skill gaps across the organization?": {
          content: "Across all departments, the most common gaps are:\n\n🔴 **Critical (org-wide):**\n1. **Project Management** — 47 employees below target\n2. **Data Analytics** — 38 employees, growing demand\n3. **Risk Management** — 32 employees\n\n🟡 **Moderate:**\n4. Change Management — 28 employees\n5. Leadership — 25 employees\n6. Financial Analysis — 22 employees\n\n**Recommendation:** Consider launching a company-wide PMP preparation program and a Data Analytics bootcamp for Q3.",
          actions: [
            { label: "L&D Dashboard", path: "/v2/ld" },
            { label: "Provision Training", path: "/v2/ld/provision" },
          ],
        },
        "Which programs have the highest completion rates?": {
          content: "Here are your top-performing programs:\n\n🏆 **Highest Completion:**\n1. Six Sigma Green Belt — **96%** (22/22 completed)\n2. Agile Leadership Workshop — **89%** (12/15)\n3. PMP Certification Cohort — **78%** (14/18)\n\n📉 **Lowest Completion:**\n1. Data Analytics Bootcamp — **42%** (needs review)\n2. Change Management Cert — **55%**\n\n**Insight:** Shorter, workshop-based programs show higher engagement. Consider breaking longer programs into modules.",
          actions: [
            { label: "View All Programs", path: "/v2/ld" },
          ],
        },
        "Recommend training for the upcoming quarter": {
          content: "Based on gap analysis and strategic priorities, here's my Q3 recommendation:\n\n**Must-Have:**\n1. 🎯 PMP Prep Program — Addresses #1 org gap (est. 25 seats)\n2. 🎯 Data Analytics Fundamentals — High demand, aligns with Digital Transformation priority\n\n**Should-Have:**\n3. Risk Management Workshop — 32 employees need this\n4. Leadership Development Series — For G7→G8 pipeline\n\n**Estimated Budget:** QAR 185,000\n**ROI Projection:** Closes 40% of critical gaps by Q4.",
          actions: [
            { label: "Provision Training", path: "/v2/ld/provision" },
            { label: "Budget Overview", path: "/v2/ld" },
          ],
        },
      };

    case "strategic_leader":
      return {
        ...shared,
        "How aligned is our workforce with Vision 2030?": {
          content: "Overall workforce alignment with **Qatar National Vision 2030** priorities:\n\n📊 **Alignment Score: 68%**\n\n**By Pillar:**\n- 🟢 Human Development: **78%** — Strong L&D programs\n- 🟡 Economic Development: **65%** — Need more business/finance skills\n- 🟡 Social Development: **62%** — Leadership pipeline gaps\n- 🔴 Environmental Development: **52%** — Sustainability skills lacking\n\n**Key Action:** Invest in sustainability and environmental management certifications to improve the weakest pillar.",
          actions: [
            { label: "Strategic Dashboard", path: "/v2/strategic" },
          ],
        },
        "Show me department readiness overview": {
          content: "**Department Readiness Scores:**\n\n| Department | Readiness | Headcount | Gaps |\n|---|---|---|---|\n| HR & Corporate | **88%** ✅ | 28 | 3 |\n| Finance & Admin | **82%** ✅ | 38 | 5 |\n| Planning & Projects | **78%** 🟡 | 42 | 8 |\n| IT & Digital | **71%** 🟡 | 52 | 14 |\n| Operations | **65%** 🔴 | 156 | 23 |\n\n**Operations** has the largest gap count and lowest readiness. Given their headcount (156), targeted intervention could significantly move the overall score.",
          actions: [
            { label: "Strategic Dashboard", path: "/v2/strategic" },
            { label: "Org Analytics", path: "/v2/strategic" },
          ],
        },
        "What are the critical talent risks?": {
          content: "**Top Talent Risks:**\n\n🔴 **Succession Gaps:**\n- 23 critical positions have no identified successor\n- 5 department heads approaching retirement within 3 years\n\n🔴 **Skill Concentration:**\n- Only 3 employees hold advanced data analytics capabilities\n- PMP-certified PMs are concentrated in one department\n\n🟡 **Retention Risk:**\n- 12 high-performers in G7-G8 range have stalled CDPs\n- External market demand for transport professionals is rising\n\n**Recommendation:** Launch an accelerated succession planning program for the 23 critical positions.",
          actions: [
            { label: "Talent Pipeline", path: "/v2/strategic" },
            { label: "Strategic Dashboard", path: "/v2/strategic" },
          ],
        },
      };
  }
};

const STORAGE_KEY = "daleel_chat_history";

const DaleelChat = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const { role } = useRole();
  const config = roleConfig[role];
  const responses = getRoleResponses(role);

  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${role}`);
    if (stored) {
      try { return JSON.parse(stored); } catch { /* fallback */ }
    }
    return [{ id: 1, role: "assistant" as const, content: config.greeting }];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevRoleRef = useRef(role);

  // Persist messages
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_${role}`, JSON.stringify(messages));
  }, [messages, role]);

  // Reset on role change
  useEffect(() => {
    if (prevRoleRef.current !== role) {
      prevRoleRef.current = role;
      const stored = localStorage.getItem(`${STORAGE_KEY}_${role}`);
      if (stored) {
        try { setMessages(JSON.parse(stored)); return; } catch { /* fallback */ }
      }
      setMessages([{ id: 1, role: "assistant", content: roleConfig[role].greeting }]);
    }
  }, [role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const match = responses[text];
      const fallbackContent = `That's a great question! As a ${config.persona}, I'd suggest focusing on your most impactful development areas. Based on the current data, there are several opportunities I can help you explore.\n\nWould you like me to dive deeper into any specific topic?`;
      
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: match?.content || fallbackContent,
        actions: match?.actions,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  }, [responses, config.persona]);

  const clearChat = () => {
    const initial: Message[] = [{ id: Date.now(), role: "assistant", content: config.greeting }];
    setMessages(initial);
  };

  const exportChat = () => {
    const text = messages.map((m) => `[${m.role}]: ${m.content}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daleel-chat-${role}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <div className="fixed right-4 top-20 bottom-4 w-[400px] z-50 bg-card border border-border rounded-2xl shadow-2xl shadow-black/15 flex flex-col overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Daleel</p>
            <p className="text-[10px] text-muted-foreground">AI Advisor · {config.persona} Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={exportChat} className="h-7 w-7" title="Export chat">
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={clearChat} className="h-7 w-7" title="Clear chat">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-3 w-3 text-primary" />
              </div>
            )}
            <div className="max-w-[85%] space-y-2">
              <div
                className={cn(
                  "rounded-xl px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_table]:text-xs [&_th]:px-2 [&_td]:px-2">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              {/* Action Chips */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-1">
                  {msg.actions.map((action) => (
                    <button
                      key={action.path + action.label}
                      onClick={() => navigate(action.path)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-medium hover:bg-primary/20 transition-colors"
                    >
                      {action.label} →
                    </button>
                  ))}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-1">
                <User className="h-3 w-3 text-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-3 w-3 text-primary" />
            </div>
            <div className="bg-muted rounded-xl px-3 py-2 text-sm text-muted-foreground">
              <span className="animate-pulse">Daleel is thinking...</span>
            </div>
          </div>
        )}

        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground">Suggested questions:</p>
            {config.suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="w-full text-left px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground hover:bg-muted transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Daleel anything..."
            className="text-sm"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DaleelChat;
