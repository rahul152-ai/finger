import { useContext } from "react";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const navigate = useNavigate();
  const [_, setUser] = useContext(AuthContext);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-token");

    navigate("/login");
  };

  return logout;
};

export default useLogout;
