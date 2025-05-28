import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PacmanLoader from "react-spinners/PacmanLoader";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setError, register } = useAuth();
  const navigate = useNavigate();

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
    setLoading(true);
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/FondoLogin.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Capa de desenfoque y opacidad */}
      <div className="fixed inset-0 bg-white/5 backdrop-blur-sm z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-2xl rounded-2xl backdrop-blur-md relative">
          {loading && (
            <>
              <div className="absolute inset-0 backdrop-blur-sm z-10 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <PacmanLoader color="lime" size={25} />
              </div>
            </>
          )}

          {!loading && (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Registrarse
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition"
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
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 px-4 font-semibold rounded-md transition duration-300 shadow-md ${
                    isFormValid
                      ? "bg-lime-500 hover:bg-lime-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                >
                  Crear cuenta
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/auth/login"
                    className="text-lime-600 hover:underline font-medium"
                  >
                    Inicia sesión
                  </Link>
                </p>
                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="text-sm text-lime-600 hover:underline"
                  >
                    Volver al inicio
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
