import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: "url('/path/to/your/hero-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold">Bienvenido a Pcdoc Express</h1>
          <p className="mt-4 text-lg">Tu tienda de reparación de ordenadores ¡En línea!</p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="py-12">
  <div className="max-w-4xl mx-auto">
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showArrows={true} /* Agrega navegación manual */
      centerMode={true}
      centerSlidePercentage={80} /* Ajusta el tamaño del carrusel */
    >
      <div>
        <img
          className="w-full h-auto"
          src="/src/assets/images/CogerTelefono.jpeg"
          alt="Imagen 1"
        />
        <p className="legend text-center">
          Atendemos todas tus consultas sobre tu reparación
        </p>
      </div>
      <div>
        <img
          className="w-full h-auto"
          src="/src/assets/images/Reparacion.png"
          alt="Imagen 2"
        />
        <p className="legend text-center">
          Reparamos tu ordenador con las mejores garantías
        </p>
      </div>
      <div>
        <img
          className="w-full h-auto"
          src="/src/assets/images/Repartidor.png"
          alt="Imagen 3"
        />
        <p className="legend text-center">
          Recogemos tu ordenador a domicilio
        </p>
      </div>
    </Carousel>
  </div>
</div>


      {/* Information Section */}
      <div className="py-12 bg-white">
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
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900">Paso 1 🗣️</h3>
                  <p className="mt-2 text-gray-600">
                    Cuéntanos el problema que tiene tu dispositivo en esta página web y agenda
                    una cita con nuestro servicio técnico.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900">Paso 2 💻</h3>
                  <p className="mt-2 text-gray-600">
                    Un técnico recogerá tu ordenador y procederemos a su reparación. ¡Dispondrás
                    de un seguimiento en todo momento del estado de tu reparación!.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900">Paso 3 😍</h3>
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
            &copy; 2023 Pcdoc Express. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
