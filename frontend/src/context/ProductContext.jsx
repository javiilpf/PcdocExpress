import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/product`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error en el fetch sabes ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setProducts(Array.isArray(data) ? data : data.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Obtener un producto por ID
    const getProductById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/product/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            const data = await response.json();
            return data.data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Crear un producto
    const createProduct = async (productData) => {
        setLoading(true);
        try {
            let options = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: productData
            };

            // Si NO es FormData, enviar como JSON
            if (!(productData instanceof FormData)) {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(productData);
            }

            const response = await fetch(`${API_URL}/product`, options);
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            const data = await response.json();
            setProducts([...products, data.data]);
            return data.data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                setLoading,
                error,
                getProducts,
                getProductById,
                createProduct,
                
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};