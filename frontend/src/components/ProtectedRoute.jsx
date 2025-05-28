import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
   const { token } = useAuth();
  

  if (!token) {
    console.log("Redirigiendo a la página de inicio");
    return <Navigate to="/" />; // Redirige a la página de inicio si no hay token o usuario
    
  }
  return children;
};

export default ProtectedRoute;