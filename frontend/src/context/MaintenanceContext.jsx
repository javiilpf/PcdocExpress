import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const url = import.meta.env.VITE_API_URL;
// Crear el contexto
const MaintenanceContext = createContext();

// Proveedor del contexto
export const MaintenanceProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ setError] = useState(null);
  const { token } = useAuth();

  // Crear un nuevo mantenimiento
  const createMaintenance = async (maintenanceData) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(maintenanceData),
      });
      if (!response.ok) {
        throw new Error("Error al crear el mantenimiento");
      }
      return await response.json();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // Obtener mantenimientos del usuario
  const getUserMaintenances = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/maintenance/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los mantenimientos del usuario");
      }
      const data = await response.json();
      setMaintenances(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching maintenances:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const maintenancesUnasigned = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/maintenance/unassigned`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los mantenimientos sin asignar");
      }
      const data = await response.json();
      setMaintenances(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching maintenances:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const AsignAdminMaintenance = async (idMaintenance) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/maintenance/assign/${idMaintenance}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al asignar el mantenimiento");
      }
      return await response.json();
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getAsignedMaintenances = async (idUser) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/maintenance/assigned/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los mantenimientos asignados");
      }
      const data = await response.json();
      setMaintenances(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching maintenances:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateMaintenanceState = async (id, state) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/maintenance/${id}/state`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ state }),
      });
      if (!response.ok) throw new Error("Error al actualizar el estado");
      const data = await response.json();
      setMaintenances((prev) =>
        prev.map((m) => (m.id === id ? { ...m, state } : m))
      );
      return data.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaintenanceContext.Provider value={{
      maintenances,
      getAsignedMaintenances,
      loading,
      createMaintenance,
      AsignAdminMaintenance,
      getUserMaintenances,
      maintenancesUnasigned,
      updateMaintenanceState,
    }}>
      {children}
    </MaintenanceContext.Provider>
  );
};

// Hook para usar el contexto
export const useMaintenance = () => {
  return useContext(MaintenanceContext);
};