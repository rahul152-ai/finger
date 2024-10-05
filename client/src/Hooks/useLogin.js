import { useContext, useState } from "react";
import { AuthApi } from "../config/apis";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
const useLogin = ({ reset }) => {
  const navigate = useNavigate();
  const [_, setUser] = useContext(AuthContext);
  const [loading, setLoaidng] = useState(false);
  const [status, setStatus] = useState({
    message: "",
    type: "",
    alertVisible: false,
  });
  const login = async (data) => {
    setLoaidng(true);
    try {
      const response = await AuthApi.signIn(data);
      console.log(response);
      setUser(response?.data?.user);
      localStorage.setItem("auth-token", response?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      let errMessage = "";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errMessage = error.response.data.message;
      } else {
        errMessage = error.message;
      }
      setStatus({
        message: errMessage,
        type: "danger",
        alertVisible: true,
      });
    } finally {
      setLoaidng(false);
    }
  };

  const alertDismiss = () =>
    setStatus((prev) => ({ ...prev, alertVisible: false }));

  return [login, loading, status, alertDismiss];
};

export default useLogin;
