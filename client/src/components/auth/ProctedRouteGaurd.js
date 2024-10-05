import { Navigate } from "react-router-dom";
import Layout from "../../Layout/Index";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("auth-token");

  if (token) {
    return <Layout>{children}</Layout>;
  }
  return <Navigate to="/login" replace={true} />;
};

export default ProtectedRoutes;
