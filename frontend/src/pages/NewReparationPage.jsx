import React from 'react';

const NewReparationPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Formulario de Reparación
        </h1>
        <form className="space-y-4">
          {/* Tipo de dispositivo */}
          <div>
            <label htmlFor="deviceType" className="block font-medium mb-1">
              Tipo de Dispositivo
            </label>
            <select
              id="deviceType"
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
            >
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
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
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
  );
};

export default NewReparationPage;


