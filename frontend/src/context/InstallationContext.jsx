import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useAuth();

  // Función para buscar productos
  const searchProducts = async (query, type) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/products?query=${query}&type=${type}`, // Filtrar por tipo
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al buscar productos");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Error buscando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una instalación
  const createInstallation = async (installationData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(installationData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la instalación");
      }

      const data = await response.json();
      setInstallations([...installations, data]);
    } catch (err) {
      console.error("Error creando instalación:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener instalaciones de un usuario
  const getUserInstallations = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las instalaciones");
      }

      const data = await response.json();
      setInstallations(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Error obteniendo instalaciones:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const InstallationsUnasigned = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/unassigned`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los mantenimientos sin asignar");
      }
      const data = await response.json();

      setInstallations(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching maintenances:", err); // Para depuración
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const AsignAdminInstallation = async (idInstallation) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/assign/${idInstallation}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(idInstallation),
      });
      const data = await response.json();
      setInstallations([...installations, data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getAssignedInstallations = async (idUser) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/assigned/${idUser}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las instalaciones asignadas");
      }

      const data = await response.json();
      setInstallations(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error obteniendo instalaciones asignadas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Admin: proponer presupuesto y comentario
  const sendAdminFeedback = async (id, estimatedPrice, adminComments) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/${id}/feedback`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estimatedPrice, adminComments }),
      });
      if (!response.ok) throw new Error("Error al enviar feedback");
      const data = await response.json();
      // Actualiza la instalación en el estado
      setInstallations((prev) =>
        prev.map((inst) => (inst.id === id ? data.data : inst))
      );
      return data.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cliente: aceptar/rechazar presupuesto
  const sendClientApproval = async (id, clientApproval, clientComments) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/${id}/client-approval`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientApproval, clientComments }),
      });
      if (!response.ok) throw new Error("Error al enviar respuesta");
      const data = await response.json();
      setInstallations((prev) =>
        prev.map((inst) => (inst.id === id ? data.data : inst))
      );
      return data.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Admin: marcar como completada
  const completeInstallation = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/${id}/complete`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al completar instalación");
      const data = await response.json();
      setInstallations((prev) =>
        prev.map((inst) => (inst.id === id ? data.data : inst))
      );
      return data.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cliente: pagar instalación
  const payInstallation = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/installation/${id}/pay`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al pagar instalación");
      // Opcional: puedes actualizar el estado local si backend devuelve la instalación
      return true;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InstallationContext.Provider
      value={{
        installations,
        searchResults,
        loading,
        error,
        searchProducts,
        createInstallation,
        getUserInstallations,
        InstallationsUnasigned,
        AsignAdminInstallation,
        getAssignedInstallations,
        sendAdminFeedback,
        sendClientApproval,
        completeInstallation,
        payInstallation,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => {
  return useContext(InstallationContext);
};