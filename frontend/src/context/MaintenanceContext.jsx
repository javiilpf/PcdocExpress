import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const url = import.meta.env.VITE_API_URL;
// Crear el contexto
const MaintenanceContext = createContext();

// Proveedor del contexto
export const MaintenanceProvider = ({ children }) => {
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    // Función para crear un mantenimiento
    const createMaintenance = async (maintenanceData) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/maintenance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(maintenanceData)
            });
            const data = await response.json();
            setMaintenances([...maintenances, data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener mantenimientos de un usuario
    const getUserMaintenances = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/maintenance/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener los mantenimientos');
            }
            const data = await response.json();
            console.log('Maintenances data:', data); // Para depuración
            setMaintenances(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            console.error('Error fetching maintenances:', err); // Para depuración
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MaintenanceContext.Provider value={{ maintenances, createMaintenance, getUserMaintenances, loading, error }}>
            {children}
        </MaintenanceContext.Provider>
    );
};

// Hook para usar el contexto
export const useMaintenance = () => {
    return useContext(MaintenanceContext);
};