import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { AuthApi } from "../config/apis";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    if (!user) {
      const validateToken = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("auth-token");
          const response = await AuthApi.validateToken(token);
          if (response?.status === 200) {
            setUser(response.data.user);
          }
        } catch (error) {
          if (error?.code === "ECONNREFUSED") {
            console.log("Server is down");
            navigate("/505");
          }
          if (error?.code === "ERR_NETWORK") {
            console.log("Network error");
            navigate("/505");
          }
          if (error?.response?.status === 401) {
            console.log(error.response.data.message);
            localStorage.removeItem("auth-token");
            navigate("/login");
          }

          if (error?.response?.status === 500) {
            console.log("Token is invalid");
            localStorage.removeItem("auth-token");

            navigate("/505");
          }
          console.log("Token is invalid");
          // localStorage.removeItem("auth-token");
        } finally {
          setLoading(false);
        }
      };

      validateToken();
    }
  }, []);

  return (
    <div className={sidebar ? "sidebar-enable vertical-collpsed" : ""}>
      <div id="layout-wrapper">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Header user={user} handleSidebar={handleSidebar} />
            <Sidebar user={user} />
            <div className="main-content">{children}</div>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
