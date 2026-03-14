import { useTheme } from "@/contexts/ThemeContext";
import ClassicLayout from "./ClassicLayout";
import ModernLayout from "./ModernLayout";

const UnifiedLayout = () => {
  const { layoutTheme } = useTheme();
  return layoutTheme === "classic" ? <ClassicLayout /> : <ModernLayout />;
};

export default UnifiedLayout;
