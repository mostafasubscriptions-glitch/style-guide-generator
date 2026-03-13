import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, ChevronDown, ChevronUp, MessageSquare, HelpCircle } from "lucide-react";
import { faqs } from "@/data/mockData";

const categories = ["All", "General", "CDP", "Learning", "Technical"];

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = faqs.filter((faq) => {
    if (activeCategory !== "All" && faq.category !== activeCategory) return false;
    if (search && !faq.question.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="text-sm text-muted-foreground mt-2">Find answers about the Career Development Platform</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-lg mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeCategory === cat ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-2">
        {filtered.map((faq) => (
          <div key={faq.id} className="border border-border rounded-lg overflow-hidden bg-card">
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
              {expandedId === faq.id
                ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              }
            </button>
            {expandedId === faq.id && (
              <div className="px-5 pb-4 border-t border-border pt-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Can't find answer */}
      <div className="mt-8 text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-sm text-foreground font-medium">Can't find your answer?</p>
        <p className="text-xs text-muted-foreground mt-1 mb-3">Ask Daleel, our AI career advisor</p>
        <Button className="gap-2">
          <MessageSquare className="h-4 w-4" /> Ask Daleel
        </Button>
      </div>
    </div>
  );
};

export default FAQPage;
