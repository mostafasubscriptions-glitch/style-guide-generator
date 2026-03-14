import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type LayoutTheme = "classic" | "modern";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  layoutTheme: LayoutTheme;
  setLayoutTheme: (layout: LayoutTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme;
    return stored || "light";
  });

  const [layoutTheme, setLayoutTheme] = useState<LayoutTheme>(() => {
    const stored = localStorage.getItem("layoutTheme") as LayoutTheme;
    return stored || "modern";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("layoutTheme", layoutTheme);
  }, [layoutTheme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, layoutTheme, setLayoutTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
