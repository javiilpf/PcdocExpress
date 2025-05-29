import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const url= import.meta.env.VITE_API_URL;
// Crear el contexto
const ReparationContext = createContext();

// Proveedor del contexto
export const ReparationProvider = ({ children }) => {
    const [Reparations, setReparations] = useState([]);
    const [AdminReparations, setAdminReparations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    // Función para crear un mantenimiento
    const createReparation = async (ReparationData) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/reparation`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(ReparationData)
            });
            const data = await response.json();
            setReparations([...Reparations, data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener mantenimientos de un usuario
    const getUserReparations = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/reparation/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener las reparaciones');
            }
            const data = await response.json();
            console.log('Reparations data:', data); // Para depuración
            setReparations(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            console.error('Error fetching reparations:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const ReparationsUnasigned= async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/reparation/unassigned`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener los mantenimientos sin asignar');
            }
            const data = await response.json();
            
            setReparations(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            console.error('Error fetching maintenances:', err); // Para depuración
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const AsignAdminMaintenance = async (idMaintenance, idAdminMaintenance) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/reparation/assign/${idMaintenance}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(idAdminMaintenance)
            });
            const data = await response.json();
            setReparations([...Reparations, data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getAsignedReparations= async (idUser) => {
        setLoading(true);
        try {
          const response = await fetch(`${url}/reparation/assigned/${idUser}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error al obtener los mantenimientos asignados");
          }
          const data = await response.json();
          setAdminReparations(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
          console.error("Error fetching maintenances:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      const updateReparation = async (id, updates) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/reparation/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la reparación');
            }

            const data = await response.json();
            setReparations((prev) =>
                prev.map((reparation) => (reparation.id === id ? data.data : reparation))
            );
            return data.data;
        } catch (err) {
            console.error('Error actualizando la reparación:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const approveReparation = async (id, approval) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/reparation/approve/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ approval })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado de aprobación');
            }

            const data = await response.json();
            setReparations((prev) =>
                prev.map((reparation) => (reparation.id === id ? data.data : reparation))
            );
            return data.data;
        } catch (err) {
            console.error('Error actualizando el estado de aprobación:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Admin: enviar presupuesto y comentario
const sendAdminFeedback = async (id, estimatedPrice, adminComments) => {
    setLoading(true);
    try {
        const response = await fetch(`${url}/reparation/${id}/feedback`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ estimatedPrice, adminComments }),
        });
        if (!response.ok) throw new Error("Error al enviar feedback");
        const data = await response.json();
        setAdminReparations((prev) =>
            prev.map((rep) => (rep.id === id ? data.data : rep))
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
        const response = await fetch(`${url}/reparation/${id}/client-approval`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ clientApproval, clientComments }),
        });
        if (!response.ok) throw new Error("Error al enviar respuesta");
        const data = await response.json();
        setReparations((prev) =>
            prev.map((rep) => (rep.id === id ? data.data : rep))
        );
        return data.data;
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

// Admin: marcar como completada
const completeReparation = async (id) => {
    setLoading(true);
    try {
        const response = await fetch(`${url}/reparation/${id}/complete`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("Error al completar reparación");
        const data = await response.json();
        setAdminReparations((prev) =>
            prev.map((rep) => (rep.id === id ? data.data : rep))
        );
        return data.data;
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <ReparationContext.Provider value={{
            Reparations,
            createReparation,
            getUserReparations,
            loading,
            AdminReparations,
            ReparationsUnasigned,
            AsignAdminMaintenance,
            getAsignedReparations,
            error,
            updateReparation,
            approveReparation,
            sendAdminFeedback,
            sendClientApproval,
            completeReparation
        }}>
            {children}
        </ReparationContext.Provider>
    );
};

// Hook para usar el contexto
export const useReparation = () => {
    return useContext(ReparationContext);
};