import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ManageRolesPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
const url = import.meta.env.VITE_API_URL;

  // Obtener la lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Asignar un nuevo rol al usuario seleccionado
  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) {
      alert("Selecciona un usuario y un rol");
      return;
    }

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

      alert("Rol actualizado correctamente");
      setSelectedUser(null);
      setNewRole("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-50">
      <h1 className="text-2xl font-bold mb-4">Gestión de Roles</h1>
      <div className="mb-4">
        <label htmlFor="user" className="block font-medium mb-2">
          Selecciona un usuario:
        </label>
        <select
          id="user"
          className="w-full p-2 border rounded"
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} ({user.roles.join(", ")})
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
        >
          <option value="">Selecciona un rol</option>
          <option value="ROLE_USER">Cliente</option>
          <option value="ROLE_EMPLOYER">Empleado</option>
          <option value="ROLE_ADMIN">Jefe</option>
        </select>
      </div>

      <button
        onClick={handleRoleChange}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Actualizar Rol
      </button>
    </div>
  );
};

export default ManageRolesPage;