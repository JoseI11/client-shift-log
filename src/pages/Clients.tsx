import { useState } from "react";
import ClientForm from "@/components/clients/ClientForm";
import ClientCard from "@/components/clients/ClientCard";
import { useClients, useAddClient, useUpdateClient, useDeleteClient, type Client } from "@/hooks/useClients";

const Clients = () => {
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  const { data: clients = [], isLoading, error } = useClients();
  const addClientMutation = useAddClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  const handleAddClient = (clientData: Omit<Client, "id">) => {
    addClientMutation.mutate(clientData);
  };

  const handleEditClient = (clientData: Omit<Client, "id">) => {

    if (editingClient) {
      updateClientMutation.mutate({ ...clientData, id: editingClient.id });
      setEditingClient(null);
    }
  };

  const handleDeleteClient = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      deleteClientMutation.mutate(id);
    }
  };

  const startEditing = (client: Client) => {
    setEditingClient(client);
  };

  const cancelEditing = () => {
    setEditingClient(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-destructive">Error al cargar los clientes. Inténtalo de nuevo.</p>
        </div>
      </div>
    );
  }

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