import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReparation } from "../context/ReparationContext";
import { PacmanLoader } from "react-spinners";

const NewReparationPage = () => {
  const [formData, setFormData] = useState({
    deviceType: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    issue_description: "",
    observations: "",
  });
  const { createReparation } = useReparation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { deviceType, model, processor, ram, storage, issue_description, observations } = formData;
    if (!deviceType || !model || !processor || !ram || !storage || !issue_description || !observations) {
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
      await createReparation(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error al enviar el formulario.");
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
      {/* Capa de desenfoque */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 flex justify-center items-center min-h-screen pt-5 px-4">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Formulario de Reparación
          </h1>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          {loading && (
            <div className="flex justify-center my-6">
              <PacmanLoader color="#f59e0b" size={25} />
            </div>
          )}

          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tipo de Dispositivo */}
                <div>
                  <label htmlFor="deviceType" className="block font-medium mb-1">
                    Tipo de Dispositivo
                  </label>
                  <select
                    id="deviceType"
                    name="deviceType"
                    className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                    onChange={handleChange}
                    value={formData.deviceType}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="mobile">Móvil</option>
                    <option value="tablet">Tablet</option>
                    <option value="computer">Ordenador</option>
                  </select>
                </div>

                {/* Modelo */}
                <div>
                  <label htmlFor="model" className="block font-medium mb-1">
                    Modelo del Dispositivo
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                    placeholder="Ejemplo: MacBook Pro"
                    onChange={handleChange}
                    value={formData.model}
                  />
                </div>

                {/* Procesador */}
                <div>
                  <label htmlFor="processor" className="block font-medium mb-1">
                    Procesador
                  </label>
                  <input
                    type="text"
                    id="processor"
                    name="processor"
                    className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                    placeholder="Ejemplo: Intel Core i7"
                    onChange={handleChange}
                    value={formData.processor}
                  />
                </div>

                {/* RAM */}
                <div>
                  <label htmlFor="ram" className="block font-medium mb-1">
                    RAM
                  </label>
                  <input
                    type="text"
                    id="ram"
                    name="ram"
                    className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                    placeholder="Ejemplo: 16 GB"
                    onChange={handleChange}
                    value={formData.ram}
                  />
                </div>

                {/* Almacenamiento */}
                <div>
                  <label htmlFor="storage" className="block font-medium mb-1">
                    Almacenamiento
                  </label>
                  <input
                    type="text"
                    id="storage"
                    name="storage"
                    className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                    placeholder="Ejemplo: 512 GB SSD"
                    onChange={handleChange}
                    value={formData.storage}
                  />
                </div>

                {/* Observaciones */}
                <div>
                  <label htmlFor="observations" className="block font-medium mb-1">
                    Observaciones del Cliente
                  </label>
                  <textarea
                    id="observations"
                    name="observations"
                    rows="3"
                    className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                    placeholder="Información adicional del cliente"
                    onChange={handleChange}
                    value={formData.observations}
                  />
                </div>
              </div>

              {/* Descripción Avería */}
              <div>
                <label htmlFor="issue_description" className="block font-medium mb-1">
                  Descripción de la Avería
                </label>
                <textarea
                  id="issue_description"
                  name="issue_description"
                  rows="4"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  placeholder="Describe el problema detalladamente"
                  onChange={handleChange}
                  value={formData.issue_description}
                />
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewReparationPage;
