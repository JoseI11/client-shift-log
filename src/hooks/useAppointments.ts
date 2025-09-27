import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  clientId: string;
  clientName: string;
  status: "pendiente" | "confirmado" | "realizado";
}

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          clients (
            name
          )
        `)
        .order("date", { ascending: true });
      
      if (error) throw error;
      
      return data.map(appointment => ({
        id: appointment.id.toString(),
        date: appointment.date || "",
        time: appointment.time || "",
        clientId: appointment.client_id?.toString() || "",
        clientName: appointment.clients?.name || "Cliente desconocido",
        status: appointment.status as "pendiente" | "confirmado" | "realizado",
      })) as Appointment[];
    },
  });
};

export const useAddAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (appointmentData: {
      date: string;
      time: string;
      clientId: string;
      status: "pendiente" | "confirmado" | "realizado";
    }) => {
      const { data, error } = await supabase
        .from("appointments")
        .insert([{
          date: appointmentData.date,
          time: appointmentData.time,
          client_id: parseInt(appointmentData.clientId),
          status: appointmentData.status,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({
        title: "Turno creado",
        description: "El turno se ha creado exitosamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo crear el turno. Inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error("Error adding appointment:", error);
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "pendiente" | "confirmado" | "realizado" }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", parseInt(id))
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast({
        title: "Estado actualizado",
        description: "El estado del turno se ha actualizado exitosamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado. Inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error("Error updating appointment status:", error);
    },
  });
};