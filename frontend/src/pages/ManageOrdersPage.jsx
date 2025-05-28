import React, { useEffect, useState } from "react";
import { useMaintenance } from "../context/MaintenanceContext";
import { useReparation } from "../context/ReparationContext";
import { useInstallation } from "../context/InstallationContext";
import { toast } from "sonner";

const ManageOrdersPage = () => {
  const {
    maintenances,
    maintenancesUnasigned,
    AsignAdminMaintenance,
    setMaintenances,
    loading: maintenanceLoading,
  } = useMaintenance();
  const {
    Reparations,
    ReparationsUnasigned,
    AsignAdminMaintenance: AsignAdminReparation,
    loading: reparationLoading,
  } = useReparation();
  const {
    installations,
    InstallationsUnasigned,
    AsignAdminInstallation,
    setInstallations,
    loading: installationLoading,
  } = useInstallation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnassignedOrders = async () => {
      setLoading(true);
      await Promise.all([
        maintenancesUnasigned(),
        ReparationsUnasigned(),
        InstallationsUnasigned(),
      ]);
      setLoading(false);
    };

    fetchUnassignedOrders();
  }, []);

  const handleAcceptOrder = async (type, id) => {
    try {
      if (type === "maintenance") {
        await AsignAdminMaintenance(id);
        setMaintenances((prev) => prev.filter((maintenance) => maintenance.id !== id));
      } else if (type === "reparation") {
        await AsignAdminReparation(id);
      } else if (type === "installation") {
        await AsignAdminInstallation(id);
        setInstallations((prev) => prev.filter((installation) => installation.id !== id));
      }
      toast.success("Orden aceptada correctamente"),{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      };
    } catch (err) {
      console.error("Error al aceptar la orden:", err);
      toast.error("Hubo un error al aceptar la orden", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading || maintenanceLoading || reparationLoading || installationLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Órdenes Pendientes</h1>

      {/* Mantenimientos no asignados */}
      <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-amber-600 border-b-2 border-amber-600 pb-2">Mantenimientos</h2>
        {maintenances.length > 0 ? (
          <ul className="space-y-4">
            {maintenances.map((maintenance) => (
              <li
                key={maintenance.id}
                className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-lg font-semibold text-gray-800">
                  <strong>Cliente:</strong> {maintenance.idClient.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Dispositivo:</strong> {maintenance.deviceType} ({maintenance.model})
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Especificaciones:</strong> {maintenance.specifications}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Fecha:</strong>{" "}
                  {new Date(maintenance.maintenanceDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleAcceptOrder("maintenance", maintenance.id)}
                  className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300"
                >
                  Aceptar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay mantenimientos pendientes.</p>
        )}
      </div>

      {/* Reparaciones no asignadas */}
      <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-red-600 border-b-2 border-red-600 pb-2">Reparaciones</h2>
        {Reparations.length > 0 ? (
          <ul className="space-y-4">
            {Reparations.map((reparation) => (
              <li
                key={`reparation-${reparation.id}`} // Asegúrate de que la clave sea única
                className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-lg font-semibold text-gray-800">
                  <strong>Dispositivo:</strong> {reparation.deviceType} ({reparation.model})
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Problema:</strong> {reparation.issueDescription}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Fecha:</strong> {new Date(reparation.orderDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleAcceptOrder("reparation", reparation.id)}
                  className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300"
                >
                  Aceptar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay reparaciones pendientes.</p>
        )}
      </div>

      {/* Instalaciones no asignadas */}
      <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-green-600 border-b-2 border-green-600 pb-2">Instalaciones</h2>
        {installations.length > 0 ? (
          <ul className="space-y-4">
            {installations.map((installation) => (
              <li
                key={installation.id}
                className="p-6 bg-gradient-to-br from-amber-100 to-green-200 shadow-lg rounded-xl border border-green-300 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-green-900 mb-1">
                      <span className="mr-2">🛠️</span> Instalación #{installation.id}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Modelo:</strong> {installation.model}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Procesador:</strong> {installation.processor}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>RAM:</strong> {installation.ram}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Almacenamiento:</strong> {installation.storage}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Estado:</strong>{" "}
                      <span className="inline-block px-2 py-1 rounded bg-yellow-200 text-yellow-800 font-semibold">
                        {installation.state}
                      </span>
                    </p>
                    {/* Mostrar producto si existe */}
                    {installation.product && (
                      <div className="mt-2 flex items-center gap-3">
                        {installation.product.images && installation.product.images.length > 0 ? (
                          <img
                            src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${installation.product.images[0].urlImage}`}
                            alt={installation.product.productName}
                            className="w-14 h-14 object-cover rounded shadow"
                          />
                        ) : (
                          <img
                            src="/images/no-image.png"
                            alt="Sin imagen"
                            className="w-14 h-14 object-cover rounded shadow"
                          />
                        )}
                        <span className="text-base font-semibold text-green-800">
                          {installation.product.productName}
                        </span>
                      </div>
                    )}
                    {/* Feedback */}
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 italic">
                        <span className="font-medium text-green-700">Feedback:</span>{" "}
                        {installation.estimatedPrice
                          ? `Presupuesto propuesto: ${installation.estimatedPrice} €`
                          : "Aún no se ha propuesto presupuesto"}
                      </p>
                      {installation.adminComments && (
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-medium">Comentario admin:</span> {installation.adminComments}
                        </p>
                      )}
                      {installation.clientApproval && (
                        <p className={`text-xs mt-1 font-semibold ${installation.clientApproval === "approved" ? "text-green-600" : "text-red-600"}`}>
                          {installation.clientApproval === "approved"
                            ? "Presupuesto aprobado por el cliente"
                            : "Presupuesto rechazado por el cliente"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => handleAcceptOrder("installation", installation.id)}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay instalaciones pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default ManageOrdersPage;