//? This component is used to protect the login route from being accessed by an authenticated user. If the user is authenticated, the user will be redirected to the dashboard page. If the user is not authenticated, the user will be able to access the login page.

import { Navigate } from "react-router-dom";

const LoginRouteGuard = ({ children }) => {
  const token = localStorage.getItem("auth-token");

  if (token) {
    return <Navigate to="/dashboard" replace={true} />;
  } else {
    return children;
  }
};

export default LoginRouteGuard;
