import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="sticky top-0 bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('/src/assets/images/portada.jpeg')",
          transform: `translateY(${scrollY * 0.3}px)`, // Movimiento parallax
          opacity: scrollY > 500 ? 0 : 1, // Desaparición gradual
          transition: "all 0.5s ease-in-out", // Transición suave
          pointerEvents: scrollY > 500 ? "none" : "auto", // Sin interacciones cuando no es visible
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold">Bienvenido a Pcdoc Express</h1>
          <p className="mt-4 text-lg">
            Tu tienda de reparación de ordenadores ¡En línea!
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div
        className="relative py-12"
        style={{
          transform: `translateY(${scrollY > 1200 ? (scrollY - 1200) * 0.3 : 0}px)`,
          opacity: scrollY > 1200 ? 0 : 1, // Desvanecer después de scrollY > 1200
          transition: "all 0.5s ease-in-out",
          pointerEvents: scrollY > 1200 ? "none" : "auto",
        }}
      >
        <div className="flex flex-wrap items-center">
          {/* Texto a la izquierda */}
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-3xl font-semibold">¿Por qué elegirnos?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Nuestro objetivo es brindarte la mejor experiencia en la reparación
              de ordenadores. Aquí encontrarás las razones por las que elegirnos.
            </p>
          </div>

          {/* Galería a la derecha */}
          <div className="w-full lg:w-1/2 px-4">
            <Carousel
              showThumbs={false}
              autoPlay
              infiniteLoop
              showArrows={true}
              centerMode={true}
              centerSlidePercentage={80}
            >
              <div>
                <img
                  className="w-full h-auto"
                  src="/src/assets/images/CogerTelefono.jpeg"
                  alt="Atendemos tus consultas"
                />
                <p className="legend text-center">
                  Atendemos todas tus consultas sobre tu reparación
                </p>
              </div>
              <div>
                <img
                  className="w-full h-auto"
                  src="/src/assets/images/Reparacion.png"
                  alt="Reparamos con garantías"
                />
                <p className="legend text-center">
                  Reparamos tu ordenador con las mejores garantías
                </p>
              </div>
              <div>
                <img
                  className="w-full h-auto"
                  src="/src/assets/images/Repartidor.png"
                  alt="Recogemos a domicilio"
                />
                <p className="legend text-center">
                  Recogemos tu ordenador a domicilio
                </p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div
        className="py-12 bg-white"
        style={{
          transform: `translateY(${scrollY > 1800 ? (scrollY - 1800) * 0.3 : 0}px)`,
          opacity: scrollY > 1800 ? 0 : 1, // Desvanecer después de scrollY > 1800
          transition: "all 0.5s ease-in-out",
          pointerEvents: scrollY > 1800 ? "none" : "auto",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Cómo funciona
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Reparación de ordenadores en 3 sencillos pasos
            </p>
          </div>
          <div className="mt-10">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                  <h3 className="text-lg font-medium text-gray-900">
                    Paso 1 🗣️
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Cuéntanos el problema que tiene tu dispositivo en esta
                    página web y agenda una cita con nuestro servicio técnico.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                  <h3 className="text-lg font-medium text-gray-900">
                    Paso 2 💻
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Un técnico recogerá tu ordenador y procederemos a su
                    reparación. ¡Dispondrás de un seguimiento en todo momento
                    del estado de tu reparación!
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                  <h3 className="text-lg font-medium text-gray-900">
                    Paso 3 😍
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Recibe tu ordenador reparado en la puerta de tu casa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">
            &copy; 2025 Pcdoc Express. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
