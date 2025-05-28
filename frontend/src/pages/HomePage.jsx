import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-22">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/portada.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg text-center">
            Bienvenido a PcDoc Express
          </h1>
          <p className="mt-4 text-lg md:text-2xl drop-shadow-lg text-center max-w-2xl">
            Tu solución integral en reparación, mantenimiento e instalación de
            ordenadores y componentes. ¡También tienda online!
          </p>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info + Carousel */}
      <div
        className="relative py-16 bg-white"
        style={{
          transform: `translateY(${
            scrollY > 1200 ? (scrollY - 1200) * 0.3 : 0
          }px)`,
          opacity: scrollY > 1200 ? 0 : 1,
          transition: "all 0.5s ease-in-out",
          pointerEvents: scrollY > 1200 ? "none" : "auto",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
          {/* Texto a la izquierda */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              ¿Por qué elegir PcDoc Express?
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              En{" "}
              <span className="font-semibold text-green-700">PcDoc Express</span> te
              ofrecemos la mejor experiencia en reparación, mantenimiento e
              instalación de ordenadores y componentes.
              <br />
              <br />
              Nuestro equipo técnico está siempre disponible para resolver tus
              dudas, recoger tu equipo a domicilio y devolvértelo reparado con
              total garantía. Además, puedes hacer seguimiento de tus pedidos y
              presupuestos en tiempo real desde tu cuenta.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Atención personalizada y rápida</li>
              <li>Recogida y entrega a domicilio</li>
              <li>Presupuestos claros y sin compromiso</li>
              <li>Garantía en todas las reparaciones</li>
              <li>Tienda online de componentes y accesorios</li>
            </ul>
          </div>
          {/* Carrusel a la derecha */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-lg">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                showArrows={true}
                centerMode={false}
                showStatus={false}
                className="rounded-2xl shadow-2xl"
              >
                <div>
                  <img
                    className="w-full h-80 object-cover rounded-2xl"
                    src="/images/CogerTelefono.jpeg"
                    alt="Atendemos tus consultas"
                  />
                  <p className="legend text-center text-base bg-white/80 text-gray-800 rounded-b-2xl py-2">
                    Atendemos todas tus consultas sobre tu reparación
                  </p>
                </div>
                <div>
                  <img
                    className="w-full h-80 object-cover rounded-2xl"
                    src="/images/Hombre_reparando.jpg"
                    alt="Reparamos con garantías"
                  />
                  <p className="legend text-center text-base bg-white/80 text-gray-800 rounded-b-2xl py-2">
                    Reparamos tu ordenador con las mejores garantías
                  </p>
                </div>
                <div>
                  <img
                    className="w-full h-80 object-cover rounded-2xl"
                    src="/images/repartidor.jpg"
                    alt="Recogemos a domicilio"
                  />
                  <p className="legend text-center text-base bg-white/80 text-gray-800 rounded-b-2xl py-2">
                    Recogemos tu ordenador a domicilio
                  </p>
                </div>
                <div>
                  <img
                    className="w-full h-80  rounded-2xl"
                    src="/images/Repartidor.png"
                    alt="Recogemos a domicilio"
                  />
                  <p className="legend text-center text-base bg-white/80 text-gray-800 rounded-b-2xl py-2">
                    Recogemos tu ordenador a domicilio
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios destacados */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reparación */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition">
              <img
                src="/images/repair-icon.png"
                alt="Reparación"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Reparación
              </h3>
              <p className="text-gray-600 text-center">
                Diagnóstico y reparación de ordenadores, portátiles y componentes.
                Presupuestos claros y sin compromiso.
              </p>
            </div>
            {/* Mantenimiento */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition">
              <img
                src="/images/maintenance-icon.png"
                alt="Mantenimiento"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Mantenimiento
              </h3>
              <p className="text-gray-600 text-center">
                Limpieza, optimización y actualización de sistemas para que tu
                equipo funcione siempre como el primer día.
              </p>
            </div>
            {/* Instalación */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition">
              <img
                src="/images/install-icon.png"
                alt="Instalación"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                Instalación
              </h3>
              <p className="text-gray-600 text-center">
                Instalamos hardware y software, configuramos redes y dejamos todo
                listo para que solo tengas que disfrutar.
              </p>
            </div>
            {/* Tienda Online */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition">
              <img
                src="/images/shop-icon.png"
                alt="Tienda Online"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-pink-700 mb-2">
                Tienda Online
              </h3>
              <p className="text-gray-600 text-center">
                Compra componentes, accesorios y periféricos de calidad al mejor
                precio. ¡Recíbelo en casa!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cómo funciona */}
      <div
        className="py-16 bg-white"
        style={{
          transform: `translateY(${
            scrollY > 1800 ? (scrollY - 1800) * 0.3 : 0
          }px)`,
          opacity: scrollY > 1800 ? 0 : 1,
          transition: "all 0.5s ease-in-out",
          pointerEvents: scrollY > 1800 ? "none" : "auto",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              ¿Cómo funciona PcDoc Express?
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              ¡Tu ordenador en buenas manos en 4 pasos!
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
              <h3 className="text-lg font-medium text-green-700 mb-2">
                1. Solicita tu servicio
              </h3>
              <p className="text-gray-600 text-center">
                Regístrate, elige el servicio que necesitas y cuéntanos tu
                problema o lo que quieres instalar.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
              <h3 className="text-lg font-medium text-blue-700 mb-2">
                2. Recogida a domicilio
              </h3>
              <p className="text-gray-600 text-center">
                Un técnico recogerá tu equipo en tu casa o empresa, sin que
                tengas que desplazarte.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
              <h3 className="text-lg font-medium text-purple-700 mb-2">
                3. Servicio profesional
              </h3>
              <p className="text-gray-600 text-center">
                Reparamos, mantenemos o instalamos lo que necesites. Te informamos
                en todo momento del estado.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition">
              <h3 className="text-lg font-medium text-pink-700 mb-2">
                4. Entrega y seguimiento
              </h3>
              <p className="text-gray-600 text-center">
                Te devolvemos tu equipo y puedes seguir el estado y garantía
                desde tu cuenta.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confianza */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
            ¿Por qué confiar en nosotros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                +10 años de experiencia
              </h3>
              <p className="text-gray-600 text-center">
                Miles de clientes satisfechos avalan la calidad de nuestros
                servicios.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Garantía y transparencia
              </h3>
              <p className="text-gray-600 text-center">
                Todas nuestras reparaciones y productos cuentan con garantía y
                seguimiento online.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold text-pink-700 mb-2">
                Atención personalizada
              </h3>
              <p className="text-gray-600 text-center">
                Nuestro equipo te acompaña antes, durante y después del servicio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
