import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export const useClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map(client => ({
        id: client.id.toString(),
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        notes: client.notes || "",
      })) as Client[];
    },
  });
};

export const useAddClient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (clientData: Omit<Client, "id">) => {
      const { data, error } = await supabase
        .from("clients")
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Cliente agregado",
        description: "El cliente se ha registrado exitosamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo agregar el cliente. Inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error("Error adding client:", error);
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...clientData }: Client) => {
      const { data, error } = await supabase
        .from("clients")
        .update(clientData)
        .eq("id", parseInt(id))
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Cliente actualizado",
        description: "Los datos del cliente se han actualizado exitosamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el cliente. Inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error("Error updating client:", error);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", parseInt(id));

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Cliente eliminado",
        description: "El cliente se ha eliminado exitosamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo eliminar el cliente. Inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error("Error deleting client:", error);
    },
  });
};