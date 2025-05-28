import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Crear un nuevo chat
  const createChat = async (type, id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, id }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el chat");
      }

      const data = await response.json();
      setChats([...chats, data]);
      return data;
    } catch (err) {
      console.error("Error creando el chat:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener mensajes de un chat
  const getChatMessages = async (chatId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los mensajes del chat");
      }

      const data = await response.json();
      setMessages(data);
      return data;
    } catch (err) {
      console.error("Error obteniendo mensajes del chat:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agregar un mensaje a un chat
  const addMessageToChat = async (chatId, content) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const data = await response.json();
      setMessages([...messages, data]);
      return data;
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener chat por tipo e id
  const getChatByTypeAndId = async (type, id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener el chat asociado");
      }

      const data = await response.json();
      return data.chatId; // Devuelve el chatId asociado
    } catch (err) {
      console.error("Error obteniendo el chat asociado:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        loading,
        error,
        createChat,
        getChatMessages,
        addMessageToChat,
        getChatByTypeAndId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};