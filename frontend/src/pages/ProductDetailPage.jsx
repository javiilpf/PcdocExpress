import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext"; // Importar el contexto del carrito
import { Carousel } from "react-responsive-carousel";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner"; // Importar la librería de notificaciones

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart(); // Método para añadir al carrito
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // Nueva funcionalidad para cantidad
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Debes iniciar sesión para añadir productos al carrito.",{
        style: {
          background: "linear-gradient(135deg, #FFB300, #FFA000)", // Efecto degradado
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          border: "2px solidrgb(23, 25, 23)",
          marginTop: "180px",
        },
        icon: "🛒",
        duration: 4000,
      });
      return;
    }

    try {
      await addToCart(user.id, product.id, quantity); // Añadir la cantidad seleccionada al carrito
      toast.success(`Producto ${product.productName} añadido al carrito`, {
        style: {
          background: "linear-gradient(135deg, #FFB300, #FFA000)", // Efecto degradado
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          border: "2px solid #1b5e20",
          marginTop: "165px",
        },
        icon: "🛒",
        duration: 4000,
      });
    } catch (err) {
      console.error("Error al añadir al carrito:", err);
      toast.error(`Hubo un error al añadir el producto al carrito`, {
        style: {
          background: "red",
          color: "white",
          border: "1px solid black",
          marginTop: "180px",
        },
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await getProductById(id);
        setProduct(product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="px-3 pt-30 text-gray-500 hover:text-orange-700 transition duration-300">
        <a href="/shop">Volver a la tienda</a>
        </div>
      <div className="container mx-auto px-4 py-8 flex">
        {/* Carrusel en la parte izquierda */}
        
        <div className="w-1/2">
          {product.images && product.images.length > 0 && (
            <Carousel
              showThumbs={false}
              infiniteLoop
              showArrows={true}
              showIndicators={true}
              swipeable={true}
              emulateTouch={true}
              interval={3000}
            >
              {product.images.map((image) => (
                <div key={image.id}>
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${image.urlImage}`}
                    alt={product.productName}
                    className="w-full h-96 object-cover"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>

        {/* Detalles del producto en la parte derecha */}
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-semibold mb-4">{product.productName}</h2>
                {/* Valoración del producto aunque sea 0 */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        product.valoration && index < product.valoration
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <span className="text-lg font-bold text-amber-600 mb-4 block">
            {product.price}€
          </span>

          {/* Seleccionar cantidad */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 text-gray-700">
              Cantidad:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors duration-300"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailPage;
