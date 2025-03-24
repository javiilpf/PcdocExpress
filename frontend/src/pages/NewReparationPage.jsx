import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReparation } from '../context/ReparationContext';

const NewReparationPage = () => {
  const [formData, setFormData] = useState({
    deviceType: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    specifications: "",
    issueDescription: "",
    observations: ""

  });
  const { createReparation } = useReparation();
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
      await createReparation(formData); 
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
        
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-50">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">
              Formulario de Reparación
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
                  id="deviceType"
                  name="deviceType" // Asegúrate de incluir el atributo name
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  onChange={handleChange}
                  value={formData.deviceType} // Vincula el valor al estado
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="movil">Móvil</option>
                  <option value="tablet">Tablet</option>
                  <option value="ordenador">Ordenador</option>
                </select>
              </div>

              {/* Modelo del dispositivo */}
              <div>
                <label htmlFor="model" className="block font-medium mb-1">
                  Modelo del Dispositivo
                </label>
                <input
                  type="text"
                  id="model"
                  name="model" // Asegúrate de incluir el atributo name
                  onChange={handleChange}
                  value={formData.model} // Vincula el valor al estado
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
                  id="processor"
                  name="processor" // Asegúrate de incluir el atributo name
                  onChange={handleChange}
                  value={formData.processor} // Vincula el valor al estado
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
                  id="ram"
                  name="ram" // Asegúrate de incluir el atributo name
                  onChange={handleChange}
                  value={formData.ram} // Vincula el valor al estado
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
                  id="storage"
                  name="storage" // Asegúrate de incluir el atributo name
                  onChange={handleChange}
                  value={formData.storage} // Vincula el valor al estado
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ejemplo: 512 GB SSD"
                />
              </div>

              {/* Descripción de la Avería */}
              <div>
                <label htmlFor="issueDescription" className="block font-medium mb-1">
                  Descripción de la Avería
                </label>
                <textarea
                  id="issueDescription"
                  name="issueDescription" // Asegúrate de incluir el atributo name
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  onChange={handleChange}
                  value={formData.issueDescription} // Vincula el valor al estado
                  rows="3"
                  placeholder="Describe el problema del dispositivo"
                />
              </div>

              {/* Observaciones del Cliente */}
              <div>
                <label htmlFor="observations" className="block font-medium mb-1">
                  Observaciones del Cliente
                </label>
                <textarea
                  id="observations"
                  name="observations" // Asegúrate de incluir el atributo name
                  onChange={handleChange}
                  value={formData.observations} // Vincula el valor al estado
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  rows="3"
                  placeholder="Añade cualquier otra observación importante"
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

export default NewReparationPage;


