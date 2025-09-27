import { useState } from "react";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import AppointmentTable from "@/components/appointments/AppointmentTable";

interface Client {
  id: string;
  name: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  clientId: string;
  clientName: string;
  status: "pendiente" | "confirmado" | "realizado";
}

const Appointments = () => {
  // Mock clients data - will be replaced with Supabase data
  const [clients] = useState<Client[]>([
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "María García" },
    { id: "3", name: "Carlos López" },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAddAppointment = (appointmentData: {
    date: string;
    time: string;
    clientId: string;
    status: "pendiente" | "confirmado" | "realizado";
  }) => {
    const client = clients.find(c => c.id === appointmentData.clientId);
    if (!client) return;

    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(), // Temporary ID generation
      clientName: client.name,
    };
    
    setAppointments([...appointments, newAppointment]);
  };

  const handleStatusChange = (id: string, status: "pendiente" | "confirmado" | "realizado") => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id
        ? { ...appointment, status }
        : appointment
    ));
  };

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