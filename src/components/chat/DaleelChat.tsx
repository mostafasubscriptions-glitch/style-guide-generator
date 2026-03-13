import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { chatMessages } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What certifications should I pursue?",
  "Help me understand my competency gaps",
  "What career paths are available to me?",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const DaleelChat = ({ open, onClose }: Props) => {
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "What certifications should I pursue?": "Based on your profile, I strongly recommend the **PMP (Project Management Professional)** certification as your top priority. You have a critical gap in Project Management (Level 3 → 5), and PMP is the industry gold standard.\n\nSecondly, consider the **RMP (Risk Management Professional)** to address your risk management gap. Both are Qatar Recommended and highly valued in the transport sector.\n\nWould you like me to help you plan a study schedule?",
        "Help me understand my competency gaps": "Looking at your current profile vs. your target Senior PM role, here are your key gaps:\n\n🔴 **Critical Gaps:**\n- Project Management: Level 3/5 → need Level 5\n- Risk Management: Level 2/5 → need Level 4\n\n🟡 **Moderate Gaps:**\n- Leadership: Level 3/4\n- Strategic Planning: Level 3/4\n- Financial Analysis: Level 2/3\n- Change Management: Level 3/4\n\n✅ **Met:** Stakeholder Management, Communication\n\nI'd recommend starting with the critical gaps first. Shall I suggest a learning path?",
        default: "That's a great question! Based on your career profile and current development plan, I'd recommend focusing on your critical competency gaps first. The PMP certification and Risk Management Professional certification should be your top priorities.\n\nIs there anything specific about your career development you'd like to explore further?",
      };

      const response = responses[text] || responses.default;
      const aiMsg: Message = { id: Date.now() + 1, role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="w-[360px] h-full border-l border-border bg-card flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Daleel</p>
            <p className="text-[10px] text-muted-foreground">AI Career Advisor</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
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
            <div
              className={cn(
                "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              )}
            >
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className={cn(i > 0 && "mt-1")}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j}>{part.slice(2, -2)}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
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
            {suggestedPrompts.map((p) => (
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
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DaleelChat;
