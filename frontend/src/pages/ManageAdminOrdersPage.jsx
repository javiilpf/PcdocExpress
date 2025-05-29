import React, { useEffect, useState } from "react";
import { useMaintenance } from "../context/MaintenanceContext";
import { useInstallation } from "../context/InstallationContext";
import { useReparation } from "../context/ReparationContext";

const ManageAdminOrdersPage = () => {
  const { maintenances, getAsignedMaintenances, maintenanceLoading, updateMaintenanceState } = useMaintenance();
  const { installations, sendAdminFeedback, completeInstallation,getAssignedInstallations, loading: installationLoading } = useInstallation();
  const { AdminReparations, getAsignedReparations, completeReparation, sendAdminFeedback: sendReparationFeedback } = useReparation();
  const [feedback, setFeedback] = useState({});

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (userId) {
      getAsignedMaintenances(userId);
      getAssignedInstallations(userId);
      getAsignedReparations(userId);
    }
  }, [userId]);

  if (maintenanceLoading || installationLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Definir colores para los estados
  const stateColors = {
    Pendiente: "bg-yellow-200 text-yellow-800",
    "En proceso": "bg-blue-200 text-blue-800",
    Completado: "bg-green-200 text-green-800",
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-45">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Gestión de Servicios Pendientes</h1>

      {/* Reparaciones */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-red-600 border-b-2 border-red-600 pb-2">Reparaciones</h2>
        {AdminReparations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AdminReparations.map((reparation) => {
              const stateText =
                reparation.state === 1
                  ? "Pendiente"
                  : reparation.state === 2
                  ? "En proceso"
                  : reparation.state === 3
                  ? "Completado"
                  : "Estado desconocido";

              return (
                <div key={reparation.id} className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {reparation.deviceType} ({reparation.model})
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Problema:</span> {reparation.issueDescription}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Procesador:</span> {reparation.processor}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">RAM:</span> {reparation.ram}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Almacenamiento:</span> {reparation.storage}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Fecha:</span> {new Date(reparation.orderDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-sm font-medium p-2 rounded-md inline-block mt-2 ${
                      stateColors[stateText] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Estado: {stateText}
                  </p>
                  {/* Si está pendiente y no tiene presupuesto */}
                  {reparation.state === 1 && reparation.estimatedPrice == null && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await sendReparationFeedback(
                          reparation.id,
                          feedback[reparation.id]?.estimatedPrice,
                          feedback[reparation.id]?.adminComments
                        );
                        setFeedback((prev) => ({ ...prev, [reparation.id]: { estimatedPrice: "", adminComments: "" } }));
                      }}
                    >
                      <input
                        type="number"
                        placeholder="Presupuesto (€)"
                        value={feedback[reparation.id]?.estimatedPrice || ""}
                        onChange={e =>
                          setFeedback((prev) => ({
                            ...prev,
                            [reparation.id]: { ...prev[reparation.id], estimatedPrice: e.target.value }
                          }))
                        }
                        className="border p-2 rounded w-full mb-2"
                        required
                      />
                      <textarea
                        placeholder="Comentario para el cliente"
                        value={feedback[reparation.id]?.adminComments || ""}
                        onChange={e =>
                          setFeedback((prev) => ({
                            ...prev,
                            [reparation.id]: { ...prev[reparation.id], adminComments: e.target.value }
                          }))
                        }
                        className="border p-2 rounded w-full mb-2"
                        required
                      />
                      <button className="bg-green-600 text-white px-4 py-2 rounded">Enviar presupuesto</button>
                    </form>
                  )}

                  {/* Si el cliente ha aceptado y está en proceso, mostrar botón para completar */}
                  {reparation.state === 2 && (
                    <>
                      <div className="mb-2">
                        <p className="text-green-700 font-semibold">
                          Presupuesto aceptado: {reparation.estimatedPrice} €
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Comentario admin:</span> {reparation.adminComments}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Comentario cliente:</span> {reparation.clientComments}
                        </p>
                      </div>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                        onClick={() => completeReparation(reparation.id)}
                      >
                        Marcar como completada
                      </button>
                    </>
                  )}

                  {/* Si el cliente ha rechazado, puedes mostrar el comentario y volver a proponer */}
                  {reparation.clientApproval === "rejected" && (
                    <div className="mt-2 text-red-600">
                      El cliente ha rechazado el presupuesto: {reparation.clientComments}
                    </div>
                  )}

                  {/* Si ya hay feedback, muéstralo */}
                  {reparation.estimatedPrice !== null && (
                    <div className="mt-3 p-3 bg-amber-50 rounded">
                      <p className="text-base text-amber-700 font-semibold">
                        Presupuesto propuesto: {reparation.estimatedPrice} €
                      </p>
                      {reparation.adminComments && (
                        <p className="text-sm text-gray-700 mt-1">
                          <span className="font-medium">Comentario del técnico:</span> {reparation.adminComments}
                        </p>
                      )}
                      {reparation.clientApproval && (
                        <p className={`mt-2 text-sm font-medium ${reparation.clientApproval === "approved" ? "text-green-600" : "text-red-600"}`}>
                          {reparation.clientApproval === "approved"
                            ? "Presupuesto aprobado por el cliente"
                            : "Presupuesto rechazado por el cliente"}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No hay reparaciones pendientes.</p>
        )}
      </div>

      {/* Mantenimientos */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-amber-600 border-b-2 border-amber-600 pb-2">Mantenimientos</h2>
        {maintenances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maintenances.map((maintenance) => {
              const stateText =
                maintenance.state === 1
                  ? "Pendiente"
                  : maintenance.state === 2
                  ? "En proceso"
                  : maintenance.state === 3
                  ? "Completado"
                  : "Estado desconocido";
              return (
                <div key={maintenance.id} className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {maintenance.deviceType} ({maintenance.model})
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Cliente:</span> {maintenance.idClient?.email}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Procesador:</span> {maintenance.processor}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">RAM:</span> {maintenance.ram}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Almacenamiento:</span> {maintenance.storage}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Especificaciones:</span> {maintenance.specifications}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Fecha de mantenimiento:</span> {new Date(maintenance.maintenanceDate).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-medium">Estado:</span>
                    <select
                      value={maintenance.state}
                      onChange={e => updateMaintenanceState(maintenance.id, Number(e.target.value))}
                      className="border p-2 rounded"
                    >
                      <option value={1}>Pendiente</option>
                      <option value={2}>En proceso</option>
                      <option value={3}>Completado</option>
                    </select>
                    <span className="ml-2">{stateText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No hay mantenimientos pendientes.</p>
        )}
      </div>

      {/* Instalaciones */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-green-600 border-b-2 border-green-600 pb-2">Instalaciones</h2>
        {installations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installations.map((installation) => (
              <div key={installation.id} className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Modelo: {installation.model}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Procesador:</span> {installation.processor}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">RAM:</span> {installation.ram}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Almacenamiento:</span> {installation.storage}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Cliente:</span> {installation.idClient?.email}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Estado:</span> {installation.state}
                </p>

                {/* Si está pendiente y no tiene presupuesto */}
                {installation.state === "pendiente" && installation.estimatedPrice === null && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await sendAdminFeedback(
                        installation.id,
                        feedback[installation.id]?.estimatedPrice,
                        feedback[installation.id]?.adminComments
                      );
                      setFeedback((prev) => ({ ...prev, [installation.id]: { estimatedPrice: "", adminComments: "" } }));
                    }}
                  >
                    <input
                      type="number"
                      placeholder="Presupuesto (€)"
                      value={feedback[installation.id]?.estimatedPrice || ""}
                      onChange={e =>
                        setFeedback((prev) => ({
                          ...prev,
                          [installation.id]: { ...prev[installation.id], estimatedPrice: e.target.value }
                        }))
                      }
                      className="border p-2 rounded w-full mb-2"
                      required
                    />
                    <textarea
                      placeholder="Comentario para el cliente"
                      value={feedback[installation.id]?.adminComments || ""}
                      onChange={e =>
                        setFeedback((prev) => ({
                          ...prev,
                          [installation.id]: { ...prev[installation.id], adminComments: e.target.value }
                        }))
                      }
                      className="border p-2 rounded w-full mb-2"
                      required
                    />
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Enviar presupuesto</button>
                  </form>
                )}

                {/* Si el cliente ha aceptado y está en proceso, mostrar botón para completar */}
                {installation.state === "en_proceso" && (
                  <>
                    <div className="mb-2">
                      <p className="text-green-700 font-semibold">
                        Presupuesto aceptado: {installation.estimatedPrice} €
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Comentario admin:</span> {installation.adminComments}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Comentario cliente:</span> {installation.clientComments}
                      </p>
                    </div>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                      onClick={() => completeInstallation(installation.id)}
                    >
                      Marcar como completada
                    </button>
                  </>
                )}

                {/* Si el cliente ha rechazado, puedes mostrar el comentario y volver a proponer */}
                {installation.clientApproval === "rejected" && (
                  <div className="mt-2 text-red-600">
                    El cliente ha rechazado el presupuesto: {installation.clientComments}
                  </div>
                )}

                {/* Si ya hay feedback, muéstralo */}
                {installation.estimatedPrice !== null && (
                  <div className="mt-3 p-3 bg-amber-50 rounded">
                    <p className="text-base text-amber-700 font-semibold">
                      Presupuesto propuesto: {installation.estimatedPrice} €
                    </p>
                    {installation.adminComments && (
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Comentario del técnico:</span> {installation.adminComments}
                      </p>
                    )}
                    {installation.clientApproval && (
                      <p className={`mt-2 text-sm font-medium ${installation.clientApproval === "approved" ? "text-green-600" : "text-red-600"}`}>
                        {installation.clientApproval === "approved"
                          ? "Presupuesto aprobado por el cliente"
                          : "Presupuesto rechazado por el cliente"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay instalaciones pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default ManageAdminOrdersPage;