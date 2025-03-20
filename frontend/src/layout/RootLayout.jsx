import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const { logout, token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-700 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <Link to="/">
              <img className="w-50 h-auto" src="/src/assets/images/LogoFondo.png" alt="Logo" />
            </Link>
          </div>
          <ul className="flex items-center gap-6">
            {!token ? (
              <>
                <li>
                  <Link
                    to="/auth/login"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => (window.location.href = "/application")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 mb-2"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-400 transition duration-300"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;

