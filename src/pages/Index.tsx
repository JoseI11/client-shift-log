import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Clients from "./Clients";
import Appointments from "./Appointments";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "appointments">("clients");

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {activeTab === "clients" ? <Clients /> : <Appointments />}
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;
