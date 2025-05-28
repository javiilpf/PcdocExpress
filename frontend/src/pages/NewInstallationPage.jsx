import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useInstallation } from "../context/InstallationContext";

const NewInstallationPage = () => {
  const { products, getProducts, loading } = useProducts();
  const { createInstallation } = useInstallation();
  const [selectedComponent, setSelectedComponent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [installationDetails, setInstallationDetails] = useState({
    model: "",
    processor: "",
    ram: "",
    storage: "",
    productId: "",
  });

  useEffect(() => {
    getProducts();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setInstallationDetails((prev) => ({
        ...prev,
        idClient: user.id,
      }));
    }
  }, []);

  useEffect(() => {
    if (selectedComponent) {
      const filtered = products.filter(
        (product) =>
          product.type === selectedComponent &&
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedComponent, searchQuery, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Por favor, selecciona un producto para instalar.");
      return;
    }
    const formData = {
      productId: selectedProduct.id,
      model: installationDetails.model,
      processor: installationDetails.processor,
      ram: installationDetails.ram,
      storage: installationDetails.storage,
      // NO enviar idClient
    };
    createInstallation(formData);
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

      {/* Contenido principal */}
      <div className="relative z-10 flex justify-center items-center min-h-screen pt-5 px-4">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Formulario de Instalación
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos principales en 2 columnas en desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Modelo */}
              <div>
                <label htmlFor="model" className="block font-medium mb-1">
                  Modelo del Dispositivo
                </label>
                <input
                  type="text"
                  id="model"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ingresa el modelo del dispositivo"
                  value={installationDetails.model}
                  onChange={(e) =>
                    setInstallationDetails({
                      ...installationDetails,
                      model: e.target.value,
                    })
                  }
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
                  placeholder="Ingresa el procesador"
                  value={installationDetails.processor}
                  onChange={(e) =>
                    setInstallationDetails({
                      ...installationDetails,
                      processor: e.target.value,
                    })
                  }
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
                  placeholder="Ingresa la cantidad de RAM"
                  value={installationDetails.ram}
                  onChange={(e) =>
                    setInstallationDetails({
                      ...installationDetails,
                      ram: e.target.value,
                    })
                  }
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
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Ingresa la capacidad de almacenamiento"
                  value={installationDetails.storage}
                  onChange={(e) =>
                    setInstallationDetails({
                      ...installationDetails,
                      storage: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Seleccionar componente */}
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
                <option value="gpu">GPU</option>
                <option value="cpu">CPU</option>
                <option value="motherboard">Placa Base</option>
                <option value="ssd">SSD</option>
                <option value="hdd">HDD</option>
                <option value="cooler">Cooler</option>
              </select>
            </div>

            {/* Buscar y seleccionar producto */}
            {selectedComponent && (
              <div>
                <label htmlFor="searchComponent" className="block font-medium mb-1">
                  Buscar{" "}
                  {selectedComponent.charAt(0).toUpperCase() +
                    selectedComponent.slice(1)}{" "}
                  para Instalar
                </label>
                <input
                  type="text"
                  id="searchComponent"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder={`Buscar ${selectedComponent}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {loading && (
                  <p className="text-gray-500 mt-2">Cargando productos...</p>
                )}
                <ul className="mt-4 max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className={`p-2 border rounded-md mb-2 cursor-pointer flex items-center hover:bg-gray-100 ${
                        selectedProduct?.id === product.id
                          ? "bg-blue-100 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${product.images[0].urlImage}`
                            : "/images/no-image.png"
                        }
                        alt={product.productName}
                        className="w-10 h-10 object-cover mr-4"
                      />
                      <span>
                        {product.productName} - {product.price}€
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewInstallationPage;

