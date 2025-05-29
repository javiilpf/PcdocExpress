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
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const validateForm = () => {
    const { deviceType, model, processor, ram, storage } = formData;
    if (!deviceType || !model || !processor || !ram || !storage) {
      setErrorMessage("Todos los campos son obligatorios.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

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
    <div className="relative min-h-screen w-full pt-20 overflow-hidden">
      {/* Imagen de fondo difuminada */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/formulatioInstalacion.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Capa de desenfoque y opacidad */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-0" />

      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/60 backdrop-blur-sm">
          <PacmanLoader color="#f59e0b" size={25} />
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 flex justify-center items-center min-h-screen pt-5 px-4">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Formulario de Mantenimiento
          </h1>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos en 2 columnas en pantallas grandes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deviceType" className="block font-medium mb-1">
                  Tipo de Dispositivo
                </label>
                <select
                  name="deviceType"
                  id="deviceType"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
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

              <div>
                <label htmlFor="model" className="block font-medium mb-1">
                  Modelo del Dispositivo
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  placeholder="Introduce el modelo"
                />
              </div>

              <div>
                <label htmlFor="processor" className="block font-medium mb-1">
                  Procesador
                </label>
                <input
                  type="text"
                  name="processor"
                  id="processor"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  placeholder="Ejemplo: Intel Core i7"
                />
              </div>

              <div>
                <label htmlFor="ram" className="block font-medium mb-1">
                  RAM
                </label>
                <input
                  type="text"
                  name="ram"
                  id="ram"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  placeholder="Ejemplo: 16 GB"
                />
              </div>

              <div>
                <label htmlFor="storage" className="block font-medium mb-1">
                  Almacenamiento Actual
                </label>
                <input
                  type="text"
                  name="storage"
                  id="storage"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  placeholder="Ejemplo: 512 GB SSD"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="specifications" className="block font-medium mb-1">
                  Especificaciones del Mantenimiento
                </label>
                <textarea
                  name="specifications"
                  id="specifications"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  rows="3"
                  placeholder="Describe las especificaciones del mantenimiento"
                />
              </div>
            </div>

            {/* Botón Enviar */}
            <button
              type="submit"
              className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMaintenancePage;


