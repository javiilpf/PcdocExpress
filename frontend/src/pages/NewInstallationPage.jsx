import React, { useState } from 'react';

const NewInstallationPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Formulario de Instalación
        </h1>
        <form className="space-y-4">
          {/* Seleccionar Componente */}
          <div>
            <label htmlFor="component" className="block font-medium mb-1">
              Componente para Instalar
            </label>
            <select
              id="component"
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
            >
              <option value="">Seleccione un componente</option>
              <option value="ram">RAM</option>
              <option value="grafica">Gráfica</option>
              <option value="procesador">Procesador</option>
              <option value="disipador">Disipador</option>
              <option value="caja-torre">Caja/Torre</option>
              <option value="almacenamiento">Almacenamiento</option>
            </select>
          </div>

          {/* Sección de búsqueda dinámica */}
          {selectedComponent && (
            <div>
              <label htmlFor="searchComponent" className="block font-medium mb-1">
                Buscar {selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1)} para Instalar
              </label>
              <input
                type="text"
                id="searchComponent"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                placeholder={`Buscar ${selectedComponent}`}
              />
            </div>
          )}

          {/* Información del Dispositivo */}
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

export default NewInstallationPage;
