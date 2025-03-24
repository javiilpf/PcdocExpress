import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MaintenanceProvider } from "./context/MaintenanceContext"; // Asegúrate de importar el MaintenanceProvider
import { router } from "./router";
import { ReparationProvider } from "./context/ReparationContext";

const App = () => {
  return (
    <AuthProvider>
      <MaintenanceProvider> 
        <ReparationProvider>
          <RouterProvider router={router}/>
        </ReparationProvider>
      </MaintenanceProvider>
    </AuthProvider>
  );
};

export default App;