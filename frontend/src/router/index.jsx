import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout"
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layout/AuthLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import NewReparationPage from "../pages/NewReparationPage";
import NewInstallationPage from "../pages/NewInstallationPage";
import NewMaintenancePage from "../pages/NewMaintenancePage";
import ShopPage from "../pages/ShopPage";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import OrdersPage from "../pages/OrdersPage";
import ManageRolesPage from "../pages/ManageRolesPage";
import CreateProductsPage from "../pages/CreateProductsPage";
import ManageOrdersPage from "../pages/ManageOrdersPage";
import ManageAdminOrdersPage from "../pages/ManageAdminOrdersPage";


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
        children: [
          {
            path: "reparation/new",
            element: (
              <ProtectedRoute>
                <NewReparationPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "installation/new",
            element: (
              <ProtectedRoute>
                <NewInstallationPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "maintenance/new",
            element: (
              <ProtectedRoute>
                <NewMaintenancePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/manage-orders",
        element: (
          <ProtectedRoute>
            <ManageOrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        
      path: "/manage-orders/:id",
      element: (
        <ProtectedRoute>
          <ManageAdminOrdersPage />
        </ProtectedRoute>
      )
    },
      {
        path: "manage-roles",
        element: (
          <ProtectedRoute>
            <ManageRolesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-products",
        element: (
          <ProtectedRoute>
            <CreateProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path:"/orders",
        element:
          <ProtectedRoute>
            <OrdersPage/>
          </ProtectedRoute>
      },
      {
        path: "shop",
        element: <ShopPage />, 
      },
      {
        path: "products/:id",
        element: <ProductDetailPage/>
      },
      {
        path:"/cart",
        element:<CartPage/>,
      },
      
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login", // Eliminado `index`
        element: <LoginPage />,
      },
      {
        path: "register", // Eliminado `index`
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);