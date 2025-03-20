import React from 'react';

const NewMaintenancePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Formulario de Mantenimiento
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

          {/* Especificaciones del Mantenimiento */}
          <div>
            <label htmlFor="maintenanceSpecs" className="block font-medium mb-1">
              Especificaciones del Mantenimiento
            </label>
            <textarea
              id="maintenanceSpecs"
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
  );
};

export default NewMaintenancePage;
