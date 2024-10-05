import React, { useContext } from "react";
import logo from "../assets/images/logo-dark.png";
import logosm from "../assets/images/logo-sm.png";
import ProfileMenu from "./LayoutComponents/ProfileMenu";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/context";
import useLogout from "../customHooks/useLogout";
import useCheckInternet from "../customHooks/useOnline";
import { Alert } from "reactstrap";

const Header = ({ handleSidebar }) => {
  const [user, _] = useContext(AuthContext);
  const isOnline = useCheckInternet();

  const logout = useLogout();
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          {!isOnline && (
            <div className="position-absolute network-error">
              <Alert color="danger">
                Hey You are offline. Please check your internet connection.
              </Alert>
            </div>
          )}
          {/* <!-- LOGO --> */}
          <div className="navbar-brand-box text-center">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logosm} alt="logo-sm-dark" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="logo-dark" height="24" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src={logosm} alt="logo-sm-light" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="logo-light" height="24" />
              </span>
            </Link>
          </div>

          <button
            onClick={() => handleSidebar()}
            type="button"
            className="btn btn-sm px-3 font-size-24 header-item waves-effect"
            id="vertical-menu-btn"
          >
            <i className="ri-menu-2-line align-middle"></i>
          </button>
        </div>

        <div className="d-flex">
          <div className="dropdown d-inline-block user-dropdown">
            {/* prfile menu  */}
            <ProfileMenu user={user} />
            <div className="dropdown-menu dropdown-menu-end">
              {/* <!-- item--> */}
              <Link className="dropdown-item" href="/profile">
                <i className="ri-user-line align-middle me-1"></i> Profile
              </Link>

              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item text-danger"
                onClick={() => logout()}
              >
                <i className="ri-shut-down-line align-middle me-1 text-danger"></i>{" "}
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
