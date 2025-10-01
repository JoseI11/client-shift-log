import { useEffect, useState } from "react";
import { Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalClients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchUpcomingAppointments();
  }, []);

  const fetchStats = async () => {
    // Total de citas
    const { count: totalAppointments } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true });

    // Total de clientes
    const { count: totalClients } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    // Citas pendientes
    const { count: pendingAppointments } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "pendiente");

    // Citas completadas
    const { count: completedAppointments } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "completada");

    setStats({
      totalAppointments: totalAppointments || 0,
      totalClients: totalClients || 0,
      pendingAppointments: pendingAppointments || 0,
      completedAppointments: completedAppointments || 0,
    });
  };

  const fetchUpcomingAppointments = async () => {
    const today = new Date().toISOString().split("T")[0];
    
    const { data } = await supabase
      .from("appointments")
      .select(
        `
        *,
        clients (name, email, phone)
      `
      )
      .gte("date", today)
      .eq("status", "pendiente")
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .limit(5);

    setUpcomingAppointments(data || []);
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Resumen general de tu negocio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Citas"
          value={stats.totalAppointments}
          icon={Calendar}
          description="Todas las citas registradas"
        />
        <StatsCard
          title="Total Clientes"
          value={stats.totalClients}
          icon={Users}
          description="Clientes activos"
        />
        <StatsCard
          title="Citas Pendientes"
          value={stats.pendingAppointments}
          icon={Clock}
          description="Por confirmar o realizar"
        />
        <StatsCard
          title="Citas Completadas"
          value={stats.completedAppointments}
          icon={CheckCircle}
          description="Finalizadas exitosamente"
        />
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Próximas Citas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay citas próximas programadas
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {appointment.clients?.name || "Cliente sin nombre"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.clients?.phone || "Sin teléfono"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {format(new Date(appointment.date), "dd MMM yyyy", {
                        locale: es,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
