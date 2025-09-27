import { Edit, Trash2, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientCard = ({ client, onEdit, onDelete }: ClientCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground leading-tight">
            {client.name}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(client)}
              className="rounded-lg border-border hover:bg-accent p-2"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(client.id)}
              className="rounded-lg border-border hover:bg-destructive hover:text-destructive-foreground p-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm">{client.email}</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm">{client.phone}</span>
          </div>

          {client.notes && (
            <div className="flex items-start gap-3 text-muted-foreground mt-4">
              <FileText className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-sm leading-relaxed">{client.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;