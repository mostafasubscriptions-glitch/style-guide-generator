import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import TopBar from "./TopBar";
import DaleelChat from "@/components/chat/DaleelChat";
import { cn } from "@/lib/utils";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <NavMenu collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div
        className={cn(
          "flex-1 flex flex-col sidebar-transition overflow-hidden",
          sidebarCollapsed ? "ml-16" : "ml-60"
        )}
      >
        <TopBar onToggleChat={() => setChatOpen(!chatOpen)} chatOpen={chatOpen} />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <DaleelChat open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  );
};

export default MainLayout;
