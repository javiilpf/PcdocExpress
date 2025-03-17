import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PacmanLoader from "react-spinners/PacmanLoader"; // Asegúrate de importar el loader correctamente.

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setError, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Inicializa 'loading' como false

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Muestra el loader mientras procesa la petición.
    try {
      await login(formData);
      navigate("/"); // Redirige al home después de iniciar sesión.
    } catch (error) {
      setError(error.message); // Maneja el error y muestra el mensaje.
    } finally {
      setLoading(false); // Oculta el loader al finalizar.
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/images/FondoLogin.png')" }}
    >
      <div className="relative max-w-md w-full p-6 bg-white shadow-lg rounded-lg bg-opacity-80">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg z-10">
            <PacmanLoader color="#3a6bca" size={25} />
          </div>
        )}

        {!loading && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  placeholder="Correo Electrónico"
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  placeholder="********"
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-500"
                >
                  Iniciar Sesión
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/auth/register"
                    className="text-blue-500 hover:underline"
                  >
                    Regístrate aquí
                  </Link>
                </p>
                <div className="mt-4 text-center">
                  <Link to="/" className="text-blue-500 hover:underline">
                    Volver a home
                  </Link>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;


