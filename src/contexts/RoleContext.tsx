import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "employee" | "manager" | "ld" | "strategic_leader";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleName: string;
}

const roleNames: Record<UserRole, string> = {
  employee: "Employee",
  manager: "Direct Manager",
  ld: "L&D Management",
  strategic_leader: "Strategic Leader",
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(
    () => (localStorage.getItem("userRole") as UserRole) || "employee"
  );

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole, roleName: roleNames[role] }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
};
