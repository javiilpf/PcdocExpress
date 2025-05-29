import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PacmanLoader from "react-spinners/PacmanLoader";
import { toast } from "sonner";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setError, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      await login(formData);
      navigate("/");
      toast.success(`¡Bienvenido, ${formData.email}`, {
        style: {
          background: "linear-gradient(#FFB300, #FFA000)", // Efecto degradado
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          border: "2px solid #1b5e20",
          marginTop: "180px",
        },
        icon: "✅",
        duration: 4000,
      });
    } catch (error) {
      if (error.message === "Invalid credentials.") {
        toast.error("Usuario y contraseña incorrectos", {
          style: {
            background: "linear-gradient(135deg, #ff5722, #d32f2f)", // Efecto degradado
            color: "white",
            borderRadius: "8px",
            padding: "12px",
            border: "2px solid #b71c1c",
          },
          icon: "🚨",
          duration: 4000,
        });
      } else {
        toast.error(error.message);
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fondo: Imagen completa de pantalla */}
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

      {/* Loader global */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/60 backdrop-blur-sm">
          <PacmanLoader color="#f59e0b" size={25} />
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-2xl rounded-2xl backdrop-blur-md">
          {!loading && (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Iniciar Sesión
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
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
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
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md transition duration-300 shadow-md"
                >
                  Iniciar Sesión
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/auth/register"
                    className="text-amber-600 hover:underline font-medium"
                  >
                    Regístrate aquí
                  </Link>
                </p>
                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="text-sm text-amber-600 hover:underline"
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

export default LoginPage;
