import { useState } from "react";
import { Outlet } from "react-router-dom";
import ClassicSidebar from "./ClassicSidebar";
import ClassicTopBar from "./ClassicTopBar";
import DaleelChat from "@/components/chat/DaleelChat";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import OnboardingTour from "@/components/onboarding/OnboardingTour";
import { cn } from "@/lib/utils";

const ClassicLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <OnboardingTour />
      <ClassicSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div
        className={cn(
          "flex-1 flex flex-col sidebar-transition overflow-hidden",
          sidebarCollapsed ? "ml-16" : "ml-60"
        )}
      >
        <ClassicTopBar 
          onToggleChat={() => setChatOpen(!chatOpen)} 
          chatOpen={chatOpen}
          onToggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
          notificationsOpen={notificationsOpen}
        />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <DaleelChat open={chatOpen} onClose={() => setChatOpen(false)} />
        <NotificationsPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      </div>
    </div>
  );
};

export default ClassicLayout;
