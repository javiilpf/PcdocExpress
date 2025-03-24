import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useMaintenance } from "../context/MaintenanceContext";
import { useReparation } from "../context/ReparationContext";

const ApplicationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { maintenances, getUserMaintenances, loading: maintenanceLoading } = useMaintenance();
  const { Reparations, getUserReparations, loading: reparationLoading } = useReparation();

  useEffect(() => {
    if (user?.id) {
      getUserMaintenances(user.id);
      getUserReparations(user.id);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-6 bg-gray-100 min-h-screen">
      <div className="p-6 bg-gray-200 text-center">
        <h1 className="text-3xl font-bold">Nuestros servicios disponibles:</h1>
        <p className="text-sm">Elija un servicio para continuar</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/application/reparation/new")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Reparación
        </button>
        <button
          onClick={() => navigate("/application/maintenance/new")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
        >
          Mantenimiento
        </button>
        <button
          onClick={() => navigate("/application/installation/new")}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
        >
          Instalación
        </button>
      </div>

      {/* Segunda sección: Servicios realizados */}
      <div className="mt-6 w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tus servicios realizados:</h2>
        {(maintenanceLoading || reparationLoading) ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Sección de Mantenimientos */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Mantenimientos:</h3>
              {maintenances && maintenances.length > 0 ? (
                <ul className="list-disc pl-6">
                  {maintenances.map((maintenance) => (
                    <li key={maintenance.id} className="text-gray-700">
                      {maintenance.deviceType} - {new Date(maintenance.maintenanceDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay mantenimientos registrados.</p>
              )}
            </div>

            {/* Sección de Reparaciones */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Reparaciones:</h3>
              {Reparations && Reparations.length > 0 ? (
                <ul className="list-disc pl-6">
                  {Reparations.map((reparation) => (
                    <li key={reparation.id} className="text-gray-700">
                      {reparation.deviceType} - {new Date(reparation.orderDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay reparaciones registradas.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;