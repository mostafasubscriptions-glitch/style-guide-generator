import { Bell, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Props {
  onToggleChat: () => void;
  chatOpen: boolean;
}

const TopBar = ({ onToggleChat, chatOpen }: Props) => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search catalogue, certifications..."
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-9 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={chatOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleChat}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Ask Daleel
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
            2
          </span>
        </Button>

        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">AA</span>
          </div>
          <span className="text-sm font-medium text-foreground hidden lg:block">Ahmed Al-Thani</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
