import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const { token } = useAuth();

  const getCart = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching cart");
      }
        const data = await response.json();
        console.log(data);
      return data;
      
      
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const addToCart = async (userId, productId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          products: [
            {
              productId,
              quantity,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Error al introducir el producto al carrito");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      
    }
  };

  const removeFromCart = async (userId, productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al introducir el producto al carrito");
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateQuantity = async (userId, productId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la cantidad del producto");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
