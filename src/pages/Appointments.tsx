import AppointmentForm from "@/components/appointments/AppointmentForm";
import AppointmentTable from "@/components/appointments/AppointmentTable";
import { useClients } from "@/hooks/useClients";
import { useAppointments, useAddAppointment, useUpdateAppointmentStatus } from "@/hooks/useAppointments";

const Appointments = () => {
  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: appointments = [], isLoading: appointmentsLoading, error } = useAppointments();
  const addAppointmentMutation = useAddAppointment();
  const updateStatusMutation = useUpdateAppointmentStatus();

  const handleAddAppointment = (appointmentData: {
    date: string;
    time: string;
    clientId: string;
    status: "pendiente" | "confirmado" | "realizado";
  }) => {
    addAppointmentMutation.mutate(appointmentData);
  };

  const handleStatusChange = (id: string, status: "pendiente" | "confirmado" | "realizado") => {
    updateStatusMutation.mutate({ id, status });
  };

  if (clientsLoading || appointmentsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-destructive">Error al cargar los turnos. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <AppointmentForm 
            clients={clients}
            onSubmit={handleAddAppointment}
          />
        </div>

        {/* Lista de turnos */}
        <div className="lg:col-span-2">
          <AppointmentTable 
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointments;