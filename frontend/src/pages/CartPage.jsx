import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Importar el contexto del carrito
import { useProducts } from "../context/ProductContext"; // Importar el contexto de productos
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner"; 

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { getCart, updateQuantity, removeFromCart } = useCart(); // Métodos del contexto del carrito
  const { getProductById } = useProducts(); // Obtener la función para obtener productos por ID
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      console.error("El usuario no está definido");
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      const cart = await getCart(user.id); // Obtener el carrito desde el backend

      // Enriquecer los datos de los productos con información adicional
      const enrichedProducts = await Promise.all(
        cart.products.map(async (product) => {
          const productDetails = await getProductById(product.productId); // Obtener detalles del producto
          return {
            ...product,
            ...productDetails, // Combinar la información del producto con la cantidad
          };
        })
      );
      setLoading(false);
      setCartItems(enrichedProducts); // Establecer los productos enriquecidos
    };

    fetchCart();
  }, []);

  
  const handleQuantityChange = async (productId, newQuantity) => {
    // Actualizar el estado local inmediatamente
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Solo enviar la actualización al backend si la cantidad es mayor a 0
    if (newQuantity > 0) {
      await updateQuantity(user.id, productId, newQuantity); // Actualizar la cantidad en el backend
    }
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(user.id, productId); // Eliminar el producto del backend
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
    toast.success(`Producto eliminado del carrito`, {
            style: {
              background: "linear-gradient(135deg, #4caf50, #2e7d32)", // Efecto degradado
              color: "white",
              borderRadius: "8px",
              padding: "12px",
              border: "2px solid #1b5e20",
              marginTop: "165px",
            },
            icon: "🗑️",
            duration: 4000,
            
    });
  };

  const calculateTotal = () => {
    // Excluir productos con cantidad 0 del cálculo del total
    return cartItems
      .filter((item) => item.quantity > 0)
      .reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  if (loading) {
    return (
      <div className="fixed left-0 right-0 top-[170px] bottom-0 flex items-center justify-center z-50 bg-white/15 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h1 className="text-2xl font-bold text-center mb-6">Carrito de Compras</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className={`flex flex-col lg:flex-row items-center bg-white shadow-md rounded-lg p-4 mb-6 ${
                item.quantity === 0 ? "opacity-50" : ""
              }`} // Aplicar estilo condicional para productos con cantidad 0
            >
              {/* Carrusel de imágenes */}
              <div className="w-full lg:w-1/3">
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  showArrows={true}
                  swipeable={true}
                  emulateTouch={true}
                  interval={3000}
                  className="rounded-lg"
                >
                  {(item.images || []).map((image, index) => (
                    <div key={index}>
                      <img
                        src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${image.urlImage}`}
                        alt={item.name}
                        className="w-full h-60 object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              {/* Información del producto */}
              <div className="w-full lg:w-2/3 mt-4 lg:mt-0 lg:ml-6">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-gray-800 font-medium mb-4">
                  Precio: €{item.price.toFixed(2)}
                </p>
                {/* Modificar cantidad */}
                <div className="flex items-center mb-4">
                  <label
                    htmlFor={`quantity-${item.productId}`}
                    className="mr-2 text-gray-700 font-medium"
                  >
                    Cantidad:
                  </label>
                  <input
                    id={`quantity-${item.productId}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="border rounded-lg px-3 py-1 w-16 text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                {/* Eliminar producto */}
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {/* Total del carrito */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mt-6">
            <h2 className="text-lg font-medium text-gray-800">
              Total: €{calculateTotal().toFixed(2)}
            </h2>
            <button
              className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              toasttype="button"
              onClick={() => toast.success("Pago realizado con éxito", {
                style: {
                  background: "linear-gradient(135deg, #f59e0b, #d97706)", // Efecto degradado
                  color: "white",
                  borderRadius: "8px",
                  padding: "12px",
                  border: "2px solid #b45309",
                  marginTop: "180px",
                },
                icon: "💳",
                duration: 4000,
              })} // Simulación de pago exitoso
            >
              Pagar
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default CartPage;
