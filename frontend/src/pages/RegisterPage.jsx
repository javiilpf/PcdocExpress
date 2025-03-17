import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PacmanLoader from "react-spinners/PacmanLoader"; // Importa correctamente el loader.

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false); // Inicializa el estado 'loading'.
  const { setError, register } = useAuth();
  const navigate = useNavigate();

  // Validación del formulario.
  useEffect(() => {
    const { email, password } = formData;
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Muestra el loader mientras procesa el registro.
    try {
      await register(formData);
      navigate("/"); // Redirige al home tras registrarse con éxito.
    } catch (error) {
      setError(error.message); // Maneja el error y muestra el mensaje.
    } finally {
      setLoading(false); // Detén el loader después del proceso.
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/images/FondoLogin.png')" }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg z-10">
          <PacmanLoader color="#3a6bca" size={25} />
        </div>
      )}

      {!loading && (
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg bg-opacity-80">
          <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>

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
                className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-500 ${
                  isFormValid
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Crear cuenta
              </button>
              <p className="text-sm text-gray-500 mt-2">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/auth/login"
                  className="text-blue-500 hover:underline!"
                
              >
                Inicia sesión
              </Link>
            </p>
            <div className="mt-4 text-center">
              <Link to="/" className="text-blue-500 hover:underline">
                Volver a home
              </Link>
            </div>
          </div>
        </form>
      </div>
    )}
    </div>
  );
};

export default RegisterPage;
