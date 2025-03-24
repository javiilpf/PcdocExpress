import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const url= import.meta.env.VITE_API_URL;
// Crear el contexto
const ReparationContext = createContext();

// Proveedor del contexto
export const ReparationProvider = ({ children }) => {
    const [Reparations, setReparations] = useState([]);
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

    return (
        <ReparationContext.Provider value={{ Reparations, createReparation, getUserReparations, loading, error }}>
            {children}
        </ReparationContext.Provider>
    );
};

// Hook para usar el contexto
export const useReparation = () => {
    return useContext(ReparationContext);
};