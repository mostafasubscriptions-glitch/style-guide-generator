import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import UnifiedLayout from "@/components/layout/UnifiedLayout";
import V2HomePage from "./pages/v2/V2HomePage";
import V2DashboardPage from "./pages/v2/V2DashboardPage";
import WizardPage from "./pages/WizardPage";
import CataloguePage from "./pages/CataloguePage";
import FAQPage from "./pages/FAQPage";
import V2ProfilePage from "./pages/v2/V2ProfilePage";
import V2CatalogueDetailPage from "./pages/v2/V2CatalogueDetailPage";
import V2LoginPage from "./pages/v2/V2LoginPage";
import V2ManagerDashboardPage from "./pages/v2/V2ManagerDashboardPage";
import V2TeamMemberDetailPage from "./pages/v2/V2TeamMemberDetailPage";
import V2LDDashboardPage from "./pages/v2/V2LDDashboardPage";
import V2LDProvisionPage from "./pages/v2/V2LDProvisionPage";
import V2StrategicDashboardPage from "./pages/v2/V2StrategicDashboardPage";
import V2EmployeeCataloguePage from "./pages/v2/V2EmployeeCataloguePage";
import V2ManagerCataloguePage from "./pages/v2/V2ManagerCataloguePage";
import V2LDCataloguePage from "./pages/v2/V2LDCataloguePage";
import V2LeaderCataloguePage from "./pages/v2/V2LeaderCataloguePage";
import PositionsPage from "./pages/admin/PositionsPage";
import CertificationsPage from "./pages/admin/CertificationsPage";
import TrainingPage from "./pages/admin/TrainingPage";
import StyleGuidePage from "./pages/StyleGuidePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <RoleProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<V2LoginPage />} />
              <Route element={<UnifiedLayout />}>
                <Route path="/" element={<V2HomePage />} />
                <Route path="/dashboard" element={<V2DashboardPage />} />
                <Route path="/wizard" element={<WizardPage />} />
                <Route path="/catalogue" element={<CataloguePage />} />
                <Route path="/catalogue/:type/:id" element={<V2CatalogueDetailPage />} />
                <Route path="/catalogue/employee" element={<V2EmployeeCataloguePage />} />
                <Route path="/catalogue/manager" element={<V2ManagerCataloguePage />} />
                <Route path="/catalogue/ld" element={<V2LDCataloguePage />} />
                <Route path="/catalogue/leader" element={<V2LeaderCataloguePage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/profile" element={<V2ProfilePage />} />
                <Route path="/manager" element={<V2ManagerDashboardPage />} />
                <Route path="/manager/team/:id" element={<V2TeamMemberDetailPage />} />
                <Route path="/ld" element={<V2LDDashboardPage />} />
                <Route path="/ld/provision" element={<V2LDProvisionPage />} />
                <Route path="/strategic" element={<V2StrategicDashboardPage />} />
                <Route path="/admin/positions" element={<PositionsPage />} />
                <Route path="/admin/certifications" element={<CertificationsPage />} />
                <Route path="/admin/training" element={<TrainingPage />} />
              </Route>
              <Route path="/style-guide" element={<StyleGuidePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RoleProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
