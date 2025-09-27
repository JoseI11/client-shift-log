import { useState } from "react";
import ClientForm from "@/components/clients/ClientForm";
import ClientCard from "@/components/clients/ClientCard";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleAddClient = (clientData: Omit<Client, "id">) => {
    const newClient = {
      ...clientData,
      id: Date.now().toString(), // Temporary ID generation
    };
    setClients([...clients, newClient]);
  };

  const handleEditClient = (clientData: Omit<Client, "id">) => {
    if (editingClient) {
      setClients(clients.map(client => 
        client.id === editingClient.id 
          ? { ...clientData, id: editingClient.id }
          : client
      ));
      setEditingClient(null);
    }
  };

  const handleDeleteClient = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const startEditing = (client: Client) => {
    setEditingClient(client);
  };

  const cancelEditing = () => {
    setEditingClient(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <ClientForm 
            onSubmit={editingClient ? handleEditClient : handleAddClient}
            editingClient={editingClient}
            onCancel={editingClient ? cancelEditing : undefined}
          />
        </div>

        {/* Lista de clientes */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Clientes Registrados
            </h2>
            <p className="text-muted-foreground">
              {clients.length === 0 
                ? "No hay clientes registrados aún."
                : `${clients.length} cliente${clients.length !== 1 ? 's' : ''} registrado${clients.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {clients.length === 0 ? (
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <p className="text-muted-foreground text-lg mb-2">
                ¡Registra tu primer cliente!
              </p>
              <p className="text-sm text-muted-foreground">
                Usa el formulario de la izquierda para empezar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {clients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onEdit={startEditing}
                  onDelete={handleDeleteClient}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;