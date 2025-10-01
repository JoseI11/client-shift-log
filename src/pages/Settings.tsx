import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-2">
          Administra las opciones de tu negocio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección estará disponible próximamente. Aquí podrás configurar:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Información del negocio</li>
            <li>Horarios de atención</li>
            <li>Servicios ofrecidos</li>
            <li>Notificaciones</li>
            <li>Preferencias de usuario</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
