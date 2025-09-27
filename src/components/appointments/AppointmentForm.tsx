import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const appointmentSchema = z.object({
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.string().min(1, "Selecciona una hora"),
  clientId: z.string().min(1, "Selecciona un cliente"),
  status: z.enum(["pendiente", "confirmado", "realizado"]),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface Client {
  id: string;
  name: string;
}

interface AppointmentFormProps {
  clients: Client[];
  onSubmit: (data: AppointmentFormData) => void;
}

const AppointmentForm = ({ clients, onSubmit }: AppointmentFormProps) => {
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: "",
      time: "",
      clientId: "",
      status: "pendiente",
    },
  });

  const handleSubmit = (data: AppointmentFormData) => {
    onSubmit(data);
    form.reset();
    toast({
      title: "Turno creado",
      description: "El turno se ha registrado correctamente.",
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Crear Nuevo Turno
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        {...field}
                        className="rounded-lg border-border focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <FormControl>
                      <Input 
                        type="time"
                        {...field}
                        className="rounded-lg border-border focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-border focus:ring-primary">
                        <SelectValue placeholder="Selecciona un cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      {clients.map((client) => (
                        <SelectItem 
                          key={client.id} 
                          value={client.id}
                          className="hover:bg-accent focus:bg-accent"
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-border focus:ring-primary">
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="pendiente" className="hover:bg-accent focus:bg-accent">
                        Pendiente
                      </SelectItem>
                      <SelectItem value="confirmado" className="hover:bg-accent focus:bg-accent">
                        Confirmado
                      </SelectItem>
                      <SelectItem value="realizado" className="hover:bg-accent focus:bg-accent">
                        Realizado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Crear Turno
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;