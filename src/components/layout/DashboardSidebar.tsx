import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Citas", url: "/appointments", icon: Calendar },
  { title: "Clientes", url: "/clients", icon: Users },
  { title: "Configuración", url: "/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      toast.success("Sesión cerrada");
      navigate("/auth");
    }
  };

  const getNavClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-primary text-primary-foreground font-medium"
        : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
    }`;

  return (
    <aside
      className={`relative flex flex-col border-r border-border bg-card transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        {!collapsed && (
          <h2 className="text-xl font-bold text-primary">Mi Negocio</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) => getNavClass(isActive)}
          >
            <item.icon size={20} className="shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start gap-3 text-foreground/70 hover:bg-destructive/10 hover:text-destructive ${
            collapsed ? "px-0 justify-center" : ""
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Cerrar Sesión</span>}
        </Button>
      </div>
    </aside>
  );
};
