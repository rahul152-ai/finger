import React from "react";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../customHooks/useLogout";
import { baseUrl } from "../utils/imagePath";

const Sidebar = () => {
  const logout = useLogout();
  return (
    // <div className="vertical-menu">
    //   <div data-simplebar className="h-100">
    //     <div id="sidebar-menu">
    //       <ul className="metismenu list-unstyled my-sidebar" id="side-menu">
    //         <li>
    //           <NavLink to="/dashboard" className="waves-effect">
    //             <i
    //               className={`ri-dashboard-line ${
    //                 window.location.pathname === "/dashboard" ? "active" : ""
    //               }`}
    //             ></i>
    //             <span>Dashboard</span>
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to="/students" className="waves-effect">
    //             <i
    //               className={`ri-file-list-line ${
    //                 window.location.pathname === "/students" ? "active" : ""
    //               }`}
    //             ></i>
    //             <span>Student List</span>
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to="/batchs" className="waves-effect">
    //             <i
    //               className={`ri-team-line ${
    //                 window.location.pathname === "/batchs" ? "active" : ""
    //               }`}
    //             ></i>
    //             <span>Batch List</span>
    //           </NavLink>
    //         </li>
    //         <li>
    //           <a
    //             href={`${baseUrl}Mantra_MSF100_Drivers.zip`}
    //             target="_blank"
    //             rel="noreferrer"
    //             className="waves-effect"
    //             download="Mantra_MSF100_Drivers.zip"
    //           >
    //             <i className={`ri-download-line`}></i>
    //             <span>Mantra Driver</span>
    //           </a>
    //         </li>
    //         <li>
    //           <button onClick={() => logout()} className="waves-effect">
    //             <i className={`ri-logout-circle-line`}></i>
    //             <span>Logout</span>
    //           </button>
    //         </li>
    //         {/* <li>
    //           <NavLink to="/test" className="waves-effect">
    //             <i className={`ri-logout-circle-line`}></i>
    //             <span>Capture</span>
    //           </NavLink>
    //         </li> */}
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <div className="vertical-menu">
      <div
        data-simplebar="init"
        className="h-100 mm-show simplebar-scrollable-y"
      >
        <div
          className="simplebar-wrapper"
          // style="margin: 0px"
        >
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div
              className="simplebar-offset"
              //  style="right: 0px; bottom: 0px"
            >
              <div
                className="simplebar-content-wrapper"
                tabIndex="0"
                role="region"
                aria-label="scrollable content"
                // style="height: 100%; overflow: hidden scroll"
              >
                <div
                  className="simplebar-content"
                  //  style="padding: 0px"
                >
                  <div id="sidebar-menu">
                    <ul
                      className="metismenu list-unstyled my-sidebar"
                      id="side-menu"
                    >
                      <li>
                        <NavLink to="/dashboard" className="waves-effect">
                          <i
                            className={`ri-dashboard-line ${
                              window.location.pathname === "/dashboard"
                                ? "active"
                                : ""
                            }`}
                          ></i>
                          <span>Dashboard</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/students" className="waves-effect">
                          <i
                            className={`ri-file-list-line ${
                              window.location.pathname === "/students"
                                ? "active"
                                : ""
                            }`}
                          ></i>
                          <span>Student List</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/batchs" className="waves-effect">
                          <i
                            className={`ri-team-line ${
                              window.location.pathname === "/batchs"
                                ? "active"
                                : ""
                            }`}
                          ></i>
                          <span>Batch List</span>
                        </NavLink>
                      </li>
                      <li>
                        <a
                          href={`${baseUrl}Mantra_MSF100_Drivers.zip`}
                          target="_blank"
                          rel="noreferrer"
                          className="waves-effect"
                          download="Mantra_MSF100_Drivers.zip"
                        >
                          <i className={`ri-download-line`}></i>
                          <span>Mantra Driver</span>
                        </a>
                      </li>

                      <li onClick={() => logout()}>
                        <button aria-disabled="true" className="waves-effect">
                          <i className={`ri-logout-circle-line`}></i>
                          <span>Logout</span>
                        </button>
                      </li>
                      {/* <li>
              <NavLink to="/test" className="waves-effect">
                <i className={`ri-logout-circle-line`}></i>
                <span>Capture</span>
              </NavLink>
            </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            // style="width: 250px; height: 818px"
          ></div>
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          // style="visibility: hidden"
        >
          <div
            className="simplebar-scrollbar"
            // style="width: 0px; display: none"
          ></div>
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          // style="visibility: visible"
        >
          <div
            className="simplebar-scrollbar"
            // style="
            //   height: 25px;
            //   transform: translate3d(0px, 0px, 0px);
            //   display: block;
            // "
          ></div>
        </div>
      </div>
    </div>

    // <div className="vertical-menu toogle-header">
    //   <div data-simplebar className="h-100">
    //     <div id="sidebar-menu">
    //       <ul className="metismenu list-unstyled my-sidebar" id="side-menu">
    //         <li>
    //           <NavLink
    //             to="/dashboard"
    //             className={({ isActive, isPending }) =>
    //               `waves-effect ${isPending ? "pending" : isActive ? "" : ""}`
    //             }
    //           >
    //             <i
    //               className={`ri-dashboard-line ${
    //                 window.location.pathname === "/dashboard"
    //                   ? "toogle-active"
    //                   : ""
    //               }`}
    //             ></i>
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/students"
    //             className={({ isActive, isPending }) =>
    //               `waves-effect ${isPending ? "pending" : isActive ? "" : ""}`
    //             }
    //           >
    //             <i
    //               className={`ri-file-list-line ${
    //                 window.location.pathname === "/students"
    //                   ? "toogle-active"
    //                   : ""
    //               }`}
    //             ></i>
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/batchs"
    //             className={({ isActive, isPending }) =>
    //               `waves-effect ${isPending ? "pending" : isActive ? "" : ""}`
    //             }
    //           >
    //             <i
    //               className={`ri-team-line ${
    //                 window.location.pathname === "/batchs"
    //                   ? "toogle-active"
    //                   : ""
    //               }`}
    //             ></i>
    //           </NavLink>
    //         </li>
    //         <li>
    //           <a
    //             href={`${baseUrl}Mantra_MSF100_Drivers.zip`}
    //             target="_blank"
    //             rel="noreferrer"
    //             className="waves-effect"
    //             download="Mantra_MSF100_Drivers.zip"
    //           >
    //             <i className={`ri-download-line`}></i>
    //           </a>
    //         </li>
    //         <li>
    //           <button onClick={() => logout()} className="waves-effect">
    //             <i className={`ri-logout-circle-line`}></i>
    //           </button>
    //         </li>
    //         {/* <li>
    //           <NavLink to="/test" className="waves-effect">
    //             <i className={`ri-logout-circle-line`}></i>
    //             <span>Capture</span>
    //           </NavLink>
    //         </li> */}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sidebar;
