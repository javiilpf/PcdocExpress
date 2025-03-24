import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useMaintenance } from "../context/MaintenanceContext";

const NewMaintenancePage = () => {
  const [formData, setFormData] = useState({
    deviceType: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    specifications: "",
  });
  const { createMaintenance } = useMaintenance();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Inicializa estado para el loader.
  const [error, setErrorMessage] = useState(""); // Estado para los mensajes de error.

  // Manejar el cambio en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // Validar el formulario antes de enviarlo
  const validateForm = () => {
    const { deviceType, model, processor, ram, storage } = formData;
    if (!deviceType || !model || !processor || !ram || !storage) {
      setErrorMessage("Todos los campos son obligatorios.");
      return false;
    }
    setErrorMessage(""); // Limpia cualquier error previo.
    return true;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); 
    try {
      await createMaintenance(formData); 
      navigate("/"); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg z-10">
          <PacmanLoader color="#3a6bca" size={25} />
        </div>
      )}

      {!loading && (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">
              Formulario de Mantenimiento
            </h1>

            {/* Mensaje de error */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo de dispositivo */}
              <div>
                <label htmlFor="deviceType" className="block font-medium mb-1">
                  Tipo de Dispositivo
                </label>
                <select
                  name="deviceType"
                  id="deviceType"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona el tipo de dispositivo
                  </option>
                  <option value="mobile">Móvil</option>
                  <option value="tablet">Tablet</option>
                  <option value="computer">Ordenador</option>
                </select>
              </div>

              {/* Modelo del dispositivo */}
              <div>
                <label htmlFor="model" className="block font-medium mb-1">
                  Modelo del Dispositivo
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Introduce el modelo"
                />
              </div>

              {/* Procesador */}
              <div>
                <label htmlFor="processor" className="block font-medium mb-1">
                  Procesador
                </label>
                <input
                  type="text"
                  name="processor"
                  id="processor"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ejemplo: Intel Core i7"
                />
              </div>

              {/* RAM */}
              <div>
                <label htmlFor="ram" className="block font-medium mb-1">
                  RAM
                </label>
                <input
                  type="text"
                  name="ram"
                  id="ram"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ejemplo: 16 GB"
                />
              </div>

              {/* Almacenamiento Actual */}
              <div>
                <label htmlFor="storage" className="block font-medium mb-1">
                  Almacenamiento Actual
                </label>
                <input
                  type="text"
                  name="storage"
                  id="storage"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ejemplo: 512 GB SSD"
                />
              </div>

              {/* Especificaciones del Mantenimiento */}
              <div>
                <label
                  htmlFor="maintenanceSpecs"
                  className="block font-medium mb-1"
                >
                  Especificaciones del Mantenimiento
                </label>
                <textarea
                  name="specifications"
                  id="specifications"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  rows="3"
                  placeholder="Describe las especificaciones del mantenimiento"
                />
              </div>

              {/* Botón Enviar */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMaintenancePage;

