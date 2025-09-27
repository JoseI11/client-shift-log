import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Clients from "./Clients";
import Appointments from "./Appointments";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "appointments">("clients");

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {activeTab === "clients" ? <Clients /> : <Appointments />}
      </main>
    </div>
  );
};

export default Index;
