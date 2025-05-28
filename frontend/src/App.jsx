import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MaintenanceProvider } from "./context/MaintenanceContext"; // Asegúrate de importar el MaintenanceProvider
import { router } from "./router";
import { ReparationProvider } from "./context/ReparationContext";
import { ProductProvider } from "./context/ProductContext";
import { InstallationProvider } from "./context/InstallationContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";

const App = () => {
  return (
      <AuthProvider>
        <Toaster position="top-right" duration={2000} />
        <CartProvider>
          <MaintenanceProvider>
            <ReparationProvider>
              <InstallationProvider>
                <ProductProvider>
                  <RouterProvider router={router} />
                </ProductProvider>
              </InstallationProvider>
            </ReparationProvider>
          </MaintenanceProvider>
        </CartProvider>
      </AuthProvider>
  );
};

export default App;
