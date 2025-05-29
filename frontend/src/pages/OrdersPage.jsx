import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMaintenance } from "../context/MaintenanceContext";
import { useReparation } from "../context/ReparationContext";
import { useInstallation } from "../context/InstallationContext";

const OrdersPage = () => {
  const { maintenances, getUserMaintenances } = useMaintenance();
  const { Reparations, getUserReparations, sendClientApproval } = useReparation();
  const { installations, getUserInstallations, payInstallation } = useInstallation();
  const [clientComments, setClientComments] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getUserMaintenances(user.id);
      getUserReparations(user.id);
      getUserInstallations(user.id); // Obtener instalaciones del usuario
    }
  }, [user]);

  return (
    <div className="mt-6 w-full p-6 bg-white rounded-lg shadow-lg pt-30">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tus Servicios Realizados</h2>

      {/* Sección de Reparaciones */}
      <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-red-600 border-b-2 border-red-600 pb-2">Reparaciones</h2>
        {Reparations && Reparations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Reparations.map((reparation) => {
              

              return (
                <div key={reparation.id} className="p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Modelo: {reparation.model}</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Procesador:</span> {reparation.processor}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">RAM:</span> {reparation.ram}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Almacenamiento:</span> {reparation.storage}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Problema:</span> {reparation.issueDescription}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Observaciones:</span>
                    {reparation.observations || "Sin observaciones"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Fecha de Pedido:</span>{" "}
                    {new Date(reparation.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Comentarios:</span> {reparation.comments || 'Sin comentarios'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Precio estimado:</span> {reparation.estimatedPrice ? `${reparation.estimatedPrice} €` : 'Todavía sin precio estimado'}
                  </p>
                  {reparation.adminComments && (
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Comentario del técnico:</span> {reparation.adminComments}
                    </p>
                  )}

                  {/* Botones de feedback SOLO si hay presupuesto y no ha respondido */}
                  {reparation.estimatedPrice && !reparation.clientApproval && (
                    <div className="mt-4">
                      <textarea
                        placeholder="Comentario (opcional)"
                        value={clientComments[reparation.id] || ""}
                        onChange={e =>
                          setClientComments((prev) => ({
                            ...prev,
                            [reparation.id]: e.target.value
                          }))
                        }
                        className="border p-2 rounded w-full mb-2"
                      />
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => sendClientApproval(reparation.id, "approved", clientComments[reparation.id])}
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => sendClientApproval(reparation.id, "rejected", clientComments[reparation.id])}
                      >
                        Rechazar
                      </button>
                    </div>
                  )}

                  {/* Estado de la respuesta */}
                  {reparation.clientApproval && (
                    <p className={`mt-4 text-sm font-medium ${reparation.clientApproval === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                      {reparation.clientApproval === 'approved'
                        ? 'Has aprobado el presupuesto'
                        : 'Has rechazado el presupuesto'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No hay reparaciones registradas.</p>
        )}
      </div>

      {/* Sección de Mantenimientos */}
      <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600 border-b-2 border-blue-600 pb-2">Mantenimientos</h2>
        {maintenances && maintenances.length > 0 ? (
          <div className="space-y-4">
            {maintenances.map((maintenance) => {
              const stateText =
                maintenance.state === 1
                  ? "Pendiente"
                  : maintenance.state === 2
                  ? "En proceso"
                  : "Completado";

              const stateColors = {
                Pendiente: "bg-yellow-200 text-yellow-800",
                "En proceso": "bg-blue-200 text-blue-800",
                Completado: "bg-green-200 text-green-800",
              };

              return (
                <div
                  key={maintenance.id}
                  className="p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Cliente: {maintenance.idClient.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dispositivo:</span> {maintenance.deviceType} (
                    {maintenance.model})
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Empleado:</span>{" "}
                    {maintenance.idAdministrator
                      ? maintenance.idAdministrator.email
                      : "No asignado"}
                  </p>
                  <p
                    className={`text-sm font-medium p-2 rounded-md inline-block mt-2 ${stateColors[stateText]}`}
                  >
                    Estado: {stateText}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Fecha:</span>{" "}
                    {new Date(maintenance.maintenanceDate).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No hay mantenimientos registrados.</p>
        )}
      </div>

      {/* Sección de Instalaciones */}
      <div>
      <h2 className="text-3xl font-semibold mb-6 text-green-600 border-b-2 border-green-600 pb-2">Instalaciones</h2>
        {installations && installations.length > 0 ? (
          <div className="space-y-4">
            {installations.map((installation) => (
              <div
                key={installation.id}
                className="p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-lg font-semibold text-gray-800">
                  <span className="font-medium">Modelo:</span> {installation.model}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Procesador:</span> {installation.processor}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">RAM:</span> {installation.ram}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Almacenamiento:</span> {installation.storage}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Estado:</span> {installation.state}
                </p>

                {/* Feedback del administrador */}
                {installation.estimatedPrice && (
                  <div className="mt-3 p-3 bg-amber-50 rounded">
                    <p className="text-base text-amber-700 font-semibold">
                      Presupuesto propuesto: {installation.estimatedPrice} €
                    </p>
                    {installation.adminComments && (
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Comentario del técnico:</span> {installation.adminComments}
                      </p>
                    )}
                  </div>
                )}

                {/* Botones aceptar/rechazar SOLO si está pendiente y no ha respondido */}
                {installation.estimatedPrice && installation.state === "pendiente" && installation.clientApproval === null && (
                  <div className="mt-4">
                    <textarea
                      placeholder="Comentario (opcional)"
                      value={clientComments[installation.id] || ""}
                      onChange={e =>
                        setClientComments((prev) => ({
                          ...prev,
                          [installation.id]: e.target.value
                        }))
                      }
                      className="border p-2 rounded w-full mb-2"
                    />
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => sendClientApproval(installation.id, "approved", clientComments[installation.id])}
                    >
                      Aceptar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => sendClientApproval(installation.id, "rejected", clientComments[installation.id])}
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                {/* Mensaje si ya ha respondido */}
                {installation.clientApproval && (
                  <p className={`mt-4 text-sm font-medium ${installation.clientApproval === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                    {installation.clientApproval === 'approved'
                      ? 'Has aprobado el presupuesto'
                      : 'Has rechazado el presupuesto'}
                  </p>
                )}

                {/* Botón de pago si está completado */}
                {installation.state === "completado" && (
                  <button
                    className="bg-amber-600 text-white px-4 py-2 rounded mt-2"
                    onClick={() => payInstallation(installation.id)}
                  >
                    Pagar {installation.finalPrice || installation.estimatedPrice} €
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay instalaciones registradas.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;