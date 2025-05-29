import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const ShopPage = () => {
  const { products, getProducts, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.info("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }

    try {
      await addToCart(user.id, product.id, 1);
      toast.success(`Producto ${product.productName} añadido al carrito`, {
        style: {
          background: "linear-gradient(135deg, #4caf50, #2e7d32)",
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
        },
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="fixed left-0 right-0 top-[170px] bottom-0 flex items-center justify-center z-50 bg-white/15 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!Array.isArray(products)) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-28 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
          >
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
                      className="w-full h-60 object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            )}

            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/products/${product.id}`} className="block">
                <h2 className="text-xl font-semibold mb-2">
                  {product.productName}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-auto">
                <span className="text-lg font-bold text-amber-600 block mb-1">
                  {product.price}€
                </span>

                {/* Mostrar estrellas incluso si no hay valoración */}
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

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-amber-400 text-neutral-50 py-2 rounded-md hover:bg-amber-700 hover:text-white transition-colors duration-300"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
