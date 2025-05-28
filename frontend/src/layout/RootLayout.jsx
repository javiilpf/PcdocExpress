import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const RootLayout = () => {
  const { user, logout, token } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-lime-300 to-lime-600 shadow-lg z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
          <div className="text-2xl font-bold text-white">
            <Link to="/">
              <img
                className="w-55 h-auto"
                src="/images/logoFondo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Botón hamburguesa / X */}
          <button
            className="text-white text-3xl lg:hidden z-50"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <XMarkIcon className="w-8 h-8 text-white" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-white" />
            )}
          </button>

          {/* Menú desplegable */}
          <div
            ref={menuRef}
            className={`absolute top-full left-0 w-full bg-lime-300 lg:bg-transparent lg:static lg:w-auto lg:block transition-all duration-500 overflow-hidden lg:overflow-visible ${
              menuOpen ? "max-h-[1000px] py-4 shadow-lg" : "max-h-0"
            } lg:max-h-none`}
          >
            <ul className="flex flex-col lg:flex-row items-center pb-5 space-y-5 lg:space-y-1 lg:gap-x-10 px-4 lg:px-0">
              {!token ? (
                <>
                  <li>
                    <button
                      onClick={() => (window.location.href = "/shop")}
                      className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                    >
                      Tienda
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/auth/login"
                      className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                    >
                      Inicia sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth/register"
                      className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                    >
                      Regístrate
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {!user.roles.includes("ROLE_EMPLOYER") &&
                    !user.roles.includes("ROLE_ADMIN") && (
                      <>
                        <li>
                          <button
                            onClick={() => (window.location.href = "/shop")}
                            className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                          >
                            Tienda
                          </button>
                        </li>
                        <li className="relative">
                          <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full text-center md:w-auto flex items-center gap-2 bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                          >
                            Servicios
                            <ChevronDownIcon
                              className={`w-5 h-5 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg transition-all transform origin-top z-50 ${
                              isOpen
                                ? "scale-y-100 opacity-100"
                                : "scale-y-0 opacity-0 pointer-events-none"
                            }`}
                          >
                            <ul className="divide-y divide-gray-200 py-1">
                              <li>
                                <a
                                  href="/application/installation/new"
                                  className="block px-5 py-3 hover:bg-orange-600 text-gray-600 hover:text-white transition"
                                >
                                  Instalaciones
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/application/maintenance/new"
                                  className="block px-5 py-3 hover:bg-orange-600 text-gray-600 hover:text-white transition"
                                >
                                  Mantenimientos
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/application/reparation/new"
                                  className="block px-5 py-3 hover:bg-orange-600 text-gray-600 hover:text-white transition"
                                >
                                  Reparaciones
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <button
                            onClick={() => (window.location.href = "/orders")}
                            className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                          >
                            Tus pedidos
                          </button>
                        </li>
                        <li>
                          <Link
                            to="/cart"
                            className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                          >
                            🛒
                          </Link>
                        </li>
                      </>
                    )}

                  {user.roles.includes("ROLE_ADMIN") && (
                    <>
                      <li>
                        <button
                          onClick={() => (window.location.href = "/shop")}
                          className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                        >
                          Tienda
                        </button>
                      </li>
                      <li>
                        <Link
                          to="/create-products"
                          className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                        >
                          Crear producto
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/manage-roles"
                          className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                        >
                          Rango
                        </Link>
                      </li>
                    </>
                  )}

                  {user.roles.includes("ROLE_EMPLOYER") && (
                    <>
                      <li>
                        <button
                          onClick={() => (window.location.href = "/shop")}
                          className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                        >
                          Tienda
                        </button>
                      </li>
                      <li>
                        <Link
                          to="/manage-orders"
                          className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                        >
                          Manejo pedidos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/manage-orders/${user.id}`}
                          className="w-full text-center md:w-auto bg-neutral-50 text-orange-500 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition"
                        >
                          Servicios
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-center md:w-auto bg-white text-red-700 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-400 transition"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex-grow pt-20">
        <Outlet />
      </div>

      <footer className="bg-gradient-to-r from-lime-700 to-lime-900 shadow-lg z-50 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">
            &copy; 2025 Pcdoc Express. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
