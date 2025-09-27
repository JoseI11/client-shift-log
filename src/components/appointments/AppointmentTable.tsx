import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Appointment {
  id: string;
  date: string;
  time: string;
  clientName: string;
  status: "pendiente" | "confirmado" | "realizado";
}

interface AppointmentTableProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: "pendiente" | "confirmado" | "realizado") => void;
}

const getStatusBadge = (status: string) => {
  const variants = {
    pendiente: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    confirmado: "bg-blue-100 text-blue-800 hover:bg-blue-100", 
    realizado: "bg-green-100 text-green-800 hover:bg-green-100",
  };

  const labels = {
    pendiente: "Pendiente",
    confirmado: "Confirmado",
    realizado: "Realizado",
  };

  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};

const AppointmentTable = ({ appointments, onStatusChange }: AppointmentTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // Remove seconds if present
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Lista de Turnos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay turnos registrados aún.</p>
            <p className="text-sm mt-2">Crea tu primer turno usando el formulario de arriba.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-accent/50">
                  <TableHead className="font-semibold text-foreground">Cliente</TableHead>
                  <TableHead className="font-semibold text-foreground">Fecha</TableHead>
                  <TableHead className="font-semibold text-foreground">Hora</TableHead>
                  <TableHead className="font-semibold text-foreground">Estado</TableHead>
                  <TableHead className="font-semibold text-foreground">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow 
                    key={appointment.id} 
                    className="border-border hover:bg-accent/30 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {appointment.clientName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(appointment.date)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatTime(appointment.time)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(appointment.status)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={appointment.status}
                        onValueChange={(value) => 
                          onStatusChange(appointment.id, value as "pendiente" | "confirmado" | "realizado")
                        }
                      >
                        <SelectTrigger className="w-32 rounded-lg border-border text-sm">
                          <SelectValue />
                        </SelectTrigger>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentTable;