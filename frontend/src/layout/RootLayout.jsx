import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-700 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <Link to="/">
              <img className="w-16 h-auto my-4" src="/src/assets/images/LogoFondo.png" alt="Logo" />
            </Link>
          </div>
          <ul className="flex items-center gap-6">
            {!user ? (
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
              <li>
                <button
                  onClick={logout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-400 transition duration-300"
                >
                  Cerrar sesión
                </button>
              </li>
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
