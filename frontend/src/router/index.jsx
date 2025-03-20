import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layout/AuthLayout";
import ProtectedRoute from "../../../../Javascript/SegundoTrimestre/Isaias/Curso-React-2025-M/proyectos/06-relacion-repaso - copia/ejercicio1/src/components/ProtectedRoute";
import ApplicationPage from "../pages/ApplicationPage";
import NewReparationPage from "../pages/NewReparationPage";
import NewInstallationPage from "../pages/NewInstallationPage";
import NewMaintenancePage from "../pages/NewMaintenancePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "application",
        children:[
          {
            index:true,
            element:(
              <ProtectedRoute>
                <ApplicationPage />
              </ProtectedRoute>
            )
          },
          {
            path:"reparation/new",
            element:(
              <ProtectedRoute>
                <NewReparationPage />
              </ProtectedRoute>
            )
          },
          {
            path:"installation/new",
            element:(
              <ProtectedRoute>
                <NewInstallationPage />
              </ProtectedRoute>
            )
          },
          {
            path:"maintenance/new",
            element:(
              <ProtectedRoute>
                <NewMaintenancePage />
              </ProtectedRoute>
            )
          }
        ],
        
      },
      
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "login", // Elimina la barra inicial
        element: <LoginPage />,
      },
      {
        path: "register", // Elimina la barra inicial
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);
