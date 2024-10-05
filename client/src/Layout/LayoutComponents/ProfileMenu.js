import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/imagePath";
import useLogout from "../../customHooks/useLogout";

const ProfileMenu = ({ user }) => {
  const [menu, setMenu] = useState(false);
  const logout = useLogout();

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={baseUrl + user?.defaultIcon}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-2 text-capitalize">
            {user?.userName}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            <Link to={"/profile"}>
              <i className="ri-user-line align-middle me-1"></i> Profile
            </Link>{" "}
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem
            tag="button"
            className="btn dropdown-item"
            onClick={() => logout()}
          >
            <i className="ri-shut-down-line align-middle me-1 text-danger"></i>{" "}
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ProfileMenu;
