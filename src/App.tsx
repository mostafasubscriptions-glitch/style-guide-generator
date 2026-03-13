import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/layout/MainLayout";
import V2Layout from "@/components/layout/V2Layout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import WizardPage from "./pages/WizardPage";
import CataloguePage from "./pages/CataloguePage";
import FAQPage from "./pages/FAQPage";
import ManagerPage from "./pages/ManagerPage";
import StyleGuidePage from "./pages/StyleGuidePage";
import PositionsPage from "./pages/admin/PositionsPage";
import CertificationsPage from "./pages/admin/CertificationsPage";
import TrainingPage from "./pages/admin/TrainingPage";
import V2HomePage from "./pages/v2/V2HomePage";
import V2DashboardPage from "./pages/v2/V2DashboardPage";
import V2ProfilePage from "./pages/v2/V2ProfilePage";
import V2CatalogueDetailPage from "./pages/v2/V2CatalogueDetailPage";
import V2LoginPage from "./pages/v2/V2LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/admin/positions" element={<PositionsPage />} />
            <Route path="/admin/certifications" element={<CertificationsPage />} />
            <Route path="/admin/training" element={<TrainingPage />} />
          </Route>
          <Route path="/v2/login" element={<V2LoginPage />} />
          <Route element={<V2Layout />}>
            <Route path="/v2" element={<V2HomePage />} />
            <Route path="/v2/dashboard" element={<V2DashboardPage />} />
            <Route path="/v2/wizard" element={<WizardPage />} />
            <Route path="/v2/catalogue" element={<CataloguePage />} />
            <Route path="/v2/catalogue/:type/:id" element={<V2CatalogueDetailPage />} />
            <Route path="/v2/faq" element={<FAQPage />} />
            <Route path="/v2/profile" element={<V2ProfilePage />} />
          </Route>
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
