import { useState } from "react";
import { Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: "clients" | "appointments";
  onTabChange: (tab: "clients" | "appointments") => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">MiniCRM Freelancers</h1>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange("clients")}
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === "clients"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </button>
            
            <button
              onClick={() => onTabChange("appointments")}
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === "appointments"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Turnos
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;