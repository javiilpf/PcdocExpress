import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  // const { user, token } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (!token || !user) {
    console.log("token", token);
    // return <navigate to="/" />;
    alert(token);
  }
  return children;
};

export default ProtectedRoute;