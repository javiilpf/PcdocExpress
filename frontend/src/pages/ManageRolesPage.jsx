import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { PacmanLoader } from "react-spinners";

const ManageRolesPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  // Obtener la lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        // Si tu API devuelve { data: [...] }
        setUsers(data.data || []);
      } catch (err) {
        toast.error(`Error: ${err}`, {
          position: "top-right",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, url]);

  // Asignar un nuevo rol al usuario seleccionado
  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) {
      toast.info("Por favor, selecciona un usuario y un rol");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/users/${selectedUser}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el rol del usuario");
      }

      toast.success("Rol actualizado correctamente", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#4CAF50",
          color: "#fff",
          marginTop: "180px",
        },
      });
      setSelectedUser("");
      setNewRole("");
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#f44336",
          color: "#fff",
          marginTop: "180px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-50 relative">
      {/* Loader global */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/60 backdrop-blur-sm rounded-lg">
          <PacmanLoader color="#f59e0b" size={25} />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Gestión de Roles</h1>
      <div className="mb-4">
        <label htmlFor="user" className="block font-medium mb-2">
          Selecciona un usuario:
        </label>
        <select
          id="user"
          className="w-full p-2 border rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          disabled={loading}
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} ({user.roles?.join(", ")})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block font-medium mb-2">
          Selecciona un nuevo rol:
        </label>
        <select
          id="role"
          className="w-full p-2 border rounded"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          disabled={loading}
        >
          <option value="">Selecciona un rol</option>
          <option value="ROLE_USER">Cliente</option>
          <option value="ROLE_EMPLOYER">Empleado</option>
          <option value="ROLE_ADMIN">Jefe</option>
        </select>
      </div>

      <button
        onClick={handleRoleChange}
        className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        disabled={loading}
      >
        Actualizar Rol
      </button>
    </div>
  );
};

export default ManageRolesPage;