import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="text-xl font-semibold text-foreground">Page not found</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          The page <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{location.pathname}</code> doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} className="gap-2 rounded-xl">
          <Home className="h-4 w-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
