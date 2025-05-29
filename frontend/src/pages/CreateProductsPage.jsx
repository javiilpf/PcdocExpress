import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { toast } from "sonner"; 
const CreateProductsPage = () => {
  const { createProduct, loading, error } = useProducts();
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    valoration: "",
    type: "mobile",
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((img) => data.append("images[]", img));
    try {
      await createProduct(data);
      toast.success("Producto creado con éxito", {
        style: {
          background: "linear-gradient(#FFB300, #FFA000)", 
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          border: "2px solid #1b5e20",
          marginTop: "180px",
        },
        icon: "✅",
        duration: 4000,
      });
      setFormData({
        product_name: "",
        description: "",
        price: "",
        stock: "",
        valoration: "",
        type: "mobile",
      });
      setImages([]);
    } catch (err) {
      toast.error("Error al crear el producto: " + err.message, {
        style: {
          background: "linear-gradient(#FFB300, #FFA000)", // Efecto degradado
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          border: "2px solid #1b5e20",
          marginTop: "180px",
        },
        icon: "🚨",
        duration: 4000,
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full pt-35 pb-10 overflow-hidden">
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
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Crear Producto</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product_name" className="block font-medium mb-1">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block font-medium mb-1">
                  Precio
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="stock" className="block font-medium mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="valoration" className="block font-medium mb-1">
                  Valoración
                </label>
                <input
                  type="number"
                  id="valoration"
                  name="valoration"
                  value={formData.valoration}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="type" className="block font-medium mb-1">
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  required
                >
                  <option value="mobile">Móvil</option>
                  <option value="tablet">Tablet</option>
                  <option value="computer">Ordenador</option>
                  <option value="ram">RAM</option>
                  <option value="ssd">SSD</option>
                  <option value="ssd_m2">SSD M.2</option>
                  <option value="hdd">HDD</option>
                  <option value="gpu">GPU</option>
                  <option value="cpu">CPU</option>
                  <option value="monitor">Monitor</option>
                  <option value="cooler">Cooler</option>
                  <option value="motherboard">Placa Base</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  rows={4}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Imágenes</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-3 border rounded-md focus:ring focus:ring-amber-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Producto"}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductsPage;
